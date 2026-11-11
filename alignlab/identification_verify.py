"""Independent all-simple-path and box-corner reference. Never imports producer.

Input grammar/rational primitives are shared; graph discovery, witness assembly
and policy enumeration are rebuilt here.
"""

from fractions import Fraction as R
from itertools import product
from .identification_input import validate, jsonify


def reference(data):
    d = validate(data)
    n = len(d["items"])
    edge = {}
    for e in d["comparisons"]:
        a, b, p = e["left"], e["right"], e["probability"]
        edge[a, b] = p / (1 - p)
        edge[b, a] = 1 / edge[a, b]
    paths = {}
    for source in range(n):
        for target in range(n):
            found = []

            def visit(path, ratio):
                u = path[-1]
                if u == target:
                    found.append((path, ratio))
                    return
                for v in range(n):
                    if v not in path and (u, v) in edge:
                        visit(path + [v], ratio / edge[u, v])

            visit([source], R(1))
            paths[source, target] = sorted(found, key=lambda x: (len(x[0]), x[0]))
    cs = []
    assignment = [None] * n
    merits = [None] * n
    anchorpaths = [None] * n
    for anchor in range(n):
        if assignment[anchor] is not None:
            continue
        nodes = [v for v in range(n) if paths[anchor, v]]
        cid = len(cs)
        cs.append({"id": cid, "anchor": anchor, "items": nodes})
        for v in nodes:
            assignment[v] = cid
            anchorpaths[v], merits[v] = paths[anchor, v][0]
    if len(d["scale_bounds"]) != len(cs):
        raise ValueError("one bound per component")
    for c, b in zip(cs, d["scale_bounds"]):
        c["scale_bounds"] = b
    constraints = []
    cycles = []
    for e in d["comparisons"]:
        a, b, p = e["left"], e["right"], e["probability"]
        given = p / (1 - p)
        predicted = merits[a] / merits[b]
        constraints.append(
            dict(e, odds=given, implied_odds=predicted, consistent=given == predicted)
        )
        if given != predicted:
            pa, pb = anchorpaths[a][:], anchorpaths[b][:]
            index = 0
            while index + 1 < min(len(pa), len(pb)) and pa[index + 1] == pb[index + 1]:
                index += 1
            cycle = pa[index:][::-1] + pb[index + 1 :] + [a]
            steps = [
                {"from": u, "to": v, "odds": edge[u, v]}
                for u, v in zip(cycle, cycle[1:])
            ]
            ratio = R(1)
            for s in steps:
                ratio *= s["odds"]
            cycles.append({"vertices": cycle, "steps": steps, "product": ratio})
    # All paths must imply the same potential iff every cycle product is one.
    allpaths_agree = all(
        all(value == values[0][1] for _, value in values)
        for values in paths.values()
        if values
    )
    assert allpaths_agree == all(c["consistent"] for c in constraints)
    c = len(cs)
    report = {
        "schema": "alignlab-identification-v1",
        "input": d,
        "beta": 1,
        "components": cs,
        "component_of": assignment,
        "canonical_merits": merits,
        "anchor_paths": anchorpaths,
        "constraints": constraints,
        "consistent": allpaths_agree,
        "cycle_witnesses": cycles,
        "free_component_scales": c if allpaths_agree else None,
        "relative_scale_degrees": c - 1 if allpaths_agree else None,
    }
    if not allpaths_agree:
        report["policy_family"] = None
        return report
    base = [sum(d["reference"][i] * merits[i] for i in comp["items"]) for comp in cs]
    conditional = [
        d["reference"][i] * merits[i] / base[assignment[i]] for i in range(n)
    ]
    vertices = []
    sizes = [1 if b[0] == b[1] else 2 for b in d["scale_bounds"]]
    for sides in product(*[range(s) for s in sizes]):
        scales = [d["scale_bounds"][j][side] for j, side in enumerate(sides)]
        u = [merits[i] * scales[assignment[i]] for i in range(n)]
        weighted = [q * v for q, v in zip(d["reference"], u)]
        denominator = sum(weighted)
        p = [x / denominator for x in weighted]
        masses = [sum(p[i] for i in comp["items"]) for comp in cs]
        vertices.append(
            {
                "id": len(vertices),
                "sides": list(sides),
                "scales": scales,
                "merits": u,
                "policy": p,
                "component_mass": masses,
                "expected_utility": sum(x * v for x, v in zip(p, d["utility"])),
                "edge_probabilities": [
                    u[e["left"]] / (u[e["left"]] + u[e["right"]])
                    for e in d["comparisons"]
                ],
            }
        )

    def extrema(values):
        low, high = min(values), max(values)
        return {
            "minimum": low,
            "maximum": high,
            "minimum_vertices": [i for i, v in enumerate(values) if v == low],
            "maximum_vertices": [i for i, v in enumerate(values) if v == high],
        }

    pairs = []
    for a in range(n):
        for b in range(a + 1, n):
            pairs.append(
                {
                    "left": a,
                    "right": b,
                    "identified_without_bounds": assignment[a] == assignment[b],
                    **extrema(
                        [
                            v["merits"][a] / (v["merits"][a] + v["merits"][b])
                            for v in vertices
                        ]
                    ),
                }
            )
    report["policy_family"] = {
        "component_base_weights": base,
        "within_component_policy": conditional,
        "policy_identified_without_bounds": c == 1,
        "unbounded_component_mass_simplex_interior": True,
        "vertices": vertices,
        "action_mass_ranges": [
            extrema([v["policy"][i] for v in vertices]) for i in range(n)
        ],
        "component_mass_ranges": [
            extrema([v["component_mass"][i] for v in vertices]) for i in range(c)
        ],
        "utility_range": extrema([v["expected_utility"] for v in vertices]),
        "pair_probability_ranges": pairs,
    }
    return report


def verify(data, report):
    expected = jsonify(reference(data))
    actual = jsonify(report)

    def compare(a, b, path=""):
        if type(a) is not type(b):
            raise ValueError("type mismatch " + path)
        if isinstance(a, dict):
            if a.keys() != b.keys():
                raise ValueError("field mismatch " + path)
            for key in a:
                compare(a[key], b[key], path + "/" + key)
        elif isinstance(a, list):
            if len(a) != len(b):
                raise ValueError("length mismatch " + path)
            for i, (x, y) in enumerate(zip(a, b)):
                compare(x, y, path + "/" + str(i))
        elif a != b:
            raise ValueError("value mismatch " + path)

    compare(expected, actual)
    return {
        "verified": True,
        "consistent": expected["consistent"],
        "components": len(expected["components"]),
        "policy_vertices": (
            len(expected["policy_family"]["vertices"])
            if expected["policy_family"]
            else 0
        ),
    }
