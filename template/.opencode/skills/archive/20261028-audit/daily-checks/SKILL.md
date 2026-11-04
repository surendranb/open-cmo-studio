---
name: daily-checks
description: Use when opening or closing a day folder, or when any run creates an action whose impact lands on a later day - the folder-per-day system mechanics that the standup and lookback beats run inside
---

## Use case: daily-checks

**Trigger**: start/end of a working day · any run that creates an action with delayed impact · writing a future-dated task.

## System
- One folder per day: `memory/daily/YYYY-MM-DD/`. Everything the day needs lives in the folder.
- One working doc: `work.md` — sections `## Agenda (seeded <date>)` → `## Standup (09:00)` → `## Run log` → `## EOD (21:00)`. Adhoc docs (research, one-off analysis) sit beside it in the same folder; `work.md` links them, never copies them.
- Agenda items carry scope tags: `company:` / `team:<crew>` / `project:<name>`, and name their data source + expected direction.
- **Scheduling rule**: when this run's action will show impact on day N, create or append to `memory/daily/<N>/work.md` TODAY (folder + file created on demand) — never rely on conversation memory. Embed baseline numbers inline so the future check is self-contained.
- **Link, don't copy**: run briefs stay in `memory/briefs/` (their index carries self-scores); the work doc links to them. No duplicates, no drift.
- **Learnings are global, not per-day**: lessons append to `memory/learnings.md` (one line each), not into day folders. The look-back triages them; the distiller promotes them.
- **Carry-forward rule**: unexecuted checks carry to the next day's agenda with a carried-forward marker — never silently dropped.

## Quality bar
- Every agenda item names its data source and expected direction · EOD numbers cite the pull that produced them · future folders exist before the run that created the action ends · zero copied briefs · carried-forward checks never dropped.

(End of skill)
