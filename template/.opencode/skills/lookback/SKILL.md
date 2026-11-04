---
name: lookback
description: Use when the 21:00 IST scheduled job fires or the principal says "look back" - the cmo's fixed order for closing the working day
---

## Use case: lookback

**Trigger**: scheduled daily 21:00 IST via opencode-scheduler, or `look back` from the principal. Products run 24x7 — this beat reads the full day, late. The day-folder mechanics live in `daily-checks`; this skill closes the day inside them.

## The order

1. **Collect the day** — read today's `work.md` (agenda + run log), the day's briefs and any adhoc docs beside it. List what shipped, what moved, what stayed blocked.
2. **Close the EOD section** — grounded in actual pulls where numbers are quoted (same grounding rule as briefs): executed vs carried-forward agenda items, one-line outcomes, links to briefs. Unexecuted checks are explicitly marked carried-forward.
3. **Learnings triage & Distillation** — for every line added to `memory/learnings.md` today (and any still untagged), append a destination tag: `skill` (procedural, repeated), `knowledge` (durable conclusion → wiki), `context` (workflow/convention correction → agent definition), or `keep` (still raw). Dedupe duplicates. Then refill traces first (`python3 scripts/backfill-phoenix-from-opencode.py --auto`, log to today's artifacts; it asks the store for its newest step and copies only local work after that, schedule owns truth, the idle plugin is best-effort only), then dispatch `distiller` (sequentially) to evaluate today's Phoenix execution traces via `scripts/evaluate-traces.mjs --score` (exit 2 = stale export, fix exporter before reading the score), audit tool errors, latency spikes, and anti-slop compliance, and convert tagged learnings into reviewable diff proposals in `memory/pending/`.
4. **Seed tomorrow** — create `memory/daily/<tomorrow>/work.md` on demand: agenda = carried-forward items + future-dated items landing tomorrow + decisions the principal flagged + watch-items from today's verdicts. Embed baseline numbers inline so each check is self-contained.
5. **Report to Surendran (Slack + Primitive Email)** — BLUF: the day in three lines (shipped / learned / what needs him), then tomorrow's agenda top items, and any new proposal diffs in `memory/pending/`.
   - **Slack**: Channel `C0BLW648J3T` (posts as @baiteam via slack MCP or Slack API fallback).
   - **Primitive Email (Standing)**: Send the complete lookback note to Surendran via Primitive email:
     `export PRIMITIVE_API_KEY=$(security find-generic-password -s PRIMITIVE_API_KEY -a studio-cmo -w)`
     `primitive send --to reachsuren@gmail.com --from cmo@odd-sheep.primitive.email --subject "Lookback — <Weekday Mon DD>" --body-file memory/daily/<today>/artifacts/lookback.txt --html-file memory/daily/<today>/artifacts/lookback.html`
     (ALWAYS HTML+plaintext multipart, Happy Hues #17 styling `#fef6e4` / `#001858`, native tables, never markdown-only). If email fails, state the error in the final output; the commit still counts as done.
6. **Commit** — one line: `lookback <date> — <one-line day outcome>`.

## Rules

- Nothing durable changes here: wiki, skills, agent definitions change only via distiller proposals the principal applies. This beat tags and seeds; it does not promote.
- No new work starts in this beat — findings become tomorrow's agenda, not tonight's investigation.
- Keep the EOD dense: an agenda item that moved one line; a verdict that changed direction three lines with its label.
- If the day had no runs, the lookback says so in one line and seeds tomorrow from carry-forwards only. Never silence, never ceremony.
