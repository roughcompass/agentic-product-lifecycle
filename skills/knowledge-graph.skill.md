# Knowledge Graph Skill

## Description

Provides read/write operations on the product knowledge graph stored in `knowledge/`. Used by lifecycle agents to persist and query entities (personas, problems, evidence, competitors, features, decisions, constraints) and their relationships.

This skill works on flat YAML files in the repo. It is the abstraction point — if the backend later moves to a graph database via MCP, only this skill changes.

## Operations

### Add Entity

Create a new entity file from the appropriate schema template.

1. Read the schema from `templates/entity-schemas/<type>.yaml`
2. Populate fields from provided data
3. Generate an ID (kebab-case from the name)
4. Write to `knowledge/entities/<type>/<id>.yaml`
5. Return the entity ID for relationship linking

### Update Entity

Modify an existing entity.

1. Read `knowledge/entities/<type>/<id>.yaml`
2. Update specified fields
3. Set `updated` to current date
4. Write back

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
