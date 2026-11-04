---
name: social-scan
description: Comprehensive Tri-Lane Social Scan Report protocol. Dynamically reads company profile and competitor watchlist from Onboarding, monitors Brand Pulse, Competitor Churn Signals, and Category Market Trends across Reddit and social channels, scores opportunities with ICE, and delivers actionable distribution plays.
---

# Tri-Lane Social Scan Report Protocol

The daily social listening and market perception radar for CMO Studio. It is NOT an unfocused keyword scrape; it is a structured, tri-lane radar directly grounded in the company's Onboarding ground truth (Step 1).

## Operating Principles: No Custom Code, Grounded in State
1. **Dynamic Entity Grounding:**
   - Reads `company_name`, `target_website`, and `company_slug` from `workspace_settings`.
   - Reads registered competitors directly from the `competitors` table in `db/state.sqlite` via `storage_list_competitors`.
   - Reads `memory/ontology/products.yaml` for domain vocabulary, pain patterns, and community channels across active products.
   - Reads ICP pain points and core narrative from `company_dossiers` (`03-messaging-and-positioning.md` and `04-icp-and-personas.md`).
2. **Packaged Skills & MCP Tools:**
   - MCPs: `reddit-marketing` (`reddit_scan_subreddit`, `reddit_search`, `reddit_social_sweep`), `parallel-search`, and `studio-storage`.
   - Skills: `reddit-radar`, `competitive-teardown`, `brand-voice`, `technical-aeo-seo`.
3. **Strict Authenticity Standard:**
   - Never generate spammy or promotional comments. Every recommended interaction provides genuine technical or domain value first, sharing open-source architectures or mechanisms, mentioning the product only if directly asked or organically relevant.
4. **WIP Limit & Disposal Enforcement:**
   - Before drafting any solution play into `memory/drafts/staged/`, execute `node scripts/enforce-draft-disposal.mjs --check-capacity`. If the queue has 3 active items, drafting is blocked until an existing draft is disposed.
   - All staged drafts carry YAML frontmatter with `staged_at`, `expires_at` (+24h), `project`, `target_thread`, and `problem_summary`.

---

## The Tri-Lane Radar Architecture

```
Step 1 Onboarding Truth (SQLite: workspace_settings + competitors + dossiers)
                                │
                                ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      TRI-LANE SOCIAL SCAN RADAR                        │
 ├─────────────────────────┬──────────────────────────┬───────────────────┤
 │ Lane 1: Company Pulse   │ Lane 2: Competitor Radar │ Lane 3: Category  │
 │ - Brand / URL Mentions  │ - Watchlist Competitors  │ - Macro Shifts    │
 │ - Bug Reports & Doubts  │ - Churn & Pricing Pain   │ - Unmet ICP Needs │
 │ - User Sentiment Trends │ - Feature Displacement   │ - GEO / Citations │
 └───────────┬─────────────┴────────────┬─────────────┴─────────┬─────────┘
             │                          │                       │
             ▼                          ▼                       ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │ Signal Triage & ICE Scoring (Impact × Confidence × Ease)               │
 │ Persisted to `signals` table via `storage_upsert_signal`               │
 └──────────────────────────────────┬─────────────────────────────────────┘
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │ Output: memory/briefs/<YYYYMMDD>-social-scan.md                        │
 │ Top 3 Engagement Plays (Thread URL + Value Hook + Draft Response)      │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## Lane Details & Execution

### Lane 1: Company & Brand Pulse
- **Query Strategy:**
  - Search Reddit, Hacker News, X, and technical forums for exact brand name, product slugs, and domain citations.
  - Queries: `"<brand_name>"`, `"<product_slug>"`, `"<domain>"`.
- **Key Indicators to Capture:**
  - Unresolved customer questions or onboarding friction.
  - Public bugs, outages, or negative sentiment spikes.
  - User praise, organic endorsements, and case study candidates.

### Lane 2: Competitor Watchlist Radar
*(Directly driven by competitors registered in `competitors` table during Onboarding)*
- **Query Strategy:**
  - For each competitor in `storage_list_competitors`:
    - Search for churn intent and dissatisfaction: `"<competitor>" alternative`, `"<competitor>" expensive`, `frustrated with "<competitor>"`, `leaving "<competitor>"`.
    - Search for recent competitor product updates, price hikes, or feature deprecations.
- **Key Indicators to Capture:**
  - High-intent displacement opportunities: buyers explicitly seeking alternatives that match your ICP.
  - Vulnerability analysis: where competitor users feel underserved or abandoned.

### Lane 3: Category & Industry Trend Sweep
*(Driven by ICP pain points and core narrative pillars)*
- **Query Strategy:**
  - Sweep active subreddits from `reddit-radar` registry (e.g. r/AI_Agents, r/mcp, r/SaaS, r/LocalLLaMA, r/TechSEO).
  - Search for category-level questions and emerging standards.
- **Key Indicators to Capture:**
  - AI Engine Optimization (GEO) citation opportunities: high-ranking Reddit comparison threads that ChatGPT/Perplexity cite.
  - Emerging category debates where authoritative founder/team participation creates high-leverage brand awareness.

---

## Signal Ingestion & ICE Scoring Protocol

Every notable signal identified across the 3 lanes is evaluated on a 1-10 scale and stored in SQLite:
- **Impact (1-10):** How much does winning this thread or addressing this issue move our core goals?
- **Confidence (1-10):** How certain are we that our solution directly solves the user's problem?
- **Ease (1-10):** How quick and frictionless is it to engage or resolve?
- **ICE Score Formula:** `(Impact * Confidence * Ease) / 100`

Call `storage_upsert_signal` to persist each opportunity to `db/state.sqlite`.

---

## Output Contract: Social Scan Brief

Saved to `memory/briefs/<YYYYMMDD>-social-scan.md`:
1. **Executive BLUF:** High-level sentiment pulse, top competitor vulnerability discovered, and primary market trend.
2. **Lane 1 Breakdown (Company Pulse):** Mentions, sentiment score, open user questions.
3. **Lane 2 Breakdown (Competitor Watchlist):** Activity by competitor, churn signals, comparison threads.
4. **Lane 3 Breakdown (Category Shifts):** Macro trends, new subreddits, high-visibility discussions.
5. **Top 3 Engagement Plays:**
   - **Target Thread:** URL, Title, Subreddit/Platform, Author.
   - **Context & Why It Matters:** 2-line explanation.
   - **Value-First Response Draft:** Concrete draft response adhering to `brand-voice` (practical, technical, zero marketing jargon).
   - **Expected Impact:** Awareness, traffic, or competitor displacement.
