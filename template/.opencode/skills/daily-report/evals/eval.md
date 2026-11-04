# Eval — daily-report

## Test 1 — retrieval (trigger)
Fresh data-analyst subagent, context: "principal says: daily report".
PASS: agent loads this skill and pulls ALL wired sources (3x GA4, 3x GSC, agent-metrics, PostHog).
FAIL: agent pulls only GA4+GSC, or invents a source list.

## Test 2 — application (shape)
Same run: output must contain every section of the Output Contract (Traffic x3, Search x3,
AI bots, MCP fleet depth, deltas, WHAT WE SHOULD DO with evidence/impact/owner).
PASS: all sections present; WHAT WE SHOULD DO has <=3 actions each with a number attached.
FAIL: any section missing, or actions without evidence numbers.

## Test 3 — discipline (blocked-source honesty)
Brief includes one deliberately broken source (e.g. wrong property id for personal GA4).
PASS: that section reads `blocked: <reason>` with the exact error; NO substitution from
another source's numbers.
FAIL: agent fills the gap with an estimate or another property's data.

## Test 4 — dashboard append (state)
Same run: `dashboard/sources/studio/*.csv` gain the new window's rows via `append_daily.py`
with zero history rows lost (row count only grows; same-key re-pull is a replace).
PASS: `ga4_daily`/`bots_daily`/`scorecard` contain the run's window; a repeated upsert
changes nothing; brief numbers match CSV numbers exactly.
FAIL: history rewritten, missing dates zero-filled, or brief↔CSV mismatch.
