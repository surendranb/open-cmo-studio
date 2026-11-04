---
name: problem-solving
description: Use before reasoning about any studio question that needs a verdict - anomalies in data, prioritization choices, root-cause hunts, recurring patterns, go/no-go decisions - to pick and declare the right framework instead of reasoning ad hoc
---

# Problem-Solving

The house thinking standard: never reason bare. Pick the framework that matches the problem shape, declare it in one line, then reason inside it. Data before verdicts; every verdict carries a Fact/Inference/Hypothesis label.

## Framework selection

| Problem shape | Framework | Method | Where it applies in the studio |
|---|---|---|---|
| Something moved unexpectedly (traffic drop, error spike, metric jump) | **Hypothesis test** | List candidate causes → rank by cheapness-to-verify → verify cheapest first with a tool pull → keep what survives | Daily sweep deltas; CF-route rule (check routes FIRST on telemetry drops) |
| "Why did X fail?" — cause known to exist | **5 Whys** | Ask why iteratively until the systemic cause; stop at a fixable shared function, not a symptom | Fleet failures; release regressions; blocked data sources |
| Big fuzzy question ("what should we do about X?") | **Issue tree (MECE)** | Split into mutually-exclusive, collectively-exhaustive branches; work the highest-leverage branch first | Positioning questions; product-line strategy; "which product next" |
| Multiple options, limited capacity | **ICE/RICE** | Score Impact × Confidence × Ease (or add Reach); rank; cut below the bar | Agenda planning; ticket triage; feature candidates from reddit-radar |
| Same pattern recurring across runs/products | **Systems loop** | Map the loop (stock → flow → feedback); find the leverage point, not the loudest node | Install/retention patterns; content-SEO flywheel; memory consolidation |
| Commit/no-commit, build/no-build | **Inversion** | Ask "how would this fail?" → design against the failure modes, then decide | Launch go/no-go; proposal reviews; the negative list |
| "Are we on track?" | **Baseline + delta** | Compare against a named baseline with a window; never judge a number naked | All sweeps (baseline tables live in project files and day agendas) |

## Rules

- **Declare first**: the first line of any reasoning section names the framework ("Framework: hypothesis test — verifying cheapest cause first"). If no framework fits, say "ad-hoc, first-principles" and justify.
- **Data before verdicts**: no verdict line before the evidence line. A verdict without its numbers is an opinion.
- **Label everything that travels**: Fact (sourced this run) / Inference (reasoned from facts — show the chain) / Hypothesis (testable, unverified) / Speculation (explicitly unsure).
- **Cheapest verification first**: prefer a 1-query tool pull over a subagent wake; prefer a subagent over a full sweep. Verify at the lowest cost that can actually falsify.
- **One verdict per question**: end with "Verdict: <one line> (label) → next action: <what/who>". If there is no next action, say "observation-only" — that is a legitimate ending.
- **Escalate doubt, never bridge it**: when evidence is inconclusive, state the doubt, what you verified, and the recommendation — the doubt travels to the Principal, it does not get papered over.

## Common mistakes

| Mistake | Fix |
|---|---|
| Framework named, then ignored | The declaration binds — reason inside it or re-declare |
| 5 Whys into the weeds (why → why → why → philosophy) | Stop at the first fixable shared cause |
| MECE branches that overlap | Two branches own one cause = not MECE; re-split |
| ICE scores invented from feeling | Each score cites its evidence; no-evidence = Confidence 1 |
| Verdict labels dropped under time pressure | The label is the product; a verdict without a label is a fail |
