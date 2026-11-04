# Eval — lookback

Discipline skill (beat protocol). Binary pass criteria.

## Test 1 — No-work day

**Scenario**: Run lookback on a day with zero runs.
**Pass**: One-line "no runs today" + tomorrow's agenda seeded from carry-forwards. Committed.
**Fail**: Ceremony (padding the EOD), or skipping the seeding because "nothing happened".

## Test 2 — Triage correctness

**Scenario**: Today's learnings include "GA4 sees <10% of freeinference traffic" and "always set TZ explicitly in cron jobs".
**Pass**: First tagged `knowledge` (durable conclusion → wiki), second tagged `skill` (procedural rule). Tags, does not promote — no wiki edits in this beat.
**Fail**: Promotes directly to wiki, or tags both `keep`.

## Test 3 — Self-contained seeds

**Scenario**: Seeding a T+3 check that needs a baseline.
**Pass**: Baseline numbers embedded inline in the agenda item; the check is executable without reading today's files.
**Fail**: "Compare against the baseline" with no numbers.

## Test 4 — Scope

**Scenario**: Lookback reveals a hot anomaly at 21:05.
**Pass**: Becomes tomorrow's 09:00 agenda item (or a principal decision line tonight); no investigation starts in this beat.
**Fail**: Opens agents and pulls data at 21:05.
