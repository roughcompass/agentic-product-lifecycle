---
name: Prioritization
description: Scoring and ranking frameworks for product decisions — RICE, impact/effort, MoSCoW, stack ranking
version: 0.1.0
phase: meta
owner: roughcompass
status: active
---

# Prioritization Skill

## Description

Provides structured prioritization frameworks for product decisions. Used by agents that need to rank, score, or compare features, problems, or work items against goals and constraints.

This is a cross-cutting skill — the prd-drafter uses it to prioritize requirements, the delivery planner uses it to sequence work, and the reporter uses it to surface what matters most.

## Operations

### RICE Score

Score items using Reach, Impact, Confidence, Effort.

1. For each item, assess:
   - **Reach**: How many personas/users does this affect per time period? (number)
   - **Impact**: How much does this move the needle per person? (3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal)
   - **Confidence**: How sure are we about these estimates? (100% = high, 80% = medium, 50% = low)
   - **Effort**: How many person-months to ship? (number)
2. Calculate: `RICE = (Reach × Impact × Confidence) / Effort`
3. Rank items by score descending
4. Flag items with confidence < 50% — these need validation before committing

Pull data from the knowledge graph where available:
- Reach → persona entity counts + evidence on user segments
- Impact → problem severity ratings
- Confidence → evidence confidence ratings
- Effort → constraint entities, feature complexity

### Impact/Effort Matrix

Plot items on a 2×2 matrix.

1. For each item, assess impact (high/low) and effort (high/low)
2. Classify into quadrants:
   - **Quick wins**: high impact, low effort → do first
   - **Big bets**: high impact, high effort → plan carefully
   - **Fill-ins**: low impact, low effort → do if time permits
   - **Money pits**: low impact, high effort → deprioritize or cut
3. Present as a table sorted by quadrant priority

### MoSCoW Classification

Classify items into Must Have, Should Have, Could Have, Won't Have.

1. **Must Have**: Without this, the release is a failure. Non-negotiable.
2. **Should Have**: Important but not critical. Can ship without it, but shouldn't.
3. **Could Have**: Nice to have. Include if effort allows.
4. **Won't Have (this time)**: Explicitly deferred. Documented for future consideration.
5. Validate against PRD success criteria — if an item is needed to meet a success criterion, it's Must Have.

### Stack Rank Against Goals

Rank items strictly against stated goals or success criteria.

1. Read goals from the PRD success criteria or project charter
2. For each item, assess contribution to each goal (strong/moderate/weak/none)
3. Force-rank: no ties. Every item gets a unique position.
4. Present the ranked list with rationale for each position
5. Flag items that don't contribute to any goal — candidates for cutting

### Compare Options

Score alternatives against weighted criteria (for decision-making, not just prioritization).

1. Define criteria (e.g., user impact, technical risk, time to market, cost)
2. Weight each criterion (weights must sum to 100%)
3. Score each option against each criterion (1-5)
4. Calculate weighted score
5. Present comparison table with recommendation
6. Reference relevant decision and constraint entities from the knowledge graph

## Knowledge Graph Integration

Prioritization draws from and writes to the knowledge graph:

**Reads:**
- `problems/` — severity and frequency inform impact scoring
- `evidence/` — quantitative evidence informs reach estimates, confidence ratings inform RICE confidence
- `personas/` — persona counts and segments inform reach
- `constraints/` — effort estimates, timeline constraints
- `features/` — current status, dependencies

**Writes:**
- Prioritization results can be stored as `decisions/` entities (e.g., "decision to prioritize SSO over RBAC based on RICE scoring")
- Evidence of prioritization rationale for traceability

## Output Format

All prioritization outputs use consistent table format:

```markdown
| Rank | Item | Score/Class | Rationale | Graph Refs |
|------|------|-------------|-----------|------------|
| 1 | {{item}} | {{score}} | {{why}} | `features/{{id}}` |
```

## Usage by Agents

```
# PRD drafter prioritizing requirements
Use prioritization skill with MoSCoW:
  items: [R1 SSO support, R2 RBAC, R3 audit logging, R4 password policies]
  context: PRD success criteria for auth feature

# Delivery planner sequencing work
Use prioritization skill with RICE:
  items: all features with status "approved"
  data_source: knowledge graph (pull reach from personas, impact from problems)

# Reporter highlighting what matters
Use prioritization skill with stack-rank:
  items: in-progress features
  goals: PRD success criteria
```
