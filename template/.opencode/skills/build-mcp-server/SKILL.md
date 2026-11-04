---
name: build-mcp-server
description: This skill should be used when the user asks to "build an MCP server", "create an MCP", "make an MCP integration", "wrap an API for Claude", "expose tools to Claude", "make an MCP app", or discusses building something with the Model Context Protocol. It is the entry point for MCP server development — it interrogates the user about their use case, determines the right deployment model (remote HTTP, MCPB, local stdio), picks a tool-design pattern, and hands off to specialized skills.
version: 0.1.0
---

# Build an MCP Server

You are guiding a developer through designing and building an MCP server that works seamlessly with Claude. MCP servers come in many forms — picking the wrong shape early causes painful rewrites later. Your first job is **discovery, not code**.

**Load Claude-specific context first.** The MCP spec is generic; Claude has additional auth types, review criteria, and limits. Before answering questions or scaffolding, fetch `https://claude.com/docs/llms-full.txt` (the full export of the Claude connector docs) so your guidance reflects Claude's actual constraints.

Do not start scaffolding until you have answers to the questions in Phase 1. If the user's opening message already answers them, acknowledge that and skip straight to the recommendation.

---

## Phase 1 — Interrogate the use case

Ask these questions conversationally (batch them into one message, don't interrogate one-at-a-time). Adapt wording to what the user has already told you.

### 1. What does it connect to?

| If it connects to… | Likely direction |
|---|---|
| A cloud API (SaaS, REST, GraphQL) | Remote HTTP server |
| A local process, filesystem, or desktop app | MCPB or local stdio |
| Hardware, OS-level APIs, or user-specific state | MCPB |
| Nothing external — pure logic / computation | Either — default to remote |

### 2. Who will use it?

- **Just me / my team, on our machines** → Local stdio is acceptable (easiest to prototype)
- **Anyone who installs it** → Remote HTTP (strongly preferred) or MCPB (if it *must* be local)
- **Users of Claude desktop who want UI widgets** → MCP app (remote or MCPB)

### 3. How many distinct actions does it expose?

This determines the tool-design pattern — see Phase 3.

- **Under ~15 actions** → one tool per action
- **Dozens to hundreds of actions** (e.g. wrapping a large API surface) → search + execute pattern

### 4. Does a tool need mid-call user input or rich display?

- **Simple structured input** (pick from list, enter a value, confirm) → **Elicitation** — spec-native, zero UI code. *Host support is rolling out* (Claude Code ≥2.1.76) — always pair with a capability check and fallback.
- **Rich/visual UI** (charts, custom pickers with search, live dashboards) → **MCP app widgets** — iframe-based, needs `@modelcontextprotocol/ext-apps`. See `build-mcp-app` skill.
- **Neither** → plain tool returning text/JSON.

### 5. What auth does the upstream service use?

- None / API key → straightforward
- OAuth 2.0 → you'll need a remote server with CIMD (preferred) or DCR support.

---

## Phase 2 — Recommend a deployment model

Based on the answers, recommend **one** path. Be opinionated. The ranked options:

### ⭐ Remote streamable-HTTP MCP server (default recommendation)

A hosted service speaking MCP over streamable HTTP. This is the **recommended path** for anything wrapping a cloud API.

**Why it wins:**
- Zero install friction — users add a URL, done
- One deployment serves all users; you control upgrades
- OAuth flows work properly (the server can handle redirects, DCR, token storage)
- Works across Claude desktop, Claude Code, Claude.ai, and third-party MCP hosts

**Choose this unless** the server *must* touch the user's local machine.

### Elicitation (structured input, no UI build)

If a tool just needs the user to confirm, pick an option, or fill a short form, **elicitation** does it with zero UI code. The server sends a flat JSON schema; the host renders a native form. Spec-native, no extra packages.

### MCP app (remote HTTP + interactive UI)

Same as above, plus **UI resources** — interactive widgets rendered in chat. Rich pickers with search, charts, live dashboards, visual previews. Built once, renders in Claude *and* ChatGPT.
