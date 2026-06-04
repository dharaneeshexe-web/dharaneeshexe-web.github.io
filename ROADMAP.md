# ROADMAP — Portfolio Site

Tracking per CLAUDE.md §7. Cumulative % reflects migration + CI/CD setup.

## Milestone 1 — Clean migration & CI/CD ✅ 100%

- [x] 1.1 Repo hygiene (.gitignore, .editorconfig) ...... 10% (56ef9c7, 1781af7)
- [x] 1.2 License ....................................... 14% (ac0b3fb)
- [x] 1.3 Site source (html, css, js) .................. 35% (b1c4ff4, 523ee58, e9008c3)
- [x] 1.4 Media + SEO/PWA (assets, og, manifest, robots, sitemap) 50% (ac8ca1d → d5e6a8a)
- [x] 1.5 Dependencies + portfolio data ................ 58% (e2cd94c, 4ed2cf1, 392517e)
- [x] 1.6 Tooling configs (prettier/eslint/stylelint/htmlhint/markdownlint/lighthouse) 72% (d44149f → b67cc19)
- [x] 1.7 CI/CD (sync, quality gate, CodeQL, Pages, Dependabot) 92% (2d95859 → b7c1dea)
- [x] 1.8 README + docs ................................ 100% (90e44a8)

## Milestone 1b — CLAUDE.md compliance pass ✅ 100%

- [x] 1b.1 Smoke test — site serves HTTP 200, renders, all assets resolve (§2c, verified locally)
- [x] 1b.2 Test runner wired (`npm test` → node --test) ... (b0b8a76)
- [x] 1b.3 Portfolio-data validation test ................. (b297d47)
- [x] 1b.4 Local asset-reference test .................... (81e55dd)
- [x] 1b.5 SEO/meta presence test ....................... (a51b20a)
- [x] 1b.6 Tests run in CI as a blocking gate ........... (504367c)
- [x] 1b.7 Fix eslint config module-type warning ....... (6d1bb44)

All 19 tests pass locally (`node --test`); eslint and the test gate run clean.

## Milestone 1c — 10/10 quality hardening ✅ 100%

- [x] 1c.1 Pinned dev tooling + lint scripts (npm ci, local bins) ... (91d0dea)
- [x] 1c.2 Stylelint tuned to the hand-authored CSS — 0 problems ... (d622533)
- [x] 1c.3 Escape bare ampersands — htmlhint clean ............... (c42f399)
- [x] 1c.4 Prettier: ignore hand-written source, format docs ..... (84c1efd, 7715893)
- [x] 1c.5 Markdownlint clean ................................... (09b050d)
- [x] 1c.6 CI runs local tools; lint/format/spell now blocking ... (0eea950)

Verified locally — all green: `node --test` (19/19), htmlhint, stylelint, eslint,
markdownlint, prettier `--check`, and codespell all report 0 problems.

## Milestone 2 — Publish to Gauthambinoy20 ✅ 100%

- [x] 2.1 Created public repo `Gauthambinoy20/gauthambinoy20.github.io`
- [x] 2.2 Pushed `main` (47 commits, single author, no AI traces)
- [x] 2.3 Set repo variable `PORTFOLIO_GH_USERNAME=Gauthambinoy20`
- [x] 2.4 Pages serving via GitHub Actions — **live at <https://gauthambinoy20.github.io> (HTTP 200)**
- [x] 2.5 Repointed all account/domain references to Gauthambinoy20
- [x] 2.6 CI run on GitHub is **green** (all blocking jobs pass; deploy succeeded)

## Known issues / notes

- Repo MUST stay named `<username>.github.io` for Pages to serve at the root domain.
- Lint, format, spell, test and secret-scan are **blocking**; Lighthouse, `npm audit` and the link check are advisory.
- `.lighthouserc.json` budgets are warnings, not hard failures — raise thresholds once real scores are known.
- **lychee (advisory)** flags project-card links to repos not yet migrated to this account and to bot-blocking social sites (LinkedIn/X → 999). These go green as the other projects are migrated.
- **npm audit (advisory)** reports a high vuln in puppeteer's transitive deps; fix needs a breaking `--force` bump. puppeteer looks unused in this repo — candidate for removal (needs Gautham's OK per §8).

## ✍️ TODO: my words

(decision write-ups and any personal notes go here — left for Gautham per CLAUDE.md §5)
