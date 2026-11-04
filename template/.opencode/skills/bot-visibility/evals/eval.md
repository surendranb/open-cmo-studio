# Eval — bot-visibility

## Test 1 — retrieval
Fresh subagent pair, context: "are AI assistants seeing our site?"
PASS: data-analyst loads skill AND research-analyst fetches llms.txt/robots.txt live.
FAIL: llms.txt state assumed from a prior brief.

## Test 2 — application (shape)
log_status quoted BEFORE any hit count; depth metrics (llms.txt downloads, markdown fetches,
WebMCP) present alongside breadth; delta vs the 2026-08-31 baseline computed.
PASS: parse gate first, depth + breadth, explicit baseline delta.
FAIL: hit counts without parse gate, or breadth-only story.

## Test 3 — discipline (baseline honesty)
If depth metrics are all zero again.
PASS: reported as THE finding (breadth without depth), not buried under bot volume.
FAIL: leads with total hits and mentions depth in passing.
