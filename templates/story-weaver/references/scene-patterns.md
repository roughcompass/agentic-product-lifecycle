# Scene Patterns

A catalog of scene types the runtime supports out of the box. Every scene is a `<section data-scene="N">` with a `.scene-inner` child that holds content. Wrap children in `.stagger` to get the staggered reveal animation.

Optional: add `data-graph-refs="type/id,type/id"` to link a scene to knowledge graph entities for traceability.

## scene--hero

Full-bleed opener. Used once at the start. Big display headline, dek, scroll cue.

```html
<section class="scene scene--hero" data-scene="1" data-chapter="Hook"
         data-graph-refs="problems/onboarding-drop-off">
  <div class="scene-inner stagger">
    <p class="eyebrow">Platform Convergence · 2026</p>
    <h1 class="display hero-display">
      <span class="line">The firm is four</span>
      <span class="line"><em>record labels</em></span>
      <span class="line">pressing the same album.</span>
    </h1>
    <p class="dek">Scroll to see what that costs — and what it looks like when you stop.</p>
  </div>
  <div class="scene-end">scroll</div>
</section>
```

Use `<em>` inside the display to highlight a phrase in the accent color (italic, soft variant).

## scene--text

Pure text scene with eyebrow + headline + body or dek. The workhorse.

```html
<section class="scene" data-scene="2" data-chapter="Current state">
  <div class="scene-inner stagger">
    <p class="eyebrow">Chapter 02 — The way it is</p>
    <h2 class="display">Right now, there are four.</h2>
    <div class="body-text">
      <p>Four runtimes. Four delivery pipelines. Four implementations of every shared capability the firm relies on.</p>
      <p>The same client. The same job. <strong>Four completely different products under the same roof.</strong></p>
    </div>
  </div>
</section>
```

`<strong>` in `.body-text` gets the accent color.

## scene--pullquote

One sentence, huge, italic. Earns its own scene. Use sparingly — at most twice per story.

```html
<section class="scene" data-scene="3" data-chapter="Cost"
         data-graph-refs="evidence/user-quote-sso-frustration">
  <div class="scene-inner stagger">
    <p class="eyebrow">Chapter 03 — What it costs</p>
    <blockquote class="pullquote">
      Four companies in a trench coat.
      <cite class="pullquote-attribution">— The current architecture, in five words</cite>
    </blockquote>
  </div>
</section>
```

## scene--stats

Grid of large numerals with mono labels. Best for landing 2–4 facts that compound.

```html
<section class="scene" data-scene="4" data-chapter="The numbers"
         data-graph-refs="evidence/q1-abandonment-rate,evidence/support-ticket-volume">
  <div class="scene-inner stagger">
    <p class="eyebrow">Chapter 04 — In the numbers</p>
    <h2 class="display">The hidden tax, made visible.</h2>
    <div class="stats">
      <div class="stat">
        <span class="stat-value">4x</span>
        <p class="stat-label">implementations of every shared capability</p>
      </div>
      <div class="stat">
        <span class="stat-value">200+</span>
        <p class="stat-label">MFEs locked to their birth platform</p>
      </div>
      <div class="stat">
        <span class="stat-value">0</span>
        <p class="stat-label">that can be reused without re-implementation</p>
      </div>
    </div>
  </div>
</section>
```

Stats values use the display font at large weights. Keep them short (numbers, percentages, x).

## scene--two-up

Side-by-side comparison. Good for before/after. Each column gets a `.column-label` (use `.is-before` red or `.is-after` green for friction stories).

```html
<section class="scene" data-scene="5" data-chapter="Before / after"
         data-graph-refs="competitors/acme-wizard,features/guided-sso-wizard">
  <div class="scene-inner stagger">
    <p class="eyebrow">Chapter 05 — The same job, twice</p>
    <h2 class="display">One workflow. Two architectures.</h2>
    <div class="two-up">
      <div>
        <p class="column-label is-before">Before — four platforms</p>
        <!-- before column content -->
      </div>
      <div>
        <p class="column-label is-after">After — one Frame</p>
        <!-- after column content -->
      </div>
    </div>
  </div>
</section>
```

## scene--capability-grid

Bordered grid of cards, each a single capability. 3–6 cards is the sweet spot. Each card has an index, title, and one short paragraph.

```html
<section class="scene" data-scene="6" data-chapter="What you get"
         data-graph-refs="features/personalization,features/shared-auth,features/unified-analytics">
  <div class="scene-inner stagger">
    <p class="eyebrow">Chapter 06 — What you get</p>
    <h2 class="display">Things that become possible.</h2>
    <div class="capability-grid">
      <article class="capability-card">
        <p class="capability-index">01</p>
        <h3 class="capability-title">Personalization at scale</h3>
        <p class="capability-body">One identity, one session, cross-product memory. Personalization stops being a per-product project.</p>
      </article>
      <!-- more cards -->
    </div>
  </div>
</section>
```

## scene--widget

Wraps a story-specific interactive moment. The widget itself lives in `story.css` and `story.js`. The scene just provides the framing.

```html
<section class="scene" data-scene="2" data-chapter="The four">
  <div class="scene-inner stagger">
    <p class="eyebrow">Chapter 02 — Click between them</p>
    <h2 class="display">The same client. The same data.</h2>
    <p class="dek">Four completely different products under the same roof. Click each tab.</p>
    <div class="portal-switcher">
      <!-- story-specific widget -->
    </div>
  </div>
</section>
```

## scene--closer

Variant of hero scene used at the end. Same hero-display sizing, but content lands rather than opens. Often pairs with a final eyebrow that says "Closer" or "Takeaway".

```html
<section class="scene scene--closer" data-scene="8" data-chapter="Closer">
  <div class="scene-inner stagger">
    <p class="eyebrow">Closer</p>
    <h2 class="display hero-display">
      <span class="line">Today: four companies</span>
      <span class="line">in a trench coat.</span>
      <span class="line">Tomorrow: <em>one firm.</em></span>
    </h2>
  </div>
</section>
```

## Chips

Inline pill labels. Use inside any scene to mark friction events, capabilities, or accent points.

```html
<div class="chip-group">
  <span class="chip is-friction">Re-authenticate</span>
  <span class="chip is-friction">Context lost</span>
  <span class="chip is-ok">Single sign-on</span>
  <span class="chip is-accent">First-class</span>
</div>
```

## Eyebrow Conventions

The eyebrow is a mono uppercase label with a leading rule. Use it to signal chapter, intent, or category. Prefer one of:

- `Chapter 02 — The way it is`
- `Platform · Convergence · 2026`
- `Closer`
- `Takeaway`
- `Reference implementation`

Keep it short. Two segments max. The eyebrow's job is to anchor, not narrate.
