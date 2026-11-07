import math
import random
import unittest

from alignlab.policy import entropy, expected_reward, grad_step, kl, softmax


class TestGradients(unittest.TestCase):
    def setUp(self):
        rng = random.Random(0)
        self.K = 6
        self.theta = [rng.uniform(-1, 1) for _ in range(self.K)]
        self.rewards = [rng.uniform(-2, 2) for _ in range(self.K)]
        self.ref = softmax([rng.uniform(-1, 1) for _ in range(self.K)])
        self.beta = 0.3

    def objective(self, theta):
        pi = softmax(theta)
        return expected_reward(pi, self.rewards) - self.beta * kl(pi, self.ref)

    def test_gradient_matches_finite_differences(self):
        eps = 1e-7
        stepped = grad_step(self.theta, self.rewards, self.ref, self.beta, 1.0)
        for k in range(self.K):
            tp, tm = self.theta[:], self.theta[:]
            tp[k] += eps
            tm[k] -= eps
            numeric = (self.objective(tp) - self.objective(tm)) / (2 * eps)
            self.assertAlmostEqual(stepped[k] - self.theta[k], numeric, places=5)

    def test_ascent_increases_objective(self):
        theta = self.theta[:]
        before = self.objective(theta)
        for _ in range(50):
            theta = grad_step(theta, self.rewards, self.ref, self.beta, 0.5)
        self.assertGreater(self.objective(theta), before)

    def test_no_kl_penalty_collapses(self):
        theta = [0.0] * self.K
        ref = softmax(theta)
        for _ in range(200):
            theta = grad_step(theta, self.rewards, ref, 0.0, 2.0)
        pi = softmax(theta)
        self.assertLess(entropy(pi), 0.05)
        self.assertEqual(pi.index(max(pi)), self.rewards.index(max(self.rewards)))

    def test_large_beta_stays_at_reference(self):
        theta = [0.0] * self.K
        ref = softmax(theta)
        for _ in range(200):
            theta = grad_step(theta, self.rewards, ref, 50.0, 0.005)
        self.assertLess(kl(softmax(theta), ref), 1e-3)


if __name__ == "__main__":
    unittest.main()
