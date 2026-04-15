# Agentic Product Lifecycle — Project Conventions

## What This Project Is

A curated registry of AI agents and templates for product-led software development. Agents are defined as `.agent.md` files. Templates are Markdown files that agents use to produce artifacts in target projects.

## Repository Structure

- `agents/` — Agent definitions. One file per agent. File naming: `<name>.agent.md`
- `templates/` — Artifact templates that agents reference. File naming: `<artifact-type>.md`
- `skills/` — Reusable skills (future). File naming: `<name>.skill.md`
- `registry.yaml` — Central index of all agents, skills, and their lifecycle phase mappings
- `CODEOWNERS` — Ownership mapping for agents and skills

## Conventions

### Agent Files

Every agent file (`agents/*.agent.md`) must:
- Be fully self-contained — a single file that can be copied into any project
- Include a clear `## Description` explaining what the agent does and when to use it
- Reference templates by relative path (e.g., `templates/prd.md`)
- Declare which lifecycle phase(s) it serves
- Not assume any specific project tooling (Jira, Linear, etc.) — use abstract references that MCP servers can fulfill

### Templates

Templates in `templates/` are Markdown files with placeholder sections. They:
- Use `{{placeholder}}` syntax for fields agents fill in
- Include inline guidance comments (`<!-- ... -->`) explaining each section
- Are designed to be opinionated defaults — teams can override them in their target projects

### Registry

`registry.yaml` is the source of truth for what exists. Every agent and template must be registered. The registry maps each entry to a lifecycle phase and an owner.

### Commits

Use conventional commits:
- `feat(agent): add prd-drafter agent` — new agent or skill
- `fix(agent): correct prd-drafter template reference` — bug fix
- `docs: update lifecycle phase table` — documentation only
- `chore: update registry` — maintenance

### Pull Requests

- One agent per PR when adding new agents
- Include a usage example in the PR description
- Update `registry.yaml` and the README lifecycle table in the same PR

## The Project-Manager Agent

The `project-manager.agent.md` manages **this repository only**. It ensures:
- All agents are registered in `registry.yaml`
- All templates referenced by agents exist
- The README lifecycle table is current
- Work is committed with conventional commit messages

Invoke it when making structural changes to this repo.
