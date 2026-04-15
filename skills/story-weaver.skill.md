---
name: Story Weaver
description: Builds scroll-driven narrative stories as self-contained HTML pages from product artifacts and knowledge graph entities
version: 0.1.0
phase: meta
owner: roughcompass
status: active
---

# Story Weaver Skill

## Description

Produces production-grade interactive scroll-driven story pages. Each story is a sequence of full-viewport scenes with editorial typography, considered motion, and optional interactive moments. Output is self-contained HTML + CSS + JS that opens directly in any browser. No build step, no framework, no dependencies beyond Google Fonts.

This is a cross-cutting skill — any lifecycle phase agent can use it to turn product artifacts into compelling visual narratives.

## When to Use

Use story-weaver when an agent or user wants to present product knowledge as a **structured narrative**, typically to:

- Pitch a product vision or strategy to stakeholders (definition phase)
- Present discovery research findings as a compelling readout (discovery phase)
- Explain a before/after transformation — migration, architecture shift, reorg (architecture phase)
- Walk someone through a complex concept with paced reveals
- Build an interactive explainer, internal demo, or launch narrative (release phase)
- Convert a retrospective into something someone will actually remember (feedback phase)

Do NOT use for: dashboards, forms, tool UI, documentation sites, or single static pages with no narrative arc. Those belong in the frontend-design skill.

## Knowledge Graph Integration

Story-weaver can generate narratives directly from knowledge graph entities. This is the key upgrade over standalone usage — the graph provides structured content that maps naturally to story arcs.

### Graph-to-Story Mapping

| Graph Entity | Story Element |
|-------------|---------------|
| Problems (with evidence) | Hook / current state scenes — make the pain visible |
| Evidence (quantitative) | Stats scene — big numerals that land the cost |
| Evidence (qualitative) | Pullquote scene — one sentence from a user or stakeholder |
| Competitors | Two-up scene — before/after or side-by-side comparison |
| Features | Capability grid scene — what becomes possible |
| Decisions (with rationale) | Pivot scene — the reframe moment |
| Constraints | Context within body text — boundaries that shaped the solution |
| Personas | Framing for the hook — who feels this problem |

### Workflow: Graph-Driven Story

When generating a story from the knowledge graph:

1. **Query the graph** for entities related to the topic (use knowledge-graph skill)
2. **Assess coverage** — do we have enough entities for a full arc?
   - Need at minimum: 1 problem, 1+ evidence, 1 feature or decision
   - Ideal: 2+ problems, 3+ evidence (mix of quant/qual), competitors, features
3. **Map entities to arc positions** using the table above
4. **Draft the scene sequence** as bullet points before writing markup
5. **Generate the story** filling scenes with graph-sourced content
6. **Add graph references** as data attributes for traceability:
   ```html
   <section class="scene" data-scene="4" data-chapter="The numbers"
            data-graph-refs="evidence/q1-abandonment-rate,evidence/support-ticket-volume">
   ```

### Workflow: Manual Story

When the user provides content directly (no graph):

1. Gather the narrative material from the user
2. Draft the scene sequence
3. Generate the story from user input
4. Optionally, create knowledge graph entities from the story content (reverse flow)

## Shape of a Story

A story is:

1. **A landing scene** — full-bleed hook with display type, eyebrow label, and a dek
2. **A sequence of middle scenes** — each full-viewport, each earning its place
3. **A closing scene** — the payoff, the one-line takeaway
4. **A runtime** — shared scroll engine, progress bar, scene dots, keyboard nav
5. **An optional stories index** — a landing page linking to every story in the folder

A typical story has 6–10 scenes. Fewer feels thin. More overstays its welcome.

## Building a Story

### 1. Output Directory

Ask the user where the story should live. Default to a `stories/` directory in the target project. Stories are standalone — they should not couple to a running app.

```
stories/
├── assets/
│   ├── runtime.css    ← shared across stories
│   └── runtime.js     ← shared across stories
├── index.html         ← optional landing listing all stories
└── <story-slug>/
    ├── index.html     ← the story
    ├── story.css      ← story-specific theme + scene styling
    └── story.js       ← story-specific interactive widgets (optional)
```

### 2. Set Up Shared Runtime

If the target directory does not already have `assets/runtime.css` and `assets/runtime.js`, copy them from `templates/story-weaver/assets/`. Multiple stories share one runtime.

### 3. Commit to an Aesthetic

Before writing markup, pick the aesthetic. Never default to generic SaaS.

- **Editorial dark** — warm near-black, cream text, single accent. NYT Magazine meets Linear changelog. Good for serious pitches, convergence stories, platform narratives.
- **Editorial light** — off-white, high-contrast serif, single accent. Clinical, authoritative. Good for research readouts, strategy memos.
- **Brutalist** — raw monospace, gridlines visible, annotations in margins. Good for technical arguments, reliability stories.
- **Retro-futuristic** — orange/cyan on deep blue, geometric shapes, soft terminal glow. Good for developer-platform stories.
- **Museum catalog** — cream paper, deep serif, quiet. Good for history/origin stories.
- **Zine** — harsh contrast, rotated text, photocopy textures. Good for rebellion/change narratives.

If you can't name the direction in one phrase, you haven't picked one.

### 4. Choose Typography

**Never use Inter, Roboto, Arial, Helvetica, or system defaults for display type.**

Good display faces (Google Fonts):
- **Fraunces** — variable serif, optical-size axis gets expressive at display sizes
- **Instrument Serif** — dramatic contrast, large-size-optimized
- **Redaction** — typewriter-display hybrid, great for zine/brutalist
- **DM Serif Display** — high contrast didone

Body pairings:
- **IBM Plex Sans** — humanist, distinctive
- **IBM Plex Serif** — serif-on-serif editorial
- **Newsreader** — variable, editorial

Mono for labels/eyebrows:
- **JetBrains Mono**
- **IBM Plex Mono**
- **Space Mono** (strong personality, use sparingly)

Override `--story-display`, `--story-body`, `--story-mono` in `story.css`.

### 5. Draft Scene Sequence

Write the outline as bullet points before markup. For each scene: eyebrow, headline (compose as 3 display lines), dek, interactive moment if any. **Every scene must earn its place.**

Reliable arc structure:

1. **Hook** — one sentence anyone can feel
2. **Current state** — what's true right now, made visible
3. **Cost/pain** — why the current state is untenable
4. **Pivot** — the question or the reframe
5. **Target state** — what the world looks like after
6. **Value** — the capabilities/benefits unlocked
7. **Closer** — the one-line takeaway

### 6. Write Markup

Start from `templates/story-weaver/story.template.html`. Scene types from `templates/story-weaver/references/scene-patterns.md`:

- `scene--hero` — full-bleed opener
- `scene--text` — display type with eyebrow + headline + dek
- `scene--pullquote` — one sentence, huge, italic
- `scene--stats` — data grid with big numerals
- `scene--two-up` — side-by-side comparison
- `scene--capability-grid` — feature cards grid
- `scene--widget` — wraps a story-specific interactive moment
- `scene--closer` — final takeaway

### 7. Interactive Moments

Add only when they make the argument land harder than text alone:

- **Tab-switcher** — shows multiple states of the same thing
- **Before/after comparison** — two columns, the user's eye does the work
- **Counter/ticker** — numbers that climb or land dramatically
- **Scrubber** — drag a slider through a timeline
- **Workflow stepper** — step through a journey with annotations

No decorative animations. No hover effects that don't change comprehension. No carousels.

### 8. Verify

Open in a browser. Check: scene transitions on scroll, progress bar fills, dots sync, keyboard nav (arrows/j/k/space) works, fonts load, no console errors. Test desktop and mobile.

## Publishing

Stories are self-contained HTML. Three deployment tiers:

### Local (default)
```bash
# Just open it
open stories/my-story/index.html

# Or serve it
npx serve stories/
```

### GitHub Pages
Add to your repo's GitHub Pages source. If using `docs/` as the source:
```bash
cp -r stories/ docs/stories/
git push
```
Or configure Pages to serve from a `stories` branch.

### Static Hosting (Vercel / Netlify / Cloudflare Pages)
Point the hosting provider at the `stories/` directory. Zero config — it's static HTML.

For automated publishing, a GitHub Action on push to `stories/**`:
```yaml
# .github/workflows/publish-stories.yml
name: Publish Stories
on:
  push:
    paths: ['stories/**']
jobs:
  deploy:
    # deploy stories/ to your static host
```

## Runtime Contract

The runtime in `assets/runtime.js` expects:

- `<main class="story">` wrapping everything
- `<section data-scene="N" data-chapter="Label">` elements, numbered from 1
- Optional `<div class="story-progress"></div>` (progress bar)
- Optional `<nav class="story-dots"></nav>` (dots injected by JS)
- Optional `<div class="story-chapter"></div>` (chapter label)

The runtime provides:

- `.is-active` class on the visible scene (drives CSS reveal animations)
- Progress bar via `--progress` custom property
- Scene dots auto-built from scene count
- Keyboard nav: arrows, j/k, Space/Shift+Space, PageUp/Down, Home/End
- `scene:enter` CustomEvent when a scene becomes active
- `window.storyWeaver` API: `{ scenes, setActive, currentIndex, totalScenes, on }`

## CSS Variable Contract

Override in `story.css`:

**Theme:** `--story-bg`, `--story-fg`, `--story-dim`, `--story-mute`, `--story-accent`, `--story-rule`, `--story-soft`, `--story-danger`, `--story-ok`
**Typography:** `--story-display`, `--story-body`, `--story-mono`
**Type scale:** `--story-scale-eyebrow`, `--story-scale-body`, `--story-scale-dek`, `--story-scale-h1`, `--story-scale-h2`, `--story-scale-hero`
**Layout:** `--story-max`, `--story-gutter`, `--story-pad`

## Reference Files

- `templates/story-weaver/story.template.html` — skeleton scene structure
- `templates/story-weaver/references/scene-patterns.md` — catalog of scene types with markup
- `templates/story-weaver/references/design-principles.md` — aesthetic guidance and anti-patterns
- `templates/story-weaver/assets/runtime.css` — shared scroll engine styles
- `templates/story-weaver/assets/runtime.js` — shared scroll engine logic
