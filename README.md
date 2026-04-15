# Agentic Product Lifecycle

A curated collection of AI agents and skills for managing the full product software development lifecycle. Designed for solo practitioners and teams who want structured, repeatable product delivery — powered by agentic workflows.

## Philosophy

Most product work fails not from bad code, but from missing context: unclear requirements, undocumented decisions, skipped validation stages. This project treats **product artifacts as first-class outputs** and provides agents that produce, validate, and evolve them throughout the lifecycle.

**Core principles:**

- **Artifacts over conversations** — Agents produce durable, version-controlled documents (PRDs, ADRs, POC definitions), not ephemeral chat threads.
- **Phases are explicit** — Every product moves through discovery, definition, validation, delivery, and feedback. Agents are mapped to these phases.
- **Pluggable, not prescriptive** — Use the agents that fit your workflow. Bring your own tooling (Linear, Jira, GitHub Issues) via MCP servers.
- **Git is the system of record** — All artifacts live in your repo. All decisions are traceable through commits.
- **Single-person to team scale** — The same agents work whether you're a solo founder or a cross-functional team.

## Lifecycle Phases

| Phase | Description | Agents |
|-------|-------------|--------|
| **Discovery** | Research, user problems, market context | _planned_ |
| **Definition** | Product requirements, success criteria | `prd-drafter` |
| **Architecture** | Technical design, boundaries, ADRs | _planned_ |
| **Validation** | POC stages, spike definitions, experiments | _planned_ |
| **Delivery** | Implementation, stories, task breakdown | _planned_ |
| **Quality** | Review, testing strategy, acceptance | _planned_ |
| **Release** | Deployment, changelog, communication | _planned_ |
| **Feedback** | Retrospectives, metrics review, iteration | _planned_ |

## Project Structure

```
agentic-product-lifecycle/
├── README.md                  # This file
├── CLAUDE.md                  # Conventions for Claude Code
├── agents/                    # Agent definitions (.agent.md)
│   ├── project-manager.agent.md
│   └── prd-drafter.agent.md
├── skills/                    # Reusable skills (future)
├── templates/                 # Artifact templates
│   └── prd.md
├── registry.yaml              # Agent/skill registry & lifecycle mapping
└── CODEOWNERS                 # Agent ownership
```

## Installation

### Quick Start (copy agents into your project)

```bash
# Clone this repo
git clone git@github.com:roughcompass/agentic-product-lifecycle.git

# Copy the agents you need into your project
cp agentic-product-lifecycle/agents/prd-drafter.agent.md your-project/.agent/
cp agentic-product-lifecycle/templates/prd.md your-project/templates/
```

### As a Git Submodule

```bash
# Add to your project as a submodule
git submodule add git@github.com:roughcompass/agentic-product-lifecycle.git .lifecycle

# Symlink agents you want active
ln -s .lifecycle/agents/prd-drafter.agent.md .agent/prd-drafter.agent.md
```

### What Gets Installed Where

This repo is the **source of truth** for agent definitions and templates. When installed into a target project:

- **Agents** (`.agent.md` files) go into the target project's working directory where Claude Code discovers them.
- **Templates** provide the structure for artifacts that agents produce.
- **Artifacts** (PRDs, ADRs, etc.) are created in the _target project_, not here. This repo owns the agents; your project owns the output.

## Contributing

See [CLAUDE.md](CLAUDE.md) for conventions. Each agent is a self-contained `.agent.md` file. The `registry.yaml` tracks all agents, their lifecycle phase, and ownership.

**Adding a new agent:**
1. Create `agents/your-agent.agent.md`
2. Add a corresponding template in `templates/` if the agent produces artifacts
3. Register it in `registry.yaml`
4. Update the lifecycle phase table in this README

## License

MIT
