# Meta Global AI Developer Hackathon 2026 — Official Submission

**Platform**: Cerebral Valley ([cerebralvalley.ai/e/meta-ai-developer-hackathon](https://cerebralvalley.ai/e/meta-ai-developer-hackathon))  
**Prize Pool**: $1,000,000  
**Deadline**: November 4–5, 2026  
**Repository**: [github.com/surendranb/open-cmo-studio](https://github.com/surendranb/open-cmo-studio)

---

## 1. Project Overview

* **Project Name**: Open CMO Studio
* **Tagline**: The Open-Source, Local-First AI Marketing Workspace for macOS.
* **Track / Category**: Agentic AI Workspaces / Enterprise Productivity / Developer Tools
* **Models Powered**: Meta Llama 3.3 (70B Instruct), Meta Llama 3.2 Vision (11B/90B Multimodal), Llama Guard.

---

## 2. Problem Statement

Marketing teams, technical founders, and growth leaders face a severe operational dilemma:
1. **SaaS Fragment Bloat**: Growth data is scattered across Google Analytics, Search Console, Reddit, and ad platforms, requiring constant manual context switching.
2. **Context Collapse & Hallucination**: Generic AI chatbots lack persistent memory, forgetting company truth, brand voice, and past experiment learnings from one session to the next.
3. **Data Privacy & Cloud Lock-in**: Enterprise marketing data and competitive intelligence cannot be sent to unvetted cloud routing middleware.

---

## 3. The Solution: Open CMO Studio

**Open CMO Studio** is an out-of-the-box, local-first marketing workspace packaged as a native macOS application. It transforms a single operator into a full executive marketing studio powered by Meta Llama.

### What Makes It Unique:
1. **Zero Cloud Dependencies**: Runs 100% locally on Apple Silicon with native `launchd` supervision.
2. **Local Observability & Memory**: Automatically provisions and manages **Arize Phoenix** (port 6006) for OpenTelemetry tracing and **Vectorize Hindsight** (port 8888) for long-term agent experiential learning.
3. **The 7-Agent Fleet**:
   - `cmo`: Executive orchestrator and decision strategist.
   - `social-listener`: Tri-lane Reddit and community opportunity scanner.
   - `data-analyst`: Deep telemetry reconciliation across GA4, GSC, and edge metrics.
   - `content-writer`: Technical copywriter aligned to brand voice.
   - `designer`: Visual asset producer using Happy Hues design palettes.
   - `devops-engineer`: Automated deployment and DNS management.
   - `distiller`: Nightly heuristic memory consolidation.
4. **40+ Packaged Marketing Skills**: From A/B test analysis and technical AEO/SEO to competitor teardowns and crisis communication.
5. **One-Command Setup**: A single `./install.sh` handles all dependencies, daemon registration, and workspace scaffolding in under 60 seconds.

---

## 4. Meta Llama Integration

Open CMO Studio leverages Meta Llama models at every layer of the marketing lifecycle:
* **Llama 3.3 70B Instruct**: Serves as the primary cognitive engine for the CMO and Data Analyst, executing multi-step reasoning, hypothesis testing, and 5-Whys root-cause attribution.
* **Llama 3.2 Vision**: Powers visual page teardowns and competitive ad review directly via persistent Chromium CDP sessions.
* **Llama Guard**: Enforces brand safety and privacy boundaries before data touches persistent memory.

---

## 5. Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Open CMO Studio                         │
│               Native macOS Application                      │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
       ┌───────▼────────┐             ┌───────▼────────┐
       │ Arize Phoenix  │             │   Vectorize    │
       │   OTel (6006)  │             │ Hindsight(8888)│
       └────────────────┘             └────────────────┘
               ▲                              ▲
               └──────────────┬───────────────┘
                              │
               ┌──────────────┴───────────────┐
               │    The 7-Agent CMO Fleet     │
               │   (CMO, Analyst, Listener)   │
               └──────────────┬───────────────┘
                              │
               ┌──────────────┴───────────────┐
               │      40+ Marketing Skills    │
               │    + Markdown Memory Wiki    │
               └──────────────────────────────┘
```

---

## 6. 3-Minute Demo Video Script

* **0:00 - 0:30 (The Hook & Installation)**:
  - Open terminal on a pristine Mac.
  - Run `curl -fsSL https://raw.githubusercontent.com/surendranb/open-cmo-studio/main/install.sh | bash`.
  - Show the 5 green checkmarks: uv installed, Phoenix registered, Hindsight registered, workspace scaffolded.
* **0:30 - 1:15 (The Workspace & Fleet Overview)**:
  - Launch `Open CMO Studio.app`.
  - Inspect the 7 marketing agents and the live Phoenix dashboard at `localhost:6006`.
* **1:15 - 2:15 (The 09:00 Autonomous Morning Standup)**:
  - CMO runs the morning routine: `social-listener` pulls real-time Reddit developer pains via MCP, `data-analyst` reconciles traffic anomalies without SQLite database locks.
  - CMO generates the daily BLUF report with concrete recommendations.
* **2:15 - 3:00 (Persistent Memory & Distillation)**:
  - Show Vectorize Hindsight (`localhost:8888`) retaining a corrected marketing heuristic.
  - Conclude with the open-source mission: local-first marketing autonomy powered by Meta Llama.
