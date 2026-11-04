---
name: _template
description: Template for every Studio-CMO use case. Copy this folder, rename, fill in. A use case = context to read + agents to wake + output contract + quality bar.
---

## Use case: <name>

**Trigger**: how Surendran invokes this (`opencode run "<phrase>"`).

## Context to read (cmo, before waking anyone)
- `memory/wiki/<file>.md` — why needed
- `memory/briefs/<which past runs>` — why needed

## Agents to wake (in order / parallel groups)
- data-analyst: pull <exact metrics, exact date ranges>
- research-analyst: <exact scope>
- content-writer: <exact draft, angle, channel> (only if this use case produces content)
- distiller: after integration, with <which artifacts>

## Output contract
- File: `memory/briefs/<YYYYMMDD>-<name>.md` (or `drafts/`)
- Sections: <exact list>
- Every number: from this run's tool pulls, with query provenance.

## Quality bar (self-scored in briefs/index.md)
- <e.g. all sections populated; no number from memory; signal ≤100 words; one decision stated>
