# Open CMO Studio

> **The Open-Source, Local-First AI Marketing Workspace for macOS.**  
> Built for the **Meta Global AI Developer Hackathon 2026** on [Cerebral Valley](https://cerebralvalley.ai/e/meta-ai-developer-hackathon). Powered by Meta Llama.

[![Meta AI Hackathon 2026](https://img.shields.io/badge/Meta_AI_Hackathon-2026_Submission-001858?style=flat&logo=meta&logoColor=white)](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)
[![License: MIT](https://img.shields.io/badge/License-MIT-f582ae.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-macOS_Apple_Silicon-8bd3dd?color=001858)](https://apple.com)
[![Status: v0.3.0](https://img.shields.io/badge/Release-v0.3.0-fef6e4?color=001858)](https://github.com/surendranb/open-cmo-studio/releases)

---

## What is Open CMO Studio?

**Open CMO Studio** turns a solo marketer or technical founder into a complete, autonomous 7-agent executive marketing studio.

Instead of paying for disjointed cloud SaaS subscriptions or pasting confidential strategy into black-box prompts, Open CMO Studio operates **100% locally on your Mac**:
* **Zero Cloud Dependencies**: Runs entirely on Apple Silicon.
* **Integrated Observability**: Bundled **Arize Phoenix** (port 6006) for local OpenTelemetry trace evaluation.
* **Persistent Heuristic Memory**: Bundled **Vectorize Hindsight** (port 8888) for continuous agent learning across days and weeks.
* **Standard External MCPs**: Pre-wired adapters for Google Analytics (GA4), Google Search Console (GSC), Reddit, and persistent Chromium browser automation.

---

## 30-Second Quickstart

Run the one-command installer in your macOS terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/surendranb/open-cmo-studio/main/install.sh | bash
```

### What the installer does:
1. **Verifies Prerequisites**: Checks Apple Silicon architecture and installs `uv` if needed.
2. **Registers Arize Phoenix**: Launches local OTel server on port `6006` with automatic `launchd` supervision.
3. **Registers Vectorize Hindsight**: Launches local memory daemon on port `8888` with automatic `launchd` supervision.
4. **Scaffolds Workspace**: Initializes your local marketing command center at `~/Documents/Open CMO Studio`.
5. **Verifies Health**: Runs automated HTTP health checks on ports `6006` and `8888`.

---

## The 3-Layer Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. CORE APP (Harness)                           │
│  • Electron Desktop Fork (arm64)      • Single version.json engine    │
│  • Managed Phoenix OTel (Port 6006)   • Managed Hindsight (Port 8888)  │
│  • macOS safeStorage Credential Vault • Persistent Chromium CDP Profile│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       2. CONTEXT LAYER (Workspace)                     │
│  • 7 Specialised Marketing Agents    • 40+ Packaged Marketing Skills   │
│  • External MCPs (GA4, GSC, Reddit)   • Markdown Memory Wiki & Ontology │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        3. ROUTINES (Rhythms)                           │
│  • 09:00 Morning Standup Sweep        • Real-Time Tri-Lane Social Scan │
│  • Campaign Copy & Visual Generation  • 21:00 EOD Memory Distillation  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## The 7-Agent Fleet

| Agent | Role | Capabilities |
|---|---|---|
| **`cmo`** | Executive Strategist | Roster orchestration, goal tracking, BLUF decision memos, cross-agent coordination. |
| **`social-listener`** | Market & Trend Scout | Tri-lane Reddit and community monitor, pain pattern extraction, ICE opportunity scoring. |
| **`data-analyst`** | Telemetry & Measurement | 5-Whys root cause analysis, GA4 and GSC telemetry reconciliation, bot crawl audits. |
| **`content-writer`** | Technical Copywriter | Long-form technical guides, launch announcements, newsletters in authentic builder voice. |
| **`designer`** | Visual Brand Director | Pixel-calibrated visuals, Happy Hues palettes, SVG diagrams, carousel layouts. |
| **`devops-engineer`** | Distribution Engineer | Static site builds, Cloudflare edge deployment, automated GitHub release workflows. |
| **`distiller`** | Memory & Protocol Guard | Nightly look-back review, trace scoring in Phoenix, heuristic consolidation in Hindsight. |

---

## Packaged Marketing Skills (40+)

Open CMO Studio includes a battery of tested engineering-grade marketing skills:
* **Analytics & Data**: `ab-test-analysis`, `funnel-analysis`, `cohort-analysis`, `metric-reconciliation`, `traffic-diagnosis`.
* **Strategy & Planning**: `competitive-teardown`, `problem-solving`, `premortem`, `launch-runbook`, `standup`.
* **Content & Communication**: `business-writing`, `journalism-ap`, `plain-language`, `technical-aeo-seo`, `scott-adams`.
* **Design & Visuals**: `high-end-visual-design`, `brandkit`, `minimalist-ui`, `illustrator`.
* **Observability & Health**: `bot-visibility`, `mcp-diagnosis`, `pagespeed`, `5whys`.

---

## Operational Rhythms

### 1. 09:00 IST — Morning Standup
The CMO coordinates `data-analyst` and `social-listener` to pull live data across search queries, edge traffic, and Reddit discussions, generating a 3-bullet BLUF briefing for the human principal.

### 2. Campaign & Asset Sprint
The fleet coordinates copy, design, and distribution:
* `social-listener` flags a recurring developer pain.
* `cmo` frames the positioning angle.
* `content-writer` drafts the tutorial.
* `designer` crafts the visual cards.

### 3. 21:00 IST — Nightly Distillation
The `distiller` agent evaluates all traces in Arize Phoenix, flags tool errors or hallucination anomalies, and stores winning heuristics into Vectorize Hindsight so the fleet grows smarter every day.

---

## License & Credits

* License: MIT
* Derived from the open-source OpenCode Desktop architecture.
* Observability powered by [Arize Phoenix](https://github.com/Arize-ai/phoenix).
* Memory persistence powered by [Vectorize Hindsight](https://github.com/vectorize-io/hindsight).
* Built for the Meta Global AI Developer Hackathon 2026.
