---
name: data-scraping-playbook
description: Playbook for building resilient web scrapers, ATS job harvesters, and data extraction pipelines. Covers endpoint discovery, regex salary extraction, rate limiting, and schema normalization into SQLite/JSON.
---

# Data Scraping & Ingestion Playbook

This skill provides standard patterns and best practices for building robust data scrapers and ingestion pipelines across the studio.

## 1. ATS Endpoint Discovery (Greenhouse, Lever, Ashby, Workday)

### Greenhouse Public API
- **Endpoint**: `https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs?content=true`
- **Output**: JSON containing `id`, `title`, `location.name`, `updated_at`, `content` (HTML description).
- **Caveat**: Public JSON omits structured compensation keys (`salary_min`, `salary_max`). Compensation must be extracted from the `content` HTML.

### Lever Public API
- **Endpoint**: `https://api.lever.co/v0/postings/{company}?mode=json`
- **Output**: JSON containing `id`, `text` (title), `categories` (location, commitment, team), `descriptionPlain`, `additionalPlain`.

### Ashby Public API
- **Endpoint**: `https://api.ashbyhq.com/posting-api/job-board/{organization}`
- **Output**: GraphQL or JSON posting schema with `id`, `title`, `location`, `secondaryLocations`.

---

## 2. Unstructured Compensation & Salary Extraction

Public ATS feeds frequently bury salary figures in raw HTML. Use this standard regex pattern to extract compensation ranges:

```python
import re

SALARY_PATTERN = re.compile(
    r'(?:\$|USD\s*)\s*([0-9]{2,3}(?:,[0-9]{3})*|[0-9]{2,3}k)\s*(?:-|to|–)\s*(?:\$|USD\s*)?\s*([0-9]{2,3}(?:,[0-9]{3})*|[0-9]{2,3}k)\s*(?:/(?:yr|year|annual)|per\s+year)?',
    re.IGNORECASE
)

def parse_compensation(text: str):
    if not text:
        return None, None, None
    match = SALARY_PATTERN.search(text)
    if match:
        raw_min = match.group(1).lower().replace(',', '').replace('k', '000')
        raw_max = match.group(2).lower().replace(',', '').replace('k', '000')
        try:
            return int(raw_min), int(raw_max), "yearly"
        except ValueError:
            pass
    return None, None, None
```

---

## 3. Idempotent Ingestion & Deduplication

- **Composite Key**: Always build a deterministic primary key: `f"{ats_source}:{company_slug}:{source_job_id}"`.
- **Payload Hashing**: Compute SHA-256 over canonical fields (title + location + description) to detect updates without blind overwriting:
  ```python
  import hashlib
  payload_hash = hashlib.sha256(content.encode('utf-8')).hexdigest()
  ```
- **Lifecycle Tracking**:
  - Seen in current scrape → `is_active = true`, `last_seen = TODAY`.
  - Missing in 3 consecutive scrapes → mark `is_active = false`, set `closed_at = TODAY`.

---

## 4. Politeness, Rate Limits & Headers

- Set a descriptive User-Agent: `User-Agent: CompanyResearchBot/1.0 (+https://yourcompany.com/bot)`
- Use exponential backoff on HTTP 429 / 503 errors.
- Cache raw payloads in `fetches` audit log before normalization.
