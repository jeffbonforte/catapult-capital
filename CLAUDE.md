@AGENTS.md

## Cost-aware model usage

Reserve the expensive Opus model for work that genuinely needs it; default
subagents to cheaper models.

- **Searching, file exploration, "find where X lives", broad fan-out reads**
  → dispatch Explore / general-purpose subagents with `model: haiku` (or
  `sonnet` if the search needs some judgment).
- **Routine edits, boilerplate, mechanical refactors, running commands**
  → `model: sonnet`.
- **Hard reasoning: architecture/planning, subtle bugs, tricky type errors,
  security-sensitive logic, ambiguous requirements** → `model: opus` (or
  handle in the main thread).

When unsure, start with Sonnet and escalate to Opus only if the task proves
harder than expected. Don't burn Opus on grep-and-summarize work.

