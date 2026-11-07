"""Measured alignment evaluation: reward accuracy, policy gain, KL cost.

The fixture trains a reward model on synthetic Bradley-Terry preference pairs,
aligns a categorical policy over response styles against the learned reward
with an exact KL penalty, and measures: holdout preference accuracy of the
reward model, expected reward before/after alignment, the KL actually paid,
true latent utility before/after (the quantity alignment is really after),
and a negative control where a reward model trained on shuffled labels must
not yield a true-utility gain.
"""

from __future__ import annotations

import random
from typing import Dict, List

from .data import FEATURES, STYLES, make_preferences, make_responses, utility, phi
from .policy import entropy, expected_reward, grad_step, kl, softmax
from .reward import RewardModel

DIM = len(FEATURES)


def style_rewards(model: RewardModel) -> List[float]:
    return [model.score(STYLES[s]) for s in STYLES]


def true_utilities() -> List[float]:
    return [utility(STYLES[s]) for s in STYLES]


def align_policy(rewards: List[float], beta: float, steps: int, lr: float,
                 ref: List[float]) -> List[float]:
    logits = [0.0] * len(rewards)
    for _ in range(steps):
        logits = grad_step(logits, rewards, ref, beta, lr)
    return softmax(logits)


def run_evaluation(train_pairs: int = 800, holdout_pairs: int = 150,
                   per_style: int = 20, beta: float = 0.5, steps: int = 200,
                   lr: float = 2.0, reward_epochs: int = 40,
                   reward_lr: float = 0.5, seed: int = 3) -> Dict:
    responses = make_responses(per_style, seed)
    train = make_preferences(responses, train_pairs, seed + 100)
    holdout = make_preferences(responses, holdout_pairs, seed + 200)

    model = RewardModel(DIM, random.Random(seed))
    for _ in range(reward_epochs):
        model.train_epoch(train, reward_lr)

    rewards = style_rewards(model)
    ref = softmax([0.0] * len(STYLES))  # uniform reference
    true = true_utilities()

    pi_before = ref
    pi_after = align_policy(rewards, beta, steps, lr, ref)

    # beta ablation: no KL penalty collapses onto the reward argmax style.
    pi_nokl = align_policy(rewards, 0.0, steps, lr, ref)

    # Negative control: reward model trained on labels independent of utility
    # (winner assigned by coin flip), so its holdout accuracy must sit near
    # chance and aligning to it must not buy true utility.
    rng = random.Random(seed + 7)
    noise = []
    for _ in range(len(train)):
        (_, a), (_, b) = rng.sample(responses, 2)
        noise.append((a, b) if rng.random() < 0.5 else (b, a))
    ctrl = RewardModel(DIM, random.Random(seed))
    for _ in range(reward_epochs):
        ctrl.train_epoch(noise, reward_lr)
    pi_ctrl = align_policy(style_rewards(ctrl), beta, steps, lr, ref)

    return {
        "reward_holdout_accuracy": model.accuracy(holdout),
        "control_holdout_accuracy": ctrl.accuracy(holdout),
        "expected_reward_before": expected_reward(pi_before, rewards),
        "expected_reward_after": expected_reward(pi_after, rewards),
        "true_utility_before": expected_reward(pi_before, true),
        "true_utility_after": expected_reward(pi_after, true),
        "true_utility_control": expected_reward(pi_ctrl, true),
        "kl_after": kl(pi_after, ref),
        "kl_nokl": kl(pi_nokl, ref),
        "entropy_after": entropy(pi_after),
        "entropy_nokl": entropy(pi_nokl),
        "beta": beta,
        "top_style_after": list(STYLES)[pi_after.index(max(pi_after))],
        "params": {"train_pairs": train_pairs, "holdout_pairs": holdout_pairs,
                   "beta": beta, "steps": steps, "lr": lr},
    }


def format_terminal(r: Dict) -> str:
    return "\n".join([
        "AlignLab evaluation - preference-based alignment with exact KL accounting",
        "",
        f"Reward model holdout accuracy: {r['reward_holdout_accuracy']:.4f} "
        f"(label-shuffled control: {r['control_holdout_accuracy']:.4f})",
        f"Expected learned reward: {r['expected_reward_before']:.4f} -> {r['expected_reward_after']:.4f}",
        f"True latent utility:     {r['true_utility_before']:.4f} -> {r['true_utility_after']:.4f} "
        f"(control-aligned policy: {r['true_utility_control']:.4f})",
        f"KL(pi || ref) paid: {r['kl_after']:.4f}   entropy: {r['entropy_after']:.4f}",
        f"Without the KL term (beta=0): KL {r['kl_nokl']:.4f}, entropy {r['entropy_nokl']:.4f}",
        f"Top style after alignment: {r['top_style_after']}",
    ])
