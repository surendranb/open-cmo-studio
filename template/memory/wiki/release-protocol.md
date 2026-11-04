# Release protocol — every new project ships all eight

last-verified: 2026-10-05 (set by Surendran; amends the thread that found shipped builds missing from tracking)

A project isn't released until all eight steps are done. Skipping a step is allowed only with a written reason next to it. The watch-game miss (shipped, posted, zero store rows) is why this exists.

## The eight steps

1. **Studio page** — a page on the studio site with a one-line description and a link out.
2. **Repo with readme** — every project gets a repo carrying a real readme (what it is, how to run it, current state). Visibility is a per-project call: public or private, decided at release, recorded in the store. Private never excuses a missing readme.
3. **Store entry** — name, slug, category, repo link, live link, status (active / experiment / private), visibility. This is the row every dashboard reads.
4. **Ontology links** — the entity plus its edges: what pain it kills, what it reuses, who it competes with. No edges, no release.
5. **Metric wiring** — name the dashboard that reads it from day one: site stats, fleet stats, or repo stats. A project with no reader is invisible by construction.
6. **Standup slot** — name the beat that owns it. Web pages join the traffic read; servers join the fleet read; games and tools join the repo read.
7. **Goal link** — name the scoreboard number it moves. Usage first. No vanity rows.
8. **Announcement** — one post carrying the artifact (screenshot, link, or demo). Bare text notes don't count.

## Status ladder (revised 2026-10-05: only three states exist)

- **Live** — all eight steps done, no exceptions.
- **In Progress** — being built; repo + store row mandatory from day one, the rest land before launch.
- **Backlog** — spec'd or built but parked; row stays so tracking never loses it. A parked row older than a month gets re-graded or archived.

No-repo builds (e.g. WordPress sites): record "no repo" openly in the store row instead of faking one. The goal-link and standup-slot steps still apply in full.

## Backfill (first run, 2026-10-05)

Missing from the store despite working notes or public posts: watch game, signature generator, jobs board, agent-learning site, embed tool, studio site, personal blog. The flight-planner tool is third-party upstream, not ours — excluded. Skyroom and the decision-engine lab are prototypes — they enter as experiments when they get repos.
