"""Finite categorical Gibbs optimum and a bracketed KL-budget frontier.

All numbers are binary64 approximations. Original policy/training is untouched.
Reference zero entries are excluded from finite-KL feasible policies. At beta=0
we choose the reference-conditioned maximizer, the minimum-KL reward maximizer.
"""
from __future__ import annotations

import math


def _number(value, name, lower, upper):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(name + " must be a finite number")
    value = float(value)
    if not math.isfinite(value) or not lower <= value <= upper:
        raise ValueError(name + " outside supported range")
    return value


def inputs(rewards, reference):
    if not isinstance(rewards, list) or not isinstance(reference, list):
        raise ValueError("rewards and reference must be arrays")
    if not 2 <= len(rewards) <= 64 or len(rewards) != len(reference):
        raise ValueError("matching arrays of 2 to 64 entries required")
    rewards = [_number(x, "reward", -1e6, 1e6) for x in rewards]
    ref = [_number(x, "reference probability", 0, 1) for x in reference]
    total = math.fsum(ref)
    if abs(total - 1) > 1e-12:
        raise ValueError("reference must sum to one within 1e-12")
    return rewards, [x / total for x in ref], total


def _relative_entropy(p, q):
    """Use sum q*f(p/q), cancelling the zero sum(p-q) analytically.

    The near-one series avoids first-order subtraction in tiny KL budgets.
    This remains floating arithmetic, not an outward-rounded certificate.
    """
    terms = []
    for x, y in zip(p, q):
        if y == 0:
            if x > 0:
                raise ValueError("policy puts mass outside reference support")
            continue
        if x == 0:
            terms.append(y)
            continue
        t = (x - y) / y
        if abs(t) < .01:
            f = math.fsum(((-1)**n) * t**n / (n * (n-1)) for n in range(2, 12))
            terms.append(y * f)
        else:
            terms.append(x * (math.log(x) - math.log(y)) - x + y)
    return math.fsum(terms)


def _state(rewards, ref, tilt):
    """Tilt is inverse temperature times reward range, not inverse beta."""
    support = [i for i, q in enumerate(ref) if q > 0]
    high = max(rewards[i] for i in support)
    low = min(rewards[i] for i in support)
    span = high - low
    scores = [None] * len(ref)
    for i in support:
        scores[i] = math.log(ref[i]) + (0 if span == 0 else (rewards[i] - high) / span * tilt)
    peak = max(scores[i] for i in support)
    weights = [0 if s is None else math.exp(s - peak) for s in scores]
    norm = math.fsum(weights)
    log_norm = peak + math.log(norm)
    p = ref[:] if tilt == 0 else [w / norm for w in weights]
    logs = [None if s is None else (math.log(ref[i]) if tilt == 0 else s - log_norm) for i, s in enumerate(scores)]
    if tilt == 0:
        log_norm = 0.0
    kl = _relative_entropy(p, ref)
    return {"probabilities": p, "log_probabilities": logs,
            "expected_reward": math.fsum(p[i] * rewards[i] for i in support),
            "kl": kl, "entropy": -math.fsum(p[i] * logs[i] for i in support),
            "reward_max": high, "reward_span": span,
            "centered_log_partition": log_norm, "tilt": tilt,
            "underflow_indices": [i for i in support if p[i] == 0]}


def _limit(rewards, ref):
    high = max(r for r, q in zip(rewards, ref) if q > 0)
    winners = [i for i, (r, q) in enumerate(zip(rewards, ref)) if q > 0 and r == high]
    mass = math.fsum(ref[i] for i in winners)
    p = [ref[i] / mass if i in winners else 0.0 for i in range(len(ref))]
    return {"probabilities": p, "expected_reward": high, "kl": -math.log(mass),
            "entropy": -math.fsum(x * math.log(x) for x in p if x > 0),
            "maximizer_indices": winners, "reference_maximizer_mass": mass}


def gibbs_optimum(rewards, reference, beta):
    rewards, ref, total = inputs(rewards, reference)
    beta = _number(beta, "beta", 0, 1e6)
    if 0 < beta < 1e-6:
        raise ValueError("positive beta must be at least 1e-6")
    if beta == 0:
        state = _limit(rewards, ref)
        state.update(status="zero_beta_minimum_kl_maximizer", objective=state["expected_reward"])
    else:
        span = max(r for r, q in zip(rewards, ref) if q > 0) - min(r for r, q in zip(rewards, ref) if q > 0)
        state = _state(rewards, ref, span / beta)
        state.update(status="positive_beta_unique_optimum",
                     objective=state["reward_max"] + beta * state["centered_log_partition"])
    state.update(beta=beta, reference=ref, reference_input_sum=total)
    return state


def audit_policy(rewards, reference, policy, beta):
    optimum = gibbs_optimum(rewards, reference, beta)
    _, p, total = inputs(rewards, policy)
    ref = optimum["reference"]
    if any(x > 0 and q == 0 for x, q in zip(p, ref)):
        raise ValueError("policy puts mass outside reference support")
    er = math.fsum(x * r for x, r in zip(p, rewards))
    kl = _relative_entropy(p, ref)
    objective = er - beta * kl
    gap = optimum["objective"] - objective
    if beta > 0:
        divergence = math.fsum(x * (math.log(x) - logp) for x, logp in zip(p, optimum["log_probabilities"]) if x > 0)
        identity_rhs = beta * divergence
    else:
        divergence = identity_rhs = None
    return {"policy": p, "policy_input_sum": total, "expected_reward": er,
            "kl": kl, "objective": objective, "optimum": optimum,
            "objective_gap": gap, "kl_to_optimum": divergence,
            "identity_rhs": identity_rhs,
            "identity_residual": None if identity_rhs is None else gap - identity_rhs}


def budget_frontier(rewards, reference, budget):
    rewards, ref, total = inputs(rewards, reference)
    budget = _number(budget, "KL budget", 0, 1000)
    limit = _limit(rewards, ref)
    common = {"budget": budget, "reference": ref, "reference_input_sum": total,
              "saturation_kl": limit["kl"]}
    if budget == 0:
        state = _state(rewards, ref, 0)
        return dict(common, status="zero_budget_reference", solution=state,
                    feasible_by_computed_kl=state["kl"] <= budget + 1e-14)
    if budget < 1e-14:
        return dict(common, status="below_numeric_budget_resolution",
                    solution=_state(rewards, ref, 0),
                    feasible_by_computed_kl=True)
    if budget >= limit["kl"]:
        return dict(common, status="saturated_minimum_kl_maximizer", solution=limit,
                    feasible_by_computed_kl=limit["kl"] <= budget)
    lower, upper = 0.0, 1.0
    low_state = _state(rewards, ref, lower)
    high_state = _state(rewards, ref, upper)
    while high_state["kl"] < budget and upper < 2**40:
        lower, low_state = upper, high_state
        upper *= 2
        high_state = _state(rewards, ref, upper)
    if high_state["kl"] < budget:
        return dict(common, status="unresolved_numeric_bracket", solution=low_state,
                    feasible_by_computed_kl=low_state["kl"] <= budget,
                    tilt_bracket=[lower, upper])
    for _ in range(100):
        mid = (lower + upper) / 2
        if mid == lower or mid == upper:
            break
        state = _state(rewards, ref, mid)
        if state["kl"] <= budget:
            lower, low_state = mid, state
        else:
            upper, high_state = mid, state
    beta = low_state["reward_span"] / lower if lower > 0 else None
    dual = (low_state["reward_max"] + beta * (low_state["centered_log_partition"] + budget)) if beta is not None else None
    return dict(common, status="bracketed_active_budget", solution=low_state,
                feasible_by_computed_kl=low_state["kl"] <= budget,
                tilt_bracket=[lower, upper], kl_bracket=[low_state["kl"], high_state["kl"]],
                beta=beta, dual_reward_upper=dual,
                numeric_duality_gap=None if dual is None else dual - low_state["expected_reward"])
