# Agentic Product Lifecycle

A curated collection of AI agents and skills for managing the full product software development lifecycle. Designed for solo practitioners and teams who want structured, repeatable product delivery — powered by agentic workflows.

## Philosophy

Most product work fails not from bad code, but from missing context: unclear requirements, undocumented decisions, skipped validation stages. This project treats **product artifacts as first-class outputs** and provides agents that produce, validate, and evolve them throughout the lifecycle.

**Core principles:**

- **Artifacts over conversations** — Agents produce durable, version-controlled documents (PRDs, ADRs, POC definitions), not ephemeral chat threads.
- **Cumulative knowledge** — A product knowledge graph connects personas, problems, evidence, competitors, and decisions across the entire lifecycle. Research compounds over time.
- **Phases are explicit** — Every product moves through discovery, definition, validation, delivery, and feedback. Agents are mapped to these phases.
- **Pluggable, not prescriptive** — Use the agents that fit your workflow. Bring your own tooling (Linear, Jira, GitHub Issues) via MCP servers. Connect data sources (analytics, CRM, support) for richer discovery.
- **Git is the system of record** — All artifacts and knowledge graph entities live in your repo. All decisions are traceable through commits.
- **Single-person to team scale** — The same agents work whether you're a solo founder or a cross-functional team.

## Lifecycle Phases

| Phase | Description | Agents |
|-------|-------------|--------|
| **Discovery** | Research, user problems, market context | `discovery` |
| **Definition** | Product requirements, success criteria | `prd-drafter` |
| **Reporting** | Status updates, executive summaries | `reporter` |
| **Architecture** | Technical design, boundaries, ADRs | _planned_ (template ready) |
| **Validation** | POC stages, spike definitions, experiments | _planned_ (template ready) |
| **Delivery** | Implementation, stories, task breakdown | _planned_ |
| **Quality** | Review, testing strategy, acceptance | _planned_ |
| **Release** | Deployment, changelog, communication | _planned_ |
| **Feedback** | Retrospectives, metrics review, iteration | _planned_ |

### Cross-Cutting Skills

| Skill | Description |
|-------|-------------|
| `knowledge-graph` | CRUD and query operations on the product knowledge graph |
| `story-weaver` | Scroll-driven narrative stories from lifecycle artifacts and knowledge graph entities |

## Project Structure

```
agentic-product-lifecycle/
├── README.md                  # This file
├── CLAUDE.md                  # Conventions for Claude Code
├── agents/                    # Agent definitions (.agent.md)
│   ├── project-manager.agent.md
│   ├── discovery.agent.md
│   ├── prd-drafter.agent.md
│   └── reporter.agent.md
├── skills/                    # Reusable skills
│   ├── knowledge-graph.skill.md
│   └── story-weaver.skill.md
├── knowledge/                 # Product knowledge graph
│   ├── graph.yaml             # Relationship index
│   └── entities/              # Entity files by type
│       ├── personas/
│       ├── problems/
│       ├── evidence/
│       ├── competitors/
│       ├── features/
│       ├── decisions/
│       └── constraints/
├── templates/                 # Artifact & entity templates (.template.*)
│   ├── prd.template.md
│   ├── discovery-brief.template.md
│   ├── research-sources.template.yaml
│   ├── entity-schemas/        # Knowledge graph entity schemas
│   └── story-weaver/          # Story runtime, template, references
│       ├── assets/            # Shared runtime (CSS + JS)
│       ├── story.template.html
│       └── references/        # Design principles, scene patterns
├── registry.yaml              # Agent/skill registry & lifecycle mapping
└── CODEOWNERS                 # Agent ownership
```

## Installation

This repo supports **Claude Code**, **GitHub Copilot**, and **Cursor**. Each tool discovers project context differently.

### Claude Code

Claude Code discovers agents in `.claude/agents/` and skills in `.claude/skills/`:

```bash
# Clone this repo
git clone git@github.com:roughcompass/agentic-product-lifecycle.git

# Copy agents to your project
cp agents/discovery.agent.md your-project/.claude/agents/
cp agents/prd-drafter.agent.md your-project/.claude/agents/

# Copy skills
cp skills/knowledge-graph.skill.md your-project/.claude/skills/

# Copy templates
cp -r templates/ your-project/.lifecycle/templates/
```

### GitHub Copilot

Copilot reads `.github/copilot-instructions.md` automatically:

```bash
mkdir -p your-project/.github
cp .github/copilot-instructions.md your-project/.github/
```

### Cursor

Cursor reads `.cursorrules` from the project root:

```bash
cp .cursorrules your-project/.cursorrules
```

### As a Git Submodule (all tools)

```bash
# Add to your project as a submodule
git submodule add git@github.com:roughcompass/agentic-product-lifecycle.git .lifecycle

# Symlink agents for Claude Code
ln -s ../.lifecycle/agents/discovery.agent.md .claude/agents/discovery.agent.md
ln -s ../.lifecycle/agents/prd-drafter.agent.md .claude/agents/prd-drafter.agent.md
```

### What Gets Installed Where

This repo is the **source of truth** for agent definitions and templates. When installed into a target project:

- **Agents** (`.agent.md` files) go into `.claude/agents/` where Claude Code discovers them automatically.
- **Skills** (`.skill.md` files) go into `.claude/skills/`.
- **Templates** provide the structure for artifacts that agents produce.
- **Artifacts** (PRDs, ADRs, etc.) are created in the _target project_, not here. This repo owns the agents; your project owns the output.
- **Tool instructions** (`.github/copilot-instructions.md`, `.cursorrules`) provide project context for non-Claude tools.

See [AGENTS.md](AGENTS.md) for the full cross-tool installation reference.

## Contributing

See [CLAUDE.md](CLAUDE.md) for conventions. Each agent is a self-contained `.agent.md` file. The `registry.yaml` tracks all agents, their lifecycle phase, and ownership.

**Adding a new agent:**
1. Create `agents/your-agent.agent.md`
2. Add a corresponding template in `templates/` if the agent produces artifacts
3. Register it in `registry.yaml`
4. Update the lifecycle phase table in this README

## License

MIT
