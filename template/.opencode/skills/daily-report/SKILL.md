---
name: daily-report
description: Standardized executive marketing and telemetry performance report. Dynamically queries platforms configured during Onboarding (GA4 ×5, GSC, Agent Metrics, PostHog + Amplitude, D1 edge tap), runs cross-source metric reconciliation and root-cause anomaly diagnostics, and delivers 3 decision commitments.
---

# Standardized Daily Marketing Data Report Protocol

The daily heartbeat of CMO Studio. This is NOT a random metric dump; it is a structured, decision-grade analytical evaluation grounded in the company's verified onboarding stack.

## Operating Principles: No Custom Code, Real Telemetry
1. **Dynamic Platform Discovery:** Checks `workspace_settings` in SQLite (`storage_get_setting('enabled_platforms')` and `storage_get_setting('target_website')`). Only queries platforms the CMO enabled during Onboarding. The studio's own workspace runs the embedded stack below directly (no `enabled_platforms` setting is expected there).
2. **Packaged Analytical Skills:** Uses standard analytical frameworks:
   - `executive-summary-generator`: Top-line BLUF scorecard with WoW rate changes.
   - `metric-reconciliation`: Cross-source sanity checks (e.g. GSC clicks vs GA4 search sessions vs Web logs).
   - `root-cause-investigation`: 5-step causal diagnosis for any metric shift >20%.
   - `data-narrative-builder`: Actionable narrative connecting data to revenue and pipeline.
3. **Provable Truth:** Every figure quotes exact query and period. Blocked or unauthenticated platforms report as `blocked: <reason>` — never fabricated or filled from memory.

---

## The 8-Part Standardized Report Structure

Every daily data brief follows this strict structure:

### 1. Executive BLUF & Performance Scorecard
- **Top-Line Verdict:** 2-sentence summary of overall health, top gainer, and primary drag.
- **Scorecard Table:**
  | Metric Family | Current 24h/7d | Previous Period | WoW Delta (%) | Health State |
  |---|---|---|---|---|
  | Search Impressions (GSC) | ... | ... | ... | Normal / Surge / Drop |
  | Organic Search Clicks (GSC) | ... | ... | ... | Normal / Surge / Drop |
  | Qualified Site Sessions (GA4) | ... | ... | ... | Normal / Surge / Drop |
  | AI Crawler Visits (Agent Metrics) | ... | ... | ... | Normal / Surge / Drop |
  | Edge Hits (D1 site_requests) | ... | ... | ... | Normal / Scan / Surge |
  | Product / MCP Telemetry (PostHog + Amplitude) | ... | ... | ... | Normal / Surge / Drop |

- **Edge Hits read budget (2026-09-21 law):** exactly ONE 24h D1 pull per report; never `/stats`. Code 7500 (read-cap) → label the row `blocked: read-cap` and carry missing-not-zero.

### 2. Search Visibility & Organic Demand (GSC)
*(Active when `gsc` is in enabled platforms)*
- Top 10 queries by impressions, clicks, CTR, and average position.
- High-intent query gainers (+3 positions) and ranking losses.
- Click-through-rate (CTR) anomalies (high impressions with low CTR = title/meta tag revision opportunity).

### 3. Traffic & User Acquisition (GA4)
*(Active when `ga4` is in enabled platforms)*
- Total Sessions and Active Users over the last 7 days by date.
- Acquisition channel breakdown (Organic Search, Direct, Referral, Social).
- Top 5 landing pages with bounce rate and engagement duration.

### 4. AI Bot Traffic & Machine Readability (Agent Metrics)
*(Active when `agent-metrics` is in enabled platforms)*
- Total crawler hits in 24h via `daily_brief` and `bot_summary`.
- Breakdown by AI crawler family:
  - OpenAI: GPTBot (training) vs ChatGPT-User (search/action)
  - Anthropic: ClaudeBot (training) vs Claude-Web (search)
  - PerplexityBot: Perplexity indexing
  - Google: Google-Extended (Gemini training) vs Googlebot
- Markdown twin adoption (`/{slug}.md` and `llms.txt` requests vs standard HTML).

### 5. Product & Tool Telemetry
*(Active when analytics platforms like PostHog or Amplitude are configured in the workspace)*
- **Product Telemetry Table**:
  | Product / Tool | Installs | Active Sessions | Executions | Success | Errors |
- **Column Definitions**: Installs = new users/installs; Active Sessions = active sessions; Executions = actions/tools run; Success = executions delivering valid output; Errors = failed executions.
- **Top Error Triage**: Rank by affected unique users/installs, not raw error events to prevent retry-loop skew.
- **Client / Harness Breakdown**: Track distribution across major clients, IDEs, or operating systems.
- **Raw Telemetry Dumps**: Always written to `memory/daily/<YYYY-MM-DD>/artifacts/telemetry/`.
- **Open Source Repositories**: Track GitHub stars, forks, views, and clone trends. State settled dates on every figure.

### 6. Metric Cross-Reconciliation
*(Powered by `metric-reconciliation` skill)*
- Compares overlapping measurements across sources:
  - GSC Organic Clicks vs GA4 Organic Search Sessions.
  - Server Log Crawler Visits vs GA4 Bot Exclusions.
  - D1 edge per-host reqs vs GA4 sessions (D1 must be ≥ GA4 — it sees bots + no-consent hits GA4 drops).
  - D1 probe paths (`/wp-signup.php`, `/wp-login.php`, `.env/.git`) vs Agent Metrics top paths (must agree on flood days).
- Discrepancy explanation table with confidence tags:
  | Metric Comparison | Source A | Source B | Delta (%) | Reconciliation Mechanism |
  |---|---|---|---|---|
  | Search Traffic | GSC: X clicks | GA4: Y sessions | Z% | Attribution lag, redirect drops, or consent banner bounce |

### 7. Anomaly Root Cause Analysis
*(Powered by `root-cause-investigation` skill)*
For any metric deviating >20% from 7-day baseline, apply the 5-step diagnostic framework:
1. **Observed Anomaly:** Baseline vs actual with exact timeframe.
2. **Change Candidates:** Correlated releases, site changes, ranking drops, bot flood events, or tracking disruptions.
3. **Mechanism:** Direct causal chain linking change candidate to observed metric shift.
4. **Cascaded Impact:** Downstream effect on conversions, user trust, or indexing.
5. **Label & Falsifier:** `[Fact]` / `[Inference]` / `[Hypothesis]` + "This conclusion is invalidated if <X>".

### 8. WHAT WE SHOULD DO (The 3 Marketing Commitments)
Never an observation dump; max 3 concrete actions:
- **ACTION:** Specific, measurable task to execute today.
- **EVIDENCE:** The exact numbers from this run justifying the action.
- **EXPECTED IMPACT:** Measurable metric movement expected.
- **OWNER:** cmo (agent executes) / principal (requires human decision or API key) / builder (technical fix).

---

## Output File Contract
- Saved to `memory/briefs/<YYYYMMDD>-daily-report.md`.
- Summary index line appended to `memory/briefs/index.md`.
- Snapshot committed to `telemetry_snapshots` table in `db/state.sqlite` via `storage_record_telemetry_snapshot`.
- Dashboard updated per §9 (same numbers, one provenance).

---

## 9. Dashboard update (`dashboard/` — metrics + narrative, Evidence-compatible)

The brief is the day's snapshot; `dashboard/` is the maintained memory. Every run upserts the same numbers into both.

1. **Dispatch rows:** data-analyst returns include CSV-ready rows for every pulled table (daily grains + window grains + scorecard + commitments).
2. **GitHub history first:** `python3 dashboard/scripts/sync_github_history.py` (merges settled fleet history + our pulls), then upsert (cmo, idempotent): `python3 dashboard/scripts/append_daily.py --file <name> --row "..."` — same-key re-pulls replace, history is never deleted. Keys per file in the script's `KEYS`.
3. **Narrative:** append the brief link to `dashboard/pages/archive.md`; update standing reads on the touched pages only when the verdict changed (cite the run).
4. **Rules:** missing dates stay missing (never interpolate/zero-fill); `trusted=false` GSC rows never leave the dashboard (`brand_watch`/`gsc_summary` carry the flag); no secrets in CSVs.
5. **Regenerate:** `python3 dashboard/scripts/build_evidence.py --validate` (loads CSVs into local PG with exact-count checks + validates pages, must pass 0 errors) + `python3 dashboard/scripts/build_preview.py` (offline fallback) and commit both with the run.
6. **Commit** dashboard + brief + work doc together.

