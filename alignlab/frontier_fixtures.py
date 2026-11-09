"""Reproduce original preference training and every original evaluation term.

The exported utility is synthetic ground truth for inspection, never an input
to learned/noise reward fitting or policy updates. This is not new holdout data.
"""
from __future__ import annotations

import json
import math
import random
from pathlib import Path

from .data import FEATURES, STYLES, make_preferences, make_responses
from .eval import run_evaluation, style_rewards, true_utilities
from .policy import entropy, expected_reward, grad_step, kl, softmax
from .reward import RewardModel
from .frontier import audit_policy, budget_frontier


def trajectory(rewards, ref, beta, lr, steps=200):
    logits = [0.0] * len(rewards)
    rows = []
    for step in range(steps + 1):
        pi = softmax(logits)
        er = expected_reward(pi, rewards)
        divergence = kl(pi, ref)
        rows.append({'step': step, 'logits': logits[:], 'policy': pi,
                     'expected_reward': er, 'kl': divergence,
                     'objective': er - beta * divergence,
                     'entropy': entropy(pi)})
        if step < steps:
            logits = grad_step(logits, rewards, ref, beta, lr)
    return {'beta': beta, 'lr': lr, 'steps': steps, 'trajectory': rows}


def reproduce_original():
    seed = 3
    responses = make_responses(20, seed)
    train = make_preferences(responses, 800, seed + 100)
    holdout = make_preferences(responses, 150, seed + 200)
    model = RewardModel(len(FEATURES), random.Random(seed))
    for _ in range(40):
        model.train_epoch(train, .5)
    rng = random.Random(seed + 7)
    noise = []
    for _ in range(len(train)):
        (_, a), (_, b) = rng.sample(responses, 2)
        noise.append((a, b) if rng.random() < .5 else (b, a))
    ctrl = RewardModel(len(FEATURES), random.Random(seed))
    for _ in range(40):
        ctrl.train_epoch(noise, .5)
    ref = softmax([0.0] * len(STYLES))
    rewards = style_rewards(model)
    control_rewards = style_rewards(ctrl)
    true = true_utilities()
    primary = trajectory(rewards, ref, .5, 2)
    no_kl = trajectory(rewards, ref, 0, 2)
    control = trajectory(control_rewards, ref, .5, 2)
    pi_after = primary['trajectory'][-1]['policy']
    pi_nokl = no_kl['trajectory'][-1]['policy']
    pi_ctrl = control['trajectory'][-1]['policy']
    report = {'reward_holdout_accuracy': model.accuracy(holdout),
              'control_holdout_accuracy': ctrl.accuracy(holdout),
              'expected_reward_before': expected_reward(ref, rewards),
              'expected_reward_after': expected_reward(pi_after, rewards),
              'true_utility_before': expected_reward(ref, true),
              'true_utility_after': expected_reward(pi_after, true),
              'true_utility_control': expected_reward(pi_ctrl, true),
              'kl_after': kl(pi_after, ref), 'kl_nokl': kl(pi_nokl, ref),
              'entropy_after': entropy(pi_after), 'entropy_nokl': entropy(pi_nokl),
              'beta': .5, 'top_style_after': list(STYLES)[pi_after.index(max(pi_after))],
              'params': {'train_pairs': 800, 'holdout_pairs': 150, 'beta': .5,
                         'steps': 200, 'lr': 2.0}}
    if report != run_evaluation():
        raise AssertionError('same-runtime original report differs')
    runs = {'original_learned': primary, 'original_no_kl': no_kl,
            'original_noise_control': control,
            'stiff_kl_large_step': trajectory(rewards, ref, 50, 2),
            'stiff_kl_small_step': trajectory(rewards, ref, 50, .005)}
    for name, run in runs.items():
        rr = control_rewards if name == 'original_noise_control' else rewards
        for row in run['trajectory']:
            row['synthetic_true_utility'] = expected_reward(row['policy'], true)
            row['audit'] = audit_policy(rr, ref, row['policy'], run['beta'])
    return {'schema': 'alignlab.frontier-fixture.v1',
            'styles': list(STYLES), 'features': FEATURES, 'style_features': STYLES,
            'responses': responses, 'train_pairs': train, 'holdout_pairs': holdout,
            'noise_pairs': noise, 'reference': ref, 'synthetic_true_utilities': true,
            'learned_weights': model.w, 'noise_weights': ctrl.w,
            'learned_rewards': rewards, 'noise_rewards': control_rewards,
            'original_report': report, 'runs': runs}


def write_fixture(path):
    value = reproduce_original()
    Path(path).write_text(json.dumps(value, sort_keys=True, allow_nan=False, separators=(',', ':')) + '\n')
    return value
