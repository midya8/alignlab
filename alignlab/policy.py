"""Categorical policy alignment with exact expectations and hand-derived gradients.

The policy is a softmax over K response styles with logits theta. Alignment
maximizes J(theta) = E_pi[r] - beta * KL(pi || ref), where every term is
computed in closed form over the K styles (no sampling):

  E_pi[r]          = sum_k pi_k r_k
  KL(pi || ref)    = sum_k pi_k (log pi_k - log ref_k)
  dE/dtheta_k      = pi_k (r_k - E_pi[r])                      (score function)
  dKL/dtheta_k     = pi_k ((log pi_k - log ref_k) - KL)          (derived by hand)
  dJ/dtheta_k      = dE/dtheta_k - beta * dKL/dtheta_k

With beta=0 the policy collapses onto the argmax-reward style; the KL term is
what keeps probability mass spread near the reference. Both effects are
measured in the evaluation, not asserted.
"""

from __future__ import annotations

import math
from typing import List


def softmax(logits: List[float]) -> List[float]:
    m = max(logits)
    exps = [math.exp(t - m) for t in logits]
    z = sum(exps)
    return [e / z for e in exps]


def kl(pi: List[float], ref: List[float]) -> float:
    return sum(p * (math.log(p) - math.log(r)) for p, r in zip(pi, ref) if p > 0.0)


def expected_reward(pi: List[float], rewards: List[float]) -> float:
    return sum(p * r for p, r in zip(pi, rewards))


def entropy(pi: List[float]) -> float:
    return -sum(p * math.log(p) for p in pi if p > 0.0)


def grad_step(logits: List[float], rewards: List[float], ref: List[float],
              beta: float, lr: float) -> List[float]:
    pi = softmax(logits)
    er = expected_reward(pi, rewards)
    k = kl(pi, ref)
    out = []
    for tk, pk, rk, fk in zip(logits, pi, rewards, ref):
        if pk == 0.0:
            out.append(tk)
            continue
        dE = pk * (rk - er)
        dKL = pk * ((math.log(pk) - math.log(fk)) - k)
        out.append(tk + lr * (dE - beta * dKL))
    return out
