"""Cloning an action cannot improve its reward/KL tradeoff by itself.

Copies keep reward and split reference/current mass in the same ratio. This
finite binary64 consistency audit is not an independent optimum certificate.
"""
import copy
import math
import random
import unittest
from alignlab.frontier import gibbs_optimum, audit_policy, budget_frontier
from alignlab.frontier_witnesses import controls


def split(values, index, fraction, masses=False):
    v = values[index]
    parts = [v * fraction, v * (1-fraction)] if masses else [v, v]
    return values[:index] + parts + values[index+1:]


def aggregate(values, index):
    return values[:index] + [math.fsum(values[index:index+2])] + values[index+2:]


def binary_entropy(w):
    return -w*math.log(w) - (1-w)*math.log1p(-w)


class RefinementTests(unittest.TestCase):
    def vector_close(self, a, b):
        self.assertEqual(len(a), len(b))
        for x, y in zip(a,b): self.assertAlmostEqual(x,y,delta=2e-13)

    def number_close(self, a, b):
        self.assertAlmostEqual(a,b,delta=2e-9 + 2e-13*max(abs(a),abs(b)))

    def check_clone(self, rewards, reference, policy, beta, budget, index, fraction):
        r=split(rewards,index,fraction);q=split(reference,index,fraction,True);p=split(policy,index,fraction,True)
        self.assertTrue(all(x>0 for x in q[index:index+2]) or reference[index]==0)
        original=copy.deepcopy((rewards,reference,policy,r,q,p))
        a=gibbs_optimum(rewards,reference,beta);b=gibbs_optimum(r,q,beta)
        self.vector_close(a['probabilities'],aggregate(b['probabilities'],index))
        for key in ('expected_reward','kl','objective'):self.number_close(a[key],b[key])
        self.number_close(b['entropy']-a['entropy'],a['probabilities'][index]*binary_entropy(fraction))
        if a['probabilities'][index]>1e-200:
            self.assertAlmostEqual(b['probabilities'][index]/sum(b['probabilities'][index:index+2]),fraction,delta=1e-12)
        a=audit_policy(rewards,reference,policy,beta);b=audit_policy(r,q,p,beta)
        for key in ('expected_reward','kl','objective','objective_gap','identity_residual'):
            if a[key] is None:self.assertIsNone(b[key])
            else:self.number_close(a[key],b[key])
        if a['identity_rhs'] is not None:self.number_close(a['identity_rhs'],b['identity_rhs'])
        a=budget_frontier(rewards,reference,budget);b=budget_frontier(r,q,budget)
        self.assertEqual(a['status'],b['status'])
        self.number_close(a['saturation_kl'],b['saturation_kl'])
        self.vector_close(a['solution']['probabilities'],aggregate(b['solution']['probabilities'],index))
        for key in ('expected_reward','kl'):self.number_close(a['solution'][key],b['solution'][key])
        self.assertEqual((rewards,reference,policy,r,q,p),original)

    def test_declared_controls_all_actions_three_dyadic_splits(self):
        # The least-positive reference is not cloneable into positive binary64
        # parts. Near-tie frontier brackets are also not coordinate certificates.
        names=['two_action_exact','zero_support','tied_maximum','constant_reward',
               'underflow','tiny_budget','small_resolved_budget','shifted_rewards']
        for name in names:
            c=controls()[name]
            for i in range(len(c['rewards'])):
                for fraction in (.25,.5,.75):
                    with self.subTest(control=name,index=i,fraction=fraction):
                        self.check_clone(c['rewards'],c['reference'],c['policy'],c['beta'],c['budget'],i,fraction)

    def test_80_generated_cases_all_actions_and_beta_regimes(self):
        rng=random.Random(82913)
        for case in range(80):
            n=rng.randrange(2,9)
            rewards=[rng.randrange(-16,17)/4 for _ in range(n)]
            q=[rng.randrange(1,17) for _ in range(n)];q=[v/sum(q) for v in q]
            p=[rng.randrange(1,17) for _ in range(n)];p=[v/sum(p) for v in p]
            for beta in (0,.125,2):
                for i in range(n):
                    self.check_clone(rewards,q,p,beta,.2,i,(.25,.5,.75)[case%3])

    def test_reward_copy_without_reference_split_changes_the_question(self):
        a=gibbs_optimum([0,1],[.5,.5],1)
        correct=gibbs_optimum([0,1,1],[.5,.25,.25],1)
        wrong=gibbs_optimum([0,1,1],[1/3]*3,1)
        self.vector_close(a['probabilities'],aggregate(correct['probabilities'],1))
        self.assertGreater(abs(a['probabilities'][1]-sum(wrong['probabilities'][1:])),.1)
        # Splitting the current policy in a different ratio pays extra within-
        # clone KL, even though the aggregate action/reward stayed unchanged.
        original=audit_policy([0,1],[.5,.5],[.4,.6],1)
        altered=audit_policy([0,1,1],[.5,.25,.25],[.4,.1,.5],1)
        within=.6*((1/6)*math.log((1/6)/.5)+(5/6)*math.log((5/6)/.5))
        self.assertAlmostEqual(altered['kl']-original['kl'],within,places=14)
        self.assertAlmostEqual(original['objective']-altered['objective'],within,places=14)

    def test_subnormal_split_can_destroy_support_and_is_not_covered(self):
        tiny=math.ulp(0.)
        self.assertEqual(tiny*.5,0)
        a=gibbs_optimum([1,0],[tiny,1],0)
        b=gibbs_optimum([1,1,0],[tiny*.5,tiny*.5,1],0)
        self.assertEqual(a['probabilities'],[1,0])
        self.assertEqual(b['probabilities'],[0,0,1])
        self.assertEqual(a['expected_reward'],1);self.assertEqual(b['expected_reward'],0)
