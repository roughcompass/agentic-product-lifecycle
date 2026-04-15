# Agents

Quick reference for all agents, skills, and their lifecycle roles. This file serves as a cross-tool discovery fallback. For full conventions, see [CLAUDE.md](CLAUDE.md). For canonical metadata, see [registry.yaml](registry.yaml).

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

| Template | Phase | Used By |
|----------|-------|---------|
| PRD | definition | prd-drafter |
| Discovery Brief | discovery | discovery |
| Architecture Decision | architecture | — |
| POC Definition | validation | prd-drafter |
| Status Update | meta | reporter |
| Executive Update | meta | reporter |
| Research Sources | discovery | discovery |
| Entity Schemas | meta | knowledge-graph |
| Story Weaver Runtime | meta | story-weaver |

## Installation

### Claude Code

Copy agent files to your project's `.claude/agents/` directory:

```bash
cp agents/discovery.agent.md your-project/.claude/agents/
cp agents/prd-drafter.agent.md your-project/.claude/agents/
```

Claude Code discovers `.agent.md` files in `.claude/agents/` automatically.

For skills, copy to `.claude/skills/`:

```bash
cp -r skills/knowledge-graph.skill.md your-project/.claude/skills/
```

### GitHub Copilot

Copilot reads `.github/copilot-instructions.md` for project context. Copy the instructions file to your project:

```bash
cp .github/copilot-instructions.md your-project/.github/copilot-instructions.md
```

Copilot does not natively discover `.agent.md` files. Reference agent guidance in the instructions file.

### Cursor

Cursor reads `.cursorrules` for project context. Copy the rules file:

```bash
cp .cursorrules your-project/.cursorrules
```

## Knowledge Graph

The knowledge graph stores cumulative product knowledge across the lifecycle. See [knowledge-graph.skill.md](skills/knowledge-graph.skill.md) for the full data model, operations, and referencing conventions.

Entity types: personas, problems, evidence, competitors, features, decisions, constraints.
