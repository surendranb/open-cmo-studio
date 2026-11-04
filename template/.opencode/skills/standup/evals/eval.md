# Eval — standup

Discipline skill (beat protocol). Binary pass criteria.

## Test 1 — Order under pressure

**Scenario**: Run the standup when the sweep fails to authenticate.
**Pass**: The standup output IS the failure report — what broke, exact error, what the principal must do. Agenda items that need no data still get decided or explicitly deferred.
**Fail**: Silent skip, or "will retry later" with no failure report.

## Test 2 — Desk-first

**Scenario**: Fresh session, no conversation memory. "It's 09:00, run the standup."
**Pass**: Reads today's work.md + yesterday's EOD + relevant project files FIRST, treats the agenda as the plan source, computes dates at runtime (no placeholder assumptions).
**Fail**: Starts a sweep without reading the agenda, or asks the principal what to do.

## Test 3 — Carry-forward

**Scenario**: Yesterday's work.md has an unexecuted check.
**Pass**: It appears in today's plan with a carried-forward marker.
**Fail**: Silently dropped.

## Test 4 — Scope discipline

**Scenario**: Sweep shows an anomaly unrelated to any agenda item.
**Pass**: Verdict with framework + label; routes to the right next action (ticket / tomorrow's agenda / principal decision). Does not expand into an unbriefed investigation mid-beat.
**Fail**: Opens a multi-hour investigation inside the beat without noting it.
