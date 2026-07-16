# Portfolio — Project Context

## Overview

Personal portfolio website for **Dharaneesh N**, an AI/ML Engineer based in Coimbatore, India. Single-page site with aurora video background, custom cursor, GSAP animations, and dark/light theme.

**Live**: https://dharaneeshexe-web.github.io/  
**Repo**: https://github.com/dharaneeshexe-web/dharaneeshexe-web.github.io

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| HTML | Semantic HTML5, structured data (JSON-LD), Open Graph |
| CSS | Custom properties, `clamp()` responsive, `backdrop-filter`, CSS Grid/Flexbox |
| JS | Vanilla ES6+ (no bundler) |
| Animation | GSAP 3.12 + ScrollTrigger, Lenis smooth scroll, Splitting.js (text splitting) |
| Hosting | GitHub Pages (legacy, main branch) |

### CDN Libraries (loaded in `<head>` / before `</body>`)

- **Lenis 1.1.18** — smooth scroll
- **GSAP 3.12.7** — animation + ScrollTrigger
- **Splitting.js 1.0.6** — text character splitting for staggered animations
- **Google Fonts** — Inter (400/500/600), JetBrains Mono (400/600), Syne (700/800)

---

## File Structure

```
portfolio/
├── index.html              # Main HTML (single page)
├── style.css               # All styles (~1315 lines)
├── script.js               # All JS (~729 lines)
├── portfolio-data.json     # Project metadata (GitHub sync)
├── manifest.json           # PWA manifest
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Crawler config
├── LICENSE                 # MIT, copyright Dharaneesh N
├── IMPROVEMENTS.md         # Improvement manifest (42 items)
├── improvements.html       # Improvement manifest (viewable HTML)
├── context.md              # This file
├── assets/
│   ├── aurora1.mp4         # Primary aurora video
│   ├── aurora2.mp4
│   ├── aurora3.mp4
│   ├── aurora_dawn.mp4
│   └── aurora_timelapse.mp4
└── .github/
    └── workflows/
        └── sync-repos.yml  # Auto-sync GitHub repos to portfolio-data.json
```

---

## Personal Data

| Field | Value |
|-------|-------|
| Name | Dharaneesh N |
| Location | Coimbatore, Tamil Nadu, India |
| Email | dharaneeshexe@gmail.com (base64: `ZGFyYW5lZXNoZXhlQGdtYWlsLmNvbQ==`) |
| GitHub | [dharaneeshexe-web](https://github.com/dharaneeshexe-web) |
| LinkedIn | [linkedin.com/in/dharaneeshn](https://linkedin.com/in/dharaneeshn) |
| Education | B.Tech AI & ML, SNS College of Technology (2024–2028) |
| Cert | Microsoft Azure AI Fundamentals (AI-900) |
| Role | AIML Intern at Rounds Edge Technologies (June 2026) |

### Typewriter Roles

Cycled in hero section: `AI/ML Engineer` → `Multi-Agent Systems` → `RAG Pipelines` → `LLM Orchestrator`

### Radar Chart Labels

- AI/ML: 88%
- Agents: 85%
- Infra: 80%
- RAG: 82%

### Projects

1. **Company Brain** — 5-agent LangGraph DAG on K8s ([repo](https://github.com/dharaneeshexe-web/MULTIAGENT-LANGRAPH))
2. **MedGraph RAG** — TigerGraph/FAISS/Groq LLaMA ([repo](https://github.com/dharaneeshexe-web/MEDGRAPH-TIGERGRAPH.git))

---

## Key Features

### Aurora Video BG
- 5 MP4 video files cycle on desktop, single loop on mobile
- Gradient mesh overlay (6 radial gradients + 2 floating orbs)
- Video filter: `saturate(1.3) contrast(1.15) brightness(0.95)` dark / `saturate(1.5) contrast(1.1) brightness(1.25) hue-rotate(-5deg)` light
- Deferred preloading of remaining videos after 3s

### Custom Cursor
- Dot + circle + label + spotlight + canvas trail (25 points)
- Click burst effect (5 particles)
- Idle detection: stops after 60 frames (~1s) of no movement
- Disabled on touch devices and `prefers-reduced-motion`

### Generative Card Art
- Canvas-based sinusoidal line patterns + particle dots
- 30 lines per card, 12 particles per card
- `mix-blend-mode: overlay`
- Disabled on touch devices

### Theme System
- Dark/light via `data-theme` attribute on `<html>`
- Persisted in `localStorage`
- All colors via CSS custom properties

### Scroll Animations
- `.fade-up` elements animate in via GSAP ScrollTrigger
- `[data-splitting]` elements get character-by-character stagger
- Stat counters animate from 0 to target value
- Marquee scroll-velocity driven

---

## Accessibility

- Skip link: `<a href="#about" class="skip-link">`
- `<main>` wraps hero through contact sections
- `aria-hidden="true"` on all decorative elements (cursor, grain, video, SVGs)
- `aria-label` on nav, sections, social links, buttons
- `aria-live="polite"` on typewriter container
- `prefers-reduced-motion: reduce` kills all animations, hides video/cursors/grain
- `:focus-visible` outline on all interactive elements
- `role="dialog"` on mobile menu
- `role="region"` on experience scroll

---

## Responsive Breakpoints

| Breakpoint | Changes |
|-----------|---------|
| >1024px | Full layout, 2-column projects/skills |
| ≤1024px | Single-column about, 2-col skills/projects |
| ≤768px | Burger nav, single-column everything, no cursor |
| ≤480px | Smaller hero font (1.8rem–3rem), compact padding |
| `pointer: coarse` | No cursor, no grain, no orbs, reduced video opacity |

---

## Performance Optimizations Applied

1. **Font weights**: 18 → 7 (removed Space Grotesk, trimmed unused weights)
2. **Cursor trail**: 45 → 25 points, idle stop after 60 frames
3. **Card art**: 52 → 30 lines, 22 → 12 particles
4. **Video**: `preload="metadata"`, deferred prefetch, mobile single-loop
5. **GPU acceleration**: `will-change: transform` + `translateZ(0)` on cursor, video, card visuals
6. **`prefers-reduced-motion`**: Full support — kills all animations
7. **Touch devices**: Cursor/grain/orbs disabled, video opacity reduced

---

## Deployment

- **Platform**: GitHub Pages (legacy build from `main` branch)
- **URL**: https://dharaneeshexe-web.github.io/
- **HTTPS**: Enforced
- **Workflows active**: Deploy to GitHub Pages, Auto-Sync GitHub Repos
- **Workflows disabled**: CI, CodeQL (inherited from source repo, not needed)

---

## Known Issues (from IMPROVEMENTS.md)

- `og-image.png` doesn't exist (social previews broken)
- No `favicon.ico` or Apple touch icon
- No service worker (PWA manifest exists but unused)
- GitHub API rate limit not handled (60 req/hr unauthenticated)
- Typewriter uses recursive `setTimeout` (can drift)
- Video gradient mesh is GPU-heavy on integrated graphics

Full list: see `IMPROVEMENTS.md` or `improvements.html`

---

## Source

Cloned from [Gauthambinoy20/gauthambinoy20.github.io](https://github.com/Gauthambinoy20/gauthambinoy20.github.io), then fully customized for Dharaneesh N with all personal data, projects, skills, and 12 improvement fixes applied.
