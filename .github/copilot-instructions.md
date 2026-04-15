# Copilot Instructions — Agentic Product Lifecycle

This project is a curated registry of AI agents, skills, and templates for managing the product software development lifecycle. It is not an application — it produces agent definitions and artifact templates that get installed into target projects.

## Project Structure

- `agents/` — Agent definitions (`.agent.md`). Each is self-contained and portable.
- `skills/` — Reusable skills (`.skill.md`). Cross-cutting capabilities used by multiple agents.
- `templates/` — Artifact templates (`.template.md`, `.template.yaml`). Agents use these to produce structured output.
- `knowledge/` — Product knowledge graph. Entity files in `knowledge/entities/` and a relationship index in `knowledge/graph.yaml`.
- `registry.yaml` — Central index mapping agents, skills, and templates to lifecycle phases and owners.

## Lifecycle Phases

Agents map to product lifecycle phases: discovery, definition, architecture, validation, delivery, quality, release, feedback. The `phase` field in each agent's YAML frontmatter declares which phase it serves.

## Key Conventions

- All agents and skills begin with YAML frontmatter (name, description, version, phase, owner, status). Frontmatter is canonical — the registry validates against it.
- Templates use `{{placeholder}}` syntax. Author fields use `{{author_handle}}` (stable ID) + `{{author_name}}` (display).
- Entity IDs are immutable once created. Cross-references always use `type/id` format (e.g., `personas/enterprise-admin`), never display names.
- Commits follow conventional format: `feat(agent):`, `fix(template):`, `docs:`, `chore:`.

## Knowledge Graph

Entities store distilled knowledge in three layers: summary (the insight), detail (useful standalone), source ref (verifiable pointer to original). Entity types: personas, problems, evidence, competitors, features, decisions, constraints.

Personas cover anyone relevant — end users, buyers, internal stakeholders, partners, regulators. Problems cover user-facing, business, operational, technical, and compliance issues.

## When Editing This Repo

- One agent per file. Agents must be self-contained — copyable into any project.
- Update `registry.yaml` when adding/removing agents, skills, or templates.
- Update the README lifecycle table when agent coverage changes.
- Run the project-manager agent's health check after structural changes.

See `CLAUDE.md` for full conventions.
