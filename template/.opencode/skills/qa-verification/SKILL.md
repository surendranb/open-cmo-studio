---
name: qa-verification
description: Three-layer verification framework (Outcome, Process, Evidence) for release verification, smoke sweeps, and schema assertions.
---

# Three-Layer QA & Release Verification Framework

Independent verification protocol for validating product releases and fleet health.

## 1. The Three Layers of Verification

1. **Outcome Verification (Did the intended change land?)**
   - Live HTTP request returns status 200.
   - The specific feature, title, or updated UI component is visible in the rendered DOM.
   - Example: *"Navigated to /jobs and confirmed Databricks listing count is 87."*

2. **Process Verification (Did anything else break?)**
   - No uncaught JavaScript exceptions in the browser console (`console.error`).
   - Sibling endpoints, existing navigation links, and search filters continue to resolve.
   - Example: *"Clicked filters across Onsite, Remote, and Hybrid; confirmed no console errors."*

3. **Evidence Verification (Show the proof)**
   - Always quote raw evidence: HTTP status code, exact rendered text excerpt, or console log output.
   - Never report "verified" based on expectations or source code inspection alone.

---

## 2. Verification Checklist for Releases
- [ ] Endpoint is reachable over public network (`curl -I <url>`).
- [ ] Playwright renders page with no critical layout shift or broken images.
- [ ] Schema validation: JobPosting JSON-LD or MCP JSON-RPC returns conforms to schema.
- [ ] Verdict: End with `release verified` or `regressions: <list>` / `blocked: <reason>`.
