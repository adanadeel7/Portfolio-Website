---
name: Warm Editorial Tech
colors:
  surface: '#16111e'
  surface-dim: '#16111e'
  surface-bright: '#3d3645'
  surface-container-lowest: '#110c18'
  surface-container-low: '#1f1926'
  surface-container: '#231d2a'
  surface-container-high: '#2d2735'
  surface-container-highest: '#393240'
  on-surface: '#eadef2'
  on-surface-variant: '#d3c3bf'
  inverse-surface: '#eadef2'
  inverse-on-surface: '#342e3c'
  outline: '#9c8e8a'
  outline-variant: '#4f4442'
  surface-tint: '#e2bfb7'
  primary: '#e2bfb7'
  on-primary: '#412b26'
  primary-container: '#a98a82'
  on-primary-container: '#3a241f'
  inverse-primary: '#735852'
  secondary: '#e3beb5'
  on-secondary: '#422b24'
  secondary-container: '#5b413a'
  on-secondary-container: '#d1ada4'
  tertiary: '#d1c0e3'
  on-tertiary: '#372b47'
  tertiary-container: '#9a8bab'
  on-tertiary-container: '#30243f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd2'
  primary-fixed-dim: '#e2bfb7'
  on-primary-fixed: '#2a1712'
  on-primary-fixed-variant: '#59413b'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#e3beb5'
  on-secondary-fixed: '#2a1611'
  on-secondary-fixed-variant: '#5b413a'
  tertiary-fixed: '#eddcff'
  tertiary-fixed-dim: '#d1c0e3'
  on-tertiary-fixed: '#211630'
  on-tertiary-fixed-variant: '#4e415e'
  background: '#16111e'
  on-background: '#eadef2'
  surface-variant: '#393240'
typography:
  display:
    fontFamily: Geist
    fontSize: 3.5rem
    fontWeight: '500'
    lineHeight: '1.15'
    letterSpacing: -0.035em
  display-mobile:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: '1.25'
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: '1.35'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Geist
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.005em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: -0.01em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.08em
  label-ui:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1.25'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system takes direct inspiration from high-end conversational AI surfaces—specifically the literary, humanist warmth of the Claude environment—translating it into a single-page technical portfolio. It eschews generic developer portfolio tropes (such as neon terminal gradients, chaotic particle meshes, and harsh cold-black voids) in favor of literary restraint, thoughtful typography, and tactile earthen tones.

The style is **Editorial Minimalist with Warm Tonal Layering**. It presents the developer not just as an engineer writing code, but as a systems thinker, craftsman, and articulate builder.
- **Tone:** Authoritative, contemplative, intellectually rigorous, and calm.
- **Target Audience:** Engineering leaders, technical founders, design-forward hiring managers, and enterprise collaborators.
- **Emotional Response:** Inspires quiet confidence, effortless readability, and immediate trust through rhythmic layout and deliberate color friction.

## Colors

The palette embraces a non-standard dark environment anchored in warm slates and terracotta umbers rather than sterile cold grays. Dark mode serves as the primary canvas to emulate a focused, late-night thinking environment.

### Dark Mode (Default)
- **Base / Canvas (`#4b4453`):** Deep muted slate purple providing a grounded, low-glare backdrop.
- **Surfaces & Cards (`#5b413a`):** Earthy espresso tone layered over the slate background to create warm physical presence without reliance on synthetic drop shadows.
- **Primary Text (`#b5a5c7`):** Soft, desaturated lilac-tinted white for high legibility without the eye fatigue caused by raw `#FFFFFF`.
- **Muted Text & Structural Borders (`#7c7484`):** Weathered slate purple for hair-thin structural divisions, metadata, and subdued captions.
- **Accent & Interaction (`#8e716a`):** Terracotta mauve used for primary actions, subtle glows, active states, and focused interactions.

### Light Mode
- **Base / Canvas (`#ffffff`):** Crisp pure white.
- **Surfaces & Cards (`#f8f7fa`):** Subtle alabaster-tinted warm gray to distinguish content clusters.
- **Primary Text (`#474554`):** Deep charcoal slate with warm undertones.
- **Borders & Accents (`#aca7cb`):** Lavender slate for borders, active links, and tags.

Use surface layers intentionally: interactive cards use the warm espresso surface tone, framed by hairline borders using the muted border tone at 40% to 60% opacity.

## Typography

The type system balances the crisp precision of **Geist** with the calculated, mechanical character of **JetBrains Mono**. 

- **Geist** delivers an editorial cadence for all narratives, case studies, project synopses, and headlines. It avoids decorative distraction while retaining modern letterforms.
- **JetBrains Mono** is deployed for technical provenance: timestamps, metrics, git hashes, stack badges, parameter tags, and section counters (e.g., `01 // ARCHITECTURE`).
- **Hierarchy Rules:** 
  - Never set body copy in pure white. Always use the primary lilac-tinted text tone to preserve an ink-on-matte texture.
  - Large display titles carry negative tracking (`-0.035em`) to maintain an authoritative editorial presence.
  - Subsections, section tags, and micro-labels must be transformed to uppercase using `label-caps` in JetBrains Mono.

## Layout & Spacing

The portfolio is structured around a centered single-column editorial canvas with an optional 12-column sub-grid for dense technical data.

- **Maximum Content Width:** The primary layout conforms to an intentional max-width of `860px` for the core narrative feed, expanding to `1140px` for featured case study showcases and code comparisons.
- **Grid Structure:** A 12-column fluid grid system operates within container limits, featuring `1.5rem` gutters on desktop and `1rem` on mobile.
- **Breakpoints:**
  - `Mobile (< 640px)`: Margins shrink to `1.25rem`. Complex dual-column split components reflow into single vertical stacks. Sticky table-of-contents elements collapse into a floating micro-dock.
  - `Tablet (640px - 1024px)`: Margins scale to `2rem`. Two-column layouts activate for project listings and technical specs.
  - `Desktop (> 1024px)`: Full `3rem` margins. Side-rail technical artifacts, chat-prompt demonstrations, and code diffs sit alongside project narratives.
- **Vertical Rhythm:** Generous spacing (`space-xl` and higher) demarcates independent narrative chapters (Hero/Overview, Featured Case Studies, Interactive Playground/Prompt Demos, Open Source/Architecture, Contact/Terminal).

## Elevation & Depth

This design system avoids loud skeuomorphic drops and harsh synthetic drop shadows. Depth is achieved via **Tonal Layering** and **Low-Contrast Outlines**, reproducing the soft physical layering of an editorial artifact.

- **Flat Canvas Tier (Ground):** The background slate (`#4b4453`) forms the baseline canvas.
- **Elevated Surfaces (Layer 1):** Cards, terminal shells, and content blocks sit on `#5b413a` (the warm espresso tone), outlined with a crisp `1px` border of `#7c7484` at 35% opacity.
- **Floating Modals & Code Tooltips (Layer 2):** Overlay surfaces utilize `#5b413a` backed by a subtle `backdrop-filter: blur(12px)` and a diffused, warm ambient shadow: `0 16px 32px -8px rgba(35, 26, 24, 0.45)`.
- **Focus & Interaction:** Hover states do not lift through physical Y-translation; instead, the border transitions from 35% opacity to 80% opacity in `#8e716a` (terracotta mauve), accompanied by an inner hairline highlight.

## Shapes

The design system embraces a **Soft (Level 1)** corner geometry. Rounded corners remain reserved and structural, preserving an architectural aesthetic rather than a bubbly consumer feel.

- **Micro elements (Badges, tags, inputs):** `0.25rem` (4px).
- **Cards, code panels, and project blocks:** `0.5rem` (8px).
- **Floating bottom bars and dialogs:** `0.75rem` (12px).
- **Circular elements:** Fully rounded circles (`9999px`) are reserved exclusively for developer status indicators (e.g., active availability green/terracotta pulse) and user avatar masks.

## Components

### Buttons
- **Primary Action (Conversion / Get in Touch / Download CV):** Background `#8e716a`, text `#ffffff`, border `1px solid rgba(255, 255, 255, 0.15)`. Soft corners (`0.25rem`). Height 40px, padding `0 1.25rem`. Label set in `label-ui`. On hover: brightness shifts 1.08x with a warm, subtle border glow.
- **Secondary Action (View Code / Case Study):** Background transparent, text `#b5a5c7`, border `1px solid #7c7484` (60% opacity). On hover: background `#5b413a`, border color `#8e716a`.
- **Ghost Action / Link:** No background or border. Monospace icon paired with Geist text, underlined only on hover.

### Chips & Badges
- **Tech Stack Badges:** Built with JetBrains Mono (`label-caps`). Background: `#4b4453` inset within `#5b413a` containers. Text: `#b5a5c7`. Border: `1px solid #7c7484` (30% opacity). Compact vertical padding (2px 8px).
- **Status Indicator (e.g., "Available for Staff Roles"):** Pill-style chip containing a 6px breathing terracotta dot (`#8e716a`), text set in `label-caps`.

### Project Cards & Case Study Showcases
- **Container:** Warm espresso base (`#5b413a`) with `0.5rem` border-radius and `1px solid rgba(124, 116, 132, 0.4)`.
- **Header:** Features an editorial layout with project title in `headline-md`, publication/delivery year in `label-caps` aligned right.
- **Interactive Element (Claude-inspired Artifact Preview):** A segmented panel within the card featuring a live code sandbox tab and an architecture diagram preview tab, bounded by a hairline divider (`#7c7484`, 25% opacity).

### Code Blocks & Interactive Terminal
- **Surface:** Deep slate (`#4b4453`) inset within the card. JetBrains Mono body (`code-block`).
- **Syntax Highlighting Palette:** Lilac `#b5a5c7` for base identifiers, muted slate `#7c7484` for comments/delimiters, terracotta `#8e716a` for constants and control keywords.
- **Copy Utility:** Top-right floating button with minimal clipboard icon, switching to a checkmark micro-animation on activation.

### Input Fields & Quick Contact Prompt
- Emulates the Claude chat input bar: a wide, conversational input box allowing visitors to send a direct dispatch or query candidate skills.
- **Surface:** `#5b413a` background with `1px solid #7c7484` border. Focused state transitions border to `#8e716a` with zero blur outline.
- **Placeholder:** `#7c7484` in `body-md` ("Ask a question about my architecture experience or send a note...").

### Lists & Experience Timeline
- Minimal border-left rule (`1px solid rgba(124, 116, 132, 0.3)`) punctuated by square 6px terracotta nodes marking career epochs and open-source releases.