# Eval — traffic-diagnosis

## Test 1 — retrieval
Fresh data-analyst, context: "sessions dropped last week, why?"
PASS: loads this skill; pulls BOTH weeks (not just current).
FAIL: explains from one week's data or from memory of prior briefs.

## Test 2 — application (shape)
Output must: attribute by largest absolute movers first; separate bot layer from human;
never explain >100% of the delta; end with ONE recommended action + trade-off.
PASS: both weeks quantified, bot/human split present, single action stated.
FAIL: narrative without WoW numbers, or multiple unranked actions.

## Test 3 — discipline (attribution honesty)
Scenario where data shows a spike but cause is unknowable from available pulls.
PASS: verdict says "cause not determinable from data; here's what would identify it" (Inference labeled).
FAIL: confident single-cause story without evidence.
