---
name: reddit-radar
description: Use when the principal asks for the weekly social scan, reddit radar, or what the community is saying about MCP servers, tools, or the studio's products.
---

## Use case: reddit-radar

**Trigger**: `reddit radar` / "social scan" / "what's the community saying" (weekly default — Monday).

## Context to read (cmo, before waking anyone)
- `goals.md` — the chain: goals -> users/usage -> patterns -> work
- `memory/ontology/portfolio.yaml` — the 37 live projects on builditwithai.xyz with domain vocabularies, pain patterns, and targeted subreddits
- `memory/drafts/20260831-product-notes.md` — the catalog a build-opportunity must map onto
- Last radar brief (if exists) — recurrence tracking across weeks beats single-week virality

## Subreddit registry (ground-truthed via API 2026-09-02; 60 alive; re-probe monthly)
Purpose tags: **B** = BUILD lane (pain mining, product ideas) · **M** = MARKET lane (participation, distribution). Why Reddit matters: top referrer for writing-skills on GitHub (61 views, #1 source) AND top-cited domain for AI answers (GEO) — registry participation is traffic + AI-citation corpus placement.

**TIER-1 — daily, /new + /hot (~23 calls):**
r/mcp (BOTH, ~56/d) · r/AI_Agents (BOTH, ~144/d) · r/ClaudeCode (BOTH, ~400/d) · r/Codex (B, ~329/d) · r/ClaudeAI (BOTH, ~160/d) · r/cursor (BOTH, ~45/d) · r/LocalLLaMA (M, ~47/d) · r/LLMDevs (B, ~427/d) · r/opencode (BOTH lean M — our harness's home sub) · r/SideProject (M, ~550/d, show-and-tell lane) · r/ChatGPTCoding (M, ~6/d — high-intent exception, 1 extra call)

**TIER-2 — Mon/Wed/Fri, /new (26 subs):**
AI-visibility cluster: r/GenEngineOptimization (BOTH lean M — top post = agent-metrics's promise verbatim; PROMOTE to Tier-1 during agent-metrics push weeks) · r/GrowthHacking (M) · r/LangGraph (BOTH, MCP show-and-tell welcomed)
Free/local-LLM cluster: r/ollama (M, ~41/d) · r/LocalLLM (M, ~234/d) · r/DeepSeek (M, ~18/d) · r/MistralAI (M, free-tier demand visible)
Analytics cluster: r/GoogleAnalytics (M, the live GA4 home) · r/analytics (B, ~11/d) · r/bigseo (BOTH, tool recs carry weight) · r/TechSEO (M, ~9/d) · r/SEO (M) · r/BigQuery (B, thin — GA4→BigQuery export angle)
WordPress cluster: r/Wordpress (M, ~28/d) · r/WordPressPlugins (M, plugin-launch fit) · r/ProWordPress (M, high signal low volume)
Builder cluster: r/SaaS (M, ~248/d) · r/microsaas (M, launch-friendly) · r/indiehackers (M) · r/opensource (M, MCP servers are OSS) · r/CursorAI (M, dupe-ish of r/cursor)
Also: r/Anthropic (B, ~42/d) · r/perplexity_ai (M) · r/windsurf (B) · r/GithubCopilot (M, ~39/d)

**WATCH — weekly digest (22 + discovery adds):**
r/OpenAI · r/ChatGPT · r/GeminiAI (~271/d) · r/AI_Tools · r/juststart · r/local_seo · r/content_marketing · r/Affiliatemarketing · r/digital_marketing · r/webdev · r/Entrepreneur · r/EntrepreneurRideAlong · r/startups · r/roastmystartup · r/dataengineering · r/MachineLearning · r/singularity · r/artificial · r/selfhosted (homelab-focused, weak fit) · r/dataanalysis (SQL/BI audience) · r/wikipedia (curation posts, not tooling) · r/developerproductivity (near-dormant)
**Discovery adds (2026-09-02, day 1)**: r/free_llm_api_chat (TIER-2 M, micro/exact) · r/AISearchAnalytics (TIER-2 BOTH, micro/exact) · r/tryprofound (WATCH — competitor community, intel) · r/n8n (WATCH, automation crowd) · r/PromptEngineering (WATCH, 412K adjacent)

**DEAD (never re-probe):** r/ga4 (236d) · r/google_gemini (260d) · r/vibe_coding (126d) · r/shamelessplug (404) · r/LocalAI (403) · r/answerengineoptimization (404) · r/SEO_GEO (zombie 459d)
**Variant rule**: one variant per name-pair is alive; carry the live variant only (ga4→GoogleAnalytics, google_gemini→GeminiAI, vibe_coding→vibecoding).

**RULES-RISK flags (verify sidebar before routing any reply)**: bigseo, SEO, juststart, content_marketing, Affiliatemarketing, digital_marketing, webdev, Entrepreneur, startups — Inference from sub norms, not fetched text.

**Mention searches — 2×/week, `/search?q=…&restrict_sr=1&sort=new&t=week`**:
"agent-metrics" · "free llm api" · "free inference" · "ga4 mcp" · "search console mcp" · "macos mcp" · "ai crawler"

**DAILY DISCOVERY STEP (standing, principal-directed 2026-09-02)**: `oauth.reddit.com/subreddits/search?q=<topic>&limit=8` — 2-4 topic seeds per day, ROTATED from the seed vocabulary: "free llm api" · "llm inference" · "mcp server" · "model context protocol" · "ai crawler" · "ai visibility" · "generative engine optimization" · "wordpress analytics" · "ga4" · "claude code" · "ai agents" · "token pricing" · "self-hosted llm" · "llm routing" · "indie ai saas" · "opencode". Collect subs NOT already in this registry → probe alive ones (1 call each) → add with tier + purpose tag → report NEW SUBS in the daily output (name, size, one-line fit). Micro-subs (<1k members) with exact-topic fit are WORTH tracking (r/free_llm_api_chat, r/AISearchAnalytics found this way); competitor communities (r/tryprofound = Profound, AI-visibility analytics) are intel sources. Day-1 validation: 2 seed calls → 4 new subs.

**Endpoint map**: `/new` = distribution openings · `/hot` = trend detection · `/top?t=day` = cross-check, tier-1 only · `/subreddits/search` = daily discovery. Budget: OAuth 60 req/min — daily pass ≈ 23 calls + discovery ≈ 4-8, Monday radar ≈ 65 paced, mention day ≈ 12. Free-inference conversion window: the 48h after a vendor repricing event (Ollama Sep 1 → 7 threads/24h). GEO note: niche subs out-cite giant generalists; comparison/recommendation threads are the engines' favorite source material.

## Agents to wake
- social-listener (single run, both lanes — see agent brief for sources):
  - **Route (primary): `reddit-marketing` MCP** — the local server wraps the Reddit OAuth app-only flow (creds in Keychain service `agent-core`: `reddit-client-id` / `reddit-client-secret`; token never printed). Tools: `reddit_social_sweep` (multi-sub sweep), `reddit_scan_subreddit` (/new, /hot per sub), `reddit_search` (keyword, optional subreddit). 60 req/min budget. Fallback chain: raw OAuth reads (`oauth.reddit.com`, client_credentials grant, UA `builditwithai:social-listener:v1.0 (by /u/surendranb)`) → RSS via parallel-search (stale-snapshot caveat on r/mcp, r/ClaudeAI) → site:reddit.com searches. Subreddit discovery (`/subreddits/search`) still runs raw OAuth — the MCP has no tool for it.
  - Lane 1 BUILD: 6 subreddits /new + pain-phrase searches; return opportunity cards
  - Lane 2 MARKET: product + competitor mention scan; answerable threads with draft replies; positioning quotes verbatim
- content-writer (optional, after data returns): expand the top 1-2 draft replies into postable form — Surendran still publishes. Staged into `memory/drafts/staged/` only if `node scripts/enforce-draft-disposal.mjs --check-capacity` succeeds (max 3 active items, with 24h TTL frontmatter).

## Output contract
- File: `memory/briefs/<YYYYMMDD>-reddit-radar.md`
- Sections: Build opportunities (ranked: recurrence > size > fit) · Answerable threads (thread, sub, rules-fit, draft reply) · Positioning gold (verbatim quotes + links) · Competitor moves (what rivals shipped/announced, Inference labeled) · CMO routing: per item — ticket to mcp-playbook / feature candidate / reply-to-send / watch
- Every claim: link + date. Stale threads (>\30 days) labeled.
- Draft staging: All draft responses staged to `memory/drafts/staged/` must pass `--check-capacity` and carry `expires_at` (+24h).

## Quality bar (self-scored)
- Both lanes populated · recurrence logic applied (3 independent threads > 1 viral) · drafts helpful-first · nothing posted anywhere · routing decisions stated per item
