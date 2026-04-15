# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/). Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- ADR (Architecture Decision Record) template with knowledge graph references
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
