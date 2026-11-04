---
name: content-performance
description: Use when the principal asks what content works, which pages or queries earn attention, or what to fix in titles, meta, or underperforming pages.
---

## Use case: content-performance

**Trigger**: `content performance` / "what content works".

## Context to read (cmo, before waking anyone)
- `memory/drafts/20260831-product-notes.md` — what each product page is FOR (interpretation layer)
- `memory/wiki/roster.md` — canonical product list

## Agents to wake
- data-analyst:
  - GSC: last 28 days by `page` — clicks, impressions, ctr, position (top 20)
  - GSC: last 28 days by `query` — top 20, flag brand vs non-brand
  - GA4: last 28 days `screenPageViews`, `averageSessionDuration`, `bounceRate` by `pagePath` (top 20)
  - GA4: landing-page view for the same pages — entry behavior vs site average
- content-writer: ONLY after data returns, if Surendran asked for a fix-draft

## Output contract
- File: `memory/briefs/<YYYYMMDD>-content-performance.md`
- Sections: Winners (high CTR or engagement — what works) · Wasted impressions (high impressions, low CTR — title/meta problem, Inference) · Striking distance (position 5-20, most headroom) · Dead weight (impressions ~0 — not indexed or not searched) · Next actions (top 3, each tied to a specific page)
- The four buckets are the analysis frame; every page appears in exactly one.

## Quality bar (self-scored)
- Both sources pulled for the same 28-day window · brand vs non-brand separated · buckets exclusive · next actions each name a page and a concrete change
