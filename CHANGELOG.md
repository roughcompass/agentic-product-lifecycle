# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/). Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- **Cross-tool compatibility**: `.github/copilot-instructions.md` (GitHub Copilot), `.cursorrules` (Cursor), `AGENTS.md` (generic fallback)
- MCP server configuration template (`templates/mcp-config.template.json`) for connecting agents to external data sources
- Per-tool installation instructions in README (Claude Code, Copilot, Cursor)
- **reporter** agent — generates status and executive updates from knowledge graph state and git history
- Status update template (team-facing: what changed, what's next, blockers, stale items)
- Executive update template (leadership-facing: progress against goals, decisions, risks)
- Three-layer data model documented in knowledge-graph skill (summary → detail → source ref)
- ADR (Architecture Decision Record) template with knowledge graph references

### Changed
- **ID immutability convention**: entity IDs are now documented as permanent once created. Names are display-only, references always use IDs.
- All artifact templates now use `author_handle` + `author_name` pattern instead of bare `{{author}}` — stable handle for references, display name for readability
- All 7 entity schemas annotated with IMMUTABLE on `id` field, display-only on `name` field
- Decision schema `decided_by` now specifies stable handle (e.g., GitHub username)
- Knowledge-graph skill: new Rename Entity operation, IDs and Referencing section
- Persona schema broadened: now covers end users, buyers, internal stakeholders, partners, regulators (added `kind`, `influence`, `source_ref` fields)
- Problem schema broadened: now covers user-facing, business, operational, technical, and compliance problems (added `kind`, `domain`, `source_ref` fields)
- Evidence schema enhanced: explicit three-layer structure, richer source_ref examples, added `collected` date field
- POC definition template with hypothesis, success criteria, and outcome sections
- `.gitignore` and MIT `LICENSE`
- `CHANGELOG.md`
- prd-drafter now queries the knowledge graph for personas, problems, evidence, and constraints before drafting

## [0.1.0] — 2026-04-14

### Added
- Initial project scaffold: README, CLAUDE.md, registry.yaml, CODEOWNERS
- **project-manager** agent — meta-agent managing this repo's consistency
- **discovery** agent — conducts research, populates knowledge graph, produces discovery briefs
- **prd-drafter** agent — drafts and refines Product Requirements Documents
- **knowledge-graph** skill — CRUD and query operations on the product knowledge graph
- **story-weaver** skill — scroll-driven narrative stories from lifecycle artifacts and knowledge graph
- Knowledge graph foundation: graph.yaml index, 7 entity types (personas, problems, evidence, competitors, features, decisions, constraints)
- Entity schema templates for all 7 types
- PRD template, discovery brief template, research sources config template
- Story-weaver runtime (CSS/JS), story template, scene patterns catalog, design principles
- YAML frontmatter standard for all agents and skills
- Frontmatter-is-canonical policy: registry validates against file frontmatter
