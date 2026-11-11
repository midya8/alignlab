/* Independent exact browser evaluator: enumerate simple paths and box corners.
 * Population probabilities only. No producer report is trusted as an oracle. */
(function (root) {
  "use strict";
  const gcd = (a, b) => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) {
      const r = a % b;
      a = b;
      b = r;
    }
    return a;
  };
  class Q {
    constructor(n, d = 1n) {
      if (d === 0n) throw Error("zero denominator");
      if (d < 0n) {
        n = -n;
        d = -d;
      }
      const g = gcd(n, d);
      this.n = n / g;
      this.d = d / g;
    }
    add(b) {
      return new Q(this.n * b.d + b.n * this.d, this.d * b.d);
    }
    sub(b) {
      return new Q(this.n * b.d - b.n * this.d, this.d * b.d);
    }
    mul(b) {
      return new Q(this.n * b.n, this.d * b.d);
    }
    div(b) {
      return new Q(this.n * b.d, this.d * b.n);
    }
    cmp(b) {
      const v = this.n * b.d - b.n * this.d;
      return v < 0n ? -1 : v > 0n ? 1 : 0;
    }
    toString() {
      return this.d === 1n ? String(this.n) : this.n + "/" + this.d;
    }
  }
  const Z = new Q(0n),
    O = new Q(1n);
  function rational(x) {
    if (typeof x === "number") {
      if (!Number.isSafeInteger(x))
        throw Error("exact safe integer or rational string required");
      x = String(x);
    }
    if (
      typeof x !== "string" ||
      x.length > 160 ||
      !/^\-?\d+(?:\/\d+|\.\d+)?$/.test(x)
    )
      throw Error("invalid rational");
    let q;
    if (x.includes("/")) {
      const [a, b] = x.split("/");
      q = new Q(BigInt(a), BigInt(b));
    } else if (x.includes(".")) {
      const places = x.length - x.indexOf(".") - 1;
      q = new Q(BigInt(x.replace(".", "")), 10n ** BigInt(places));
    } else q = new Q(BigInt(x));
    if (
      (q.n < 0n ? -q.n : q.n).toString(2).length > 512 ||
      q.d.toString(2).length > 512
    )
      throw Error("512-bit input limit");
    return q;
  }
  function encode(x) {
    if (x instanceof Q) return x.toString();
    if (Array.isArray(x)) return x.map(encode);
    if (x && typeof x === "object")
      return Object.fromEntries(
        Object.entries(x).map(([k, v]) => [k, encode(v)]),
      );
    return x;
  }
  function fields(x, keys) {
    if (
      !x ||
      typeof x !== "object" ||
      Array.isArray(x) ||
      Object.keys(x).sort().join("|") !== keys.slice().sort().join("|")
    )
      throw Error("wrong fields");
  }
  function validate(d) {
    fields(d, ["items", "reference", "comparisons", "scale_bounds", "utility"]);
    const n = Array.isArray(d.items) ? d.items.length : 0;
    if (
      n < 1 ||
      n > 6 ||
      d.items.some(
        (x) => typeof x !== "string" || !/^[A-Za-z0-9]{1,16}$/.test(x),
      ) ||
      new Set(d.items).size !== n
    )
      throw Error("1..6 unique ASCII alphanumeric items required");
    if (
      !Array.isArray(d.reference) ||
      d.reference.length !== n ||
      !Array.isArray(d.utility) ||
      d.utility.length !== n ||
      !Array.isArray(d.scale_bounds) ||
      !d.scale_bounds.length ||
      d.scale_bounds.length > n
    )
      throw Error("invalid array lengths");
    const reference = d.reference.map(rational),
      utility = d.utility.map(rational);
    if (
      reference.some((x) => x.cmp(Z) <= 0) ||
      reference.reduce((a, b) => a.add(b), Z).cmp(O) !== 0
    )
      throw Error("positive reference must sum exactly to one");
    const bounds = d.scale_bounds.map((b) => {
      if (!Array.isArray(b) || b.length !== 2)
        throw Error("bounds must be pairs");
      const [l, u] = b.map(rational);
      if (l.cmp(Z) <= 0 || l.cmp(u) > 0)
        throw Error("positive ordered bounds required");
      return [l, u];
    });
    if (
      !Array.isArray(d.comparisons) ||
      d.comparisons.length > (n * (n - 1)) / 2
    )
      throw Error("too many comparisons");
    const seen = new Set();
    const comparisons = d.comparisons
      .map((e) => {
        fields(e, ["left", "right", "probability"]);
        let a = e.left,
          b = e.right,
          p = rational(e.probability);
        if (
          !Number.isInteger(a) ||
          !Number.isInteger(b) ||
          a < 0 ||
          b < 0 ||
          a >= n ||
          b >= n ||
          a === b
        )
          throw Error("invalid endpoints");
        if (p.cmp(Z) <= 0 || p.cmp(O) >= 0)
          throw Error("population probabilities must be strictly inside (0,1)");
        if (a > b) {
          [a, b] = [b, a];
          p = O.sub(p);
        }
        const key = a + "," + b;
        if (seen.has(key)) throw Error("duplicate unordered comparison");
        seen.add(key);
        return { left: a, right: b, probability: p };
      })
      .sort((a, b) => a.left - b.left || a.right - b.right);
    return {
      items: d.items.slice(),
      reference,
      comparisons,
      scale_bounds: bounds,
      utility,
    };
  }
  function audit(raw) {
    const d = validate(raw),
      n = d.items.length,
      edge = new Map(),
      get = (a, b) => edge.get(a + "," + b);
    for (const e of d.comparisons) {
      const o = e.probability.div(O.sub(e.probability));
      edge.set(e.left + "," + e.right, o);
      edge.set(e.right + "," + e.left, O.div(o));
    }
    const paths = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => []),
    );
    for (let a = 0; a < n; a++)
      for (let b = 0; b < n; b++) {
        function walk(path, ratio) {
          const u = path[path.length - 1];
          if (u === b) {
            paths[a][b].push([path, ratio]);
            return;
          }
          for (let v = 0; v < n; v++)
            if (!path.includes(v) && get(u, v))
              walk(path.concat(v), ratio.div(get(u, v)));
        }
        walk([a], O);
        paths[a][b].sort(
          (x, y) =>
            x[0].length - y[0].length ||
            x[0].join(",").localeCompare(y[0].join(",")),
        );
      }
    const components = [],
      owner = Array(n).fill(null),
      merits = Array(n),
      anchorPaths = Array(n);
    for (let a = 0; a < n; a++)
      if (owner[a] === null) {
        const items = [];
        for (let v = 0; v < n; v++) if (paths[a][v].length) items.push(v);
        const id = components.length;
        components.push({ id, anchor: a, items });
        for (const v of items) {
          owner[v] = id;
          [anchorPaths[v], merits[v]] = paths[a][v][0];
        }
      }
    if (d.scale_bounds.length !== components.length)
      throw Error("one bound row per component, in anchor order");
    components.forEach((c, i) => (c.scale_bounds = d.scale_bounds[i]));
    const constraints = [],
      cycles = [];
    for (const e of d.comparisons) {
      const a = e.left,
        b = e.right,
        odds = get(a, b),
        implied = merits[a].div(merits[b]),
        consistent = odds.cmp(implied) === 0;
      constraints.push({ ...e, odds, implied_odds: implied, consistent });
      if (!consistent) {
        const pa = anchorPaths[a],
          pb = anchorPaths[b];
        let i = 0;
        while (
          i + 1 < Math.min(pa.length, pb.length) &&
          pa[i + 1] === pb[i + 1]
        )
          i++;
        const vertices = pa
            .slice(i)
            .reverse()
            .concat(pb.slice(i + 1), a),
          steps = vertices.slice(0, -1).map((u, j) => ({
            from: u,
            to: vertices[j + 1],
            odds: get(u, vertices[j + 1]),
          }));
        cycles.push({
          vertices,
          steps,
          product: steps.reduce((p, s) => p.mul(s.odds), O),
        });
      }
    }
    const consistent = paths.every((row) =>
      row.every(
        (values) =>
          !values.length || values.every((v) => v[1].cmp(values[0][1]) === 0),
      ),
    );
    if (consistent !== constraints.every((e) => e.consistent))
      throw Error("path/edge disagreement");
    const c = components.length,
      result = {
        schema: "alignlab-identification-v1",
        input: d,
        beta: 1,
        components,
        component_of: owner,
        canonical_merits: merits,
        anchor_paths: anchorPaths,
        constraints,
        consistent,
        cycle_witnesses: cycles,
        free_component_scales: consistent ? c : null,
        relative_scale_degrees: consistent ? c - 1 : null,
      };
    if (!consistent) {
      result.policy_family = null;
      return encode(result);
    }
    const base = components.map((comp) =>
        comp.items.reduce((s, i) => s.add(d.reference[i].mul(merits[i])), Z),
      ),
      conditional = merits.map((u, i) =>
        d.reference[i].mul(u).div(base[owner[i]]),
      ),
      vertices = [];
    function corners(sides) {
      if (sides.length < c) {
        const j = sides.length;
        corners(sides.concat(0));
        if (d.scale_bounds[j][0].cmp(d.scale_bounds[j][1]) !== 0)
          corners(sides.concat(1));
        return;
      }
      const scales = sides.map((s, j) => d.scale_bounds[j][s]),
        u = merits.map((m, i) => m.mul(scales[owner[i]])),
        weights = u.map((m, i) => m.mul(d.reference[i])),
        total = weights.reduce((a, b) => a.add(b), Z),
        policy = weights.map((w) => w.div(total));
      vertices.push({
        id: vertices.length,
        sides,
        scales,
        merits: u,
        policy,
        component_mass: components.map((comp) =>
          comp.items.reduce((s, i) => s.add(policy[i]), Z),
        ),
        expected_utility: policy.reduce(
          (s, p, i) => s.add(p.mul(d.utility[i])),
          Z,
        ),
        edge_probabilities: d.comparisons.map((e) =>
          u[e.left].div(u[e.left].add(u[e.right])),
        ),
      });
    }
    corners([]);
    function extent(values) {
      let lo = values[0],
        hi = values[0];
      for (const x of values) {
        if (x.cmp(lo) < 0) lo = x;
        if (x.cmp(hi) > 0) hi = x;
      }
      return {
        minimum: lo,
        maximum: hi,
        minimum_vertices: values.flatMap((x, i) =>
          x.cmp(lo) === 0 ? [i] : [],
        ),
        maximum_vertices: values.flatMap((x, i) =>
          x.cmp(hi) === 0 ? [i] : [],
        ),
      };
    }
    const pairs = [];
    for (let a = 0; a < n; a++)
      for (let b = a + 1; b < n; b++)
        pairs.push({
          left: a,
          right: b,
          identified_without_bounds: owner[a] === owner[b],
          ...extent(
            vertices.map((v) => v.merits[a].div(v.merits[a].add(v.merits[b]))),
          ),
        });
    result.policy_family = {
      component_base_weights: base,
      within_component_policy: conditional,
      policy_identified_without_bounds: c === 1,
      unbounded_component_mass_simplex_interior: true,
      vertices,
      action_mass_ranges: merits.map((_, i) =>
        extent(vertices.map((v) => v.policy[i])),
      ),
      component_mass_ranges: components.map((_, j) =>
        extent(vertices.map((v) => v.component_mass[j])),
      ),
      utility_range: extent(vertices.map((v) => v.expected_utility)),
      pair_probability_ranges: pairs,
    };
    return encode(result);
  }
  function parse(text) {
    if (typeof text !== "string" || text.length > 8000000)
      throw Error("8 MB text limit");
    let at = 0;
    const space = () => {
      while (/[ \t\r\n]/.test(text[at] || "!")) at++;
    };
    function string() {
      const start = at++;
      let escape = false;
      while (at < text.length) {
        const ch = text[at++];
        if (escape) {
          escape = false;
          continue;
        }
        if (ch === "\\") {
          escape = true;
          continue;
        }
        if (ch === '"') return JSON.parse(text.slice(start, at));
      }
      throw Error("unterminated string");
    }
    function value(depth) {
      space();
      const ch = text[at];
      if ((ch === "[" || ch === "{") && depth >= 48)
        throw Error("JSON nesting limit 48");
      if (ch === '"') return string();
      if (ch === "{") {
        at++;
        space();
        const o = {};
        const keys = new Set();
        if (text[at] === "}") {
          at++;
          return o;
        }
        for (;;) {
          space();
          if (text[at] !== '"') throw Error("object key expected");
          const key = string();
          if (keys.has(key)) throw Error("duplicate JSON key: " + key);
          keys.add(key);
          space();
          if (text[at++] !== ":") throw Error("colon expected");
          const v = value(depth + 1);
          Object.defineProperty(o, key, {
            value: v,
            enumerable: true,
            writable: true,
            configurable: true,
          });
          space();
          const c = text[at++];
          if (c === "}") return o;
          if (c !== ",") throw Error("comma expected");
        }
      }
      if (ch === "[") {
        at++;
        space();
        const a = [];
        if (text[at] === "]") {
          at++;
          return a;
        }
        for (;;) {
          a.push(value(depth + 1));
          space();
          const c = text[at++];
          if (c === "]") return a;
          if (c !== ",") throw Error("comma expected");
        }
      }
      for (const [token, v] of [
        ["true", true],
        ["false", false],
        ["null", null],
      ])
        if (text.startsWith(token, at)) {
          at += token.length;
          return v;
        }
      const match = /^-?(?:0|[1-9][0-9]*)/.exec(text.slice(at));
      if (!match) throw Error("invalid JSON value");
      at += match[0].length;
      if (/[.eE]/.test(text[at] || "!"))
        throw Error("JSON floats forbidden; use rational strings");
      const v = Number(match[0]);
      if (!Number.isSafeInteger(v))
        throw Error("large integers must be strings");
      return v;
    }
    const result = value(0);
    space();
    if (at !== text.length) throw Error("trailing JSON content");
    return result;
  }
  root.AlignLabIdentification = { audit, rational, encode, parse };
  if (typeof module !== "undefined")
    module.exports = root.AlignLabIdentification;
})(typeof globalThis !== "undefined" ? globalThis : this);
