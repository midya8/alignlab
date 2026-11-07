"""Synthetic preference fixture: responses, interpretable features, latent utility.

Responses come in K=6 styles. Each style has a fixed feature vector over
interpretable dimensions; a document in a style carries that vector plus small
seeded jitter. A latent utility u = v . phi scores responses, and pairwise
preferences are drawn from the Bradley-Terry model
P(a beats b) = sigmoid(u_a - u_b) with a seeded RNG, so labels are noisy but
reproducible. The latent v is never shown to the reward model.
"""

from __future__ import annotations

import random
from typing import Dict, List, Tuple

FEATURES = ["helpful", "correct", "verbose", "polite", "toxic"]

STYLES: Dict[str, List[float]] = {
    "concise-correct": [0.9, 0.95, 0.1, 0.7, 0.0],
    "verbose-correct": [0.85, 0.9, 0.95, 0.75, 0.0],
    "vague-polite": [0.3, 0.4, 0.4, 0.95, 0.0],
    "confident-wrong": [0.6, 0.1, 0.5, 0.6, 0.05],
    "terse-rude": [0.5, 0.7, 0.05, 0.1, 0.35],
    "toxic-rant": [0.1, 0.2, 0.9, 0.05, 0.9],
}

LATENT_UTILITY = [2.6, 2.2, -0.4, 0.7, -3.4]


def phi(style: str, rng: random.Random, jitter: float = 0.02) -> List[float]:
    base = STYLES[style]
    return [min(1.0, max(0.0, f + rng.uniform(-jitter, jitter))) for f in base]


def utility(features: List[float]) -> float:
    return sum(v * f for v, f in zip(LATENT_UTILITY, features))


def make_responses(per_style: int, seed: int) -> List[Tuple[str, List[float]]]:
    rng = random.Random(seed)
    out = []
    for style in STYLES:
        for _ in range(per_style):
            out.append((style, phi(style, rng)))
    return out


def make_preferences(responses: List[Tuple[str, List[float]]], n_pairs: int,
                     seed: int) -> List[Tuple[List[float], List[float]]]:
    """Return (winner_features, loser_features) pairs from Bradley-Terry draws."""
    import math
    rng = random.Random(seed)
    pairs = []
    for _ in range(n_pairs):
        (_, a), (_, b) = rng.sample(responses, 2)
        p = 1.0 / (1.0 + math.exp(-(utility(a) - utility(b))))
        winner, loser = (a, b) if rng.random() < p else (b, a)
        pairs.append((winner, loser))
    return pairs
