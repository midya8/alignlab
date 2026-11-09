# AlignLab

Preference-based alignment from scratch: train a Bradley-Terry reward model on pairwise preferences, then align a policy by maximizing reward minus an exact KL penalty to a reference policy. No ML frameworks - the reward gradient, the policy gradient, and the KL accounting are all hand-derived Python, and every term is computed in closed form so nothing hides behind sampling noise.

## What it does

- Builds a synthetic response fixture: six response styles over interpretable features (helpful, correct, verbose, polite, toxic), with pairwise preferences drawn from a latent utility under Bradley-Terry noise from a fixed seed. The latent utility is never shown to the reward model.
- Trains a linear reward model `r(x) = w . phi(x)` on preference pairs with the hand-derived logistic gradient `dL/dw = -(phi_w - phi_l) * sigmoid(-(r_w - r_l))`.
- Aligns a categorical policy over styles by gradient ascent on `J = E_pi[r] - beta * KL(pi || ref)`, with expectations, KL, and both gradient terms in closed form; the policy gradient is finite-difference verified in the suite.
- Measures the whole story: reward holdout accuracy, expected reward and true latent utility before/after, the KL actually paid, a beta=0 ablation, and a label-noise negative control.

## Measured results (checked-in fixture, pinned in tests)

```
Reward model holdout accuracy: 0.7800 (utility-independent-label control: 0.4333)
Expected learned reward: 3.4641 -> 6.2462
True latent utility:     2.0375 -> 4.5704 (control-aligned policy: 1.8549)
KL(pi || ref) paid: 1.0750   entropy: 0.7167
Without the KL term (beta=0): KL 1.7510, entropy 0.0407
```

The unchanged original code regenerates these values. Earlier README numbers were stale; [the full correction table](FRONTIER.md#original-fixture-and-stale-prose-correction) preserves the old text and current values. Training, original tests and gate thresholds have not been adjusted to match prose.

On this seeded fixture, held-out pair accuracy is .7800 versus .4333 for a model trained on utility-independent labels. The holdout pairs reuse the same synthetic response pool; this is not evidence of generalization to new tasks or styles. Alignment to the learned reward raises synthetic utility from 2.0375 to 4.5704, while the noise-control policy lowers it to 1.8549. These are descriptive fixture comparisons, not causal attribution. The beta-zero ablation has lower entropy and higher KL than the original beta-.5 run. Every original result, including the control's adverse utility change, is retained.

## v0.2: know what you optimized

The [interactive finite-policy inspector](https://midya8.github.io/alignlab/) attaches the standard Gibbs optimum and KL-budget frontier to every original policy state. Independent native and browser evaluators show reward objective, optimizer gap, per-action probabilities, reference-weighted tied maxima, zero-support restrictions and a separate supplied-utility axis. The original learned, no-KL and noise-control runs plus two explicitly additional stiff-KL controls retain all 1,005 states. The noise-control optimizer is essentially optimal for its reward and still loses synthetic utility.

Thirty-five full native/browser witnesses, independent high-precision controls, strict JSON exports and an isolated installed-wheel reconstruction check the implementation. Tiny budgets and unresolved near ties are explicit statuses, not silently claimed solutions. [Equations, schema, reproduction and limits](FRONTIER.md) distinguish closed-form mathematical results from floating-point diagnostics. Standard methods are attributed, not presented as a new alignment algorithm.

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

47 Python tests (15 original unchanged) plus four substantive Node/actual-Chrome tests. No runtime dependencies beyond Python 3.10+; browser tests require Node 22+ and Chrome.

```bash
node --test tests/test_frontier.cjs tests/test_frontier_browser.cjs
bash examples/verify_wheel.sh
```

## Limitations

No PPO, no transformers, no sampled rollouts: the policy is categorical over six styles so every expectation and gradient is exact. That is the point - this finite experiment exposes preference modeling, KL-regularized reward maximization, KL cost and a negative control without claiming that its numerical or empirical results transfer to sequence models. The additional stiff-KL controls retain a fixed-large-step failure and a smaller-step run, without claiming a causal explanation or universal convergence result. Real RLHF adds a sequence model, sampled generations, a learned value baseline, and PPO-style clipped updates - the exact finite-action optimum here does not remove those costs or prove an RLHF benefit.

## License

MIT
