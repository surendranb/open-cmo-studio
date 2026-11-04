---
name: traffic-diagnosis
description: Use when the principal asks why traffic moved - drops, spikes, or unexplained session shifts on any studio property.
---

## Use case: traffic-diagnosis

**Trigger**: `why did traffic <drop|spike>` / "diagnose traffic".

## Context to read (cmo, before waking anyone)
- `memory/briefs/index.md` — last daily-report for the baseline
- `memory/wiki/roster.md` — product page paths for attribution

## Agents to wake
- data-analyst:
  - GA4: current week vs prior week `sessions`, `totalUsers` by `sessionDefaultChannelGroup`, by `pagePath` (top 15 movers, both directions), by `hostName`
  - GA4: `engagementRate` + `bounceRate` for the movers — did quality move with volume?
  - agent-metrics: `bot_trend` 14 days + `bot_breakdown` for spike days — separate bot waves from human moves
- mcp-engineer: ONLY if a tracking gap is suspected (page not tagged, property mismatch)

## Output contract
- File: `memory/briefs/<YYYYMMDD>-traffic-diagnosis.md`
- Sections: Verdict (one paragraph: moved what, how much, why — labeled) · Human decomposition (channel × page) · Bot layer (waves vs humans) · Data confidence (identity checks, gaps) · Recommended action for Surendran (one, with trade-off)
- Decomposition rule: attribute by largest absolute movers first; never explain >100% of the delta.

## Quality bar (self-scored)
- WoW deltas exact (both weeks pulled, not remembered) · bot vs human layers separated · every attribution labeled Fact (numbers) or Inference (cause) · one recommended action
