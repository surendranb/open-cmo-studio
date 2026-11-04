---
name: standup
description: Daily standup routine — sweeps analytics, developer communities, and competitor signals to prioritize daily execution against company milestones.
---

# Daily Standup Routine

The daily standup is the heartbeat of the autonomous marketing workspace. Every morning, the CMO coordinates subagents to collect live ground truth, assess progress against quarterly goals, and propose a prioritized agenda for the day.

## The Standup Protocol

### 1. Telemetry & Performance Sweep (`data-analyst`)
- Pull verified metrics for active products across analytics endpoints (GA4, Google Search Console, database metrics, GitHub stars/forks).
- Compare today's metrics against baseline targets in `goals.md`.
- Identify statistically significant anomalies or drop-offs; conduct 5-Whys root cause analysis.
- Log raw data to `memory/daily/<today>/artifacts/` and return a 3-bullet BLUF.

### 2. Community & Ecosystem Radar (`social-listener`)
- Sweep target developer communities (Reddit subreddits, Hacker News, developer forums) defined in `memory/wiki/audience.md` and `memory/ontology/products.yaml`.
- Lane 1 (BUILD): Extract recurring user pain points, feature requests, and workflow gaps that your company can build to solve.
- Lane 2 (MARKET): Find active discussions where your company's product directly answers the question. Draft helpful, value-first response proposals.
- Output Opportunity Cards with ICE scores (Impact, Confidence, Ease: 1-10).

### 3. Competitor Intelligence Scan
- Scan tracked competitors for new feature releases, pricing shifts, landing page updates, or messaging changes.
- Record competitor moves and counter-strategies in the daily work log.

### 4. Working Backwards Prioritization (The CMO Gate)
- Reconcile scoreboard gaps: Which core metrics are lagging behind targets?
- Evaluate incoming opportunities: Fund external ideas ONLY if they advance an active roadmap milestone.
- Assemble today's prioritized agenda in `memory/daily/<today>/work.md`.

### 5. Report to the Principal
Deliver a concise morning brief:
- **TL;DR**: The 3 essential numbers and the single primary bet for today.
- **Traffic & Performance**: Key metric movements and root-cause explanations.
- **Community Opportunities**: High-conviction threads needing response review.
- **Competitor Moves**: Notable events requiring strategic counter-moves.
- **Today's Funded Agenda**: Concrete tasks the workspace will execute.

## Rules
- **Live Ground Truth**: Every metric and finding must cite verified data from this run. Never extrapolate or guess.
- **Human Gate**: The workspace drafts proposals, responses, and campaigns. The human Principal retains the exclusive authority to publish publicly and deploy to production.
- **No Idle Work**: If community channels yield no new signal, state it in one line and proceed. Never invent busywork.
