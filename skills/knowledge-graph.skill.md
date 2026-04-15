---
name: Knowledge Graph
description: CRUD and query operations on the product knowledge graph — entities, relationships, and gap analysis
version: 0.1.0
phase: meta
owner: roughcompass
status: active
---

# Knowledge Graph Skill

## Description

Provides read/write operations on the product knowledge graph stored in `knowledge/`. Used by lifecycle agents to persist and query entities (personas, problems, evidence, competitors, features, decisions, constraints) and their relationships.

This skill works on flat YAML files in the repo. It is the abstraction point — if the backend later moves to a graph database via MCP, only this skill changes.

## Data Model

Entity files store **distilled knowledge**, not raw content. Each entity has three layers:

| Layer | Purpose | Example (evidence entity) |
|-------|---------|--------------------------|
| **Summary** | The synthesized insight, in your words | "42% of enterprise users abandon onboarding at SSO config step" |
| **Detail** | Enough context to be useful without the source | "Amplitude funnel, Q1 2026. Drop-off at SAML metadata upload. Successful users take avg 12 min." |
| **Source ref** | Pointer to the original for verification | `amplitude://funnel/sso-onboarding` or `interviews/admin-03.md:L42` |

**Entities are not copies of external content.** They are what you *learned* from the source, with a breadcrumb back to the original. You shouldn't need to open Amplitude to know what the data said, but you *can* verify it.

How this applies to each entity type:

- **Personas** — synthesized from multiple sources. The entity *is* the content. Covers anyone relevant to the lifecycle: end users, buyers, internal stakeholders, partners, regulators.
- **Problems** — synthesized understanding of a problem. Can be user-facing, business, operational, or technical. Summary + evidence references.
- **Evidence** — the insight extracted from a data source, with enough detail to stand alone. Not a copy of the raw data.
- **Competitors** — your analysis of their position. Summary + URL/product references.
- **Features** — current state of a capability. Pointers to PRDs/POCs + status summary.
- **Decisions** — original content (the rationale *is* the entity). References the evidence that informed it.
- **Constraints** — full description of the limitation. References the source (legal, architecture, stakeholder).

## IDs and Referencing

**IDs are immutable.** Once an entity is created with an ID, that ID never changes — even if the entity's `name` is updated. All cross-references use IDs, never display names.

### Rules

1. **Entity IDs** are kebab-case, generated from the initial name at creation time. They are the filename (without extension) and the reference key.
   - `personas/enterprise-admin` stays `enterprise-admin` even if renamed to "Platform Administrator"
2. **Cross-references** between entities always use `<type>/<id>` format: `personas/enterprise-admin`, `evidence/q1-abandonment-rate`
3. **Author fields** in artifacts use a stable handle (GitHub username), not a display name. Templates provide both `author_handle` (stable, for references) and `author_name` (display, can change).
4. **Renaming** updates the `name` field in the entity file. The ID, filename, and all references remain unchanged.
5. **Never reference by name.** If you need to mention an entity in prose, use the name for readability but always include the ID: "Enterprise Admin (`personas/enterprise-admin`)"

### What changes vs. what doesn't

| Field | Can change? | Used for references? |
|-------|-------------|---------------------|
| `id` | Never | Yes — all cross-references |
| `name` | Yes | No — display only |
| `author_handle` | Rarely | Yes — artifact ownership |
| `author_name` | Yes | No — display only |
| Entity filename | Never (matches `id`) | Yes — file path is the canonical locator |

## Operations

### Add Entity

Create a new entity file from the appropriate schema template.

1. Read the schema from `templates/entity-schemas/<type>.template.yaml`
2. Populate fields from provided data
3. Generate an ID (kebab-case from the initial name). **This ID is permanent.**
4. Write to `knowledge/entities/<type>/<id>.yaml`
5. Return the entity ID for relationship linking

### Update Entity

Modify an existing entity. The `id` field must not be changed.

1. Read `knowledge/entities/<type>/<id>.yaml`
2. Update specified fields (never `id`)
3. Set `updated` to current date
4. Write back

### Rename Entity

Update an entity's display name without breaking references.

1. Read `knowledge/entities/<type>/<id>.yaml`
2. Update the `name` field to the new display name
3. Set `updated` to current date
4. Write back
5. The ID, filename, and all cross-references remain unchanged

### Add Relationship

Add a relationship triple to the graph index.

1. Read `knowledge/graph.yaml`
2. Validate that the relationship type is defined in `relationship_types`
3. Validate subject and object entity files exist
4. Append to `relationships` list:
   ```yaml
   - subject: <type>/<id>
     predicate: <relationship_type>
     object: <type>/<id>
     added: <ISO date>
   ```
5. Write back

### Query: Find Related

Given an entity, find all entities related to it.

1. Read `knowledge/graph.yaml`
2. Filter relationships where subject or object matches the entity
3. Read and return the related entity files

### Query: Find by Type

List all entities of a given type.

1. Glob `knowledge/entities/<type>/*.yaml`
2. Read and return summaries (id, name, status/confidence)

### Query: Evidence for Entity

Find all evidence supporting or refuting an entity.

1. Read `knowledge/graph.yaml`
2. Find relationships where object matches the entity and predicate is `informed_by` or `validates`
3. Also check the entity's own `evidence` or `supports` fields
4. Read and return evidence entities

### Query: Gaps

Identify entities with low confidence, missing relationships, or unvalidated status.

1. Scan all entities across types
2. Flag: problems with status `hypothesized` and no evidence
3. Flag: personas with confidence `low`
4. Flag: features with no linked problems
5. Flag: decisions with no linked evidence
6. Return as a gap report

## File Conventions

- Entity files are YAML, one per entity, in `knowledge/entities/<type>/`
- Entity IDs are kebab-case, unique within their type
- Relationships are stored centrally in `knowledge/graph.yaml`
- All dates are ISO 8601 format
- Cross-references use `<type>/<id>` format (e.g., `personas/enterprise-admin`)

## Usage by Agents

```
# Discovery agent adding a finding
Use knowledge-graph skill to add an evidence entity:
  kind: quantitative
  summary: "42% abandonment at SSO config step"
  source_type: analytics
  source_ref: "Amplitude, Q1 2026"

Then link it:
  Add relationship: evidence/q1-sso-abandonment validates problems/onboarding-drop-off
```
