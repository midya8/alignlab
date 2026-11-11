"""Hand-specified population-odds controls, not noisy empirical estimates."""

from .identification import audit
from .identification_input import jsonify


def fixtures():
    out = []

    def add(id, title, n, edges, bounds, utility=None, ref=None):
        data = {
            "items": list("ABCDEF")[:n],
            "reference": ref or ["1/" + str(n)] * n,
            "comparisons": [
                {"left": a, "right": b, "probability": p} for a, b, p in edges
            ],
            "scale_bounds": bounds,
            "utility": utility or [1] + [0] * (n - 1),
        }
        out.append({"id": id, "title": title, "input": data})

    add(
        "disconnected",
        "Same observed preferences, different policies",
        4,
        [(0, 1, "2/3"), (2, 3, "2/3")],
        [["1", "4"]] * 2,
    )
    add(
        "bridge",
        "One population-probability bridge identifies relative scale",
        4,
        [(0, 1, "2/3"), (2, 3, "2/3"), (1, 2, "1/2")],
        [["1", "4"]],
    )
    add(
        "cycle_conflict",
        "A cyclic odds contradiction has no scalar reward",
        3,
        [(0, 1, "2/3"), (1, 2, "2/3"), (0, 2, "3/4")],
        [["1", "4"]],
    )
    add(
        "cycle_consistent",
        "A redundant consistent edge changes no policy",
        3,
        [(0, 1, "2/3"), (1, 2, "2/3"), (0, 2, "4/5")],
        [["1", "4"]],
    )
    add(
        "isolated",
        "An unseen response keeps its own free scale",
        3,
        [(0, 1, "2/3")],
        [["1", "9"], ["1", "9"]],
    )
    add(
        "no_edges",
        "No comparisons: every component mass is free",
        4,
        [],
        [["1", "4"]] * 4,
    )
    add(
        "same_utility",
        "Policy ambiguity need not change supplied utility",
        4,
        [(0, 1, "2/3"), (2, 3, "2/3")],
        [["1", "4"]] * 2,
        [7] * 4,
    )
    add(
        "frozen_bounds",
        "Assumed fixed component scales are not identification",
        4,
        [(0, 1, "2/3"), (2, 3, "2/3")],
        [["2", "2"], ["3", "3"]],
    )
    add(
        "skew_reference",
        "Reference weighting changes policy, not observed odds",
        4,
        [(0, 1, "2/3"), (2, 3, "2/3")],
        [["1", "4"]] * 2,
        ref=["1/2", "1/4", "1/8", "1/8"],
    )
    add(
        "six_components",
        "All 64 box corners, including duplicate policies",
        6,
        [],
        [["1", "4"]] * 6,
        [0, 1, 2, 3, 4, 5],
    )
    add(
        "tiny_mass",
        "Tiny reference mass stays exact",
        2,
        [],
        [["1", "4"]] * 2,
        ref=[
            "1/340282366920938463463374607431768211456",
            "340282366920938463463374607431768211455/340282366920938463463374607431768211456",
        ],
    )
    add(
        "single_item",
        "One item has a unique policy without any comparison",
        1,
        [],
        [["1", "4"]],
    )
    return out


def demo():
    return [dict(f, report=jsonify(audit(f["input"]))) for f in fixtures()]
