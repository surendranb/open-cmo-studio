---
name: intake-research
description: Collaborative company website onboarding and executive marketing discovery protocol. Takes a website URL, executes background pre-crawl homework, works interactively with the CMO across 5 discovery stations to calibrate ground truth, and compiles a durable 6-part marketing dossier.
---

# Collaborative Intake Research Protocol

The systematic, human-in-the-loop onboarding protocol for onboarding any new company or product into the Studio-CMO marketing engine.

## Core Principle: No Blank Slates, No Black Boxes

1. **No Blank Slates:** The agent always executes background pre-crawl homework first so the human CMO never has to fill out a tedious, 20-page questionnaire.
2. **No Black Boxes:** The agent never unilaterally finalizes marketing strategy, positioning, or competitive battlecards from public web copy alone. The CMO is the oracle for internal business reality, deal dynamics, and brand boundaries.

---

## The 5-Phase Collaborative Workflow

```
Input: Seed Website URL (e.g. https://example.com)
  │
  ├── Phase 1: Platform Selection & Safe Credential Onboarding
  │     ├── Ask CMO which platforms to connect (GA4, GSC, WP/Agent Metrics, PostHog, Reddit)
  │     ├── Provide safe credential setup guide (macOS Keychain / local .env — never in chat)
  │     ├── If WordPress selected: Guide Agent Metrics plugin installation (WP-CLI or ZIP)
  │     └── Store settings in SQLite via `storage_set_setting`
  │
  ├── Phase 2: Background Pre-Crawl Homework (Agent-Led)
  │     ├── Multi-page crawl: Homepage, Products, Pricing, Customers, About, Blog
  │     ├── External enrichment: Tech stack, initial competitor detection, search footprint
  │     └── Preliminary Draft Hypothesis compiled
  │
  ├── Phase 3: Interactive Discovery Workshop (Working with the CMO)
  │     ├── Station 1: Value Proposition & True Differentiator (Website vs Reality)
  │     ├── Station 2: Ideal Customer Profile (Economic Buyer vs Daily User)
  │     ├── Station 3: Field Competition & Real Sales Landmines (Who you actually fight)
  │     ├── Station 4: Brand Voice Spectrum & Lexical Kill List (Banned buzzwords)
  │     └── Station 5: Immediate 30-Day Growth Priority & Bottleneck
  │
  ├── Phase 4: Merged Dossier Compilation (memory/dossiers/<company-slug>/)
  │     └── Combines [Fact] with [CMO Validated] ground truth across 6 documents
  │
  └── Phase 5: SQLite Entity & Signal Seeding
        ├── Commit dossier records to `company_dossiers` table
        ├── Seed confirmed competitors into `competitors` table
        └── Upsert initial market signals into `signals` table
```

---

## Phase 1: Platform Selection & Safe Credential Protocol

Before diving into positioning and creative copy, the agent establishes the company's data and telemetry stack.

### 1. Platform Selection Matrix
Ask the CMO which data sources are active and desired:
- **GA4 (Google Analytics 4):** Site traffic, active users, session duration, landing page conversion.
- **GSC (Google Search Console):** Organic search impressions, clicks, click-through rates, ranking queries.
- **Agent Metrics (WordPress):** Real-time detection of AI crawler traffic (GPTBot, ClaudeBot, PerplexityBot), token spend, markdown twin hits (`/{slug}.md`).
- **PostHog:** Product event telemetry, feature usage, API error distributions.
- **Reddit / Social:** Brand mention monitoring, competitor churn complaints, category trend discovery.

### 2. Safe Credential Guidance (Zero Secrets in Chat)
Adhere strictly to house Rule 24 and the `credentials` protocol. Never ask the CMO to paste API keys, client secrets, or private tokens into the conversation.

Provide exact, safe terminal commands for macOS Keychain or local `.env`:
- **macOS Keychain (Recommended):**
  ```bash
  security add-generic-password -s agent-core -a GA4_PROPERTY_ID -w "<property_id>"
  security add-generic-password -s agent-core -a REDDIT_CLIENT_ID -w "<client_id>"
  security add-generic-password -s agent-core -a REDDIT_CLIENT_SECRET -w "<client_secret>"
  ```
- **Local Config:** Point to `.env` or project-local config with standard environment placeholders `${VAR_NAME}`.

### 3. Agent Metrics WordPress Plugin Installation
If WordPress is selected, provide the direct activation command or download link:
- **WP-CLI (One-line activation):**
  ```bash
  wp plugin install https://github.com/surendranb/agent-metrics/releases/download/latest/agent-metrics.zip --activate
  ```
- **WP Admin UI:** Navigate to `Plugins > Add New > Upload Plugin` and upload `agent-metrics.zip`.
- **API Token Verification:** Set `AGENT_METRICS_TOKEN` in Keychain or `.env` to enable the `agent-metrics` MCP server.

### 4. Persist Settings to SQLite
Commit the configuration to `workspace_settings` table via `studio-storage`:
- `target_website`: e.g. `https://builditwithai.xyz`
- `company_slug`: e.g. `builditwithai`
- `company_name`: e.g. `BuildItWithAI`
- `enabled_platforms`: JSON array, e.g. `["ga4", "gsc", "agent-metrics", "reddit"]`

---

## Phase 1: Background Pre-Crawl Homework (Agent Checklist)

Before asking the CMO a single question, the agent probes the public digital footprint:

| Target Surface | URLs to Probe | Key Facts to Extract for Homework |
|---|---|---|
| **Homepage** | `/` | Headline, hero subhead, primary/secondary CTAs, social proof claims |
| **Product** | `/product`, `/features`, `/solutions` | Core capability hierarchy, integration ecosystem, deployment models |
| **Pricing** | `/pricing`, `/plans` | Pricing tiers, value metric (seats/usage/flat), free tier vs gated demo |
| **Customers** | `/customers`, `/case-studies` | Customer logos, stated ROI metrics, targeted industry verticals |
| **About** | `/about`, `/company`, `/team` | Year founded, leadership, headquarters, mission statement |
| **Content** | `/blog`, `/resources`, `/docs` | Publishing cadence, content pillars, developer documentation depth |

---

## Phase 2: Interactive Discovery Stations (The CMO Interview)

Once homework is complete, the agent presents its findings and interviews the CMO sequentially across 5 focused stations:

### Station 1: Value Proposition & Real Differentiators
- **Agent Prompt:** *"I crawled your site and found your headline is `[Hero Copy]`. But in your own words, what is the single biggest reason customers choose you over every alternative? What can you do that nobody else can touch?"*
- **Outcome:** Calibrates public marketing claims against actual sales conversion reality.

### Station 2: Ideal Customer Profile (Buyer vs User)
- **Agent Prompt:** *"Your website features `[Case Studies / Logos]`. Who is the true economic buyer that writes the check (title, budget authority), and who is the practitioner using it daily? What is your sweet-spot company size?"*
- **Outcome:** Separates the economic buyer persona from the user persona.

### Station 3: Field Competition & Sales Landmines
- **Agent Prompt:** *"I detected `[Competitor A, B, C]` in search and category rankings. Are these the real vendors you fight in deals? What legacy tools, spreadsheets, or internal builds do you replace? What is the #1 objection prospects raise?"*
- **Outcome:** Produces battle-tested battlecards with actual competitive landmines.

### Station 4: Brand Voice Spectrum & Lexical Kill List
- **Agent Prompt:** *"How should our content sound (Technical & Precise vs Conversational & Energetic)? More importantly: what buzzwords or phrases do you strictly forbid across all marketing copy?"*
- **Outcome:** Establishes the 4-dimension tone matrix and the banned buzzword kill list.

### Station 5: Immediate 30-Day Growth Priority
- **Agent Prompt:** *"What is your primary marketing bottleneck right now? (e.g. Top-of-funnel reach, landing page conversion, developer documentation, or competitor displacement)?"*
- **Outcome:** Dictates the initial marketing plays in Dossier 06.

---

## Output Contract: 6-Part Durable Dossiers

Every completed onboarding generates 6 markdown files under `memory/dossiers/<company-slug>/`:

1. `01-company-profile.md`: Overview, business model, scale, governance, and infrastructure.
2. `02-products-and-pricing.md`: Product architecture, packaging tiers, value metrics, self-serve friction.
3. `03-messaging-and-positioning.md`: April Dunford positioning framework, 3-5 core narrative pillars.
4. `04-icp-and-personas.md`: Firmographics, Economic Buyer profile, Practitioner User profile, objections.
5. `05-competitive-landscape.md`: Feature parity matrix, direct/indirect competitors, sales battlecards.
6. `06-marketing-baseline-and-opportunities.md`: Channel inventory, CRO audit, 30-day growth plays.

---

## Grounding & Epistemological Labeling Standard

Every claim in the dossiers and interview briefs MUST carry an explicit label:
- `[Fact]` — Objectively verified from web pages, SEC filings, or DNS/tool lookups.
- `[CMO Validated]` — Directly confirmed, corrected, or provided by the human CMO.
- `[Inference]` — Synthesized analytical conclusion derived from facts.
- `[Hypothesis]` — Market assumption or growth play pending future telemetry.

