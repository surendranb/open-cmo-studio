# Skill: pagespeed

## Use case: pagespeed

**Trigger**: standup CWV check, any new-page ship, `pagespeed` from the principal. Measures live Core Web Vitals via Google PageSpeed Insights (web version data, lab + field) and files fixes when a page regresses.

## Inputs
- Target URLs (default sample: `/`, hub, 2 leaves; full sweep on ship days).
- Key: Keychain service `PAGESPEED_API_KEY` account `studio-cmo` (`export PAGESPEED_API_KEY=$(security find-generic-password -s PAGESPEED_API_KEY -a studio-cmo -w)`). Keyless works at low quota; keyed is the standing path.

## Method (CMO or data-analyst, reads only)
1. Call `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<URL>&strategy=mobile&key=<KEY>` (repeat `desktop` for hubs).
2. Read lab vitals: LCP (good <2.5s), INP (good <200ms), CLS (good <0.1); plus Speed Index, Total Blocking Time.
3. Read field data (`loadingExperience`) when present — real-user numbers beat lab.
4. Compare vs baseline in the latest `pagespeed-*.json` artifact; regression = worse band on any vital.
5. Write raw JSON to `memory/daily/<today>/artifacts/pagespeed-<slug>.json`, one line per URL in the work log.

## Output contract
- Table: page | LCP | INP | CLS | band (good/needs-work/poor) | vs baseline.
- Regressions file as issues for `frontend-engineer` with the exact metric, URL, and PSI opportunity text. Never fix inside this beat.

## Quality bar
- Same URLs as last run (comparable sample) · bands quoted, never raw numbers alone · key failures print as BLOCKED with the exact error, never silently keyless.

## Do not
- Run full 23-page sweeps daily (sample daily, full on ship days) · treat lab as users when field data exists · invent baselines.
