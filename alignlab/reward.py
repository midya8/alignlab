"""Linear Bradley-Terry reward model with a hand-derived gradient.

r(x) = w . phi(x). On a preference pair (winner, loser) the loss is
-log sigmoid(r_w - r_l), whose gradient is
dL/dw = -(phi_w - phi_l) * sigmoid(-(r_w - r_l)).
"""

from __future__ import annotations

import math
import random
from typing import List, Tuple


class RewardModel:
    def __init__(self, dim: int, rng: random.Random):
        self.w = [rng.uniform(-0.01, 0.01) for _ in range(dim)]

    def score(self, features: List[float]) -> float:
        return sum(wi * fi for wi, fi in zip(self.w, features))

    def train_epoch(self, pairs: List[Tuple[List[float], List[float]]], lr: float) -> float:
        total = 0.0
        for winner, loser in pairs:
            diff = self.score(winner) - self.score(loser)
            sig = 1.0 / (1.0 + math.exp(diff))  # sigmoid(-(r_w - r_l))
            for i in range(len(self.w)):
                self.w[i] -= lr * (-(winner[i] - loser[i]) * sig)
            total += math.log(1.0 + math.exp(-diff))
        return total / max(1, len(pairs))

    def accuracy(self, pairs: List[Tuple[List[float], List[float]]]) -> float:
        correct = sum(1 for w, l in pairs if self.score(w) > self.score(l))
        return correct / max(1, len(pairs))
