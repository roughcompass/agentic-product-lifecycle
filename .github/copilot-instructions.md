# Copilot Instructions — Agentic Product Lifecycle

This project is a registry of AI agents, skills, and templates for product-led software development. See [CLAUDE.md](../CLAUDE.md) for full conventions and [AGENTS.md](../AGENTS.md) for the agent catalog.

## Copilot-Specific Guidance

- Copilot does not discover `.agent.md` files natively. Agent definitions live in `agents/` — read them for context when working on this repo.
- All agents and skills have YAML frontmatter. Frontmatter is canonical — the registry validates against it.
- When editing agents or skills, preserve frontmatter structure. See the schema in `CLAUDE.md`.
- When creating artifacts from templates, use `{{author_handle}}` for stable references, `{{author_name}}` for display.
- Commits follow conventional format: `feat(agent):`, `fix(template):`, `docs:`, `chore:`.
