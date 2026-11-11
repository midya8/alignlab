# AlignLab design

The project has three parts: a small learned reward experiment, a floating-point optimizer inspector and an exact preference-graph inspector. Keeping them separate matters. An optimizer can solve a poor reward objective, and comparisons can leave several rewards possible.

## Original experiment

- `data.py` builds response feature vectors in K styles. A latent utility over helpfulness, verbosity, toxicity and other features generates Bradley-Terry preference labels from a fixed seed.
- `reward.py` fits `r(x) = w . phi(x)` with pairwise logistic loss. Its gradient is `dL/dw = -(phi_c - phi_r) * sigmoid(-(r_c - r_r))`.
- `policy.py` updates a categorical policy over the K styles. It computes both terms of `J = E_pi[r] - beta * KL(pi || ref)` by summing over the actions, without sampling. The policy gradient is `dJ/dtheta = E_pi[(r - beta (log pi - log ref + 1)) . d log pi/dtheta]`. Each step records entropy, KL and expected reward.
- `eval.py` measures reward holdout accuracy, before/after reward and utility, KL, and a control trained on utility-independent labels. A control's adverse result stays in the report.
- `cli.py` exposes evaluation and threshold gates. Tests cover passing and failing gate settings.

The runtime uses the Python standard library. There is no network call, PPO or transformer. The finite action list makes it possible to inspect every expectation and gradient term. It is not a shortcut around the work of real sequence-model RLHF.

## Optimizer inspector

`frontier.py` computes the standard finite-support Gibbs optimum and brackets a KL-budget solution. `frontier_report.py` validates inputs and builds the report. `frontier_fixtures.py` reconstructs the original training and full trajectories; `frontier_witnesses.py` builds full Python/browser test cases.

These calculations use binary64 arithmetic. Near-tie failures and below-resolution budgets are reported rather than called optima. [FRONTIER.md](FRONTIER.md) contains the equations, numerical limits, sources and old/current README number table.

## Preference inspector

`identification.py` propagates exact rational merit ratios through a population-comparison graph and checks cycle consistency. Given assumed component-scale bounds, it enumerates all box corners and the resulting beta-1 Gibbs policies.

`identification_verify.py` rebuilds the report by enumerating simple paths instead of calling the producer. The browser's BigInt implementation has its own arithmetic and graph search. Shared Python input validation is separate from the two evaluators.

[IDENTIFICATION.md](IDENTIFICATION.md) gives the proof, input limits and complete report schema. Population identification, finite-win MLE existence and optimizer accuracy are different questions; the interfaces do not silently substitute one for another.
