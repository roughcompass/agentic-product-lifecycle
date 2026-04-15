---
name: Story Weaver
description: Builds scroll-driven narrative stories as self-contained HTML pages from product artifacts and knowledge graph entities
version: 0.2.0
phase: meta
owner: roughcompass
status: active
---

# Story Weaver Skill

## Description

Produces production-grade interactive scroll-driven story pages. Each story is a sequence of full-viewport scenes with editorial typography, considered motion, and optional interactive moments. Output is self-contained HTML + CSS + JS that opens directly in any browser. No build step, no framework, no dependencies beyond Google Fonts. No external APIs or backend dependencies — all data, logic, and assets must live inside the file. Use CDN links for libraries only when unavoidable, and note when this is done.

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

Before writing markup, pick the aesthetic. **The default is editorial light** — clean, confident, professional. Generous white space, restrained typography, a single accent color used with discipline. Reference sensibility: JPMorgan.com, a high-end annual report, or a McKinsey white paper. This baseline works for most stories.

Dark themes and expressive typography are valid when the content demands it, but must be a **deliberate choice, not a default**. If you choose a non-default direction, state why before writing markup.

Available directions (editorial light is default, others require justification):

- **Editorial light** *(default)* — off-white, high-contrast black serif display, single accent. Clinical, authoritative. Good for pitches, strategy, product stories, research, white papers.
- **Editorial dark** — near-black warm background, cream text, single accent. Good for dramatic narratives, convergence stories, transformation arcs. *Choose this when the content has high emotional stakes.*
- **Brutalist** — raw monospace, gridlines visible, annotations in margins. Good for technical arguments, reliability stories. *Choose this when the audience is deeply technical.*
- **Museum catalog** — cream paper, deep serif, quiet. Good for history/origin stories.

Never default to generic SaaS aesthetics.

**Narrative coherence across the whole piece:** Treat the full page as one story with a beginning, middle, and end. Typography, color, spacing, and motion must be consistent across all sections. No section should feel like it came from a different design. Establish a clear visual system at the start and honor it throughout.

**Legibility at presentation scale:** Assume the output may be projected or shared on a large screen. Default to larger base font sizes (18–22px body, 40px+ headlines), high contrast, and ample padding. Avoid fine details that disappear at distance.

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

### 7. Interactive Moments — Presenter Control, Not Decoration

Interactivity exists to let the presenter control the pace of the story — not to impress viewers with effects. Every interactive component should have a clear structure: click to advance, scroll to reveal, toggle to compare, step through a sequence.

**Prioritize:** step reveals, section navigation, progressive disclosure, and state changes the presenter triggers.

**Minimize:** ambient animations, auto-playing effects, or motion that runs without user intent.

Good interactive patterns:

- **Step reveals** — click to reveal the next piece of content within a scene
- **Tab-switcher** — shows multiple states of the same thing, presenter chooses
- **Before/after comparison** — two columns or toggle, the user's eye does the work
- **Workflow stepper** — step through a journey with annotations
- **Progressive disclosure** — details expand on click, keeping the default view clean

No decorative animations. No hover effects that don't change comprehension. No carousels. No auto-playing counters that fire once and can't be replayed.

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

## Critic Subagent

After generating a story, spawn a critic subagent to evaluate the output. The critic uses this skill's own principles as its evaluation rubric — the skill defines what good looks like, and the critic enforces it.

### Critic Responsibilities

1. **Take a screenshot** of the rendered story using available browser/screenshot tools. Capture at desktop width (1280x900) at minimum.

2. **Evaluate the screenshot visually** against these criteria, scoring each 1–5:

   | Criterion | What to assess |
   |-----------|---------------|
   | **Aesthetic clarity** | Light, editorial, professional — not dark or generic unless explicitly justified. Generous whitespace, restrained typography, single accent color. |
   | **Narrative flow** | Is the content sequenced and revealed logically? Does the arc have a clear beginning, middle, and end? Does every scene earn its place? |
   | **Interactivity quality** | Does interaction serve presenter control (step reveals, navigation, toggles), not decoration (ambient animations, auto-play)? |
   | **Legibility at scale** | Would this read well projected on a large screen? Body 18–22px, headlines 40px+, high contrast, ample padding. |
   | **Coherence** | Does the whole piece feel like one designed system? Typography, color, spacing, and motion consistent across all sections. |

3. **Return structured feedback:**
   - What specifically failed (criterion, score, why)
   - What specifically worked (criterion, score, why)
   - One concrete code change to fix the weakest area

4. **Apply the fix** and re-screenshot to confirm improvement.

5. **Propose a skill update:** If the issue or the fix reveals a gap or a wrong assumption in this skill itself, draft a one-line addition or correction to the skill rules and ask the user to approve it. Approving a skill update closes the loop — the next generation starts from a better baseline.

### Invoking the Critic

Use the Agent tool to spawn the critic as a subagent:

```
Agent({
  description: "Story-weaver critic",
  prompt: "You are a visual design critic for a story-weaver output. Take a screenshot of [story path], evaluate it against the 5 criteria (aesthetic clarity, narrative flow, interactivity quality, legibility at scale, coherence), score each 1-5, report what failed and what worked, and propose one concrete code fix for the weakest area. Then apply the fix and re-screenshot to confirm."
})
```

The critic should be harsh but constructive. A score of 3 is mediocre. The bar is 4+ on every criterion.

## Visual Review Loop

After generating a story, treat the first output as a **draft to be validated**, not a final deliverable.

1. Render a live preview (open in browser or take a screenshot)
2. Run the critic subagent
3. Ask the user: **"Does this visual direction feel right — aesthetic, pacing, and flow? What would you adjust?"**
4. Apply feedback (from critic and user) and re-render
5. Iterate until the user confirms or the critic scores 4+ on all criteria

Never present a story as finished without at least one visual validation pass. The first generation is a starting point for dialogue, not a delivery.
