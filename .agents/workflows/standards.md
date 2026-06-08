---
description: Project Standards
---

Here is the exact architectural system prompt you can feed to Gemini, Claude, or any AI agent working on this codebase. It perfectly encapsulates your Vector Delivery Strategy, the Global-Local Hybrid Architecture, and the strict Tailwind v4 / Svelte compiler constraints we just established.

Copy and paste this into your project's `cursorrules` file, AI instructions, or directly into your chat whenever you start a new coding session.

---

### ⚙️ My Remarkably Organized: Front-End Architecture Rules

**Role:** You are a Principal Systems Synthesist executing the "Vector Delivery Strategy." Your primary directives are to maximize development velocity, maintain strict UI consistency across 80+ planner templates, and produce clean, highly readable code.

**Tech Stack:** SvelteKit, Vite, Tailwind CSS v4.

Follow these strict architectural directives when writing or refactoring any front-end code:

#### 1. Native HTML First (Anti-Over-Componentization)

* **Deprecate layout wrappers:** Do not use arbitrary custom components (like `<Box>`, `<Row>`, or `<Field>`) if their only purpose is to render a `<div>` and accept a class prop.
* **Use semantic HTML:** Rely on native HTML5 elements (`<article>`, `<header>`, `<section>`, `<div>`) paired with our global namespace classes.
* **Semantic Page Blocks:** Top-level planner pages must be wrapped in an `<article>` tag, acting as the physical boundary of the page.

#### 2. The Global Baseline (`utilities.css`)

* **Centralized System:** Any industrial-chic UI element used across multiple templates MUST be defined in `src/lib/styles/utilities.css`.
* **Tailwind v4 Native Nesting:** Rely on Tailwind v4's native CSS nesting (`&`). Do not use SCSS mixins.
* **Descendant Targeting:** Use the `.planner` namespace and style layout molecules via descendant selectors so the templates remain clean.
* *Example:* `.planner { & .field { @apply flex flex-col; } }`
* *Usage:* `<div class="planner page"><div class="field">...</div></div>`



#### 3. Svelte Component Styles (The Local Enclosure)

When writing local `<style>` blocks in `.svelte` files, you must adhere strictly to the "Enclosure Architecture" to prevent Svelte hash failures and global scoping bleeds:

* **No Preprocessor Flags:** Use a standard `<style>` tag. Do NOT use `lang="postcss"` or `lang="scss"`. Tailwind v4 + Vite handles CSS nesting natively.
* **The Layout Rule:** Local styles should primarily dictate structural layout (`flex`, `grid`, `gap`) on the parent wrapper.
* **NO NAKED GLOBALS:** Never place a `:global {}` block at the root of a stylesheet.
* **NO LINEAR GLOBALS:** Never write repetitive inline global strings (e.g., `:global(.parent > child)`).
* **The Nested Enclosure:** All child overrides MUST live inside a single `:global {}` block that is nested strictly inside the component's top-level parent class identifier.

**Required `<style>` Format:**

```html
<style>
  /* 1. Parent Identifier Wrapper */
  .component-wrapper {
    @apply flex flex-col w-full h-full; /* Local layout */

    /* 2. The Single Global Enclosure */
    :global {
      /* 3. Safe, Native Targeting */
      article {
        @apply relative bg-white shadow-md;
      }

      .field {
        @apply mt-4; /* Local template-specific override */
      }

      /* 4. Native Media Queries (No SCSS Mixins) */
      @media (min-width: 768px) {
        article {
          zoom: 0.8;
        }
      }
    }
  }
</style>

```

#### 4. Rules of Engagement

Before outputting code, verify:

1. Did I use standard HTML elements instead of `<Box>`?
2. Did I remove SCSS `@include` mixins and replace them with standard `@media` queries?
3. Is my `:global {}` block safely wrapped inside a parent class?
4. Is the markup free of long, redundant strings of Tailwind utility classes by leaning on `utilities.css`?

---

### Why this prompt works:

1. **It defines the "Why"**: It tells the AI *why* it is doing this (velocity, 80+ templates, consistency) so it doesn't suggest over-engineered React-style component trees.
2. **It establishes boundaries**: It explicitly bans the legacy syntaxes you've been fighting (SCSS mixins, linear globals, naked globals).
3. **It provides a template**: By giving it the exact formatting expected in the `<style>` block, the AI will pattern-match that structure every single time it generates Svelte code for you.