# Open CMO Studio

> **The Production AI Marketing Harness for Modern Leaders and Growth Teams.**  
> Orchestrate, observe, and scale multi-agent marketing operations from a single unified command center.

[![Release](https://img.shields.io/badge/Release-v0.3.0-001858?style=flat&color=001858)](https://github.com/surendranb/open-cmo-studio/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-f582ae.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-macOS_Apple_Silicon-8bd3dd?color=001858)](https://apple.com)

---

## The AI Marketing Command Center

**Open CMO Studio** gives marketers, founders, and growth leaders a dedicated operating harness to run their entire marketing organization through autonomous AI agents.

Current AI workflows force teams into disconnected chatbot prompts where agents forget context, hallucinate metrics, and lack production observability. Open CMO Studio provides the full infrastructure stack needed to build, deploy, and manage specialized marketing agents with:

* **Persistent Experiential Memory**: Powered by Vectorize Hindsight, agents retain past experiment outcomes, brand voice calibrations, and domain heuristics across sessions. Knowledge compounds instead of resetting.
* **Full-Stack Observability & Tracing**: Native OpenTelemetry streaming into Arize Phoenix gives complete visibility into agent reasoning paths, latency waterfalls, and tool execution boundaries.
* **Continuous Evals & Quality Gates**: Trace evaluation pipelines test agent outputs against brand guidelines and analytical rubrics, preventing silent regressions.
* **Live System Adapters (MCP)**: First-class Model Context Protocol integration with Google Analytics (GA4), Search Console (GSC), developer communities, and headless browser automation.
* **Human-Gated Governance**: Built on a dual-regime architecture where the human principal gates durable truth and approves public releases, while the agent fleet operates high-cadence execution in parallel.

---

## Quickstart

Install the complete harness and daemon suite with a single command:

```bash
curl -fsSL https://raw.githubusercontent.com/surendranb/open-cmo-studio/main/install.sh | bash
```

### What It Provisions:
1. **The Core Workspace**: Pre-configured agent environment at `~/Documents/Open CMO Studio`.
2. **Arize Phoenix Engine**: Local OpenTelemetry trace collector and evaluation dashboard on port `6006`.
3. **Vectorize Hindsight Engine**: Long-term memory server on port `8888`.
4. **The Starter Fleet**: 7 specialized marketing agents and 40+ production marketing skills.

Launch anytime via the global terminal shortcut `open-cmo-studio` or the native desktop application.

---

## System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        OPEN CMO STUDIO HARNESS                         │
│                                                                        │
│   ┌─────────────────────┐   ┌──────────────────────────────────────┐   │
│   │   Arize Phoenix     │   │         Vectorize Hindsight          │   │
│   │   OTel Tracing      │   │      Long-Term Memory Engine         │   │
│   │   Port: 6006        │   │             Port: 8888               │   │
│   └──────────▲──────────┘   └──────────────────▲───────────────────┘   │
│              │                                 │                       │
│              └────────────────┬────────────────┘                       │
│                               │                                        │
│                 ┌─────────────▼─────────────┐                          │
│                 │     Agent Runtime Core    │                          │
│                 │   (OpenCode Orchestrator) │                          │
│                 └─────────────┬─────────────┘                          │
│                               │                                        │
│   ┌───────────────────────────┴───────────────────────────┐            │
│   │                   THE 7-AGENT FLEET                   │            │
│   │  • cmo            • data-analyst   • social-listener  │            │
│   │  • content-writer • designer       • devops-engineer  │            │
│   │  • distiller (memory consolidation & trace evals)     │            │
│   └───────────────────────────┬───────────────────────────┘            │
│                               │                                        │
│   ┌───────────────────────────┴───────────────────────────┐            │
│   │                  LIVE SYSTEM ADAPTERS                 │            │
│   │  • GA4 / GSC MCP  • Community/Reddit MCP • Playwright │            │
│   └───────────────────────────────────────────────────────┘            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## The 7-Agent Fleet

Open CMO Studio ships with an out-of-the-box roster designed to collaborate under executive direction:

| Agent | Core Function | Operational Scope |
|---|---|---|
| **`cmo`** | Executive Orchestrator | Translates business targets into execution contracts; coordinates subagent briefs; delivers daily BLUF decision memos. |
| **`data-analyst`** | Telemetry & Performance | Reconciles traffic trends across GA4 and Search Console; runs 5-Whys attribution; flags conversion bottlenecks. |
| **`social-listener`** | Market Intelligence | Monitors developer forums and subreddits for emergent pain points; scores commercial intent using ICE criteria. |
| **`content-writer`** | Technical Copywriting | Produces long-form guides, technical tutorials, and product updates aligned strictly with verified product capabilities. |
| **`designer`** | Visual Asset Direction | Generates high-contrast visual cards, architecture diagrams, and carousel layouts with calibrated color systems. |
| **`devops-engineer`** | Distribution & Edge | Builds static release assets, manages edge deployments (Cloudflare Workers/Pages), and automates release pipelines. |
| **`distiller`** | Quality & Memory Guard | Audits daily Phoenix traces for tool failures; consolidates operational heuristics into Hindsight memory banks. |

### Building Custom Agents
Add new agents by declaring their role in `.opencode/agent/<name>.md` and registering their runtime mode in `opencode.json`. Agents automatically inherit the harness's memory, tracing, and skill catalog.

---

## Enterprise Agent Infrastructure

### 1. Persistent Experiential Memory (Hindsight)
Conventional agents reset between turns. Open CMO Studio integrates Vectorize Hindsight so agents recall past campaign outcomes, channel nuances, and user preferences automatically:
- **Auto-Retain**: Captures operational milestones and corrections when an agent session concludes.
- **Dynamic Bank Partitioning**: Keeps memory banks strictly scoped per product, team, or workspace.
- **Context Injection**: Surfacing relevant past learnings before drafting new campaigns or analyzing anomalies.

### 2. Full Observability & Tracing (Phoenix)
Every LLM call, prompt template, tool interaction, and subagent delegation streams to Arize Phoenix via standard OpenTelemetry spans:
- **Trace Waterfalls**: Diagnose exact latency bottlenecks across deep multi-agent delegation trees.
- **Tool Reliability Audits**: Identify failure rates and schema mismatches across local MCP adapters.
- **Token Economics**: Monitor token consumption across agents and models.

### 3. Automated Evaluations & Quality Gates
The `distiller` agent runs scheduled evaluations against execution traces:
- **Hallucination Detection**: Verifies that claims made in drafts link directly to verified files or tool outputs.
- **Anti-Slop Compliance**: Flags and strips corporate buzzwords, passive prose, and empty claims before publication.
- **Heuristic Promotion**: Converts repeatedly validated task patterns into permanent skills.

---

## 40+ Packaged Marketing Skills

Open CMO Studio comes bundled with a comprehensive skill library covering every growth discipline:
- **Growth & Measurement**: `ab-test-analysis`, `funnel-analysis`, `cohort-analysis`, `metric-reconciliation`, `traffic-diagnosis`.
- **Strategy & Execution**: `competitive-teardown`, `problem-solving`, `premortem`, `launch-runbook`, `standup`.
- **Communication & Positioning**: `business-writing`, `technical-aeo-seo`, `journalism-ap`, `plain-language`, `scott-adams`.
- **Visuals & Design**: `high-end-visual-design`, `brandkit`, `minimalist-ui`, `illustrator`.
- **Diagnostics**: `5whys`, `bot-visibility`, `mcp-diagnosis`, `pagespeed`.

---

## License

MIT License. Designed for builders, marketing leaders, and founders scaling autonomous growth.
