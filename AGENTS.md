# Agents

Quick reference for all agents, skills, and templates. This file serves as a cross-tool agent discovery fallback. For full conventions, see [CLAUDE.md](CLAUDE.md). For installation, see [README.md](README.md#installation).

## Agents

| Agent | Phase | Description | File |
|-------|-------|-------------|------|
| **Project Manager** | meta | Manages this repo — validates consistency, enforces standards, commits work | `agents/project-manager.agent.md` |
| **Discovery** | discovery | Conducts research, populates knowledge graph, produces discovery briefs | `agents/discovery.agent.md` |
| **PRD Drafter** | definition | Drafts and refines PRDs from knowledge graph, discovery briefs, and user input | `agents/prd-drafter.agent.md` |
| **Reporter** | meta | Generates status and executive updates from knowledge graph and git history | `agents/reporter.agent.md` |

## Skills

| Skill | Description | File |
|-------|-------------|------|
| **Knowledge Graph** | CRUD and query operations on the product knowledge graph | `skills/knowledge-graph.skill.md` |
| **Story Weaver** | Scroll-driven narrative stories from lifecycle artifacts and knowledge graph | `skills/story-weaver.skill.md` |

## Templates

| Template | Phase | Used By | File |
|----------|-------|---------|------|
| PRD | definition | prd-drafter | `templates/prd.template.md` |
| Discovery Brief | discovery | discovery | `templates/discovery-brief.template.md` |
| Architecture Decision | architecture | — | `templates/architecture-decision.template.md` |
| POC Definition | validation | prd-drafter | `templates/poc-definition.template.md` |
| Status Update | meta | reporter | `templates/status-update.template.md` |
| Executive Update | meta | reporter | `templates/executive-update.template.md` |
| Research Sources | discovery | discovery | `templates/research-sources.template.yaml` |
| Entity Schemas | meta | knowledge-graph | `templates/entity-schemas/` |
| Story Weaver Runtime | meta | story-weaver | `templates/story-weaver/` |
| MCP Config | meta | discovery | `templates/mcp-config.template.json` |
