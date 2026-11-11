# Finite-policy optimum and KL frontier

The original six-style experiment leaves a useful question: how close did its policy updates get to the best policy for each reward? This inspector answers it with the standard Gibbs optimum and a KL-budget calculation.

The trainer, data generator, policy update, evaluation calculations, tests and gate thresholds are unchanged. This is not a new alignment algorithm. The equations are mathematical identities; computed numbers use binary64 arithmetic.

## The question being solved

Let q be a reference distribution, r a fixed reward vector and p a policy over the same finite action list. Work on q's support: p_i must be zero wherever q_i is zero. Define

```
KL(p || q) = sum_{i:p_i>0} p_i log(p_i / q_i)
J_beta(p) = sum_i p_i r_i - beta KL(p || q)
p*_i = q_i exp(r_i / beta) / Z, for beta > 0
Z = sum_i q_i exp(r_i / beta)
J_beta(p*) = beta log Z
J_beta(p*) - J_beta(p) = beta KL(p || p*)
```

For positive beta, the optimum is unique on that finite support. Substituting `log(p*_i/q_i) = r_i/beta - logZ` proves the gap identity. The optimum concerns r alone. It does not establish that r is a useful target, that optimization is safe, or that an evaluation utility rises.

At beta zero, the inspector uses the zero-penalty limit within the finite-KL domain, not an unconstrained problem that can access q-zero actions. Let M be the supported reward maximizers and Q_M their total reference mass. There can be many reward-maximizing policies. We select q conditioned on M, whose KL is `-log Q_M`, the minimum among reward maximizers. Reference-weighted ties are not silently replaced with a lowest-index action. Constant rewards return the reference.

## Constrained movement

For a KL budget epsilon, maximize expected reward subject to `KL(p||q) <= epsilon` on the same support. At epsilon zero the policy is q. When epsilon reaches `-log Q_M`, the minimum-KL reward maximizer is feasible and the reward frontier saturates; larger budgets do not imply a unique policy.

For the interior, `p_lambda ∝ q exp(lambda r)` with lambda positive. Its KL increases with lambda: differentiating the log partition gives `dKL/dlambda = lambda Var_p(r)`. We search in the dimensionless tilt `t = lambda * (max_supported r - min_supported r)` so a reward offset or scale does not wreck the bracket.

A doubling bracket followed by up to 100 bisections returns its computed feasible lower side and computed KL/tilt brackets. For its beta `1/lambda`, the expression `beta logZ + beta epsilon` is the mathematical dual upper bound on attainable reward. The report exposes its numeric value and the difference from the returned expected reward. These are not outward-rounded intervals or rigorous floating-point certificates.

The tilt cap is 2^40. Near-equal rewards can require a larger tilt; the solver then reports `unresolved_numeric_bracket` without claiming a constrained optimum. Positive budgets below 1e-14 report `below_numeric_budget_resolution` and return q without an optimum claim. The displayed curve has gaps for these statuses. No hidden epsilon snap turns them into a claimed saturation or solution. All sampled rows, including unresolved rows, remain in the tables and JSON.

## Stable arithmetic, not exact-machine claims

The implementation shifts supported rewards by their maximum and uses normalized shifted weights. Log probabilities are retained separately even when a probability underflows to zero. `log(p/q)` in a gap audit therefore remains finite when p* underflows. Extreme overflow is prevented by the bounded input schema, not by claiming arbitrary-real support.

Direct `sum p(logp-logq)` loses precision near q. The new audit computes KL using `sum q*f(p/q)` with `f(1+t)=(1+t)log(1+t)-t`; the zero first-order sum(p-q) is canceled analytically. For |t|<.01, a Taylor series through degree 11 avoids subtraction. Independent 100-digit Decimal controls test near-one and extreme-ratio terms. This is a numerical formula for the same mathematical KL, not a replacement of the original policy module. The original report and trajectory metrics retain their original KL calculation; differences near roundoff are not hidden.

Gap subtraction, normalization, exp/log and bisection can still round. Small negative gaps/residuals must not be read as a policy exceeding the mathematical optimum. No quantity here is a hardware, robustness or safety certificate.

## Original fixture and stale prose correction

`frontier_fixtures.reproduce_original()` independently reconstructs both original reward fits using the same source functions, all original data and the three original policy trajectories. Its rebuilt report must equal the unchanged `run_evaluation()` exactly on the same runtime. It additionally records two explicitly new stiff-KL step-size controls. Every run retains states 0 through 200, not a best-state subset.

Current unchanged code regenerates:

| Metric | Current original code | Older README text |
| --- | ---: | ---: |
| Holdout preference accuracy | .7800 | .7800 |
| Noise-control holdout accuracy | .4333 | .4333 |
| Learned reward before | 3.4641182815215337 | 2.1297 |
| Learned reward after | 6.246209753069929 | 4.2520 |
| Synthetic utility before | 2.0374999999999996 | 2.0375 |
| Synthetic utility after | 4.570424734959314 | 4.6154 |
| Noise-control utility | 1.8548646952388848 | 2.5800 |
| KL after | 1.0750099189105453 | 1.0216 |
| Entropy after | .7167495503175095 | .7701 |
| No-KL KL | 1.7510339584158738 | 1.7781 |
| No-KL entropy | .040725510812180905 | .0136 |

The stale values are preserved here as historical prose, not a second valid benchmark. Python 3.10 through 3.13 reproduce the current values with only roundoff differences. Training is not tuned to the old README. The original 15 tests and all gates remain unchanged.

At the end of the original noise-control run, the reward-objective gap is about 4e-15, yet synthetic utility is below the reference's 2.0375. This separates optimizer quality from reward quality on one finite fixture. It is not a causal/generalization result. The learned-reward optimum's utility is about 4.5768334, versus the original finite-run 4.5704247.

The two additional beta-50 controls use learning rates 2 and .005 on the original learned reward. Their final objective gaps are about 89.859927 and 2.87e-9. Both entire trajectories remain visible; neither replaces an original result. The comparison is descriptive and does not identify a general learning-rate or alignment mechanism.

The fixture contains 120 response feature vectors, 800 training pairs, 150 holdout pairs and 800 utility-independent noise pairs. Responses are feature vectors, not generated text. Holdout pairs reuse the fixture's response pool; they are not new people, new tasks or new styles. Synthetic latent utility is never passed to reward fitting, Gibbs optimization or budget selection; it is an optional evaluation axis only.

## Native JSON and CLI

```
python -m alignlab frontier-audit input.json
python -m alignlab frontier-demo reproduced.json
```

Required input keys: `rewards`, `reference`, `policy`, `beta`, `budget`. Optional: `labels`, `evaluation_utilities`. Unknown keys fail. Arrays match and contain 2..64 actions. Rewards/utilities are finite and within ±1e6. Probabilities are finite in [0,1], sum to one within 1e-12 and are normalized explicitly; the report preserves the input sums. Any positive policy mass outside reference support fails. Beta is zero or [1e-6,1e6]; budget is [0,1000]. Labels are nonempty strings of at most 64 Unicode code points. Null utilities are rejected; omitting the axis returns null evaluation values, not an inferred utility.

The strict JSON transports reject duplicate keys (including escaped-key duplicates), nonfinite/overflowed numbers, trailing content, input over one million UTF-8 bytes and excessive nesting. Python counts structural depth from root zero and rejects depth over 64; the browser counts open containers and rejects over 64. Valid schema inputs have depth at most two containers, so this defensive limit does not change accepted schema inputs.

Reports include all action rows, 13 explicit beta samples, 33 budget samples, the selected policy gap and constrained-budget diagnostic. Display samples are not an exhaustive continuum or an optimizer for a separate utility axis.

## Checks and installed reproduction

```
python -m unittest discover -s tests
node --test tests/test_frontier.cjs tests/test_frontier_browser.cjs
bash examples/demo.sh
bash examples/verify_wheel.sh
```

47 Python tests, including all 15 unchanged original tests. Four substantive Node/actual-Chrome tests compare all 35 full native/browser reports and all 1,005 trajectory audit states, strict inputs, all 201 step selections, original row counts, arithmetic controls, invalid-state non-revival, clipboard failure/success, actual JSON downloads, keyboard operation and 320/390/1280 layouts. The complete frozen dataset, both trained models, all 1,005 states and all 35 report witnesses are regenerated and checked. Run `python scripts/regenerate_frontier.py` to rebuild compressed archives and browser data, with fixed gzip timestamps. Native controls include 100 independent 80-digit Decimal Gibbs optima, 100 random gap identities, 101 budgets with 231 independent simplex-grid policies each, 80 near-one 100-digit divergence terms, and four extreme-ratio terms. A grid is an independent lower-bound control, not proof of continuum optimality.

The isolated wheel imports nine modules and runs all four CLI commands outside the source checkout. It retrains the original learned/noise rewards and reconstructs all pairs, weights, style scores, report and all 1,005 trajectory states. Full retraining uses abs/rel 1e-11 for runtime/libm portability; frozen report/audit witnesses use abs/rel 1e-12. No original test/gate tolerance is changed. Same-runtime original report comparison remains exact.

## Sources

- [Rafailov et al., Direct Preference Optimization, equation 4](https://arxiv.org/html/2305.18290): standard reward-to-Gibbs-policy mapping. This project does not train DPO or a language model.
- [Hanqing Li, finite Gibbs variational formula and zero-temperature tie limit](https://lihanqing1997.github.io/notes/reinforcement-learning/entropy-regularized-reinforcement-learning/).
- [Levine, Reinforcement Learning and Control as Probabilistic Inference](https://ar5iv.labs.arxiv.org/html/1805.00909): broader context, not an equivalence claim for all stochastic dynamics.
- [SciPy weighted logsumexp documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.logsumexp.html): arithmetic context; no SciPy dependency.
- [Blanchard, Higham and Higham, Accurately computing log-sum-exp and softmax](https://academic.oup.com/imajna/article/41/4/2311/5893596): shifting reduces overflow risk, not a claim of exact floating arithmetic.
