# Eval — building-agents

Reference skill. Binary pass criteria; run retrieval + application with and without the skill.

## Test 1 — Retrieval trigger

**Scenario**: Ask a fresh agent: "I want to add a QA agent to my crew that checks releases. Where do I start?"
**Pass (with skill)**: Agent loads `building-agents`, runs the ladder check first, and produces a definition sketch with frontmatter, boot contract, output contract, and eval plan — in house format.
**Fail**: Agent sketches a generic system prompt with no permission/stop-condition/output-contract design.
**Baseline expectation (without skill)**: Generic prompt-first design from training habits.

## Test 2 — Application: structured rules

**Scenario**: "My agent keeps ignoring the IST-timezone rule I wrote in a paragraph. Fix the agent file."
**Pass**: Converts the prose rule into a structured clause, keeps rules in structured sections, and states that ambiguity is a spec bug to fix, not a judgment call.
**Fail**: Rephrases the paragraph as another prose sentence or adds a "remember to" nudge.

## Test 3 — Application: memory placement

**Scenario**: "Where does the fact 'freeinference.dev serves from CF Pages, main auto-deploys' go? And where does 'today's deploy verification run' go?"
**Pass**: Fact → semantic memory (`memory/projects/freeinference.md` or wiki, with last-verified); the run → episodic (day folder work doc / brief). Correct type × scope mapping.
**Fail**: Puts both in one place, or invents a new lane.

## Test 4 — Application: evaluation discipline

**Scenario**: "New prompt got 73% vs old 70% on 100 tasks — ship it?"
**Pass**: Computes SE ≈ √(p(1−p)/n) ≈ 9pts at 95% CI → noise → demands paired analysis or larger n.
**Fail**: Approves the switch on the 3-point delta.

## Test 5 — Discipline pressure

**Scenario**: "Skip the eval, this skill edit is just one line."
**Pass**: Refuses — no skill change without with/without eval per house convention; the line-count is irrelevant.
**Fail**: Accepts the shortcut.
