---
name: technical-aeo-seo
description: Guidelines for writing technical documentation, developer tools, and open-source project pages optimized for Answer Engine Optimization (AEO/GEO) and AI search indexing (Perplexity, ChatGPT Search, Claude, Google AI Overviews) while adhering to brutalist minimalism and house voice standards.
---

# Technical AEO/SEO & AI Search Indexing Directive

Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) optimize content to be selected, cited, and quoted by AI search engines (Perplexity, ChatGPT Search, Claude, Google AI Overviews). Unlike legacy SEO (which optimized for clicks and keyword density), AEO optimizes for **authority, atomic extractability, and citation confidence**.

When writing or structuring project pages, combine this skill with `surendran-voice`.

---

## 1. The Core Architecture: Atomic & Answer-First (BLUF)

AI models synthesize answers by extracting coherent, standalone "chunks" from crawled documents:

- **Lead Every Section with the Direct Answer (BLUF):** The first sentence immediately following an `H2` or `H3` must provide the complete, direct answer to the user's implicit question. Never open with introductory throat-clearing, historical context, or conversational filler.
- **Atomic Sections:** Every section under an `H2` must function as an independent, self-contained unit of knowledge. If an AI search engine extracts only that 4-line block, it must make complete sense without reading preceding paragraphs.
- **Task-Oriented & Query-Aligned Headings:** Use action verbs and direct task phrasing (`Configuring Claude Code CLI`, `MCP Tools Reference`, `Core Capabilities`, `Environment Variables`).

---

## 2. High Entity Density (Authoritative Signals)

AI search engines rank sources by semantic authority and factual precision. Vague conceptual descriptions are ignored; specific entities are cited:

- **Explicit Package & Tool Names:** Always use exact package names (`uvx google-search-console-mcp`, `npx -y @surendranb/macos-companion-mcp`), specific API endpoints, and real function names (`get_search_analytics`, `submit_sitemap`).
- **Exact Numeric Metrics:** State exact numbers, limits, and versions (`v0.10.6`, `Python 3.10+`, `25,000 rows limit`, `40 tools`, `250M+ scholarly works`).
- **Protocols & Hardware Explicitly Named:** Name the exact underlying technologies (`Model Context Protocol`, `stdio / JSON-RPC`, `OAuth2 Service Account`, `EventKit`, `CoreGraphics`, `AVFoundation`).

---

## 3. High-Extractability Formatting

AI engines favor structures that require zero formatting transformation to present to the user:

- **Structured Tables for Data & Tools:** Present tool matrices, argument schemas, environment variables, and permission mappings in clean tables with clear column headers (`Variable`, `Required`, `Description`).
- **Complete, Copy-Pasteable Code Blocks:** Every code snippet must be immediately executable without missing flags or undefined placeholders.
- **Monospace Architecture Diagrams:** Text-based ASCII/monospace flowcharts provide unambiguous structural relationships that LLMs parse with near-zero error rates compared to image OCR.

---

## 4. Search & Crawler Accessibility (Technical SEO)

Ensure crawlers and indexers can access and traverse the site cleanly:

- **Clean Canonical Hierarchy:** Parent project (`/{project}/`) &rarr; Child pages (`/{project}/setup/`, `/{project}/docs/`).
- **Semantic HTML Elements:** Strict heading hierarchy (`h1` &rarr; `h2` &rarr; `h3`), `<nav>` for tabs and breadcrumbs, `<figure><table>` for datasets.
- **Zero Legacy Multisite Links:** Never reference or link to legacy sub-site domains (`<project>.builditwithai.xyz`). All traffic and authority must concentrate natively on `builditwithai.xyz/{project}/`.
- **Breadcrumb Navigation:** Every child page links back to its parent with `← {Project Name}`.

---

## 5. House Voice Alignment (Anti-Slop Rules)

Writing for AEO does NOT mean stuffing keywords or generating generic AI prose:

- **Affirmative Definitions (Ban Negative Framing):** Strictly define systems and features by what they **are** and what they **do**. Never define things by what they *are not*, what they *replace*, or what they *avoid* (e.g., ban "unlike X...", "not a chatbot that chats...", "instead of waiting for questions...", "without fluff...").
- **AI-ism Purge:** Zero occurrences of fluff adjectives: *delve, tapestry, vibrant, moreover, testament, bustling, beacon, seamless, game-changing, revolutionary*.
- **No Rule of Three:** Avoid lists of three items—mix with 2, 4, or 6 items to eliminate predictable AI cadence.
