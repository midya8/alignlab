# AlignLab

Preference-based alignment from scratch: train a Bradley-Terry reward model on pairwise preferences, then align a policy by maximizing reward minus an exact KL penalty to a reference policy. No ML frameworks - the reward gradient, the policy gradient, and the KL accounting are all hand-derived Python, and every term is computed in closed form so nothing hides behind sampling noise.

## What it does

- Builds a synthetic response fixture: six response styles over interpretable features (helpful, correct, verbose, polite, toxic), with pairwise preferences drawn from a latent utility under Bradley-Terry noise from a fixed seed. The latent utility is never shown to the reward model.
- Trains a linear reward model `r(x) = w . phi(x)` on preference pairs with the hand-derived logistic gradient `dL/dw = -(phi_w - phi_l) * sigmoid(-(r_w - r_l))`.
- Aligns a categorical policy over styles by gradient ascent on `J = E_pi[r] - beta * KL(pi || ref)`, with expectations, KL, and both gradient terms in closed form; the policy gradient is finite-difference verified in the suite.
- Measures the whole story: reward holdout accuracy, expected reward and true latent utility before/after, the KL actually paid, a beta=0 ablation, and a label-noise negative control.

## Measured results (checked-in fixture, pinned in tests)

```
Reward model holdout accuracy: 0.7800 (label-shuffled control: 0.4333)
Expected learned reward: 2.1297 -> 4.2520
True latent utility:     2.0375 -> 4.6154 (control-aligned policy: 2.5800)
KL(pi || ref) paid: 1.0216   entropy: 0.7701
Without the KL term (beta=0): KL 1.7781, entropy 0.0136
```

What the fixture shows, stated plainly:

- The learned reward generalizes: 0.7800 holdout preference accuracy against 0.4333 for a model trained on utility-independent labels (utility-independent labels are expected to sit near chance on average; this finite seeded fixture lands at 0.4333).
- Aligning to the learned reward buys real utility, not just reward hacking: true latent utility rises 2.0375 to 4.6154. The negative control matters here - aligning to the noise-trained model buys only 2.0375 to 2.5800 on this seeded fixture, so on this fixture the gain tracks preference signal rather than the optimization machinery alone. One seeded control is a fixture comparison, not a general proof.
- The KL term is what keeps the policy spread out: with beta=0 the policy collapses onto the argmax-reward style (entropy 0.0136 vs 0.7701, KL 1.7781 vs 1.0216). The beta=0 ablation is gated from below so this stays demonstrated, not asserted.
- Reward accuracy is bounded by preference noise: labels are drawn from sigmoid utility gaps, so even the Bayes-optimal ranker falls short of 1.0, and the suite pins an achievable gate (0.75), not a perfect one.

## CLI

```bash
python -m alignlab evaluate
python -m alignlab evaluate --format json
python -m alignlab gates --min-reward-accuracy 0.75 --min-true-utility-gain 2.0 \
    --max-kl 1.2 --max-control-gain 0.2 --min-nokl-kl 1.5
```

Gates exit 1 with named failures. Both directions are pinned by tests: the achievable set above passes, and `--min-reward-accuracy 0.99` fails.

## Development

```bash
python -m unittest discover -s tests
bash examples/demo.sh
```

15 tests. No dependencies beyond Python 3.10+.

## Limitations

No PPO, no transformers, no sampled rollouts: the policy is categorical over six styles so every expectation and gradient is exact. That is the point - the alignment mechanics (preference modeling, KL-regularized reward maximization, the measurable KL cost, the negative control) are model-shape-independent. One measured caveat for practitioners: with a stiff KL coefficient, fixed-step ascent overshoots into the collapsed corner (the KL gradient vanishes as a style's probability approaches zero, so it never recovers); the suite's large-beta test uses a stable step size and the design notes describe the dynamic. Real RLHF adds a sequence model, sampled generations, a learned value baseline, and PPO-style clipped updates - none of which change what is being measured here.

## License

MIT
