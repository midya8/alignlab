"""Exact preference-support identification and bounded Gibbs-policy ambiguity.

Input probabilities are population edge probabilities, not observed win rates.
The isolated exact control fixes beta=1 and reward_i=log(merit_i).
"""

from fractions import Fraction as F
from itertools import product
from .identification_input import validate, jsonify


def audit(data):
    x = validate(data)
    n = len(x["items"])
    adj = [[] for _ in range(n)]
    for e in x["comparisons"]:
        a, b, p = e["left"], e["right"], e["probability"]
        odds = p / (1 - p)
        adj[a].append((b, odds))
        adj[b].append((a, 1 / odds))
    for row in adj:
        row.sort()
    components = []
    owner = {}
    merit = {}
    paths = {}
    for anchor in range(n):
        if anchor in owner:
            continue
        cid = len(components)
        nodes = []
        queue = [anchor]
        owner[anchor] = cid
        merit[anchor] = F(1)
        paths[anchor] = [anchor]
        while queue:
            u = queue.pop(0)
            nodes.append(u)
            for v, odds in adj[u]:
                if v not in owner:
                    owner[v] = cid
                    merit[v] = merit[u] / odds
                    paths[v] = paths[u] + [v]
                    queue.append(v)
        components.append({"id": cid, "anchor": anchor, "items": sorted(nodes)})
    if len(x["scale_bounds"]) != len(components):
        raise ValueError(
            "one scale-bound row per connected component required, in anchor order"
        )
    for comp, bound in zip(components, x["scale_bounds"]):
        comp["scale_bounds"] = bound
    constraints = []
    cycles = []
    for e in x["comparisons"]:
        a, b, p = e["left"], e["right"], e["probability"]
        odds = p / (1 - p)
        implied = merit[a] / merit[b]
        ok = odds == implied
        constraints.append(dict(e, odds=odds, implied_odds=implied, consistent=ok))
        if not ok:
            pa, pb = paths[a][:], paths[b][:]
            while len(pa) > 1 and len(pb) > 1 and pa[1] == pb[1]:
                pa.pop(0)
                pb.pop(0)
            cycle = list(reversed(pa)) + pb[1:] + [a]
            steps = []
            mass = F(1)
            for u, v in zip(cycle, cycle[1:]):
                o = next(o for w, o in adj[u] if w == v)
                steps.append({"from": u, "to": v, "odds": o})
                mass *= o
            cycles.append({"vertices": cycle, "steps": steps, "product": mass})
    consistent = all(e["consistent"] for e in constraints)
    result = {
        "schema": "alignlab-identification-v1",
        "input": x,
        "beta": 1,
        "components": components,
        "component_of": [owner[i] for i in range(n)],
        "canonical_merits": [merit[i] for i in range(n)],
        "anchor_paths": [paths[i] for i in range(n)],
        "constraints": constraints,
        "consistent": consistent,
        "cycle_witnesses": cycles,
        "free_component_scales": len(components) if consistent else None,
        "relative_scale_degrees": len(components) - 1 if consistent else None,
    }
    if not consistent:
        result["policy_family"] = None
        return result
    # Components are ordered by their smallest-index anchor.
    c = len(components)
    z = [
        sum(x["reference"][i] * merit[i] for i in comp["items"]) for comp in components
    ]
    conditional = [x["reference"][i] * merit[i] / z[owner[i]] for i in range(n)]
    vertices = []
    for choices in product(
        *[
            ([0] if comp["scale_bounds"][0] == comp["scale_bounds"][1] else [0, 1])
            for comp in components
        ]
    ):
        scales = [components[j]["scale_bounds"][side] for j, side in enumerate(choices)]
        weights = [x["reference"][i] * merit[i] * scales[owner[i]] for i in range(n)]
        total = sum(weights)
        policy = [w / total for w in weights]
        vertices.append(
            {
                "id": len(vertices),
                "sides": list(choices),
                "scales": scales,
                "merits": [merit[i] * scales[owner[i]] for i in range(n)],
                "policy": policy,
                "component_mass": [z[j] * scales[j] / total for j in range(c)],
                "expected_utility": sum(p * u for p, u in zip(policy, x["utility"])),
                "edge_probabilities": [
                    merit[e["left"]] / (merit[e["left"]] + merit[e["right"]])
                    for e in x["comparisons"]
                ],
            }
        )

    def extent(values):
        lo = min(values)
        hi = max(values)
        return {
            "minimum": lo,
            "maximum": hi,
            "minimum_vertices": [i for i, v in enumerate(values) if v == lo],
            "maximum_vertices": [i for i, v in enumerate(values) if v == hi],
        }

    pairs = []
    for a in range(n):
        for b in range(a + 1, n):
            if owner[a] == owner[b]:
                low = high = merit[a] / (merit[a] + merit[b])
            else:
                la, ua = components[owner[a]]["scale_bounds"]
                lb, ub = components[owner[b]]["scale_bounds"]
                low = la * merit[a] / (la * merit[a] + ub * merit[b])
                high = ua * merit[a] / (ua * merit[a] + lb * merit[b])
            vals = [
                v["merits"][a] / (v["merits"][a] + v["merits"][b]) for v in vertices
            ]
            record = extent(vals)
            assert record["minimum"] == low and record["maximum"] == high
            pairs.append(
                {
                    "left": a,
                    "right": b,
                    "identified_without_bounds": owner[a] == owner[b],
                    **record,
                }
            )
    result["policy_family"] = {
        "component_base_weights": z,
        "within_component_policy": conditional,
        "policy_identified_without_bounds": c == 1,
        "unbounded_component_mass_simplex_interior": True,
        "vertices": vertices,
        "action_mass_ranges": [
            extent([v["policy"][i] for v in vertices]) for i in range(n)
        ],
        "component_mass_ranges": [
            extent([v["component_mass"][j] for v in vertices]) for j in range(c)
        ],
        "utility_range": extent([v["expected_utility"] for v in vertices]),
        "pair_probability_ranges": pairs,
    }
    return result
