# ROADMAP — Portfolio Site

Tracking per CLAUDE.md §7. Cumulative % reflects migration + CI/CD setup.

## Milestone 1 — Clean migration & CI/CD  ✅ 100%

- [x] 1.1 Repo hygiene (.gitignore, .editorconfig) ...... 10%  (56ef9c7, 1781af7)
- [x] 1.2 License ....................................... 14%  (ac0b3fb)
- [x] 1.3 Site source (html, css, js) .................. 35%  (b1c4ff4, 523ee58, e9008c3)
- [x] 1.4 Media + SEO/PWA (assets, og, manifest, robots, sitemap) 50%  (ac8ca1d → d5e6a8a)
- [x] 1.5 Dependencies + portfolio data ................ 58%  (e2cd94c, 4ed2cf1, 392517e)
- [x] 1.6 Tooling configs (prettier/eslint/stylelint/htmlhint/markdownlint/lighthouse) 72%  (d44149f → b67cc19)
- [x] 1.7 CI/CD (sync, quality gate, CodeQL, Pages, Dependabot) 92%  (2d95859 → b7c1dea)
- [x] 1.8 README + docs ................................ 100%  (90e44a8)

## Milestone 1b — CLAUDE.md compliance pass  ✅ 100%

- [x] 1b.1 Smoke test — site serves HTTP 200, renders, all assets resolve (§2c, verified locally)
- [x] 1b.2 Test runner wired (`npm test` → node --test) ... (b0b8a76)
- [x] 1b.3 Portfolio-data validation test ................. (b297d47)
- [x] 1b.4 Local asset-reference test .................... (81e55dd)
- [x] 1b.5 SEO/meta presence test ....................... (a51b20a)
- [x] 1b.6 Tests run in CI as a blocking gate ........... (504367c)
- [x] 1b.7 Fix eslint config module-type warning ....... (6d1bb44)

All 19 tests pass locally (`node --test`); eslint and the test gate run clean.

## Milestone 2 — Publish to new account  ⏳ 0%

- [ ] 2.1 Create empty repo `<newuser>.github.io` on the new GitHub account
- [ ] 2.2 `git remote add origin` + first `git push` (only on your "push")
- [ ] 2.3 Set repo variable `PORTFOLIO_GH_USERNAME` to the new handle
- [ ] 2.4 Enable GitHub Pages (Settings → Pages → source: GitHub Actions)
- [ ] 2.5 Update README badge/links URLs to the new account
- [ ] 2.6 Confirm first CI run is green; tune any advisory check that fails

## Known issues / notes

- Repo MUST stay named `<username>.github.io` for Pages to serve at the root domain.
- Lint/format jobs are advisory (won't block) until the codebase is cleaned to pass; tighten to blocking later.
- `.lighthouserc.json` budgets are warnings, not hard failures — raise thresholds once scores are known.
- htmlhint reports 8 unescaped `&` characters in index.html prose (e.g. "AI & ML"). Cosmetic — browsers render fine — so it's advisory. Fix later by escaping to `&amp;` (needs your OK since it edits hand-written copy).

## ✍️ TODO: my words

(decision write-ups and any personal notes go here — left for Gautham per CLAUDE.md §5)
