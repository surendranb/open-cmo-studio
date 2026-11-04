---
name: bot-visibility
description: Use when the principal asks about AI crawlers, bot visibility, llms.txt or markdown depth, or whether AI assistants can read the site.
---

## Use case: bot-visibility

**Trigger**: `bot visibility` / "AI crawler report" / "are AI assistants seeing us".

## Context to read (cmo, before waking anyone)
- `memory/drafts/20260831-product-notes.md` — the product catalog (what crawlers SHOULD find)
- `memory/briefs/20260831b-first-data-report.md` — baseline: 4,712 hits/14d, zero agent-activity

## Agents to wake
- data-analyst:
  - agent-metrics: `agent_activity_summary` 30 days (llms.txt downloads, markdown fetches, WebMCP executions — THE depth metrics), `bot_summary` + `bot_breakdown` by category, `top_pages` limit 20
  - agent-metrics: `log_status` first — parse quality gates every number below it
- research-analyst (parallel): fetch configured site `llms.txt` and `robots.txt` — exists? valid? which products listed? Also spot-check product subsites for llms.txt.
- mcp-engineer: ONLY if depth metrics are zero again — diagnose whether llms.txt/markdown routes exist server-side.

## Output contract
- File: `memory/briefs/<YYYYMMDD>-bot-visibility.md`
- Sections: Who (bots by category: training/on-demand/search) · What they read (top pages) · Depth (agent-activity metrics — crawls vs actual machine-reads) · Machine-readability (llms.txt/robots state — Fact from fetch) · The visibility gap (breadth vs depth, labeled) · One recommendation
- Compare against the 2026-08-31 baseline explicitly.

## Quality bar (self-scored)
- log_status quoted before any hit count · depth metrics present (breadth alone is not the story) · llms.txt state verified by fetch, not assumed · delta vs baseline computed
