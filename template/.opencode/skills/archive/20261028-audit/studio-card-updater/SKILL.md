# Studio Card Updater

## What this does
Updates a project's studio card page on the main BuildItWithAI site (builditwithai.xyz).

## When to use
- After creating Home/How-To/Docs pages on a project subsite
- When a studio card has only a one-liner description and needs enrichment
- When asked to "update the studio card" for any project

## Prerequisites
- SSH access: `ssh -i ~/.ssh/google_compute_engine -o StrictHostKeyChecking=no surendran@34.58.243.71`
- WP-CLI main: `sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://builditwithai.xyz`

## Subdomain mapping (page ID → subdomain)
The subdomain is NOT always the page slug. Use these exact subdomains:

| ID | Subdomain | Page slug |
|----|-----------|-----------|
| 90 | agent-metrics | agent-metrics |
| 91 | axiom-skills-registry | axiom-skills-registry |
| 92 | bing-webmaster-mcp-server | bing-webmaster-mcp-server |
| 93 | **books** | book-recommendations |
| 94 | cardash | cardash |
| 95 | chromatone | chromatone |
| 96 | company-intelligence | company-intelligence |
| 97 | daily-ai-brief | daily-ai-brief |
| 98 | **papers** | find-research-papers-mcp |
| 99 | **images** | free-image-library |
| 100 | free-inference | free-inference |

When updating a studio card, always use the **Subdomain** column for the Visit link, not the Page slug.

## Exact steps

### 1. Read the current studio card content
```bash
sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://builditwithai.xyz post get <PAGE_ID> --field=post_content
```

### 2. Read the project's Home page content (from subsite) for source material
```bash
sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://<SUBSITE>.builditwithai.xyz post list --post_type=page --post_status=publish --name=home --field=post_content
```

### 3. Fetch README if needed for more detail
```bash
curl -sL https://github.com/surendranb/<REPO>/raw/main/README.md | head -80
```

### 4. Update the studio card with EXACTLY this 4-paragraph block structure

The post_content MUST be valid WordPress block markup: 4 content paragraphs + buttons. Paragraph styling (copy exactly; the LAST content paragraph gets margin-bottom:32px, the others 16px):

```
<!-- wp:paragraph {"style":{"typography":{"fontSize":"19px","lineHeight":"1.55"},"color":{"text":"var(--wp--preset--color--lede)"},"spacing":{"margin":{"bottom":"16px"}}}} -->
<p style="font-size:19px;line-height:1.55;color:var(--wp--preset--color--lede);margin-bottom:16px">PARA 1 — What is this</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"19px","lineHeight":"1.55"},"color":{"text":"var(--wp--preset--color--lede)"},"spacing":{"margin":{"bottom":"16px"}}}} -->
<p style="font-size:19px;line-height:1.55;color:var(--wp--preset--color--lede);margin-bottom:16px">PARA 2 — What problem does it solve</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"19px","lineHeight":"1.55"},"color":{"text":"var(--wp--preset--color--lede)"},"spacing":{"margin":{"bottom":"16px"}}}} -->
<p style="font-size:19px;line-height:1.55;color:var(--wp--preset--color--lede);margin-bottom:16px">PARA 3 — Who is this for</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"19px","lineHeight":"1.55"},"color":{"text":"var(--wp--preset--color--lede)"},"spacing":{"margin":{"bottom":"32px"}}}} -->
<p style="font-size:19px;line-height:1.55;color:var(--wp--preset--color--lede);margin-bottom:32px">PARA 4 — How to get started</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="VISIT_URL">Visit NAME ↗</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="https://github.com/surendranb/REPO">View on GitHub ↗</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
```

Projects with NO public repo (thermostat, axiom-skills-registry): omit the GitHub button entirely.

### 5. Write the 4 paragraphs answering these questions (in this exact order)

**Voice:** Surendran's Voice skill (/Users/surendran/brain/agent-core/skills/library/surendran-voice/SKILL.md) — pragmatic, anti-slop, no "powerful", "cutting-edge", "seamless", "leverage". Concrete specifics. Read it before writing.

**Required 4-paragraph structure — each paragraph answers ONE question:**

| Para | Question | Length | Must include |
|------|----------|--------|--------------|
| 1 | **What is this?** | 1-2 sentences | What it IS + what it DOES (concrete, no hype) |
| 2 | **What problem does it solve?** | 1-2 sentences | The actual pain before it existed + how this kills it |
| 3 | **Who is this for?** | 1 sentence | The specific user (be narrow, not "everyone") |
| 4 | **How to get started?** | 1 sentence | Install command + first thing to try |
| 5 | **Buttons** | — | Visit + GitHub (extracted to Key Details rail by the theme) |

**Bad (one-liner):**
> Natural language access to Bing Webmaster Tools data

**Good (4 paragraphs):**
> Para 1: MCP server for Bing Webmaster Tools — submit URLs in bulk (10k/day), check index status, review crawl errors, query search performance from any MCP client.
> Para 2: Bing's own UI buries bulk submission behind slow web forms; this puts the whole Webmaster API behind natural language so agents do it in seconds.
> Para 3: For site owners and SEOs running Bing-indexed properties who already work inside an agent harness.
> Para 4: pip install -r requirements.txt, add BING_WEBMASTER_API_KEY to .env, then ask "submit these 50 URLs".
> [Visit button] [GitHub button]

**Bad (one-liner):**
> Natural language access to Bing Webmaster Tools data

**Good (3-6 sentences):**
> MCP server for Bing Webmaster Tools. Submit URLs in bulk (up to 10k/day), check index status, review crawl errors, and query search performance — all through natural language from any MCP client. Reverse-engineered Bing API, no official SDK. Runs as a local Python stdio server, zero external dependencies beyond httpx.

**Concrete specifics to include (when applicable):**
- Number of features/tools
- Data sources or APIs wrapped
- Setup method (pip install, git clone, etc.)
- Key numbers (rate limits, supported items, models)
- What makes it different from alternatives

### 6. Deploy via WP-CLI
```bash
# Write content to temp file
cat > /tmp/studio-card-content.html << 'ENDOFCONTENT'
<!-- wp:paragraph ... -->
<p ...>...</p>
<!-- /wp:paragraph -->
...
ENDOFCONTENT

# Update the post
sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://builditwithai.xyz post update <PAGE_ID> --post_content="$(cat /tmp/studio-card-content.html)"
```

### 7. Verify the update
```bash
# Confirm content length (should be >800 chars)
sudo -u www-data /usr/local/bin/wp --path=/var/www/builditwithai --url=https://builditwithai.xyz post get <PAGE_ID> --field=post_content | wc -c

# Confirm it renders (curl the page)
curl -sL https://builditwithai.xyz/<SLUG>/ | grep -o '<p[^>]*>[^<]*</p>' | head -3
```

## Common mistakes to avoid
- DO NOT just update the excerpt or title — update `post_content`
- DO NOT write a one-liner — minimum 3 sentences, 800+ chars total
- DO NOT use buzzwords — concrete specifics only
- DO NOT forget the buttons — both Visit and GitHub links
- DO NOT use different HTML classes — use exactly `wp-block-button__link wp-element-button` and `is-style-outline`

## Verification checklist
After updating, ALL of these must pass:
1. `wp post get <ID> --field=post_content | wc -c` returns >800
2. Content contains `wp:paragraph` block tag
3. Content contains `wp:buttons` block tag
4. Content contains both Visit and GitHub links
5. `curl -sL https://builditwithai.xyz/<slug>/` shows the description text
