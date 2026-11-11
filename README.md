# AlignLab

A small preference-learning experiment with two inspectors: one asks whether a policy solved its reward objective; the other asks whether the comparisons identified that objective in the first place.

The experiment trains a linear Bradley-Terry reward model, then updates a categorical policy over six response styles. Everything runs in Python's standard library. Gradients are written by hand and checked with finite differences. There is no language model or sampled rollout.

- [Policy optimum and KL budget](https://midya8.github.io/alignlab/)
- [What the comparisons leave open](https://midya8.github.io/alignlab/identification.html)

## Start here

```bash
python -m alignlab evaluate
python -m alignlab evaluate --format json
python -m alignlab gates --min-reward-accuracy 0.75 --min-true-utility-gain 2.0 \
    --max-kl 1.2 --max-control-gain 0.2 --min-nokl-kl 1.5
```

The gates exit 1 and name the failed checks. The suite tests both outcomes: the settings above pass; `--min-reward-accuracy 0.99` fails.

## The experiment

The fixture has 120 synthetic response feature vectors, grouped into six styles. Features represent helpfulness, correctness, verbosity, politeness and toxicity. A fixed latent utility generates noisy Bradley-Terry preference labels. The reward model never sees that utility.

Training uses 800 preference pairs; evaluation uses 150 held-out pairs from the same response pool. A separate control trains on 800 utility-independent labels. These are not new tasks, response styles or people, so the holdout result does not establish generalization to them.

The model is `r(x) = w . phi(x)`. Its pairwise loss gradient is

```
dL/dw = -(phi_w - phi_l) * sigmoid(-(r_w - r_l))
```

The policy then ascends `J = E_pi[r] - beta * KL(pi || ref)`. The expectations, KL and policy gradient are computed over the whole finite action list, without sampling. Evaluation reports reward accuracy, learned reward, latent utility, KL and entropy, alongside no-KL and label-noise controls.

## Results from the checked-in fixture

```
Reward model holdout accuracy: 0.7800 (utility-independent-label control: 0.4333)
Expected learned reward: 3.4641 -> 6.2462
True latent utility:     2.0375 -> 4.5704 (control-aligned policy: 1.8549)
KL(pi || ref) paid: 1.0750   entropy: 0.7167
Without the KL term (beta=0): KL 1.7510, entropy 0.0407
```

The noise-control policy loses utility even though it nearly solves its own reward objective. The learned-reward policy raises utility on this fixture. Those are descriptive comparisons, not evidence that a particular component caused the difference.

Earlier README numbers were stale. The [old/current table](FRONTIER.md#original-fixture-and-stale-prose-correction) keeps the discrepancy visible. The original training, data, tests and gate thresholds were not changed to fit the prose.

## Did the policy solve its reward objective?

The [optimizer inspector](https://midya8.github.io/alignlab/) attaches the standard finite-action Gibbs optimum and a KL-budget frontier to each recorded state. It shows action probabilities, the objective-gap identity, reference-weighted ties, zero-support restrictions and a separate utility axis.

All 201 states of the original learned, no-KL and noise-control runs are kept. Two additional beta-50 controls bring the total to 1,005 states. Their large-step failure is visible rather than replaced with a better run. This pair of controls does not establish a general learning-rate or alignment mechanism.

The calculation is closed form mathematically, but its numbers use binary64 arithmetic. Tiny budgets and unresolved near ties get explicit statuses, not claimed solutions. Thirty-five full report witnesses, high-precision controls, JSON checks and installed-wheel reconstruction test the implementation. [Equations and numerical limits](FRONTIER.md).

## Did the comparisons identify the target?

The [preference inspector](https://midya8.github.io/alignlab/identification.html) takes exact population probabilities, not empirical win counts. It reconstructs merit ratios within each connected component. Contradictory cycle odds reject an exact scalar-reward fit. Disconnected components keep free relative scales, so different Gibbs policies can preserve every observed comparison.

At beta 1, rational merits give rational policy probabilities. Supply a positive scale interval for each component and the inspector shows every corner policy, all tied witnesses, action/component mass ranges, cross-pair probabilities and supplied-utility extremes. The bounds are assumptions, not confidence intervals. Utility is an evaluation input, not inferred human utility.

Twelve controls contain 107 corner records. A propagation-based Python producer, a separate all-simple-path reference and a browser BigInt implementation compare the full reports. The original learned experiment and general-beta floating inspector remain separate. [Proof, schema, controls and replay commands](IDENTIFICATION.md).

## Development

Python 3.10+ is enough at runtime; there are no runtime packages to install. Browser tests need Node 22+ and Chrome.

```bash
python -m unittest discover -s tests
bash examples/demo.sh
PYTHONPATH=. python scripts/regenerate_identification.py --check
node --test tests/test_frontier.cjs tests/test_frontier_browser.cjs \
    tests/test_identification.cjs tests/test_identification_browser.cjs
bash examples/verify_wheel.sh
```

There are 65 Python tests: all 47 earlier tests, including the 15 original tests, plus 18 identification tests. Eight Node/actual-Chrome tests include all four earlier tests. The installed-wheel check runs outside the checkout and reconstructs both the old experiment and the new exact reports.

## Limits

This is not PPO, DPO training or a transformer model. Enumerating six styles makes the expectations tractable; it does not remove the cost of sequence-model optimization or show that these results transfer to it. Real RLHF adds generated sequences, sampled updates and often a value model and PPO-style clipping.

The exact preference inspector only covers positive population probabilities, full-support references and beta 1. Its graph-identification question is different from finite-sample MLE existence. The older inspector uses floating-point diagnostics, not outward-rounded certificates. Neither inspector proves safety, human preference satisfaction or generalization. Standard Bradley-Terry and Gibbs methods are credited in the linked method notes.

## License

MIT
