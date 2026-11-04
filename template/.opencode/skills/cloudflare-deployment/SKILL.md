---
name: cloudflare-deployment
description: Deployment and infrastructure guidelines for Cloudflare Pages, Workers, D1 databases, custom domains, and routing.
---

# Cloudflare Deployment & Infrastructure Playbook

Standards for deploying web frontends and APIs to Cloudflare Pages and Workers.

## 1. Cloudflare Pages Deployment
- **Direct Upload via Wrangler**:
  ```bash
  npx wrangler pages deploy <output_dir> --project-name <project-name> --branch main
  ```
- **Git-Connected Deployments**: Ensure the Cloudflare GitHub App has repository permissions if connecting private repos.

## 2. Telemetry & Routing Preservation
- **Non-Interference Rule**: Never disrupt existing Cloudflare routes on `builditwithai.xyz` (e.g. `/wp-json/agent-metrics/`, `/mcp`). Sudden drops in MCP telemetry are often caused by misconfigured routing rules or custom domain overrides.
- **Cache Rules**: For static SSG catalogs, configure edge cache TTLs appropriately, but ensure purge webhooks or cache-busting hashes are used on daily re-renders.

## 3. D1 Database Bindings
- Configure D1 bindings in `wrangler.toml`:
  ```toml
  [[d1_databases]]
  binding = "DB"
  database_name = "studio-db"
  database_id = "<uuid>"
  ```
- Run migrations using `npx wrangler d1 migrations apply <database_name> --remote`.
