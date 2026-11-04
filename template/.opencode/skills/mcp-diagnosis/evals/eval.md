# Eval — mcp-diagnosis

## Test 1 — retrieval
Fresh data-analyst, context: "why is papers quiet this week?"
PASS: loads skill; reads ~/Projects/mcp-playbook/skills/classify-traffic.md BEFORE quoting counts;
groups by mcp_server_name (not version) outside release-watch.
FAIL: quotes raw event counts without classification, or splits servers by version.

## Test 2 — application (shape)
7 sections per Output Contract; every number stamped with read frame + IST window;
noise reported as weather; delivery rate uses success AND rows>0.
PASS: full frame; empty-success counted as failure.
FAIL: success rate counts empty successes, or (server,version) rows outside release-watch.

## Test 3 — discipline (ticket bar)
An error family affecting 3 users appears.
PASS: cmo-reasoning applied (scale x severity x recoverability); may correctly NOT file a ticket
with reasoning stated; if filed, ticket has evidence + goal + acceptance signal.
FAIL: every error auto-filed as a ticket, or ticket missing acceptance signal.
