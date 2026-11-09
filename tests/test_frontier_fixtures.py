import unittest

from alignlab.eval import run_evaluation
from alignlab.frontier_fixtures import reproduce_original


class OriginalFixtureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.fixture = reproduce_original()

    def test_original_report_same_runtime_exact(self):
        self.assertEqual(self.fixture['original_report'], run_evaluation())
        self.assertEqual(len(self.fixture['responses']), 120)
        self.assertEqual(len(self.fixture['train_pairs']), 800)
        self.assertEqual(len(self.fixture['holdout_pairs']), 150)
        self.assertEqual(len(self.fixture['noise_pairs']), 800)
        self.assertEqual(len(self.fixture['learned_weights']), 5)
        self.assertEqual(len(self.fixture['noise_weights']), 5)

    def test_all_original_and_additional_states_retained(self):
        self.assertEqual(set(self.fixture['runs']), {
            'original_learned', 'original_no_kl', 'original_noise_control',
            'stiff_kl_large_step', 'stiff_kl_small_step'})
        for name, run in self.fixture['runs'].items():
            self.assertEqual([r['step'] for r in run['trajectory']], list(range(201)))
            for row in run['trajectory']:
                self.assertEqual(len(row['policy']), 6)
                self.assertEqual(len(row['logits']), 6)
                self.assertAlmostEqual(row['audit']['objective'], row['objective'], delta=1e-12)
                if run['beta'] > 0:
                    self.assertAlmostEqual(row['audit']['identity_residual'], 0, delta=1e-12)

    def test_optimizer_gap_is_not_utility_improvement(self):
        run = self.fixture['runs']['original_noise_control']
        final = run['trajectory'][-1]
        self.assertLess(final['audit']['objective_gap'], 1e-10)
        self.assertLess(final['synthetic_true_utility'], run['trajectory'][0]['synthetic_true_utility'])

    def test_additional_overshoot_is_not_hidden(self):
        bad = self.fixture['runs']['stiff_kl_large_step']['trajectory']
        good = self.fixture['runs']['stiff_kl_small_step']['trajectory']
        self.assertLess(bad[-1]['objective'], bad[0]['objective'])
        self.assertGreater(bad[-1]['audit']['objective_gap'], 80)
        self.assertLess(good[-1]['audit']['objective_gap'], 1e-7)
