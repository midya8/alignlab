"""Bounded report schema and strict JSON transport for the finite-policy audit."""
from __future__ import annotations

import json
import math

from .frontier import _number, audit_policy, budget_frontier, gibbs_optimum, inputs

BETA_SAMPLES = [0, .001, .01, .05, .1, .25, .5, 1, 2, 5, 10, 50, 100]


def parse_json(text):
    if isinstance(text, bytes):
        if len(text) > 1000000:
            raise ValueError('JSON input exceeds one million bytes')
        text = text.decode('utf-8')
    if not isinstance(text, str) or len(text.encode('utf-8')) > 1000000:
        raise ValueError('JSON input exceeds one million bytes')
    def pairs(items):
        out = {}
        for key, value in items:
            if key in out:
                raise ValueError('duplicate JSON key')
            out[key] = value
        return out
    def bad(value):
        raise ValueError('nonfinite JSON number')
    def depth(value, n=0):
        if n > 64:
            raise ValueError('JSON nesting exceeds 64')
        if isinstance(value, float) and not math.isfinite(value):
            raise ValueError('nonfinite JSON number')
        if isinstance(value, dict):
            for item in value.values():
                depth(item, n+1)
        elif isinstance(value, list):
            for item in value:
                depth(item, n+1)
    try:
        value = json.loads(text, object_pairs_hook=pairs, parse_constant=bad)
        depth(value)
    except RecursionError as exc:
        raise ValueError('JSON nesting exceeds 64') from exc
    return value


def validate(payload):
    required = {'rewards', 'reference', 'policy', 'beta', 'budget'}
    optional = {'labels', 'evaluation_utilities'}
    if not isinstance(payload, dict) or not required <= payload.keys() or payload.keys() - required - optional:
        raise ValueError('missing or unknown payload keys')
    r, q, total = inputs(payload['rewards'], payload['reference'])
    _, p, p_total = inputs(r, payload['policy'])
    if any(x > 0 and y == 0 for x, y in zip(p, q)):
        raise ValueError('policy puts mass outside reference support')
    beta = _number(payload['beta'], 'beta', 0, 1e6)
    if 0 < beta < 1e-6:
        raise ValueError('positive beta must be at least 1e-6')
    budget = _number(payload['budget'], 'budget', 0, 1000)
    labels = payload.get('labels', ['Action ' + str(i) for i in range(len(r))])
    if not isinstance(labels, list) or len(labels) != len(r) or any(not isinstance(x, str) or not x or len(x) > 64 for x in labels):
        raise ValueError('labels need 1..64 code points each and match action count')
    utilities = payload.get('evaluation_utilities')
    if 'evaluation_utilities' in payload:
        if not isinstance(utilities, list) or len(utilities) != len(r):
            raise ValueError('evaluation utilities must match action count')
        utilities = [_number(x, 'evaluation utility', -1e6, 1e6) for x in utilities]
    return {'rewards': r, 'reference': q, 'policy': p, 'beta': beta, 'budget': budget,
            'labels': labels, 'evaluation_utilities': utilities,
            'reference_input_sum': total, 'policy_input_sum': p_total}


def report(payload):
    v = validate(payload)
    r, q, p = v['rewards'], v['reference'], v['policy']
    current = audit_policy(r, q, p, v['beta'])
    budget = budget_frontier(r, q, v['budget'])
    def utility(pi):
        if v['evaluation_utilities'] is None:
            return None
        return math.fsum(x*y for x, y in zip(pi, v['evaluation_utilities']))
    optimum = current['optimum']
    sweep = []
    for beta in BETA_SAMPLES:
        state = gibbs_optimum(r, q, beta)
        sweep.append({'beta': beta, 'expected_reward': state['expected_reward'],
                      'kl': state['kl'], 'entropy': state['entropy'],
                      'probabilities': state['probabilities'],
                      'evaluation_utility': utility(state['probabilities'])})
    saturation = budget['saturation_kl']
    frontier = []
    for i in range(33):
        b = budget_frontier(r, q, saturation * i / 32)
        frontier.append({'budget': b['budget'], 'status': b['status'],
                         'expected_reward': b['solution']['expected_reward'],
                         'kl': b['solution']['kl'], 'probabilities': b['solution']['probabilities'],
                         'evaluation_utility': utility(b['solution']['probabilities'])})
    styles = []
    for i, label in enumerate(v['labels']):
        styles.append({'position': i, 'label': label, 'reward': r[i],
                       'reference_probability': q[i], 'policy_probability': p[i],
                       'optimum_probability': optimum['probabilities'][i],
                       'budget_probability': budget['solution']['probabilities'][i],
                       'evaluation_utility': None if v['evaluation_utilities'] is None else v['evaluation_utilities'][i]})
    return {'schema': 'alignlab.frontier-report.v1', 'action_count': len(r),
            'input_sums': {'reference': v['reference_input_sum'], 'policy': v['policy_input_sum']},
            'current': current, 'budget': budget, 'styles': styles,
            'beta_samples': sweep, 'budget_samples': frontier,
            'evaluation_utilities': {'policy': utility(p), 'reference': utility(q),
                                    'optimum': utility(optimum['probabilities']),
                                    'budget': utility(budget['solution']['probabilities'])},
            'arithmetic': 'binary64 approximations; brackets and dual residuals are not outward-rounded certificates',
            'sampling': '13 beta samples and 33 budget samples are displays, not an exhaustive continuum'}
