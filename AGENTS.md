# AGENTS.md

This file registers agent configurations for the Solspace Calendar project.

- Main agent files are located in `/.agentic/` (excluded from git).
- If you add new agents or skills, reference their paths here.

## Agent Files
- `/.agentic/.agent.md` — Agent persona/behavior
- `/.agentic/.instructions.md` — Coding standards, review rules
- `/.agentic/SKILL.md` — Custom skills

## Usage
Agents should load files from `/.agentic/` unless otherwise required.

---

> If agent discovery requires this file at the repo root, keep it here. Otherwise, move to `/.agentic/`.
