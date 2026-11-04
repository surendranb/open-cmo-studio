---
name: mcp-diagnosis
description: Use when the principal asks for MCP fleet health, or why a server is quiet, failing, or spiking. Fleet read: PostHog (9 servers) + Amplitude/CF Analytics Engine for google-analytics-mcp (SUR-338).
---

## Use case: mcp-diagnosis

**Trigger**: `mcp diagnosis` / "fleet health" / "why is <server> quiet|failing|spiking".

## Context to read (cmo, before waking anyone)
Methodology is defined in `surendranb/mcp-playbook` on GitHub (fetch via `gh api` or `webfetch` if needed, never local filesystem paths). Core queries and definitions are bundled directly into `data-analyst` and `daily-report`:
- `README.md` — operating rules: IST frame, (server, version) pairing, fleet-vs-era read frames, Signal-vs-Noise taxonomy, DATA-INSIGHT-ACTION
- `skills/classify-traffic.md` — FIRST, always: N1/N2/N3 machine noise vs U1 humans vs agents, before any number is quoted
- `skills/five-questions.md` — the standing playbooks (automated installs, human adoption, human-via-agent, autonomous agents, user errors)
- `skills/schema-reference.md` — event taxonomy + read traps (mcp_started is NOT a denominator; prompt_used prefetch trap; session_end multiplexing)
- `skills/metrics-definitions.md` — install/active/success/efficacy with denominators
- `skills/query-cookbook.md` — HogQL patterns: windows, filters, dedupe, exclusion lists

**Store routing (post-SUR-338, verified 2026-09-20):** `google-analytics-mcp` reads come from **Amplitude** (Dashboard REST Segmentation API; Keychain service `agent-core`, accounts `AMPLITUDE_API_KEY` + `AMPLITUDE_SECRET_KEY`) or **CF Analytics Engine SQL** (dataset `ga4_telemetry`; blocked until an Account Analytics token exists — the cloudflare-api call returns auth error as of 2026-09-20). The other 9 servers read from PostHog project 489528. A GA4 zero-count in PostHog is expected after 2026-09-15, never an outage.

## Agents to wake
- data-analyst: PostHog Query API — project 489528, `https://us.i.posthog.com/api/projects/489528/query`, HogQL from the cookbook. Credential: macOS Keychain service `PostHog-PAT` (`security find-generic-password -s PostHog-PAT -w`) — never printed, never committed. For `google-analytics-mcp` rows, the same agent reads Amplitude (Dashboard REST Segmentation API, Basic auth from Keychain service `agent-core`) — calls, delivery (`rows_returned > 0`), errors by tool, cap watch vs 2M/mo. Name the read frame (fleet/era/release-watch) in the brief; window in IST.
- mcp-engineer: only when diagnosis lands in code — error clusters by version, setup_flow failures, a regression between eras. Brief carries the exact event/property evidence.

## Output contract
- File: `memory/briefs/<YYYYMMDD>-mcp-diagnosis.md`
- Read traps: "success share" is NOT delivery in Amplitude — use `rows_returned > 0`; group_by an event property (and check the `(none)` bucket) before declaring it missing (2026-09-19 lesson).
- Default grouping: `GROUP BY mcp_server_name` — NOT (server, version). Local installs mean we control neither upgrade timing nor version mix; version breakdowns appear only in release-watch (section 5), never in population/quality sections.
- Sections (fleet read, IST window, U-class after classification):
  1. Population per server: true new installs (churn-deduped), connected, active, whales flagged
  2. Workhorse quality per server: data-delivery rate (success AND rows>0), empty-success counts, error-family mix, retry discipline
  3. Improvement backlog: user > served-user gap; error-only callers with error_category + sample intent texts
  4. Recovery & efficacy: recovery rate, brief efficacy, setup_flow reach vs conversion, tip/skill conversion
  5. Release watch (only <24h after a release): field-integrity NULL rates, error-mix delta, adoption pace — the ONLY (server, version)-grouped section
  6. Discovery darkness: install_intent referers, agent-install share — existence proofs, labeled dark
  7. DATA -> INSIGHT -> ACTION per finding: fix / ship / watch / nothing ("steady" is a complete answer)

## The causal chain (why this report exists)
**Goals -> users/usage -> patterns -> features to build or bugs to fix.**
Every read starts from goals, measures users & usage, extracts patterns, and ends in concrete work. A finding that names no goal and no user is trivia, not signal.

## Ticket workflow (the sweep's terminal action)
Errors worth fixing become issues in `github.com/surendranb/mcp-playbook` via `gh` (authenticated as surendranb), picked up by the mcp builder agent. The cmo reasons BEFORE filing — not every error deserves a ticket:
- **Worth fixing?** scale (users affected, U-class), severity (blocker vs friction vs cosmetic), recoverability (do they self-recover?)
- **What will it solve?** the specific user moment: which error family, which cohort, what they were trying to do (intent)
- **Which goal does it advance?** named from `goals.md` (if absent, the ticket states the goal hypothesis for Surendran to confirm)

Ticket template (title: `mcp-diagnosis <server>: <one-line pattern>`):
- EVIDENCE: counts + HogQL + IST window (from this run)
- PATTERN: the error family / cohort / empty-success signature
- PROPOSED FIX: what the builder should change (hypothesis, not spec)
- GOAL SERVED: from goals.md (or hypothesis)
- ACCEPTANCE SIGNAL: the metric that must move (e.g. data-delivery rate +X pts, retry discipline down)

## Quality bar (self-scored)
- classify-traffic applied before any count is quoted · GROUP BY mcp_server_name in all non-release sections · IST window named · no adoption claim from N-class events · every insight ends in one of the four actions · tickets carry evidence + goal + acceptance signal
