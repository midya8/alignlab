"""Complete deterministic fixture/control witness generation, no filtering."""
from __future__ import annotations

import math
from .frontier_report import report


def controls():
    return {
        'two_action_exact': {'rewards': [0, math.log(3)], 'reference': [.5,.5], 'policy': [.5,.5], 'beta': 1, 'budget': .1},
        'zero_support': {'rewards': [1e6,0,1], 'reference': [0,.8,.2], 'policy': [0,.5,.5], 'beta': 1, 'budget': .2},
        'tied_maximum': {'rewards': [2,2,0], 'reference': [.1,.3,.6], 'policy': [.2,.2,.6], 'beta': 0, 'budget': 1},
        'constant_reward': {'rewards': [3,3,3], 'reference': [.2,.3,.5], 'policy': [.1,.2,.7], 'beta': .5, 'budget': .5},
        'underflow': {'rewards': [-1e6,1e6], 'reference': [.5,.5], 'policy': [.5,.5], 'beta': 1e-6, 'budget': .3},
        'near_tie_unresolved': {'rewards': [0,1,math.nextafter(1,2)], 'reference': [.2,.4,.4], 'policy': [.2,.4,.4], 'beta': .5, 'budget': .5},
        'subnormal_reference': {'rewards': [0,1], 'reference': [5e-324,1], 'policy': [0,1], 'beta': .5, 'budget': .2},
        'tiny_budget': {'rewards': [0,1,2], 'reference': [.2,.3,.5], 'policy': [.2,.3,.5], 'beta': .5, 'budget': 1e-20},
        'small_resolved_budget': {'rewards': [0,1,2], 'reference': [.2,.3,.5], 'policy': [.2,.3,.5], 'beta': .5, 'budget': 1e-12},
        'shifted_rewards': {'rewards': [998,1001,1003], 'reference': [.1,.2,.7], 'policy': [.1,.2,.7], 'beta': .5, 'budget': .1},
    }


def payload(fixture, name, step, beta=None, budget=.5):
    run = fixture['runs'][name]
    return {'rewards': fixture['noise_rewards'] if name == 'original_noise_control' else fixture['learned_rewards'],
            'reference': fixture['reference'], 'policy': run['trajectory'][step]['policy'],
            'labels': fixture['styles'], 'evaluation_utilities': fixture['synthetic_true_utilities'],
            'beta': run['beta'] if beta is None else beta, 'budget': budget}


def witnesses(fixture):
    out = []
    for name, value in controls().items():
        out.append({'name': name, 'input': value, 'report': report(value)})
    for name in fixture['runs']:
        for step in [0,1,10,100,200]:
            value = payload(fixture, name, step)
            out.append({'name': name + ':' + str(step), 'input': value, 'report': report(value)})
    return {'schema': 'alignlab.frontier-witnesses.v1', 'witnesses': out}
