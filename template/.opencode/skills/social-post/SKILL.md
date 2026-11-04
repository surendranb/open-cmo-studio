---
name: social-post
description: Use when the principal wants to announce studio work on X or LinkedIn, or asks for a social post about a product, release, or launch.
---

## Use case: social-post

**Trigger**: "post about X" / "announce <product>" / "social announcement for <thing>".

## Context to read (cmo, before waking anyone)
- `memory/wiki/identity.md` — voice: technical, honest, zero hype
- `goals.md` — the usage-first scoreboard; announcements serve installs/usage
- Product notes / measurement plan — the verified facts the post may claim

## Agents in order
1. research-analyst: claim verification + platform best practices (what's safe to say, timing, format norms) — REQUIRED before any draft
2. content-writer: X main post (results-first, ≤280 chars, no links, no hashtags) + first reply (link + how-to-test) + optional second reply (honest caveats); LinkedIn carousel script 8-10 slides, hook = claim not announcement, first-2-lines <210 chars
3. designer: creatives as HTML → Playwright renders — X cards (1200×675 PNG) + LinkedIn carousel as ONE assembled PDF (8-10 pages, 1080×1350) — house palette only (cream #fef6e4, navy #001858, pink #f582ae, teal #8bd3dd), ≤7 words per slide, caption sets up / image pays off
4. data-analyst: T+1 and T+7 performance harvest. X via studio browser-profile session if live (check cookies first; 401 on 2026-09-14 = expired — report blocked, never re-auth with anyone else's credentials); LinkedIn has NO session — public metrics only (reactions/comments/reposts visible, impressions need his screenshots). Per post: X analytics (impressions, replies, reposts, likes) and LinkedIn per-post analytics incl. per-slide views on document posts. Read-only, two touches per post, no engagement actions. Session expired → `blocked: session expired — re-login needed`. Results → `memory/briefs/<date>-post-performance.md`, then cmo runs `python3 social/ingest.py metrics --post-id <id> --days <n> ...` and regenerates `python3 social/dashboard.py` (publish-time: `ingest.py post ...`)
5. reviewer: binary rubric on every draft before the Principal sees anything
6. cmo integrates → Principal publishes and owns the first hour of replies

## Designated browser (No-API Browser Doctrine)
When an external platform lacks an API, the Principal logs in once via the designated browser profile; agents drive the live DOM thereafter.
- Profile path configured in workspace environment.
- Read-only data extraction; no unauthorized automated engagement.
- If a session expires (401), report `blocked: session expired — re-login needed`.

## Build-in-Public Update Format
When sharing company updates, follow the builder update format:
- Structure: Clear opening ("This week, we built...") → what it does in plain language → hard part / technical obstacle overcome → what's next → open question to practitioners.
- Ground rules: Direct, honest, real numbers, zero hype adjectives, never "excited to announce".
- X adaptation: Main post ≤280 chars (no links) + reply thread with link and technical caveats.
- LinkedIn: Carousel slides or concise text post with links in the first comment.

## Voice & Structure
Structure: **What it is → Why it matters (the insight) → What we built (with the differentiator) → How to try it (doors) → For builders.**
1. Analogy is the PRIMARY tool in social writing when it compresses the concept (restaurant/menu). The house no-analogy law applies to ANALYTICAL artifacts only (briefs, RCAs). One central analogy per post, carried through.
2. Explain the CAUSE before the capability: give a model of the world ("a form is a conversation squashed into boxes — a page could not ask questions, so we built boxes"), then show the limit dissolving.
3. Observed texture over category claims: behaviors someone actually watched ("picks the wrong country code. It invents a phone number, because the field would not let it move on"), not summaries ("guessing").
4. Name the demo's differentiator in one contrast line ("without the panel it looks like autofill; with it you watch a conversation happen").
5. Costs as hospitality: each caveat routes the reader ("genuinely fiddly — wait for the easy way"). "None of them pretend" — honesty woven into the feature list, not a disclosure block.
6. Multi-door CTA: easy path first, then no-account path, then builder path — each with an honest effort estimate. Give a LITERAL typed scene ("Type: 'Book me a demo. I'm Priya at Acme, priya@acme.com'"). Zero API names in the main body; tech only in the builder appendix.
7. PUBLISH-TIME CLAIM RE-VERIFICATION: safe-claims go stale in hours around fast-moving specs — re-verify every factual claim at publish time, not from the research cache.

## Platform rules (from research, 2026-09)
- X: no hashtags, no link in main post (link suppression), reply fast for 60 min, video/image > text
- LinkedIn: document/carousel format wins (6.6-7% vs 2-4.5%), link in first comment, 0-2 hashtags, India daytime 9-12 IST
- Timing defaults: X Tue/Wed 7:30-8:30 PM IST (US morning + India evening); LinkedIn 10-11 AM IST
- Safe-claims discipline: every factual claim verified with a link in the research step; no "standard" claims for draft specs; honest-caveats slide is mandatory, it's the differentiator

## Output contract
- File: `memory/drafts/<YYYYMMDD>-social-<topic>.md` — X main + replies, LinkedIn script, creative file paths, timing recommendation, safe-claims list
- Creatives: `memory/drafts/creatives/<topic>/` PNGs

## Quality bar
- zero unverified claims · zero hashtags on X · hook = claim · caveats present · reviewer SHIP verdict before handover
