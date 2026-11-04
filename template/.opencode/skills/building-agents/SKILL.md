---
name: building-agents
description: Use when creating or editing any agent definition, wiring multi-agent collaboration, designing agent memory or context layout, choosing tools or permissions for an agent, deciding whether a task needs a new agent, or when an agent underperforms and the cause may be context, tools, or harness design
---

# Building Agents

House method for designing agents in this repo. Grounded in *AI Agents in Depth* (bojieli/ai-agent-book) and adapted to our lanes. Never build an agent from model habit — build from this method.

## The formula

**Agent = LLM + Context + Tools.** The harness (everything around the model) is the real engineering surface: context management, tool interface, constraints, verification, correction. Models improve; the harness covers what the model cannot yet do reliably and sheds layers as models internalize them.

## Before building: the ladder

Escalate only when the lower rung measurably fails:

1. Single LLM call with a good prompt
2. Fixed workflow (scripted steps, no decisions)
3. Single agent with tools (autonomous loop)
4. Multi-agent (only for real division of labor — specialists with different tools, contexts, or judgment)

Multi-agent is not automatically better: coordination costs are real (36.9% of multi-agent failures are inter-agent misalignment — duplicating, contradicting, or ignoring each other). Build multi-agent when specialization beats the coordination cost.

## Agent definition standards (house format)

Frontmatter: `description` (trigger-only, third person), `mode` (primary = only the one users talk to; subagent = leaf), `permission` (deny writes unless the lane requires them), `tools: task: false` on every leaf. Subagents are leaves — only the orchestrator spawns.

System prompt = job description. Rules:

- **Structure the rules.** Business rules as structured sections (tables, numbered clauses), never prose. Unstructured rule dumps dropped task success >30% in controlled tests.
- **No discretion on business rules.** The model executes rules; it does not invent them. If a rule is ambiguous, that is a spec bug — fix the spec, not the agent's judgment.
- **Explicit stopping conditions.** Task complete / max iterations / unrecoverable error. An agent without stop conditions loops or declares done prematurely.
- **Output contract.** State what the return IS (sections, fields, order). Agents match a stated shape; they negotiate with prohibitions.
- **Label information sources** in handoffs: `[FROM_CMO]` task instruction, `[FROM_USER]` principal input, `[TOOL_RESULT]` tool return. Subagents confuse sources when unlabeled.

## Context engineering

Context is the working set at each decision point, not just the prompt. It is the ceiling of agent capability.

- **Stable prefix.** Put static content (identity, rules, tool definitions) first and never reorder it — caching is an architectural constraint, not an optimization.
- **Critical info at the boundaries.** Most-critical content at the beginning or end of context; middles get lost.
- **Skills = small catalog, body on demand.** The description advertises; the body loads only when triggered. Never inline full skill bodies into boot context.
- **State via status injection.** Current task state, progress, and phase belong in a dedicated injected block, not scattered through history.
- **Compression preserves semantic integrity.** "Sutskever left OpenAI in May 2024" must not compress to "Sutskever left". Dates, names, and quantities are non-negotiable.

## Memory design (the four types × scope)

| Type | Stores | House lane |
|---|---|---|
| Working | Active context this run | the context window |
| Episodic | What happened, time-stamped | `memory/daily/<date>/` (work doc + adhoc), `memory/briefs/` |
| Semantic | What is true, durable | `memory/wiki/` (company), `memory/projects/<name>.md` (project) |
| Procedural | How to do things | `.opencode/skills/`, agent definitions, `memory/learnings.md` (raw buffer) |

Extraction into memory follows three rules: **selectivity** (discard short-lived detail), **abstraction** (generalize instances into lasting rules), **structure** (store in retrievable fields/lanes). All memory lives in Git — diff review, version history, rollback. Consolidation: episodic → semantic/procedural via the distiller, human-gated. Never let a memory buffer become a dumping ground that nothing reads.

## Tools and the ACI

Design the tool interface for the agent's goal, not the underlying API shape (ACI — Agent-Computer Interface).

- **Poka-yoke**: design misuse out. If a parameter is often wrong, make the wrong call impossible or self-correcting.
- **Read tools**: read-only, cache-friendly, parallel-safe. Write tools: constrain, confirm, audit.
- **Structured returns** from subagents: conclusions and provenance, not full trajectories. One specialist per failure mode, not one do-everything agent.
- **MCP for interop**; skills for procedural knowledge; the tool list per agent is scoped (permissions deny the noise) — an agent seeing 100 tools picks worse than one seeing 10.

## Verification and evaluation

Evaluation is not optional polish — no eval, no evolution.

- **Three-layer verification**: outcome (did the task actually complete — check environmental state, not the agent's claim), process (was it done within rules/permissions), quality (rubric for judgment calls). Verify claims against tool returns; agent self-reports are not evidence.
- **Baseline before any change.** Record baseline stats (sample size, distribution) or the result is uninterpretable.
- **Paired comparison**: same tasks, both configs, per-task win/loss — never two independent averages.
- **Significance**: SE(p) ≈ √(p(1−p)/n). A 70%→73% move on n=100 is noise (±9pts at 95% CI).
- **Failure attribution**: locate the FIRST error in a failed trajectory; freeze context before it and test only the next action (trajectory-prefix regression). Cheap, isolates one defect.
- **House rule**: every skill ships `evals/eval.md` with binary pass criteria and runs with/without on creation and edits.

## Continual evolution (the loop)

Learning signals come from evaluation, not summarization — reflection without a verifier is guessing.

1. Trajectories → verified diagnosis (what failed, which layer, with evidence).
2. Encode the fix at the right representation: **knowledge** (wiki fact), **instructions** (agent definition rule), **program** (skill/tooling), in that order of preference — instructions and knowledge are cheaper and safer than new code.
3. Check **artifact activation**: does the agent actually load the new skill/rule in the right situation (retrieval traces)?
4. Check **generalization**: improvement on held-out tasks, not just the ones that triggered the lesson.
5. House mapping: `learnings.md` → distiller → proposals (`memory/pending/`) → principal's gate → applied to wiki/skills/agent files. Promoted, never hoarded.

## Checklist: adding a new agent

1. Ladder check: can a prompt, workflow, or existing agent do this? (Stop here usually.)
2. One-sentence role with clear division of labor vs existing agents.
3. Frontmatter: mode, description (trigger-only), permissions (deny by default), `task: false`.
4. Boot contract: skills to load before acting, MCP tools in scope, files it may read.
5. Output contract: exact return shape with provenance.
6. Memory lanes: what it reads, the one lane it writes (or none).
7. Stopping conditions and failure behavior (report the failure, never guess values).
8. Registration: AGENTS.md roster row (reads/writes columns).
9. Evals: how its work gets verified (which of the three layers apply).
10. Learning path: how its runs feed learnings.md → distiller.

## Sources

- [Ch1 Agent Fundamentals](https://github.com/bojieli/ai-agent-book/blob/main/book-en/chapter1.md) — formula, harness, ladder, ACI
- [Ch2 Context Engineering](https://github.com/bojieli/ai-agent-book/blob/main/book-en/chapter2.md) — KV cache, structured rules, skills, compression
- [Ch3 Memory & Knowledge](https://github.com/bojieli/ai-agent-book/blob/main/book-en/chapter3.md) — memory formats, extraction rules, Git-backed memory
- [Ch4 Tools](https://github.com/bojieli/ai-agent-book/blob/main/book-en/chapter4.md) — ACI, sub-agent handoffs, source labeling
- [Ch7 Evaluating Agents](https://github.com/bojieli/ai-agent-book/blob/main/book-en/chapter7.md) — significance, failure attribution, paired analysis
- [Ch9 Continual Evolution](https://github.com/bojieli/ai-agent-book/blob/main/book-en/chapter9.md) — verifiers, encoding experience, activation metrics
- [Ch10 Multi-Agent Collaboration](https://github.com/bojieli/ai-agent-book/blob/main/book-en/chapter10.md) — manager pattern, misalignment, context isolation
