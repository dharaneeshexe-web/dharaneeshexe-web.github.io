# Portfolio Improvement Manifest

> Organized by priority. Every item has a file:line reference.

---

## CRITICAL — Accessibility & Correctness

### C1. Duplicate `prefers-reduced-motion` CSS blocks
**style.css:1131–1137** and **style.css:1317–1340**

Two overlapping `@media (prefers-reduced-motion: reduce)` blocks. The first (line 1131) is a minimal version. The second (line 1317) is comprehensive — it also handles preloader, fade-up, splitting chars, marquee, and project card hover transforms. The second block should be the only one; delete lines 1131–1137.

### C2. Skip-link outline removed on focus
**style.css:72–75**

```css
.skip-link:focus {
    top: 0;
    outline: none;  /* ← removes the focus indicator */
}
```

This breaks keyboard accessibility. The `:focus-visible` rule at line 1302 may not fire for all browsers on all elements. Fix: remove `outline: none` or replace with `outline: 2px solid var(--accent); outline-offset: 2px;`.

### C3. Missing `aria-hidden` on inline SVG icons
**index.html:107–108, 159, 162, 165, 279, 303, 451–457**

All inline SVGs inside interactive links (`<a>`) lack `aria-hidden="true"`. Screen readers announce each SVG as a separate image. The parent `<a>` already has `aria-label`, so the SVG should be hidden from the a11 tree. Add `aria-hidden="true"` to every inline `<svg>`.

### C4. `<main>` excludes the hero section
**index.html:227**

The `<main>` tag opens *after* the hero section (line 227: `<main id="main-content">`). This means the hero — the most important content — is outside `<main>`. It should either wrap everything from `<section class="hero">` onward, or the hero should be moved inside it. The `<a href="#about">` skip link (line 56) partially compensates, but the landmark structure is wrong.

### C5. Mobile menu lacks focus trap
**index.html:132, script.js:261–282**

When the mobile menu opens (`aria-hidden="false"`), keyboard focus can tab to elements behind the overlay. Should trap focus within `.menu-overlay` while open, and return focus to the burger button on close.

### C6. No GitHub API rate-limit handling
**script.js:479–504**

GitHub's unauthenticated API limit is 60 requests/hour. The strip silently removes itself on any error (line 487, 501), which is fine, but there's no fallback or user-facing message. Consider caching the response in `localStorage` with a 10-minute TTL so repeat visitors don't waste requests.

---

## HIGH — Performance

### H1. Excessive font weight downloads
**index.html:52**

```html
Space+Grotesk:wght@300;400;500;600;700
Inter:wght@300;400;500;600;700;800;900
JetBrains+Mono:wght@400;500;600
Syne:wght@400;500;600;700;800
```

18 individual weight files. Audit actual usage:
- `Space Grotesk` — only used via `--font` (Inter is the real body font). **Can be removed entirely.**
- `Inter` — only 400, 500, 600 are used in the body/nav. Drop 300, 700, 800, 900.
- `JetBrains Mono` — only 400, 600 are used. Drop 500.
- `Syne` — only 700, 800 are used for display headings. Drop 400, 500, 600.

Reduction: ~18 weights → ~7 weights. Saves ~200–400KB of font data.

### H2. Video gradient mesh is GPU-heavy
**style.css:127–153**

Six `radial-gradient` layers with a 18s infinite animation (`meshShift`), plus two floating orb pseudo-elements (lines 156–190) with 20–25s animations. On integrated GPUs this is the single largest frame-time contributor.

Options:
- Reduce gradient layers from 6 → 3.
- Reduce animation complexity or use `will-change: transform` on the mesh container.
- On `pointer: coarse` devices (line 1108), the orbs are already hidden — also disable `meshShift` animation and reduce gradient layers.

### H3. Grain overlay runs unconditionally
**style.css:97–110**

The `.grain::after` pseudo-element runs `animation: grain 0.4s steps(8) infinite` — 25fps of GPU compositing. Hidden on touch devices (line 1113) and reduced motion (line 1325), but on desktop fine-pointer devices it runs constantly even when the user isn't scrolling.

Consider: only enable the grain animation when the page is actively scrolling, or reduce the step count from 8 → 4.

### H4. Cursor trail canvas `will-change: contents`
**style.css:270**

```css
.will-change: contents;
```

`will-change: contents` promotes the element to a compositor layer but doesn't help — the canvas is redrawn every frame via JS. This creates a persistent GPU layer that's always "hot." Remove `will-change: contents` (the canvas is already position:fixed and will naturally composite).

### H5. Scroll handler uses `window.scrollY` not Lenis position
**script.js:690–701**

The native scroll listener uses `window.scrollY` for the progress bar. Since Lenis smooth-scrolls, the native scroll position lags. Should use Lenis's scroll callback (already used for nav hide/show at line 249) to also update the progress bar.

### H6. Typewriter uses recursive `setTimeout`
**script.js:453–474**

Recursive `setTimeout` can drift and cause jank. Consider using `requestAnimationFrame` with elapsed time, or even a pure CSS animation for the typing/deleting effect. The current approach also has no pause between delete and next-type — it immediately starts the next word.

### H7. `setInterval` for preloader counter
**script.js:40–53**

`setInterval(() => {...}, 40)` can drift and doesn't sync with frame timing. Use `requestAnimationFrame` with a time accumulator for smoother counting, or accept the jitter since it's a preloader and unlikely to be noticeable.

---

## MEDIUM — Code Quality & Maintainability

### M1. Duplicate CSS media queries
**style.css:1036–1040** and **style.css:1267–1271**

```css
/* Line 1036 */
@media (max-width: 1024px) { .skills-layout { grid-template-columns: repeat(2, 1fr); } }
/* Line 1267 */
@media (max-width: 1024px) { .skills-layout { grid-template-columns: repeat(2, 1fr); } }
```

Both set `.skills-layout` to 2 columns at ≤1024px. Merge into one block.

### M2. Unused CSS variable `--font`
**style.css:32**

```css
--font: 'Inter', sans-serif;
```

But `Space Grotesk` is loaded in HTML. If Space Grotesk is removed (H1), this is fine. If it's kept, `--font` should use it. Currently `--font` is set to Inter but Space Grotesk is loaded and never used anywhere in CSS.

### M3. `.project-card-links` class unused
**style.css:877–880**

The `.project-card-links` class is defined but no element in `index.html` uses it. Dead CSS.

### M4. Hardcoded hero spacing values
**style.css:461** — `margin-top: 2rem` on `.hero-socials-row`
**style.css:496** — `margin-bottom: 1.8rem` on `.hero-greeting`

These are fixed pixel values inside a layout that uses `clamp()` for responsive sizing. Should use `clamp()` or `em` units for consistency.

### M5. Inline SVGs could be external sprite
**index.html** — 12+ inline SVG icons (nav, hero, cards, footer, contact, back-to-top)

Each SVG is duplicated if the same icon appears in multiple places (e.g., the GitHub icon appears in hero socials, footer socials, and contact). Extract to an SVG sprite sheet and reference with `<use href="#icon-name">`. Reduces HTML by ~2KB.

### M6. Marquee duplicate content
**index.html:210–222**

The marquee content is manually duplicated (12 spans + 12 separators × 2 copies). If the content changes, both copies must be updated. Consider generating the duplicate via JS or using CSS `animation` with `transform: translateX(-50%)`.

### M7. No `<meta>` for `theme-color` on both themes
**index.html:37–38**

Two `<meta name="theme-color">` tags with `media` queries. This is valid, but some browsers (especially Safari) don't respect the `media` attribute and may show the wrong color in the address bar. Consider using JS to dynamically set `theme-color` when the theme toggles.

### M8. Hero name split across two `<span>` elements
**index.html:147–148**

```html
<span class="hero-name-line" data-splitting>Dharaneesh</span>
<span class="hero-name-line stroke-text" data-splitting>N</span>
```

The `stroke-text` effect (hollow text) on just the last initial is a nice touch, but it means "N" is on its own visual line. On mobile, `word-break: break-word` ensures it doesn't overflow, but the visual result is two lines: "Dharaneesh" then "N". If you want one line, the stroke effect needs to be applied differently.

### M9. `experience-scroll-outer` responsive values duplicated
**style.css:1069** and **style.css:1101**

```css
/* 768px */ .experience-scroll-outer .experience-item { min-width: 230px; max-width: 230px; }
/* 480px */ .experience-scroll-outer .experience-item { min-width: 210px; max-width: 210px; ... }
```

Minor, but the 480px block overrides the 768px block with slightly different padding. Should be consolidated.

### M10. Missing `loading="lazy"` on below-fold images
Currently there are no `<img>` tags (all images are SVG inline or video), so this is N/A. However, if an `og-image.png` is ever added, it should be preloaded in `<head>` since it's used by Open Graph.

---

## LOW — Polish & Future-Proofing

### L1. `og-image.png` doesn't exist
**index.html:15**

```html
<meta property="og:image" content="https://dharaneeshexe-web.github.io/og-image.png">
```

No `og-image.png` file exists in the repo. Social media previews will show a broken image. Create one (1200×630px) or remove the meta tags.

### L2. No `favicon.ico` or Apple touch icon
**index.html:35**

Only an inline SVG favicon is defined. Browsers requesting `/favicon.ico` or Apple touch icons will 404. Add:
- `<link rel="icon" href="favicon.ico" sizes="32x32">`
- `<link rel="apple-touch-icon" href="apple-touch-icon.png">`

### L3. No service worker
The PWA manifest exists (manifest.json) but there's no service worker. The site won't be installable or work offline. If PWA isn't a goal, remove the manifest link. If it is, register a basic service worker.

### L4. `aria-live` on typewriter might be annoying
**index.html:150**

```html
<div class="hero-role" aria-live="polite" aria-atomic="true">
```

Screen readers will announce every character change. Consider `aria-live="off"` or `aria-live="assertive"` only on role change, not every keystroke. Alternatively, add a visually hidden element that only announces the full role once it completes typing.

### L5. No `lang` attribute fallback for content
**index.html:2**

`<html lang="en">` is correct, but if any content is ever added in another language, it needs `lang` attributes on those elements.

### L6. `.dot` class defined but unused in HTML
**style.css:672–679**

The `.dot` class and `pulse` keyframes are defined but no element in `index.html` uses `.dot`. Dead CSS.

### L7. Cursor label `transform` conflict
**style.css:254**

```css
.cursor-label {
    transform: translate(-50%, -50%);
    ...
    transform: scale(0.5);
}
```

Two `transform` declarations — the second overrides the first. The label will not be centered (`translate(-50%, -50%)`) when hidden. Use a single transform or nest elements.

### L8. No `robots.txt` Sitemap reference
Check that `robots.txt` includes `Sitemap: https://dharaneeshexe-web.github.io/sitemap.xml` for search engine discovery.

### L9. Preloader blocks content for ~2–3 seconds
**script.js:40–53**

The preloader counts to 100 in ~2 seconds (40ms intervals, random 2–8 increments). This delays content visibility. Consider making it faster (count to 100 in 800ms) or removing it entirely — the hero content already has its own reveal animation.

### L10. `sync-repos.yml` workflow has no manual trigger
If you ever need to force-sync, you'd have to push a dummy commit. Add `workflow_dispatch` trigger.

---

## SIMPLIFICATION OPPORTUNITIES

### S1. Replace video BG with CSS gradient
The aurora video is 5 MP4 files totaling ~50MB+ of assets. A carefully crafted CSS gradient animation (like the existing `video-gradient-mesh` + orbs) could achieve 80% of the visual effect at 0% of the bandwidth. This is the single biggest simplification opportunity.

### S2. Replace cursor trail canvas with CSS
The canvas trail (script.js:149–197) could be replaced with multiple CSS-animated `<div>` elements using `transform` and `opacity`. Fewer lines of JS, better GPU compositing, easier to debug.

### S3. Remove preloader entirely
The preloader adds 2+ seconds of dead time. Modern sites increasingly skip preloaders. The hero reveal animation already provides a smooth entrance.

### S4. Replace marquee JS with CSS
The scroll-velocity-driven marquee (script.js:316–327) could be a pure CSS `@keyframes` animation with `animation-duration` adjusted by JS for scroll speed, or just a fixed-speed CSS animation.

### S5. Move radar chart to static SVG
The radar chart (script.js:614–682) is generated from hardcoded constants. It could be a static SVG in the HTML, animated with CSS. Saves ~70 lines of JS.

### S6. Consider single-file architecture
The reference minimalistic portfolio (GeraldYa/portfolio-template) is a single HTML file with embedded CSS/JS, zero dependencies, and 12KB total. Your site has 2545 lines across 3 files + 4 CDN libraries. Depending on your goals, a radical simplification could cut the total payload by 80%.

---

## DEPLOYMENT

### D1. No GitHub Pages configuration
No `.github/pages` file or deployment workflow. Ensure the repo's GitHub Pages source is set to the correct branch (usually `main` or `gh-pages`).

### D2. No asset caching headers
GitHub Pages doesn't support custom cache headers. All assets get default caching (~10 minutes). Consider:
- Cache-busting filenames for static assets (e.g., `style.v2.css`)
- Or moving to Cloudflare Pages / Netlify for proper `Cache-Control` headers.

### D3. CDN resources have integrity hashes
Lines 465–468 in `index.html` use `integrity` attributes on CDN scripts. This is good. Ensure the hashes match the actual served content after any CDN updates.

---

## SUMMARY

| Priority | Count | Est. Effort |
|----------|-------|-------------|
| Critical | 6 | 2–3 hours |
| High | 7 | 3–5 hours |
| Medium | 10 | 4–6 hours |
| Low | 10 | 1–2 hours |
| Simplification | 6 | 8–16 hours (optional) |
| Deployment | 3 | 30 minutes |

**Recommended first actions:**
1. Fix C1 (duplicate reduced-motion) + C2 (skip-link outline) — 15 min
2. Fix H1 (font weights) — 30 min, saves 200–400KB
3. Fix M1 (duplicate media queries) + M3 (dead CSS) + L6 (dead `.dot` class) — 15 min
4. Fix C3 (SVG aria-hidden) + C4 (main landmark) — 30 min
5. Fix L1 (og-image) + L2 (favicon) — 1 hour (design work)
