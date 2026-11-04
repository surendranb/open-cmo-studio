---
name: competitive-teardown
description: Systematic competitor analysis, feature parity matrix, pricing comparison, and sales battlecard generator. Deconstructs competitor moves into tactical market wedges.
---

# Competitive Teardown

A rigorous framework for analyzing market rivals, evaluating product feature parity, comparing pricing and packaging models, and generating sales/marketing battlecards.

## The Teardown Methodology

```
Phase 1: Product & Feature Classification
  ├── Table Stakes (Baseline features every vendor must have to compete)
  ├── Core Differentiators (Unique capabilities where vendors win deals)
  └── Anti-Features / Deliberate Non-Features (What vendors intentionally don't build)
  ↓
Phase 2: Pricing & Packaging Deconstruction
  ├── Value Metric Analysis (Seats, usage, API calls, tiers)
  ├── Expansion Gates (What triggers upgrades to higher tiers?)
  └── Hidden Friction (Sales calls required, annual lock-in, add-on surcharges)
  ↓
Phase 3: Positioning Counter-Tactics & Wedges
  ├── Where is the competitor strong? (Respect real moats; do not attack head-on)
  ├── Where is the competitor weak? (Complexity, latency, lock-in, price hikes)
  └── The Wedge: How to position against them in one sentence
  ↓
Phase 4: Battlecard Generation
  ├── Strengths & Weaknesses
  ├── "When to Walk" (Deals where the competitor is genuinely better)
  ├── "How to Win" (The winning talk track)
  └── "Landmines to Lay" (Questions to tell prospects to ask the competitor)
```

## Step-by-Step Teardown Protocol

### 1. Feature Parity Matrix
Construct a rigorous comparison table:

| Capability Area | Feature Name | Our Product | Competitor A | Competitor B | Classification |
|---|---|---|---|---|---|
| Infrastructure | Local-First SQLite | Yes | No (Cloud Only) | No | **Core Differentiator** |
| Operations | Standup Automation | Yes | Yes | Yes | **Table Stakes** |
| Reporting | Native OTLP Traces | Yes | Custom SDK | No | **Core Differentiator** |
| Identity | Cloudflare Auth Gate| Planned | SAML/SSO | OAuth | **Parity** |

### 2. Pricing & Monetization Teardown
Answer these critical questions:
- What is their public pricing vs estimated ACV (Annual Contract Value)?
- Is there a free tier or free trial? What are the usage limits?
- Where do customer reviews complain about pricing? (e.g. "surprise overage bills", "forced to enterprise tier for SSO").

### 3. Sales & Marketing Battlecard Structure

```markdown
# Battlecard: [Competitor Name]

## 1. Executive Snapshot
- **Headquarters & Funding:** [Fact]
- **Target Customer:** [Inference]
- **Core Claim:** [Quoted value prop]
- **Our Verdict:** [One-line positioning wedge]

## 2. When They Win (Their Genuine Moats)
- Where are they genuinely better than us?
- What customer profile should we NOT fight for against them?

## 3. When We Win (Our Unfair Advantages)
- 3 specific scenarios where our product crushes them.
- Direct proof points and customer metrics.

## 4. Landmines to Lay
Questions to plant in the prospect's mind before they meet the competitor:
1. *"Ask them how much it will cost when your usage triples next quarter..."*
2. *"Ask them if your data stays locally on your machine or is sent to their third-party vector DB..."*
3. *"Ask them how many developer hours are needed to configure their tracing SDK..."*

## 5. Defense: How to Handle Their Attacks on Us
- **Their Claim:** *"They are a new local tool without enterprise scale."*
- **Our Rebuttal:** *"We run natively on your machine with zero cloud latency and full data sovereignty, scaling automatically without cloud bills."*
```

## Grounding Rules
- Never smear or fabricate competitor flaws. Acknowledge their strengths with intellectual honesty.
- Cite sources for pricing, changelogs, and features with exact URLs.
