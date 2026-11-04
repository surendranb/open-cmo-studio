# Project Subsite Deployer

## What this does
Provisions a project subsite in WP multisite (if needed), creates Home/How-To/Docs pages with substantive content from the GitHub README, sets Home as front page, deletes stubs, and updates the studio card on the main site.

## When to use
- New project subsite needs full content deployment
- Existing subsite has empty/broken pages
- "Deploy pages for [project]" task

## Prerequisites
- SSH: `ssh -i ~/.ssh/google_compute_engine -o StrictHostKeyChecking=no surendran@34.58.243.71`
- WP-CLI sub: `sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://<SUBDOMAIN>.builditwithai.xyz`
- WP-CLI main: `sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://builditwithai.xyz`

## Subdomain mapping (must use exact subdomain)

### RULE: existing live site → studio card only
If the project already has a live site (own product site OR canonical builditwithai.xyz subdomain serving an installer/app), **DO NOT create or rebuild subsite pages**. Only ensure the studio card is correct (4-para structure, Visit → canonical/external site, GitHub → correct repo). Deploying duplicate pages for these projects is a failure mode.

### Projects with own product sites (Visit link → external site, no subsite pages)
| Project | Visit URL | Repo | Card ID |
|---------|-----------|------|---------|
| ga4-mcp-server | https://ga4mcp.com | surendranb/google-analytics-mcp | (find by slug) |

### Canonical subdomains with live installer/app workers (no subsite pages)
| Project | Visit URL | Repo | Card ID |
|---------|-----------|------|---------|
| gsc-mcp-server | https://gsc.builditwithai.xyz | surendranb/google-search-console-mcp | (find by slug) |
| macos-mcp | https://macos.builditwithai.xyz | surendranb/macos-mcp | (find by slug) |
| podcast-recommendations | https://podcasts.builditwithai.xyz | surendranb/podcast-recommendations | (find by slug) |
| axiom-skills-registry | https://axiom.builditwithai.xyz | (no public repo — no GitHub button) | 91 |
| agent-metrics | https://agent-metrics.builditwithai.xyz | surendranb/agent-metrics | 90 |
| hexaloop | https://hexaloop.builditwithai.xyz | surendranb/hexaloop | (find by slug) |

### Removed projects (do not recreate)
| Project | Reason |
|---------|--------|
| bing-webmaster-mcp-server | delisted by Surendran 2026-08-31 (repo empty) — card deleted, subsite left parked |
| pennyworth | delisted by Surendran 2026-08-31 — card deleted, subsite left parked |

### WP-deployed projects (full Home/How-To/Docs pages)
| Project | Subdomain | Repo | Card ID |
|---------|-----------|------|---------|
| bing-webmaster-mcp-server | bing-webmaster-mcp-server | surendranb/bing-webmaster-mcp-server | 92 |
| book-recommendations | **books** | surendranb/book-recommendations | 93 |
| cardash | cardash | surendranb/cardash | 94 |
| chromatone | chromatone | surendranb/chromatone | 95 |
| company-intelligence | company-intelligence | surendranb/company-intelligence | 96 |
| daily-ai-brief | daily-ai-brief | surendranb/daily-ai-brief | 97 |
| find-research-papers-mcp | **papers** | surendranb/find-research-papers-mcp | 98 |
| free-image-library | **images** | surendranb/free-image-library | 99 |
| free-inference | free-inference | surendranb/free-inference | 100 |
| gardenbot | gardenbot | surendranb/gardenbot | (find by slug) |
| runsight | runsight | **surendranb/runinsight-ai** | (find by slug) |
| thermostat | thermostat | (no repo — use site description) | (find by slug) |
| whittle | whittle | surendranb/whittle | (find by slug) |
| wikipedia-mcp | wikipedia-mcp | **surendranb/wikipedia-mcp-server** | (find by slug) |
| writing-skills | writing-skills | surendranb/writing-skills | (find by slug) |
| music-mcp | music-mcp | surendranb/music-mcp | (find by slug) |

**REPO RULE:** use ONLY repos from this table (sourced from the project spreadsheet). Verify with `curl -s -o /dev/null -w "%{http_code}" https://github.com/surendranb/<REPO>` — if 404, STOP and report. Never guess a repo name.

**STUDIO CARD ID RULE:** find existing card via `wp post list --post_type=page --name=<card-slug> --field=ID` on builditwithai.xyz. If none, create one. Always REPORT the final ID.

---

## Phase 1: Site Provisioning (if site doesn't exist)

```bash
# Check if site exists
ssh ... "sudo -u www-data /usr/local/bin/wp --path=/var/www/builditworkai --url=https://<SUBDOMAIN>.builditwithai.xyz option get home 2>&1"

# If "Site not found" or error → provision:
# 1. In WP Admin Network → Sites → Add New
#    - Site address: <SUBDOMAIN>
#    - Site title: <Project Name>
#    - Admin email: surendran@builditwithai.xyz
# 2. Activate Workbench theme on the site
# 3. Set copyright option: wp option update workbench_copyright "BuildItWithAI"
```

---

## Phase 2: Content Extraction (do once per project)

```bash
# Fetch README
curl -sL https://github.com/surendranb/<REPO>/raw/main/README.md > /tmp/<PROJECT>-readme.md

# Extract sections for each page
# HOME: First 100 lines (intro, features, quick start)
# HOW-TO: "Getting Started" / "Usage" / "Examples" sections
# DOCS: "Architecture" / "API" / "Reference" / "Configuration" sections
```

---

## Phase 3: Home Page Creation

**Required structure — 4 sections matching the studio card format:**

### Section 1: What Is This (Hero)
- `<!-- wp:heading {"level":1} -->` — Project name
- `<!-- wp:paragraph -->` — 2-3 sentences: what it IS + what it DOES + who it's for
- `<!-- wp:paragraph -->` — Key value prop (1 sentence)

### Section 2: Why Useful (Features)
- `<!-- wp:heading {"level":2} -->` — "What It Does" or "Features"
- `<!-- wp:list -->` — 5-8 concrete features from README (specifics, numbers)
- `<!-- wp:paragraph -->` — What makes it different (1-2 sentences, real differentiators)

### Section 3: How to Set Up (Quick Start)
- `<!-- wp:heading {"level":2} -->` — "Quick Start"
- `<!-- wp:paragraph -->` — Prerequisites (API keys, hardware, accounts)
- `<!-- wp:code -->` — Exact install/run commands (verbatim from README)
- `<!-- wp:paragraph -->` — First command to test it works

### Section 4: Read More (Navigation)
- `<!-- wp:heading {"level":2} -->` — "Next Steps"
- `<!-- wp:buttons -->` — 3 buttons: How-To → `/how-to/`, Docs → `/docs/`, GitHub

**Minimums:**
- Total chars >2000
- At least 8 block elements
- Real code blocks in Quick Start
- Buttons link to `/how-to/`, `/docs/`, GitHub

---

## Phase 4: How-To Page Creation

**Required structure — 4 sections:**

### Section 1: What Is This (Context)
- `<!-- wp:heading {"level":1} -->` — "How to Use [Project Name]"
- `<!-- wp:paragraph -->` — 2 sentences: what this guide covers + prerequisites

### Section 2: Why Useful (When to use each workflow)
- `<!-- wp:heading {"level":2} -->` — "Workflows"
- `<!-- wp:list -->` — 3-5 use cases with one-liner descriptions

### Section 3: How to Set Up (Step-by-step)
- `<!-- wp:heading {"level":2} -->` — "Step 1: [Action]"
- `<!-- wp:paragraph -->` — Explanation
- `<!-- wp:code -->` — Exact command/config
- Repeat for all major workflows (4-6 steps)

### Section 4: Read More (Troubleshooting + Navigation)
- `<!-- wp:heading {"level":2} -->` — "Common Issues"
- `<!-- wp:list -->` — 3-5 troubleshooting items
- `<!-- wp:buttons -->` — Back to Home, View Docs, GitHub

**Minimums:**
- Total chars >1500
- At least 4 numbered steps with code blocks
- Real commands, not placeholders

---

## Phase 5: Docs Page Creation

**Required structure — 4 sections:**

### Section 1: What Is This (Architecture)
- `<!-- wp:heading {"level":1} -->` — "Documentation"
- `<!-- wp:paragraph -->` — Architecture overview (2-3 sentences: layers, data flow, protocols)

### Section 2: Why Useful (API Reference)
- `<!-- wp:heading {"level":2} -->` — "API Reference" or "Tool Reference"
- `<!-- wp:table -->` — ALL tools/endpoints: Name | Description | Parameters | Returns
- `<!-- wp:paragraph -->` — Response format example (1 code block)

### Section 3: How to Set Up (Configuration)
- `<!-- wp:heading {"level":2} -->` — "Configuration"
- `<!-- wp:code -->` — Config file example / env vars / MCP config snippet
- `<!-- wp:paragraph -->` — Key config options explained

### Section 4: Read More (Limits + Navigation)
- `<!-- wp:heading {"level":2} -->` — "Rate Limits & Caveats"
- `<!-- wp:list -->` — Real limits, failure modes, gotchas from README
- `<!-- wp:buttons -->` — Back to Home, How-To, GitHub

**Minimums:**
- Total chars >2000
- Table with ALL tools from the project
- Real rate limits / caveats (not generic)

---

## Phase 6: Deployment & Verification

```bash
# Create pages (published)
wp post create --post_type=page --post_status=publish --post_title="Home" --post_name=home --post_content="$(cat /tmp/home-content.html)"
HOME_ID=$(wp post list --post_type=page --name=home --field=ID)

wp post create --post_type=page --post_status=publish --post_title="How To" --post_name=how-to --post_content="$(cat /tmp/howto-content.html)"
HOWTO_ID=$(wp post list --post_type=page --name=how-to --field=ID)

wp post create --post_type=page --post_status=publish --post_title="Docs" --post_name=docs --post_content="$(cat /tmp/docs-content.html)"

# Set front page
wp option update show_on_front page
wp option update page_on_front $HOME_ID

# Delete stubs
wp post list --post_type=page --post_status=any --format=ids | xargs -I {} wp post get {} --field=post_name | grep -E "project-overview|sample-page" | xargs -I {} wp post delete {} --force

# Update studio card on main site
wp --url=https://builditwithai.xyz post update <CARD_ID> --post_content="$(cat /tmp/studio-card.html)"
```

---

## Phase 7: Verification Checklist (ALL must pass)

```bash
# 1. Pages exist
wp post list --post_type=page --post_status=publish --fields=ID,post_name --format=csv | grep -E "home|how-to|docs"

# 2. Front page set
wp option get page_on_front  # must equal HOME_ID

# 3. Content length
wp post get <HOME_ID> --field=post_content | wc -c  # >2000
wp post get <HOWTO_ID> --field=post_content | wc -c  # >1500
wp post get <DOCS_ID> --field=post_content | wc -c  # >2000

# 4. Block markup present
wp post get <HOME_ID> --field=post_content | grep -c 'wp:'  # >5 blocks

# 5. Key sections exist
wp post get <HOME_ID> --field=post_content | grep -q 'Quick Start'
wp post get <HOWTO_ID> --field=post_content | grep -q 'Step 1'
wp post get <DOCS_ID> --field=post_content | grep -q 'API Reference'

# 6. Live rendering
curl -s -o /dev/null -w "%{http_code}" https://<SUBDOMAIN>.builditwithai.xyz/  # 200
curl -s -o /dev/null -w "%{http_code}" https://<SUBDOMAIN>.builditwithai.xyz/how-to/  # 200
curl -s -o /dev/null -w "%{http_code}" https://<SUBDOMAIN>.builditwithai.xyz/docs/  # 200

# 7. Studio card
wp --url=https://builditwithai.xyz post get <CARD_ID> --field=post_content | wc -c  # >800
# Has wp:paragraph + wp:buttons + Visit link to correct subdomain + GitHub link
```

---

## Common Failure Modes (from audit)

| Failure | Cause | Fix |
|---------|-------|-----|
| Site not provisioned | Never added to multisite | Phase 1 required first |
| Pages empty (0 chars) | Agent created page but didn't write content | Verify content BEFORE `post create` |
| Draft stubs remain | Only deleted published pages | Use `--post_status=any` |
| Studio Visit URL wrong | Used `/home` or wrong subdomain | Use mapping table subdomain |
| Studio card thin | Copied one-liner from old content | Write fresh 3-6 sentence description |
| No code blocks | README commands not extracted | Explicitly copy code from README |

---

## Agent Instructions

When dispatched:
1. Read this entire skill
2. **EXECUTE — do not propose designs, do not ask questions.** If genuinely blocked, stop and report the blocker.
3. Run Phase 1 check → provision if needed
4. Extract README → build 3 content files locally
5. Deploy all 3 pages with EXACT slugs: `home`, `how-to`, `docs` (`--post_name=home` etc. — no variants like how-it-works, client-setup, documentation)
6. Set front page, delete stubs
7. Update studio card
8. Run ALL verification checks — **paste actual command output as evidence**, not claims
9. Report: each check pass/fail with evidence

**Do not report success until ALL 7 verification checks pass.**

---

## Deploy method (quoting-safe)

Inline `$(cat ...)` in a double-quoted ssh command breaks on nested quotes. Use scp + heredoc:

```bash
# 1. Write content locally
cat > /tmp/<project>-home.html << 'EOF'
...block markup...
EOF

# 2. Copy to server
scp -i ~/.ssh/google_compute_engine /tmp/<project>-home.html surendran@34.58.243.71:/tmp/

# 3. Update via heredoc (no quote nesting)
ssh -i ~/.ssh/google_compute_engine surendran@34.58.243.71 << 'REMOTE_EOF'
sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://<sub>.builditwithai.xyz post update <ID> --post_content="$(cat /tmp/<project>-home.html)"
REMOTE_EOF
```