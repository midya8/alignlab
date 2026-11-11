(function () {
  "use strict";
  const $ = (id) => document.getElementById(id),
    E = globalThis.AlignLabIdentification,
    fixtures = globalThis.AlignLabIdentificationFixtures;
  let input = null,
    report = null;
  function text(tag, value, cls) {
    const e = document.createElement(tag);
    e.textContent = value;
    if (cls) e.className = cls;
    return e;
  }
  function table(id, heads, rows) {
    const box = $(id);
    box.replaceChildren();
    const wrap = text("div", "", "table-wrap"),
      t = document.createElement("table"),
      head = document.createElement("thead"),
      tr = document.createElement("tr");
    heads.forEach((x) => tr.append(text("th", x)));
    head.append(tr);
    t.append(head);
    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((v) => {
        const td = text("td", String(v));
        if (String(v).length > 60) td.className = "wide";
        tr.append(td);
      });
      body.append(tr);
    });
    t.append(body);
    wrap.append(t);
    box.append(wrap);
  }
  function metrics(id, rows) {
    $(id).replaceChildren(
      ...rows.map(([label, value]) => {
        const e = text("div", "", "metric");
        const strong = text("strong", value);
        if (/^[A-Za-z/]+$/.test(value)) strong.className = "word";
        e.append(strong, text("span", label));
        return e;
      }),
    );
  }
  function witnesses(r) {
    return (
      r.minimum_vertices.join(", ") + " / " + r.maximum_vertices.join(", ")
    );
  }
  function graph(r) {
    const n = r.input.items.length,
      points = Array.from({ length: n }, (_, i) => [
        380 + 255 * Math.cos(-Math.PI / 2 + (2 * Math.PI * i) / n),
        205 + 145 * Math.sin(-Math.PI / 2 + (2 * Math.PI * i) / n),
      ]),
      ns = "http://www.w3.org/2000/svg",
      svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 760 410");
    svg.setAttribute("role", "img");
    svg.setAttribute(
      "aria-label",
      "Comparison-support graph with exact odds and canonical merits",
    );
    function el(tag, attrs, value) {
      const e = document.createElementNS(ns, tag);
      Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
      if (value !== undefined) e.textContent = value;
      return e;
    }
    const defs = el("defs", {}),
      marker = el("marker", {
        id: "arrow",
        viewBox: "0 0 10 10",
        refX: 8,
        refY: 5,
        markerWidth: 5,
        markerHeight: 5,
        orient: "auto-start-reverse",
      });
    marker.append(el("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#77998a" }));
    defs.append(marker);
    svg.append(defs);
    for (const e of r.constraints) {
      const [x1, y1] = points[e.left],
        [x2, y2] = points[e.right],
        dx = x2 - x1,
        dy = y2 - y1,
        len = Math.hypot(dx, dy),
        a = [x1 + (dx / len) * 42, y1 + (dy / len) * 42],
        b = [x2 - (dx / len) * 45, y2 - (dy / len) * 45],
        mx = (x1 + x2) / 2,
        my = (y1 + y2) / 2;
      svg.append(
        el("line", {
          x1: a[0],
          y1: a[1],
          x2: b[0],
          y2: b[1],
          class: "edge",
          "marker-end": "url(#arrow)",
        }),
      );
      svg.append(
        el("rect", {
          x: mx - 42,
          y: my - 12,
          width: 84,
          height: 24,
          class: "label-bg",
        }),
      );
      svg.append(
        el(
          "text",
          { x: mx, y: my + 4, "text-anchor": "middle" },
          e.odds.length > 12 ? "see table" : e.odds,
        ),
      );
    }
    points.forEach(([x, y], i) => {
      svg.append(el("circle", { cx: x, cy: y, r: 40, class: "node" }));
      svg.append(
        el(
          "text",
          { x, y: y - 6, "text-anchor": "middle" },
          r.input.items[i] + " / c" + r.component_of[i],
        ),
      );
      const m = r.canonical_merits[i];
      svg.append(
        el(
          "text",
          { x, y: y + 15, "text-anchor": "middle" },
          "u=" + (m.length > 9 ? "see table" : m),
        ),
      );
    });
    $("graph").replaceChildren(svg);
  }
  function chooseVertex() {
    if (!report?.policy_family) return;
    const v = report.policy_family.vertices[Number($("vertex").value)];
    $("selected").replaceChildren(text("pre", JSON.stringify(v, null, 2)));
  }
  function invalidate(message) {
    input = null;
    report = null;
    globalThis.AlignLabIdentificationState = null;
    $("results").hidden = true;
    $("report-export").disabled = true;
    $("input-export").disabled = true;
    $("dirty").textContent = message;
    $("export-status").textContent = "";
  }
  function render(raw) {
    try {
      const r = E.audit(raw);
      input = r.input;
      report = r;
      $("error").textContent = "";
      $("dirty").textContent = "";
      $("results").hidden = false;
      $("report-export").disabled = false;
      $("input-export").disabled = false;
      $("answer").textContent = r.consistent
        ? r.components.length === 1
          ? "One relative reward scale. One Gibbs policy."
          : "Observed comparisons leave " +
            r.relative_scale_degrees +
            " relative component scale" +
            (r.relative_scale_degrees === 1 ? "" : "s") +
            " free."
        : "These exact odds cannot come from one scalar reward.";
      metrics("summary", [
        ["connected components", String(r.components.length)],
        [
          "relative free scales",
          r.relative_scale_degrees === null
            ? "n/a"
            : String(r.relative_scale_degrees),
        ],
        ["exact edge constraints", String(r.constraints.length)],
        ["population model", r.consistent ? "consistent" : "inconsistent"],
      ]);
      graph(r);
      table(
        "components",
        [
          "Component / anchor",
          "Items",
          "Canonical merits",
          "Within-component policy",
          "Assumed scale interval",
        ],
        r.components.map((c) => [
          "c" + c.id + " / " + r.input.items[c.anchor],
          c.items.map((i) => r.input.items[i]).join(", "),
          c.items.map((i) => r.canonical_merits[i]).join(", "),
          r.policy_family
            ? c.items
                .map((i) => r.policy_family.within_component_policy[i])
                .join(", ")
            : "no consistent model",
          c.scale_bounds.join(" to "),
        ]),
      );
      table(
        "edges",
        [
          "Edge",
          "Population p(left wins)",
          "Given odds",
          "Implied odds",
          "Consistent",
        ],
        r.constraints.map((e) => [
          r.input.items[e.left] + " → " + r.input.items[e.right],
          e.probability,
          e.odds,
          e.implied_odds,
          String(e.consistent),
        ]),
      );
      $("cycles").replaceChildren();
      if (r.cycle_witnesses.length) {
        $("cycles").append(
          text("h3", "Contradictory closed cycles"),
          text(
            "p",
            "Each listed product differs from 1. The product follows directed edge odds around the closed walk.",
            "bad",
          ),
          text("pre", JSON.stringify(r.cycle_witnesses, null, 2)),
        );
      }
      $("family").hidden = !r.consistent;
      if (r.consistent) {
        const f = r.policy_family;
        metrics("utility", [
          ["minimum supplied utility", f.utility_range.minimum],
          ["maximum supplied utility", f.utility_range.maximum],
          ["corner witnesses", String(f.vertices.length)],
          [
            "identified without bounds",
            String(f.policy_identified_without_bounds),
          ],
        ]);
        table(
          "ranges",
          ["Quantity", "Minimum", "Maximum", "Min / max corner IDs"],
          [
            ...f.action_mass_ranges.map((v, i) => [
              "pi[" + r.input.items[i] + "]",
              v.minimum,
              v.maximum,
              witnesses(v),
            ]),
            ...f.component_mass_ranges.map((v, i) => [
              "mass[c" + i + "]",
              v.minimum,
              v.maximum,
              witnesses(v),
            ]),
            [
              "supplied expected utility",
              f.utility_range.minimum,
              f.utility_range.maximum,
              witnesses(f.utility_range),
            ],
          ],
        );
        table(
          "pairs",
          [
            "Pair",
            "Identified without bounds",
            "Minimum",
            "Maximum",
            "Min / max corner IDs",
          ],
          f.pair_probability_ranges.map((v) => [
            r.input.items[v.left] + " > " + r.input.items[v.right],
            String(v.identified_without_bounds),
            v.minimum,
            v.maximum,
            witnesses(v),
          ]),
        );
        const vertex = $("vertex");
        vertex.replaceChildren(
          ...f.vertices.map((v) => {
            const o = text(
              "option",
              "Corner " + v.id + " / scales " + v.scales.join(", "),
            );
            o.value = v.id;
            return o;
          }),
        );
        chooseVertex();
        table(
          "corners",
          [
            "Corner",
            "Scales",
            "Complete policy",
            "Component masses",
            "Expected utility",
          ],
          f.vertices.map((v) => [
            v.id,
            v.scales.join(", "),
            v.policy.join(", "),
            v.component_mass.join(", "),
            v.expected_utility,
          ]),
        );
        $("corners-caption").textContent =
          "All " + f.vertices.length + " corner policies and utility values";
      }
      globalThis.AlignLabIdentificationState = { input, report };
    } catch (e) {
      invalidate("No valid report. Fix the input and apply it again.");
      $("error").textContent = e.message;
      globalThis.AlignLabIdentificationState = null;
    }
  }
  function load() {
    const f = fixtures[Number($("scenario").value)];
    $("description").textContent = f.title;
    $("custom").value = JSON.stringify(f.input, null, 2);
    $("export-status").textContent = "";
    render(f.input);
  }
  $("scenario").replaceChildren(
    ...fixtures.map((f, i) => {
      const o = text("option", f.title);
      o.value = i;
      return o;
    }),
  );
  $("scenario").addEventListener("change", load);
  $("vertex").addEventListener("change", chooseVertex);
  $("custom").addEventListener("input", () => {
    invalidate(
      "Input changed. Previous results and downloads are disabled until you apply it.",
    );
    globalThis.AlignLabIdentificationState = null;
  });
  $("apply").addEventListener("click", () => {
    try {
      $("description").textContent =
        "Custom exact input, not a frozen control.";
      $("scenario").selectedIndex = -1;
      render(E.parse($("custom").value));
    } catch (e) {
      invalidate("No valid report. Fix the input and apply it again.");
      $("error").textContent = e.message;
    }
  });
  function download(kind) {
    if (!report) return;
    const content = kind === "input" ? input : report,
      blob = new Blob([JSON.stringify(content, null, 2) + "\n"], {
        type: "application/json",
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "alignlab-identification-" + kind + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("export-status").textContent = "Downloaded exact " + kind + ".";
  }
  $("input-export").addEventListener("click", () => download("input"));
  $("report-export").addEventListener("click", () => download("report"));
  load();
})();
