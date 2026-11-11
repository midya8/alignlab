"""Strict exact input grammar shared by independent identification evaluators."""

from fractions import Fraction as F
import re


def rational(x):
    if isinstance(x, bool) or not isinstance(x, (str, int, F)):
        raise ValueError("exact integer/string/Fraction required")
    if isinstance(x, str) and (
        len(x) > 160 or not re.fullmatch(r"-?\d+(?:/\d+|\.\d+)?", x)
    ):
        raise ValueError("invalid rational")
    try:
        q = F(x)
    except (ValueError, ZeroDivisionError):
        raise ValueError("invalid rational") from None
    if max(abs(q.numerator).bit_length(), q.denominator.bit_length()) > 512:
        raise ValueError("512-bit input limit")
    return q


def jsonify(x):
    if isinstance(x, F):
        return str(x)
    if isinstance(x, dict):
        return {k: jsonify(v) for k, v in x.items()}
    if isinstance(x, (list, tuple)):
        return [jsonify(v) for v in x]
    return x


def validate(data):
    if not isinstance(data, dict) or set(data) != {
        "items",
        "reference",
        "comparisons",
        "scale_bounds",
        "utility",
    }:
        raise ValueError("wrong input fields")
    items = data["items"]
    n = len(items) if isinstance(items, list) else 0
    if (
        not 1 <= n <= 6
        or any(
            not isinstance(x, str) or not re.fullmatch(r"[A-Za-z0-9]{1,16}", x)
            for x in items
        )
        or len(set(items)) != n
    ):
        raise ValueError("1..6 unique ASCII alphanumeric items required")
    ref = data["reference"]
    utility = data["utility"]
    bounds = data["scale_bounds"]
    edges = data["comparisons"]
    if (
        not isinstance(ref, list)
        or len(ref) != n
        or not isinstance(utility, list)
        or len(utility) != n
        or not isinstance(bounds, list)
        or not 1 <= len(bounds) <= n
    ):
        raise ValueError("matching reference, utility and scale-bound rows required")
    ref = list(map(rational, ref))
    utility = list(map(rational, utility))
    if any(x <= 0 for x in ref) or sum(ref) != 1:
        raise ValueError("strictly positive reference must sum exactly to one")
    parsed = []
    for b in bounds:
        if not isinstance(b, list) or len(b) != 2:
            raise ValueError("scale bounds must be pairs")
        l, u = map(rational, b)
        if not 0 < l <= u:
            raise ValueError("positive ordered scale bounds required")
        parsed.append([l, u])
    if not isinstance(edges, list) or len(edges) > n * (n - 1) // 2:
        raise ValueError("too many comparisons")
    normalized = []
    seen = set()
    for e in edges:
        if not isinstance(e, dict) or set(e) != {"left", "right", "probability"}:
            raise ValueError("wrong comparison fields")
        a, b = e["left"], e["right"]
        if (
            type(a) is not int
            or type(b) is not int
            or not 0 <= a < n
            or not 0 <= b < n
            or a == b
        ):
            raise ValueError("distinct valid integer endpoints required")
        p = rational(e["probability"])
        if not 0 < p < 1:
            raise ValueError(
                "population comparison probabilities must be strictly between zero and one"
            )
        if a > b:
            a, b, p = b, a, 1 - p
        if (a, b) in seen:
            raise ValueError("duplicate unordered comparison")
        seen.add((a, b))
        normalized.append({"left": a, "right": b, "probability": p})
    return {
        "items": items[:],
        "reference": ref,
        "comparisons": sorted(normalized, key=lambda e: (e["left"], e["right"])),
        "scale_bounds": parsed,
        "utility": utility,
    }
