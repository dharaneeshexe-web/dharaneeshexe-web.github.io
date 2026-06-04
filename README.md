<div align="center">

# gauthambinoy.github.io

### My corner of the internet. Hand-coded from scratch. No frameworks. No shortcuts.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

[![CI](https://github.com/gauthambinoy/gauthambinoy.github.io/actions/workflows/ci.yml/badge.svg)](./.github/workflows/ci.yml)
[![CodeQL](https://github.com/gauthambinoy/gauthambinoy.github.io/actions/workflows/codeql.yml/badge.svg)](./.github/workflows/codeql.yml)
[![Deploy](https://github.com/gauthambinoy/gauthambinoy.github.io/actions/workflows/deploy-pages.yml/badge.svg)](./.github/workflows/deploy-pages.yml)

</div>

---

## ✨ Live Site

**→ [gauthambinoy.github.io](https://gauthambinoy.github.io)**

Go ahead, open it. Move your cursor around. Scroll slowly. This thing was built to be *felt*, not just seen.

---

## What this is

Every developer reaches a point where they want to build something that's purely theirs — no Squarespace template, no Tailwind preset, no component library doing the heavy lifting. This is that project for me.

I spent weeks obsessing over every pixel, every easing curve, every transition timing. The aurora borealis backgrounds are real cinematic video files. The cursor system has six layers — a dot, a trailing circle, a comet trail, glow particles, context-sensitive labels, and a spotlight that follows you around. The text animations use character-level splits. I wrote all of it myself, vanilla JS, no build step, no `node_modules` folder to be seen.

It's my portfolio, yes. But more than that it's a personal statement: **this is what I think the web should feel like.**

---

## Design Philosophy

I think most portfolio sites are boring. A hero section, some cards, a contact form. Fine, but forgettable.

I wanted mine to feel like entering a space. Something cinematic. Something that makes you slow down and look. So I made a few decisions early on that shaped everything:

**1. Atmosphere over information**
The aurora borealis videos aren't decorative — they *are* the mood. Five separate video assets across the page, each one slightly different, creating a sense of depth and movement that no CSS gradient will ever replicate.

**2. The cursor is a character**
Most sites ignore the cursor. I made it the most elaborate element on the page. It reacts to every surface: it morphs when you hover links, it bursts when you click, it leaves a comet trail as you move, it glows. After using it for a while it starts to feel like an extension of your hand.

**3. Nothing is static**
Text doesn't appear — it reveals itself character by character. Sections don't fade in — they slide and scale. Project cards don't just highlight — they tilt in 3D toward your cursor. Everything that can animate, does animate, tastefully.

**4. Dark/light, done properly**
The dark mode accent is `#c8ff00` — electric lime. The light mode accent is `#4400ff` — deep violet. They're not interchangeable; they each have their own personality. Toggling between them feels like switching dimensions.

---

## Features

### Cursor System
A fully custom six-layer cursor built from scratch in vanilla JS:
- **Dot** — tight, precise, replaces the OS cursor
- **Circle** — larger trailing ring with elastic follow physics
- **Comet trail** — particle streak that follows velocity
- **Glow particles** — ambient light orbs that linger as you move
- **Context labels** — smart tooltips that appear based on what you're hovering
- **Spotlight** — a subtle radial light that illuminates the surface beneath the cursor
- **Click burst** — radial explosion of particles on every click
- Magnetic buttons with 30% cursor follow strength — buttons pull the cursor in as you approach

### Animations
- **Preloader** — full-screen count-up from 0 to 100%, custom-timed with a reveal sweep
- **Split text reveals** — every headline is split to individual characters, animated in with GSAP stagger
- **ScrollTrigger sequences** — sections snap into motion as they enter the viewport
- **Skill pill scramble** — skill tags cycle through random characters before resolving to their real label
- **Velocity-based marquee** — the scrolling ticker accelerates and decelerates with your scroll speed
- **3D card tilt** — project cards follow cursor position in 3D space using CSS perspective transforms
- **Lenis smooth scroll** — buttery inertia-based scroll instead of the browser default

### Visual Design
- Aurora borealis cinematic video backgrounds (5 assets, full-bleed)
- Glass-morphism cards with `backdrop-filter: blur`
- Grain overlay texture for depth
- Dark/light mode with distinct accent color personalities
- Fully responsive — hamburger nav on mobile, fluid type scale, no layout breaks

---

## Tech Used

Everything is handwritten. There is no build tool, no transpiler, no package manager. You could open `index.html` directly in a browser and it would work.

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic, accessible) |
| Style | CSS3 — custom properties, grid, flexbox, animations |
| Logic | Vanilla JavaScript (ES2020+) |
| Animation engine | GSAP 3 + ScrollTrigger plugin |
| Smooth scroll | Lenis |
| Text splitting | Splitting.js |
| Fonts | Space Grotesk, Inter, JetBrains Mono, Syne (Google Fonts) |
| Video | H.264 MP4 — aurora borealis cinematic footage |
| Hosting | GitHub Pages |

---

## Projects Featured

Four live products on the site, each one something I actually built and shipped:

### ClarityAI
An intelligent document understanding tool. Drag in a PDF, get structured insight back. Built around a RAG pipeline with semantic search and context-aware responses. The kind of tool I wanted to exist, so I built it.

### ResumeShield
A resume screener and analyzer. Parses resumes against job descriptions, scores fit, flags gaps. Built with FastAPI on the backend, React on the front. Helped me rethink how hiring tools should actually feel to use.

### Unified World Data
A global data aggregation and visualization platform. Takes fragmented public datasets and surfaces them in clean, interactive dashboards. A project about making information accessible and legible.

### CryptoStock Pro
Real-time crypto and stock tracking with portfolio simulation. WebSocket price feeds, candlestick charts, alert system. Built it to learn the financial data ecosystem — ended up being one of my most technically demanding projects.

---

## How to Run Locally

No install step. No environment setup. Just:

```bash
git clone https://github.com/gauthambinoy/gauthambinoy.github.io.git
cd gauthambinoy.github.io
```

Then open `index.html` in your browser. That's it.

If you want live-reload during development, any static file server works:

```bash
# Python
python -m http.server 3000

# Node (if you have it)
npx serve .

# VS Code
# Install the Live Server extension, right-click index.html → Open with Live Server
```

The site has no dependencies to install, no build step to run, no `.env` file to configure. Pure HTML, CSS, and JS — the way the web was meant to work.

---

## Testing

Lightweight checks run on Node's built-in test runner — no test framework to install:

```bash
npm test   # runs node --test over tests/
```

They validate the things that would silently break the live site: `portfolio-data.json` is valid and well-shaped, every local file referenced by `index.html` exists, and the SEO/meta essentials (title, lang, Open Graph, canonical, JSON-LD) plus `robots.txt`/`sitemap.xml`/`manifest.json` are present.

---

## Deployment & CI/CD

Every push to `main` runs a full quality gate, then deploys to [GitHub Pages](https://pages.github.com) automatically. Three workflows drive it:

**`ci.yml` — quality gate (runs on push + PR)**

| Stage | Tool | Blocking? |
|---|---|---|
| Tests | node --test | **blocking** |
| HTML lint | htmlhint | advisory |
| CSS lint | stylelint | advisory |
| JS lint | eslint | advisory |
| Format check | prettier | advisory |
| Markdown lint | markdownlint | advisory |
| Spellcheck | codespell | advisory |
| Link check | lychee | **blocking** |
| Performance / a11y / SEO | Lighthouse CI | advisory |
| Secret scan | gitleaks | **blocking** |
| Dependency review (PR) | dependency-review-action | **blocking** |
| Dependency audit | npm audit | advisory |

**`codeql.yml`** — CodeQL static analysis (SAST) for JavaScript, on push, PR, and weekly.

**`deploy-pages.yml`** — publishes the site to GitHub Pages on every push to `main`.

Plus **Dependabot** (`.github/dependabot.yml`) opens weekly PRs to keep npm deps and Action versions current.

A **daily workflow** (`sync-repos.yml`) auto-syncs project data from the GitHub API into `portfolio-data.json`, consumed by `script.js` to keep stats like "Public Repos" always current — no manual editing needed. Set the repository variable `PORTFOLIO_GH_USERNAME` to point it at the right account.

| File | Purpose |
|---|---|
| `index.html` | The entire site structure — semantic HTML, ARIA landmarks, structured data |
| `style.css` | All styles — responsive breakpoints at 1200px, 1024px, 768px, and 480px |
| `script.js` | All interactivity — cursor, animations, GSAP, data sync |
| `portfolio-data.json` | Auto-synced project metadata from GitHub API |
| `manifest.json` | PWA manifest for app-like installation |
| `robots.txt` | Search engine crawl directives |
| `sitemap.xml` | XML sitemap for SEO |
| `og-image.png` | Open Graph social sharing preview image |

---

## Production Features

Beyond the visual polish, this site is built to production standards:

- **Accessibility (WCAG):** Skip-to-content link, ARIA landmarks, `aria-live` on typewriter, `aria-hidden` on decorative elements, `focus-visible` outlines, `prefers-reduced-motion` support, keyboard-navigable experience carousel
- **SEO:** Open Graph + Twitter Card meta tags, structured data (JSON-LD), canonical URL, `robots.txt`, `sitemap.xml`
- **Security:** SRI hashes on all CDN scripts, `noopener noreferrer` on external links, email obfuscation, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- **Performance:** `preconnect` / `dns-prefetch` resource hints, idle cursor auto-pause, passive scroll listeners, debounced resize handler, touch-device GPU optimizations

---

## Skills on Display

**Languages:** Python, JavaScript, TypeScript

**Frontend:** React, Next.js, HTML5, CSS3, Vanilla JS

**Backend:** FastAPI, Flask, Node.js

**Infrastructure:** Docker, AWS, GitHub Actions

**AI/ML:** LangChain, RAG Pipelines, vector databases, model fine-tuning

---

## Stats

- **20** projects built and shipped
- **15** technologies in regular use
- **4** live products running in production
- **0** lines of CSS from a framework
- **0** components borrowed from a library

---

## License

MIT — take whatever's useful, learn from it, build something cool.

If you do use any of the cursor or animation code for your own project, I'd love to see what you make. Reach out.

---

<div align="center">

**Built by [Gautham Binoy](https://github.com/gauthambinoy) — Full Stack Developer & AI Engineer**

[gauthambinoy.github.io](https://gauthambinoy.github.io) · [GitHub](https://github.com/gauthambinoy) · [LinkedIn](https://linkedin.com/in/gauthambinoy) · [Twitter/X](https://twitter.com/gauthambinoy)

</div>
