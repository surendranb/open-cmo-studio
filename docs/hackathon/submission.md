# Meta Global AI Developer Hackathon 2026 — Official Submission

**Platform**: Cerebral Valley ([cerebralvalley.ai/e/meta-ai-developer-hackathon](https://cerebralvalley.ai/e/meta-ai-developer-hackathon))  
**Track**: Startup Track / Build for Your World (Marketing & Autonomous Growth Operations)  
**Project**: Open CMO Studio  
**Repository**: [github.com/surendranb/open-cmo-studio](https://github.com/surendranb/open-cmo-studio)  
**Demo Video URL**: [Insert your 2-3 minute YouTube or Loom link here]

---

## Submission Form Fields (Turnkey Copy-Paste)

### 1. Project Title
`Open CMO Studio`

### 2. Elevator Pitch (< 200 characters)
`The production AI marketing harness. Orchestrate fleets of specialized agents from one command center with persistent memory, real-time trace waterfalls, and automated quality evals.`

### 3. Category / Track
`Startup Track — Build for Your World (Agentic AI Workspaces / Enterprise Productivity)`

### 4. Built With (Technologies & Models)
`Meta Model API, Meta Muse Spark 1.3, Arize Phoenix (OTel & Tracing), Vectorize Hindsight (Persistent Memory), Model Context Protocol (MCP), TypeScript, Python, macOS launchd`

---

## 1. Executive Summary & Impact (30% Rubric Weight)

**Open CMO Studio** is a production AI marketing harness that enables marketing leaders, founders, and growth teams to manage their entire marketing operation through fleets of autonomous agents.

Current AI workflows force teams into disconnected chatbot prompts where agents forget past experiments, hallucinate metrics, and lack production observability. Open CMO Studio provides an engineered operational harness that turns a single operator into a fully coordinated marketing organization:
* **The Central Command Center**: Directs strategy, reviews daily standup briefings, and approves public campaigns from one unified screen.
* **Persistent Team Memory**: Built on Vectorize Hindsight, agents retain past campaign outcomes, brand positioning, and audience reactions across every session. Marketing intelligence compounds over time.
* **Trace-Level Observability**: Native OpenTelemetry streaming into Arize Phoenix tracks agent reasoning paths, latency waterfalls, and tool execution down to the millisecond.
* **Continuous Quality Evaluations**: Automated scoring pipelines test copy and data analysis against brand guidelines and factual standards before publication.

---

## 2. Meta AI Tooling & Anti-Wrapper Architecture (25% Rubric Weight)

Open CMO Studio is an engineered multi-agent system, not a prompt wrapper. It deploys Meta's model family across specialized operational workloads:

| Workload | Meta Model / Tooling | Operational Role |
|---|---|---|
| **Executive Strategy & Reasoning** | **Meta Muse Spark 1.3** | Drives `cmo` decision memos and `data-analyst` 5-Whys telemetry attribution. |
| **Visual & Competitive Review** | **Meta Muse Vision** | Evaluates competitor landing pages and visual ad layouts via persistent browser sessions. |
| **High-Throughput Community Triage** | **Meta Muse Spark (Fast Inference)** | Filters high-volume forum and community discussions for customer pain patterns. |
| **Quality & Policy Filtering** | **Meta Guard / Policy Engine** | Enforces brand safety and content boundary policies before heuristics commit to memory banks. |

### Anti-Wrapper Proof
The system contains significant native engineering:
* **Lifecycle Supervision**: Native daemon manager orchestrating local OTel trace collectors and vector memory stores.
* **Deterministic Write Lanes**: Separation of human-gated company truth, agent scratch workspaces, and immutable audit logs.
* **Bidirectional MCP Adapters**: Live connectivity to production analytics (GA4), Search Console, and developer communities.
* **Trace Scoring Engine**: Custom evaluator (`scripts/evaluate-traces.mjs`) auditing live spans in Arize Phoenix for reliability, buzzword compliance, and epistemic labeling.

---

## 3. Technical Depth & Execution (20% Rubric Weight)

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

### The 7-Agent Fleet
1. **`cmo`**: Executive orchestrator; sets execution contracts, prioritizes initiatives, and delivers daily BLUF decision memos.
2. **`data-analyst`**: Reconciles live GA4 and Search Console telemetry; isolates traffic anomalies and conversion drops.
3. **`social-listener`**: Scans developer communities; scores commercial intent using ICE criteria.
4. **`content-writer`**: Drafts high-conviction technical tutorials and release communications grounded in verified features.
5. **`designer`**: Translates technical messaging into structured visual layouts and high-contrast social cards.
6. **`devops-engineer`**: Manages static site builds, Cloudflare edge deployments, and release distribution.
7. **`distiller`**: Evaluates daily Phoenix traces, audits tool failures, and consolidates verified heuristics into Hindsight memory.

---

## 4. 3-Minute Product Demo Walkthrough (25% Rubric Weight)

A tight, 180-second storyboard designed to showcase live execution and hit every judging criterion:

| Time | Scene | On-Screen Action & Narration | Rubric Addressed |
|---|---|---|---|
| **0:00 – 0:35** | **The Command Center** | Launch Open CMO Studio. Show the workspace at `~/Documents/Open CMO Studio`, the 7-agent roster, and the company truth wiki. *Narrate: "Marketing teams don't need another chatbot. They need an operating harness where specialized agents run their growth stack from one screen."* | **Impact** (Real-world utility) |
| **0:35 – 1:20** | **Autonomous Fleet in Action** | Trigger the morning standup. Show `cmo` dispatching `social-listener` to pull live community pains and `data-analyst` reconciling traffic drop-offs. CMO outputs a 3-bullet BLUF decision memo with concrete actions. | **Technical Depth** (Multi-agent coordination) |
| **1:20 – 2:05** | **Trace Observability (Phoenix)** | Open `http://localhost:6006`. Show the live trace waterfall of the standup execution: subagent delegation spans, tool latencies, and token usage. Run `node scripts/evaluate-traces.mjs --score` to show automated reliability and anti-slop scoring. | **Technical Depth & Anti-Wrapper** |
| **2:05 – 2:45** | **Experiential Memory (Hindsight)** | Open `http://localhost:8888`. Show the `open-cmo-studio` memory bank. Highlight an agent recalling a past audience reaction and auto-retaining a new heuristic. *Narrate: "Knowledge compounds over time. The fleet never makes the same mistake twice."* | **Impact & Architecture** |
| **2:45 – 3:00** | **Summary & Installation** | Show the 1-command installer: `curl -fsSL https://raw.githubusercontent.com/surendranb/open-cmo-studio/main/install.sh \| bash`. Conclude on the mission: autonomous marketing operations powered by Meta AI. | **Call to Action** |

---

## 5. Quickstart & Verification Instructions for Judges

Judges can verify the entire harness locally on any Apple Silicon Mac:

```bash
# 1. Run the one-command installer
curl -fsSL https://raw.githubusercontent.com/surendranb/open-cmo-studio/main/install.sh | bash

# 2. Launch the studio
open-cmo-studio

# 3. View live observability & memory dashboards
# Arize Phoenix Tracing: http://localhost:6006
# Vectorize Hindsight Memory: http://localhost:8888
```
