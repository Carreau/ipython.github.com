# ipython.org redesign plan

_Status: proposal + working prototype on branch `redesign-2026`. Written September 2026 against IPython 9.17._

## 1. Where the current site stands

The site is an Astro 6 / Tailwind 4 / React 19 static site deployed to GitHub Pages. The stack is fine and recent. The problems are content, structure, and robustness rather than tooling.

**What works and should stay**

- Astro static output, Tailwind, GitHub Pages deploy, Plausible analytics.
- The animated terminal in the hero. It is the single most "IPython" thing on the page.
- Light/dark mode, the seasonal banner, and the colour-theme picker. They give the site personality and the maintainer clearly enjoys them.
- The historical pages (Sloan grant, surveys, presentations). They are part of the project's record and should stay reachable at their current URLs.

**What does not work**

- _The pitch is vague and partly wrong._ "Productive Interactive Computing" and "flexible tools for parallel and distributed computing" describe IPython circa 2013. Parallel computing left core in IPython 4 (2015) and lives in `ipyparallel`. A newcomer cannot tell from the home page what IPython is, how it differs from Jupyter, or why they would use it instead of the default `python` REPL (which, since Python 3.13, has colours and multi-line editing of its own).
- _The features are generic and a decade stale._ Six cards say "tab completion", "magic commands", "history". Nothing about autosuggestions, the rewritten tracebacks, `%autoreload`, top-level `await`, themes, tips at startup, terminal image rendering, or the LLM completion hooks. Examples hard-code "IPython 8.18.1". The `%ls` example calls an alias a "shell command".
- _Three pages say the same thing._ Features, Get Started and the home page repeat the same six items with the same snippets. There is no cheat sheet, no "what's new", no release policy, no citation page, no security policy, no donate link.
- _The stat cards are the wrong stats._ "Open pull requests: 29" is a maintainer metric, not a visitor one. Version and release date are good. Stars, Python support, monthly cadence, and "since 2001" say more.
- _"Who uses IPython" is filler._ Four emoji cards with generic copy.
- _The build is fragile._ `index.astro` and `about.astro` each embed ~250 lines of GitHub-API fetching and **throw in production if any call fails**. A local `npm run build` on this machine fails today with "Bad credentials". A marketing site must never fail to build because GitHub or PyPI hiccupped.
- _Small things._ "© All rights reserved" contradicts the BSD licence. No Open Graph / Twitter meta, no canonical URL, no sitemap, `site` in the Astro config is computed from a GitHub owner rather than `https://ipython.org`. Gradient-clipped `h2`/`h3` text globally, which fights the theme system and hurts contrast in dark mode. Seventeen colour themes surface in two places (nav dropdown and footer dots).

## 2. Goals and audiences

Three audiences, in order of traffic:

1. **Someone who searched "ipython".** Wants: what is it, how is it related to Jupyter, how do I install it, is it still maintained. Must be answered above the fold.
2. **An existing user.** Wants: docs, what changed in the latest release, a cheat sheet of magics and shortcuts, how to configure it.
3. **A contributor, funder, or citer.** Wants: how to help, how to report a security issue, the governance, the BibTeX, where money goes.

Goals: answer all three in one click or less, be visibly current (live version, dated release notes), and look like a product that is actively developed in 2026.

## 3. Information architecture

```
/                 Home: pitch, install, live terminal, what/why, what's new, ecosystem, community
/install/         pip / uv / conda / pipx / brew / apt, requirements, extras, upgrade, verify
/learn/           A guided tour that replaces Features + Get Started (one page, anchored sections)
/cheatsheet/      Magics, shortcuts, prompt syntax. Dense, printable.
/releases/        What's new in 9.x, release cadence, Python support policy (SPEC 0), how to upgrade
/community/       Get help, contribute, code of conduct, security policy, governance, sponsor, cite
/about/           History timeline 2001→today, team & contributors, funding, licence, brand assets
/archive/         Index of the historical pages (URLs of the old pages are preserved)
```

Old URLs `/features` and `/get-started` redirect to `/learn/`. Navigation becomes: Install · Learn · Cheat sheet · Releases · Community · About, plus a "Docs" link out to Read the Docs and the GitHub icon.

## 4. Content plan

Every claim below is verifiable against the IPython docs or PyPI as of September 2026.

**Home**

- Headline: _Python, interactively._ Sub: IPython is the enhanced interactive shell for Python and the engine behind Jupyter kernels. One-line install with copy button. Secondary CTA to the docs.
- Animated terminal (kept), with new scenarios: autosuggestion ghost text, `?` introspection, `%timeit`, a rich traceback, top-level `await`.
- Fact strip: latest version + date (live), Python ≥ 3.11, monthly releases, stars, "since 2001".
- "Three things called IPython": the terminal shell, the kernel behind Jupyter (`ipykernel`), and a library (`IPython.display`, `IPython.embed`). With an explicit "IPython vs Jupyter" callout.
- "Why not the plain REPL?": eight real features with real transcripts.
- "What's new in 9": four cards from the 9.x release notes, link to `/releases/`.
- Ecosystem diagram: IPython → ipykernel → Jupyter clients (Notebook, JupyterLab, VS Code), with ipywidgets, ipyparallel, traitlets alongside.
- Community strip: docs, Discourse, Zulip, GitHub, sponsor, cite.

**Install.** Package managers with copy buttons; `uv tool install ipython` and `pipx` for isolated installs; requirements (Python 3.11+); extras (`ipython[kernel]`, `[matplotlib]`, `[all]`); upgrade; verify; troubleshooting pointers to the docs.

**Learn.** Sections: starting the shell, prompts and `Out[]` history, tab completion and autosuggestions, `?`/`??`, magics (line vs cell), shell integration, debugging (`%debug`, `--pdb`, `%xmode`), `%autoreload`, async, configuration and startup files, extensions, IPython inside Jupyter/VS Code, embedding.

**Cheat sheet.** Tables generated from `src/data/magics.ts` and `src/data/shortcuts.ts`. Print stylesheet.

**Releases.** Current version (live), a version table with first-release dates for each major series, the 9.x highlights, cadence (roughly monthly minor releases), the SPEC 0 support window, links to the full release notes.

**Community.** Help channels; how to contribute (good first issues, docs, triage); the Jupyter Code of Conduct; security policy (`SECURITY.md` / GitHub advisory form); governance (a Jupyter subproject, NumFOCUS fiscal sponsorship); donate; citation with BibTeX (Pérez & Granger, CiSE 2007, DOI 10.1109/MCSE.2007.53).

**About.** Timeline 2001 (created by Fernando Pérez) → 2005 (parallel work) → 2010 (ZeroMQ, Qt console) → 2011 (the Notebook) → 2013 (Sloan grant, 1.0) → 2014/15 (The Big Split into Jupyter) → 2017 (6.0, Python 3 only) → 2022 (8.0) → 2025 (9.0). Contributors grid from build data. Funding history. Licence. Logo download.

## 5. Design direction

- **"A terminal you'd want to look at."** Dark navy hero with a real terminal; the rest of the page is light, airy, and text-first. Sections are numbered with IPython prompts (`In [1]:`, `In [2]:` …) as a recurring motif.
- **Colour.** Keep the teal brand (`#0D5C63` family) and derive all accents from the existing `--theme-*` variables so the 17 themes and seasonal banner keep working. Body text and links are fixed to WCAG-AA-safe colours regardless of theme. Pride/holiday flags remain decorative only.
- **Type.** Inter Variable for text, JetBrains Mono Variable for code, both self-hosted via Fontsource (no third-party font requests; the site already chose privacy-friendly analytics).
- **Code.** All transcripts render through one `IPythonSession` component: green `In [n]:` / red `Out[n]:` prompts like the real shell, Shiki-highlighted Python, no client JavaScript.
- **Dark mode** is a first-class palette, not a set of `!important` overrides.
- **Motion.** Only the terminal animates. Everything else respects `prefers-reduced-motion`.

## 6. Technical plan

- Keep Astro 6 + Tailwind 4 + React 19. React is used only for the terminal animation and the theme controls.
- **One build-data module** (`src/lib/buildData.ts`) fetches PyPI and GitHub once per build, with a committed JSON fallback (`src/data/fallback/`). It never throws. Pages read from it; no page contains fetch code.
- Content lives in typed data files under `src/data/` (features, magics, shortcuts, timeline, ecosystem, releases, links) so text changes do not touch markup.
- `PageLayout` wraps nav/footer/header; `ArchiveLayout` restyles the historical pages without rewriting them.
- Add `@astrojs/sitemap`, canonical URLs, Open Graph and Twitter meta, a static OG image, `site: 'https://ipython.org'`.
- Redirects for `/features` and `/get-started` via Astro `redirects`.
- Remove the global gradient-text rule and the `!important` dark-mode overrides.
- CI: keep the existing Pages workflow; add a Playwright screenshot step (light, dark, mobile) as a build artifact so visual regressions are visible in PRs.

## 7. Rollout

1. **Prototype** (this branch): foundation, home, install, learn, cheat sheet, releases, community, about, archive. Old URLs kept.
2. **Review** by the maintainers: copy accuracy, tone, which of the 17 themes to keep.
3. **Ship** to `main`; the existing deploy workflow publishes it.
4. **Later**: a small news/blog collection for release announcements, an auto-generated OG image per page, and a "try it in your browser" box using Pyodide (IPython 9.14 added Emscripten support).

## 8. Open questions for the maintainer

- Keep all 17 colour themes, or reduce to default + seasonal (Pride, holidays) + one or two favourites?
- Is there a preferred donate link (NumFOCUS Jupyter page vs a dedicated IPython fund)?
- Should the contributors grid credit by commit count (current) or list the current core team by hand?
- Do you want the historical pages under `/archive/...` with redirects, or left at their current top-level URLs (the prototype leaves them in place)?
