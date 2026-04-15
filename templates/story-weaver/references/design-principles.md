# Design Principles for Stories

A story is editorial, not a product page. The reader is here for an argument, not a feature list. Every visual choice should serve attention, pacing, and memory.

## The Five Rules

### 1. Commit to one aesthetic. Don't hedge.

Bold maximalism and refined minimalism both work. Generic mid-range SaaS does not. Pick a clear conceptual direction and execute it with precision in every scene.

Acceptable directions (one per story, never blended):

- **Editorial dark** — warm near-black background, cream text, single accent. NYT Magazine + Linear changelog.
- **Editorial light** — off-white, high-contrast serif, single accent. Research paper + The New Yorker.
- **Brutalist** — raw monospace, visible gridlines, deliberate ugliness, annotations in margins.
- **Retro-futuristic** — orange/cyan on deep blue, geometric forms, soft terminal glow.
- **Museum catalog** — cream paper, deep serif, very quiet, generous whitespace.
- **Zine** — harsh contrast, rotated text, photocopy textures, chaos with intent.

If you can't name the direction in one phrase, you haven't picked one.

### 2. Typography is the entire design.

In a story, the type *is* the visual. There are no marketing illustrations, no product screenshots (mostly), no hero images. The reader sees three things: the letterforms, the negative space, and the rhythm. Get those three right and nothing else matters.

**Display type rules:**

- Use a characterful display face. Variable fonts with optical-size axes (Fraunces, Newsreader) get more dramatic at large sizes — exploit that.
- Set display headlines BIG. `clamp(3rem, 9vw, 7.5rem)` is a starting point. Don't be timid.
- Tighten letterspacing on display (`-0.025em` to `-0.04em`). It looks intentional.
- Loosen line-height on display (`0.92` to `1.0`). Display type breathes when lines almost touch.
- Use italic + accent color for emphasis inside headlines. One word per headline maximum.

**Body rules:**

- Body copy is for reading, not display. Use a refined sans (IBM Plex Sans, Newsreader Sans) at `1.0625rem` to `1.125rem`.
- Line-height around `1.55` to `1.65`. Generous.
- Max width `60ch` to `66ch`. Anything wider becomes hard to scan.
- Body is dim by comparison to display. The display does the work; the body fills in.

**Eyebrow rules:**

- Mono, uppercase, wide letterspacing (`0.18em` to `0.22em`).
- Always paired with a leading horizontal rule. The rule visually anchors the label.
- Color: accent. The eyebrow is the only place the accent color appears in small text.

### 3. Pacing is the entire UX.

Every scene gets 100vh of attention. The reader's eye doesn't compete with anything else. Don't squander the stage.

- One major idea per scene. If you have two, split them.
- Use `.stagger` reveals. The cascade is the moment the scene "arrives."
- Resist the urge to fill the viewport. Negative space *is* content in a scene-driven story.
- Long body paragraphs are anti-pattern. Two short paragraphs > one long one. The reader can leave at any point.

### 4. Interactivity earns its place or doesn't exist.

A story is not a product. Interactive widgets are expensive in attention and easy to misuse. Add them only when:

- The widget makes the argument land *harder* than text alone could
- The user *feels* something by interacting that they couldn't read about
- The widget is one of: a comparison swapper, a workflow stepper, a counter, a tab-switcher with thematic state, a scrubber

Anti-patterns:

- Hover effects that don't change comprehension
- Decorative animations on every element
- Carousels (the reader will not click)
- Anything that requires reading instructions

### 5. Color is one accent, used like a signature.

Stories should feel like a single voice. One accent color, used precisely. Never two. Three colors total in a story:

- Background (`--story-bg`)
- Foreground (`--story-fg`)
- Accent (`--story-accent`) — used for: eyebrow text, eyebrow rule, italic emphasis in display, link/CTA, stat values, key chip color, optional rule under headline

Allowed exceptions:
- Friction red (`--story-danger`) and OK green (`--story-ok`) for before/after stories. Use only inside chips and column labels, never in body.
- A subtler dim text color (`--story-dim`) for body copy that recedes.

That's it. Five colors maximum. Most stories use three.

## Anti-Patterns

These are the signals of generic AI design output. Do not produce them.

- **Inter as display type.** Inter is good for product UI, generic for editorial. Same for Roboto, Open Sans, Helvetica, system sans.
- **Purple gradients on white backgrounds.** The single most-overused AI design choice.
- **Card grids of feature blurbs with rounded corners and soft shadows.** This is SaaS landing-page boilerplate. A capability grid is OK only when bordered, sharp-cornered, and editorial in tone.
- **Centered hero with a CTA button.** Stories don't have CTAs. The closer is a sentence, not a button.
- **Three-column "How it works" sections with circular icons.** No.
- **Stock photography placeholders.** No images at all is better than placeholder rectangles.
- **Marketing-speak.** "Empower your team to unlock seamless productivity." Burn it. Stories use plain, specific, declarative sentences with concrete nouns.
- **Hover effects that scale things up by 1.05x.** Lazy. If you add a hover effect, change the actual visual state — color, border, glyph reveal — not just a transform.
- **Tailwind defaults applied uniformly.** Tailwind is fine. Tailwind defaults are not editorial. Override the type scale, the colors, the spacing. Make it look like *this story*, not like every story.
- **Drop shadows everywhere.** Shadows are an architectural choice, not a default. Use them when they mean something (elevation, separation), not as polish.
- **Centered everything.** Asymmetry has more energy. Lead with left-aligned scenes; reserve centered for hero/closer only.

## When to Break the Rules

Break a rule when it serves the argument. The rules above are defaults that prevent generic output, not commandments. A zine-style story might use four colors. A brutalist story might use system mono everywhere. A museum-catalog story might use no accent color at all. The point is intentionality — every deviation should be a choice you can defend in one sentence.
