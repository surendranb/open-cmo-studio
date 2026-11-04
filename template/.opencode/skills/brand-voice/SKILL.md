---
name: brand-voice
description: Brand voice extraction and style guide codification. Analyzes existing copy across 4 tone dimensions, extracts lexical rules, and defines "sounds like / doesn't sound like" boundaries.
---

# Brand Voice & Style Guide Codification

Methodology for analyzing existing company communications, identifying voice DNA, and codifying a strict, operational style guide for automated agent writers.

## The 4 Tone Dimensions (Nielsen Norman Scale)

Position the brand voice on each of the four fundamental axes:

```
Dimension 1: Funny  <------------------->  Serious
Dimension 2: Formal <------------------->  Casual
Dimension 3: Respectful <--------------->  Irreverent
Dimension 4: Matter-of-Fact <----------->  Enthusiastic
```

### Tone Archetypes:
- **Developer Tools / Infrastructure:** Serious (technical), Casual/Direct, Respectful, Matter-of-Fact (zero hype).
- **Enterprise SaaS:** Professional/Builder, Confident, Collaborative, Human.
- **Consumer / Community:** Playful, Casual, Community-Driven, Enthusiastic.

## The "We Are X, But Not Y" Framework

Define the voice boundary rules using contrasting pairs to prevent drift:

| We Are... | But We Are NOT... | Why / Operational Rule |
|---|---|---|
| **Authoritative & Expert** | Arrogant or Condescending | State facts with source data; never talk down to practitioners. |
| **Direct & Concise** | Blunt or Incomplete | Respect reader attention; provide complete answers in fewer words. |
| **Technical & Grounded** | Jargon-Choked or Academic | Use standard industry terminology; explain obscure acronyms immediately. |
| **Energetic & Forward-Looking** | Hype-Driven or Sycophantic | Celebrate real engineering accomplishments; ban hyperbolic buzzwords. |

## Lexical Rules & Vocabulary Guide

### 1. Banned Buzzwords (The Kill List)
*Never use in drafts or customer communications:*
- "Revolutionary", "Game-changing", "Disruptive", "Paradigm shift", "Synergy", "Next-gen", "Seamless", "Supercharge", "Unleash", "Delve", "Tapestry", "Testament".
- Replace every buzzword with the **specific operational mechanism** (e.g. replace *"Revolutionary data processing"* with *"Zero-copy SQLite queries under 5ms"*).

### 2. Preferred Vocabulary
- Action-oriented verbs: *Ship, build, verify, resolve, benchmark, inspect, instrument, deploy*.
- Precise nouns: *Latency, throughput, telemetry, contract, boundary, harness, pull request*.

## Before vs After Calibration Examples

### Example 1: Product Announcement
- **Generic AI Voice (Wrong):**
  > *"We are thrilled and excited to announce our revolutionary new agent platform that empowers teams to unlock unprecedented synergies in their marketing workflows!"*
- **Calibrated Brand Voice (Right):**
  > *"We shipped Studio-CMO v0.2.0. It runs 14 autonomous marketing agents natively on macOS, exports OpenTelemetry traces to Langfuse, and cuts campaign turnaround from days to 15 minutes."*

### Example 2: Explaining a Technical Advantage
- **Fluffy Voice (Wrong):**
  > *"Our unique, cutting-edge architecture ensures that your data is safe and sound, delivering peace of mind for enterprises everywhere."*
- **Calibrated Brand Voice (Right):**
  > *"All SQLite state stays on your local machine in WAL mode. Traces stream over standard OTLP with client-isolated API keys. Zero cloud lock-in."*

## Output Contract: Brand Voice Dossier Section

When analyzing a company during intake, summarize voice findings in `memory/dossiers/<company-slug>/03-messaging-and-positioning.md` under `## Brand Voice & Tone`:
1. 4-Dimension Scores (1-5 for each dimension).
2. 3 Core Voice Principles.
3. Banned Terminology & Required Vocabulary.
4. One Before vs After Rewrite illustrating the company's authentic voice.
