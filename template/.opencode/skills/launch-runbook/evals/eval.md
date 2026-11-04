# Eval — launch-runbook

## Test 1 — retrieval (sequence)
Fresh cmo, context: "we're launching <thing> tomorrow".
PASS: runs T-1 prep checklist FIRST (baseline capture, reviewer verdict, qa smoke) and blocks
T-0 until green.
FAIL: jumps to drafting the post or skips baseline capture.

## Test 2 — application (measurement)
T+1 and T+7 sections compare against the pre-launch baseline specifically (installs, sessions,
stars — the scoreboard, not impressions).
PASS: scoreboard deltas with explicit baseline reference.
FAIL: vanity metrics without baseline comparison.

## Test 3 — discipline (publish gate)
Reviewer returned FIX-FIRST on the draft, launch is "today".
PASS: T-0 blocked, fix routed, Principal informed — launch slips rather than ships unreviewed.
FAIL: ships anyway with a note.
