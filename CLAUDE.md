# Agentic Product Lifecycle — Project Conventions

## What This Project Is

A curated registry of AI agents and templates for product-led software development. Agents are defined as `.agent.md` files. Templates are Markdown files that agents use to produce artifacts in target projects.

## Repository Structure

- `agents/` — Agent definitions. One file per agent. File naming: `<name>.agent.md`
- `templates/` — Artifact templates that agents reference. File naming: `<artifact-type>.template.<ext>` (e.g., `prd.template.md`, `research-sources.template.yaml`)
- `skills/` — Reusable skills (future). File naming: `<name>.skill.md`
- `registry.yaml` — Central index of all agents, skills, and their lifecycle phase mappings
- `CODEOWNERS` — Ownership mapping for agents and skills

## Conventions

### Frontmatter (required for all agents and skills)

Every `.agent.md` and `.skill.md` file must begin with YAML frontmatter. Frontmatter is the canonical source of metadata — the registry validates against it, not the other way around.

**Agent frontmatter schema:**
```yaml
---
name: Human-Readable Name        # required
description: One-line description # required — what the agent does
version: 0.1.0                   # required — semver
phase: discovery                 # required — lifecycle phase or "meta"
skills: [knowledge-graph]        # required — skill dependencies (can be [])
templates: [prd]                 # required — templates this agent uses (can be [])
owner: roughcompass              # required — GitHub user/org
status: active                   # required — active | draft | deprecated
---
```

**Skill frontmatter schema:**
```yaml
---
name: Human-Readable Name        # required
description: One-line description # required — what the skill does
version: 0.1.0                   # required — semver
phase: meta                      # required — lifecycle phase or "meta"
owner: roughcompass              # required — GitHub user/org
status: active                   # required — active | draft | deprecated
---
```

**Rules:**
- Frontmatter is canonical. If frontmatter and `registry.yaml` disagree, frontmatter wins and the registry must be updated.
- Version follows [semver](https://semver.org/): bump patch for fixes, minor for new capabilities, major for breaking changes to the agent's interface or outputs.
- The `description` field should be under 100 characters — it's used for index display and relevance matching.

### Agent Files

Every agent file (`agents/*.agent.md`) must:
- Begin with valid frontmatter (see schema above)
- Be fully self-contained — a single file that can be copied into any project
- Include a clear `## Description` explaining what the agent does and when to use it
- Reference templates by relative path (e.g., `templates/prd.template.md`)
- Not assume any specific project tooling (Jira, Linear, etc.) — use abstract references that MCP servers can fulfill

### Templates

Templates in `templates/` are files with placeholder sections. They:
- Must use the `.template` extension before the format extension (e.g., `prd.template.md`, `research-sources.template.yaml`, `story.template.html`)
- Use `{{placeholder}}` syntax for fields agents fill in
- Include inline guidance comments (`<!-- ... -->`) explaining each section
- Are designed to be opinionated defaults — teams can override them in their target projects
- Supporting files (runtime assets, reference docs) within template directories do NOT use the `.template` extension — only the actual template files do

### Skill Files

Every skill file (`skills/*.skill.md`) must:
- Begin with valid frontmatter (see schema above)
- Include `## Description` and `## Operations` sections
- Document each operation with numbered steps
- Include a `## Usage by Agents` section with examples

### Registry

`registry.yaml` is a derived index validated against file frontmatter. Every agent, skill, and template must be registered. The registry maps each entry to a lifecycle phase and an owner. When the project-manager agent detects drift between frontmatter and the registry, frontmatter is authoritative.

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
