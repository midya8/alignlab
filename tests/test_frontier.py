import math
import random
import unittest
from decimal import Decimal, localcontext

from alignlab.frontier import audit_policy, budget_frontier, gibbs_optimum


class FrontierTests(unittest.TestCase):
    def test_two_action_analytic(self):
        result = gibbs_optimum([0, math.log(3)], [.5, .5], 1)
        self.assertAlmostEqual(result['probabilities'][0], .25)
        self.assertAlmostEqual(result['objective'], math.log(2))

    def test_identity_at_random_policies(self):
        rng = random.Random(779)
        for _ in range(100):
            n = rng.randrange(2, 9)
            rewards = [rng.uniform(-5, 5) for _ in range(n)]
            q = [rng.random() + .01 for _ in range(n)]
            q = [x / sum(q) for x in q]
            p = [rng.random() for _ in range(n)]
            p = [x / sum(p) for x in p]
            a = audit_policy(rewards, q, p, rng.uniform(.01, 10))
            self.assertGreaterEqual(a['objective_gap'], -1e-12)
            self.assertAlmostEqual(a['identity_residual'], 0, delta=2e-13)

    def test_independent_decimal_optimum(self):
        rng = random.Random(119)
        with localcontext() as ctx:
            ctx.prec = 80
            for _ in range(100):
                n = rng.randrange(2, 9)
                r = [rng.uniform(-10, 10) for _ in range(n)]
                q = [rng.random() + .01 for _ in range(n)]
                q = [x / sum(q) for x in q]
                beta = rng.uniform(.05, 5)
                qd = [Decimal.from_float(x) for x in q]
                qd = [x / sum(qd) for x in qd]
                weights = [x * (Decimal.from_float(v) / Decimal.from_float(beta)).exp() for x, v in zip(qd, r)]
                z = sum(weights)
                expected = [float(w / z) for w in weights]
                result = gibbs_optimum(r, q, beta)
                for p, p_expected in zip(result['probabilities'], expected):
                    self.assertAlmostEqual(p, p_expected, delta=3e-15)
                self.assertAlmostEqual(result['objective'], float(Decimal.from_float(beta) * z.ln()), delta=8e-15)

    def test_underflow_keeps_finite_log_identity(self):
        a = audit_policy([-1e6, 1e6], [.5, .5], [.5, .5], 1e-6)
        self.assertEqual(a['optimum']['underflow_indices'], [0])
        self.assertTrue(math.isfinite(a['kl_to_optimum']))
        self.assertAlmostEqual(a['identity_residual'], 0, delta=1e-8)

    def test_zero_support_excludes_unreachable_reward(self):
        g = gibbs_optimum([1e6, 0, 1], [0, .8, .2], 1)
        self.assertEqual(g['probabilities'][0], 0)
        self.assertIsNone(g['log_probabilities'][0])
        self.assertEqual(g['reward_max'], 1)
        with self.assertRaises(ValueError):
            audit_policy([1e6, 0, 1], [0, .8, .2], [.1, .8, .1], 1)

    def test_zero_beta_tie_is_reference_conditioned(self):
        g = gibbs_optimum([2, 2, 0], [.1, .3, .6], 0)
        for p, expected in zip(g['probabilities'], [.25, .75, 0]):
            self.assertAlmostEqual(p, expected)
        self.assertAlmostEqual(g['kl'], -math.log(.4))
        self.assertIsNone(audit_policy([2, 2, 0], [.1, .3, .6], [.1, .3, .6], 0)['identity_rhs'])

    def test_constant_reward_reference(self):
        for beta in [0, 1e-6, 1, 1e6]:
            g = gibbs_optimum([3, 3, 3], [.2, .3, .5], beta)
            for p, q in zip(g['probabilities'], [.2, .3, .5]):
                self.assertAlmostEqual(p, q)
            self.assertAlmostEqual(g['kl'], 0)

    def test_budget_endpoints_and_saturation(self):
        r, q = [2, 2, 0], [.1, .3, .6]
        b = budget_frontier(r, q, 0)
        self.assertEqual(b['status'], 'zero_budget_reference')
        b = budget_frontier(r, q, -math.log(.4))
        self.assertEqual(b['status'], 'saturated_minimum_kl_maximizer')
        self.assertAlmostEqual(b['solution']['probabilities'][1], .75)

    def test_active_budget_brackets_and_dual(self):
        for budget in [.0001, .01, .1, .4, .9, 1.5]:
            b = budget_frontier([0, 1, 2], [1/3]*3, budget)
            if budget >= math.log(3):
                self.assertEqual(b['status'], 'saturated_minimum_kl_maximizer')
                continue
            self.assertEqual(b['status'], 'bracketed_active_budget')
            self.assertLessEqual(b['kl_bracket'][0], budget)
            self.assertGreater(b['kl_bracket'][1], budget)
            self.assertLess(abs(b['kl_bracket'][0] - budget), 1e-14)
            self.assertGreaterEqual(b['numeric_duality_gap'], -1e-14)
            self.assertLess(b['numeric_duality_gap'], 1e-12)

    def test_frontier_monotone_and_grid_upper_bound(self):
        q = [.2, .3, .5]
        rewards = [-1, .5, 2]
        previous = -math.inf
        for budget in [i / 100 for i in range(0, 101)]:
            b = budget_frontier(rewards, q, budget)
            optimum = b['solution']['expected_reward']
            self.assertGreaterEqual(optimum + 1e-13, previous)
            previous = optimum
            for i in range(21):
                for j in range(21-i):
                    p = [i/20, j/20, (20-i-j)/20]
                    kl = sum(x * math.log(x/y) for x,y in zip(p,q) if x)
                    er = sum(x*r for x,r in zip(p,rewards))
                    if kl <= budget:
                        self.assertLessEqual(er, optimum + 2e-12)

    def test_reward_offset_invariance(self):
        a = gibbs_optimum([-2, 1, 3], [.1, .2, .7], .5)
        b = gibbs_optimum([998, 1001, 1003], [.1, .2, .7], .5)
        self.assertEqual(a['probabilities'], b['probabilities'])
        self.assertAlmostEqual(b['objective'] - a['objective'], 1000)

    def test_near_tie_reports_unresolved_not_saturation(self):
        b = budget_frontier([0, 1, math.nextafter(1, 2)], [.2, .4, .4], .5)
        self.assertEqual(b['status'], 'unresolved_numeric_bracket')
        self.assertLess(b['solution']['kl'], .5)
        self.assertLess(b['tilt_bracket'][0], b['tilt_bracket'][1])

    def test_zero_budget_returns_reference_not_exp_log_roundtrip(self):
        q = [.1, .2, .7]
        b = budget_frontier([0, 1, 2], q, 0)
        self.assertEqual(b['solution']['probabilities'], q)
        self.assertEqual(b['solution']['kl'], 0)

    def test_tiny_budget_does_not_claim_fake_feasibility(self):
        for budget in [5e-324, 1e-30, 1e-20, 1e-15]:
            b = budget_frontier([0, 1, 2], [.2, .3, .5], budget)
            self.assertEqual(b['status'], 'below_numeric_budget_resolution')
            self.assertEqual(b['solution']['probabilities'], [.2, .3, .5])
            self.assertEqual(b['solution']['kl'], 0)
        b = budget_frontier([0, 1, 2], [.2, .3, .5], 1e-12)
        self.assertAlmostEqual(b['solution']['kl'], 1e-12, delta=1e-20)

    def test_rejects_invalid_inputs(self):
        for r, q, beta in [([0], [1], 1), ([0,1], [0,0], 1), ([0,1], [.2,.2], 1),
                           ([True,1], [.5,.5], 1), ([0,math.inf], [.5,.5], 1),
                           ([0,1], [-.1,1.1], 1), ([0,1], [.5,.5], True),
                           ([0,1], [.5,.5], 1e-12), ([0,1], [.5,.5], -1)]:
            with self.assertRaises(ValueError):
                gibbs_optimum(r, q, beta)
        for b in [-1, True, math.nan, 1001]:
            with self.assertRaises(ValueError):
                budget_frontier([0,1], [.5,.5], b)


if __name__ == '__main__':
    unittest.main()

class StableDivergenceDecimalTests(unittest.TestCase):
    def test_near_one_series_against_independent_decimal(self):
        from alignlab.frontier import _relative_entropy
        with localcontext() as ctx:
            ctx.prec = 100
            for q in [.001, .1, .5, .9, 1.0]:
                for magnitude in [1e-15, 1e-12, 1e-9, 1e-6, .001, .009, .011, .1]:
                    for sign in [-1, 1]:
                        p = q * (1 + sign * magnitude)
                        pd, qd = Decimal.from_float(p), Decimal.from_float(q)
                        exact = pd * (pd / qd).ln() - pd + qd
                        actual = _relative_entropy([p], [q])
                        expected = float(exact)
                        self.assertGreaterEqual(actual, 0)
                        self.assertAlmostEqual(actual, expected, delta=max(1e-45, abs(expected)*2e-11))

    def test_extreme_ratios_and_zero_probability_decimal(self):
        from alignlab.frontier import _relative_entropy
        with localcontext() as ctx:
            ctx.prec = 100
            for p, q in [(1, 5e-324), (1e-300, .9), (0, .9), (.99, 1e-200)]:
                pd, qd = Decimal.from_float(float(p)), Decimal.from_float(q)
                exact = qd if not p else pd * (pd/qd).ln() - pd + qd
                self.assertAlmostEqual(_relative_entropy([p], [q]), float(exact), delta=max(1e-14, float(exact)*1e-14))
