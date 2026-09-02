# ipython.org redesign plan

_Status: proposal with a working prototype on branch `redesign-2026`. Written
September 2026 against IPython 9.17. Maintainer answers from the first review
are folded in (see §9)._

## 1. Where the current site stands

The site is an Astro 6 / Tailwind 4 / React 19 static site deployed to GitHub
Pages. The stack is fine and recent. The problems are content, structure and
robustness, not tooling.

**What works and should stay**

- Astro static output, Tailwind, the GitHub Pages workflow, Plausible.
- The animated terminal in the hero. It is the most "IPython" thing on the page.
- Light/dark mode, the seasonal banner, and the colour themes. They give the
  site personality, and the pride themes are a deliberate statement of LGBTQ+
  visibility that the maintainer wants to keep.
- The historical pages (Sloan grant, surveys, presentations, announcements).
  They are part of the project's record and must stay at their current URLs.

**What does not work**

- _The pitch is vague and partly wrong._ "Productive Interactive Computing"
  and "flexible tools for parallel and distributed computing" describe IPython
  circa 2013. Parallel computing left core in IPython 4 (2015) and lives in
  `ipyparallel`. A newcomer cannot tell from the home page what IPython is,
  how it differs from Jupyter, or why they would use it instead of the default
  `python` REPL, which since Python 3.13 has colours and multi-line editing of
  its own.
- _The features are generic and a decade stale._ Six cards say "tab
  completion", "magic commands", "history". Nothing about autosuggestions,
  the rewritten tracebacks, `%autoreload`, top-level `await`, themes, tips at
  startup, terminal image rendering or the LLM completion hooks. Examples
  hard-code "IPython 8.18.1". One example calls the `%ls` alias a "shell
  command".
- _Three pages say the same thing._ Features, Get Started and the home page
  repeat the same six items with the same snippets. There is no cheat sheet,
  no "what's new", no release policy, no citation page, no security policy,
  no sponsor page.
- _The stat cards are the wrong stats._ "Open pull requests: 29" is a
  maintainer metric, not a visitor one. Version and release date are good.
- _"Who uses IPython" is filler._ Four emoji cards with generic copy.
- _The build is fragile._ `index.astro` and `about.astro` each embed ~250
  lines of GitHub API fetching and **throw in production if any call fails**.
  A local `npm run build` on this machine failed with "Bad credentials". A
  marketing site must never fail to build because GitHub or PyPI hiccupped.
- _Small things._ "© All rights reserved" contradicts the BSD licence. No
  Open Graph / Twitter meta, no canonical URL, no sitemap, `site` computed
  from a GitHub owner instead of `https://ipython.org`. Gradient-clipped
  `h2`/`h3` text everywhere, which fights the theme system and hurts dark-mode
  contrast. Seventeen colour themes surface in two places.

## 2. What people say and search for

A research pass over Stack Overflow, Hacker News, blogs and GitHub (2023 to
2026) confirmed the audit and sharpened the priorities. Sources are listed in
`docs/research-2026-09.md`.

- **The number one confusion is IPython vs Jupyter vs ipykernel.** "What is
  the difference between Python and IPython?" has 192k views on Stack
  Overflow. This needs to be the second screen of the home page, not a FAQ.
- **"Do I still need IPython now that 3.13 has a new REPL?"** is a standing
  question. The honest answer people give: the new REPL is good when you
  cannot install packages; IPython is for sessions where you stay a while
  (magics, `%run`, `%autoreload`, introspection, history). The site should
  say exactly that, with a comparison table, and not claim speed: startup
  time is a known open complaint.
- **The features people love, in order of search volume:** `%autoreload`
  (595k views), `%timeit` (320k), `%reset`/clearing (436k), `%run` (240k),
  debugging with `%debug`/`%pdb` (141k), `%history` (91k), passing variables
  to `!` shell commands (89k). Third-party blogs currently outrank the docs
  for config files and startup scripts, which means the official site is not
  serving those queries at all.
- **Install friction is now environment friction:** "externally-managed-
  environment" on Debian/Ubuntu, `uv` with VS Code, Windows/WSL. The install
  page should show `uv tool install ipython`, `uvx ipython` and `pipx`.
- **Under-served niches with loud users:** vi mode, keybinding
  customisation, embedding IPython in a program, citing IPython.
- **Peer sites worth borrowing from:** install command in the hero
  (starship, bun, julia), "try without installing" (zellij), benefit-named
  feature sections (fish, nushell), a gallery of tiny real snippets (julia),
  an honest comparison table (bun), an explicit relationship diagram
  mirroring jupyter.org's "The Kernel" section, a named extension showcase
  (xonsh). Things to avoid: benchmark bravado, a marketing site divorced from
  the docs, and leading with the notebook heritage, which reinforces the
  "isn't IPython just old Jupyter?" confusion.

## 3. Goals and audiences

Three audiences, in order of traffic:

1. **Someone who searched "ipython".** Wants: what is it, how does it relate
   to Jupyter, how do I install it, is it still maintained. Answered above
   the fold.
2. **An existing user.** Wants: docs, what changed in the latest release, a
   cheat sheet of magics and shortcuts, how to configure it.
3. **A contributor, funder or citer.** Wants: how to help, how to report a
   security issue, the governance, the BibTeX, where money goes.

Goals: answer all three in one click or less, be visibly current (live
version, dated release notes) and look like a product that is actively
developed in 2026.

## 4. Information architecture

```
/                 Home: pitch, install, live terminal, what/why, comparison,
                  what's new, ecosystem, community
/install/         pip / uv / conda / pipx / brew / apt, requirements, extras,
                  upgrade, verify, troubleshooting
/learn/           Guided tour replacing Features + Get Started (anchored
                  sections; later split into one page per topic for search)
/cheatsheet/      Magics, shortcuts, prompt syntax. Dense, printable.
/releases/        What's new in 9.x, cadence, Python support policy (SPEC 0)
/community/       Help, contribute, code of conduct, security, governance,
                  sponsor, cite
/about/           History timeline, people, funding, licence, brand
/archive/         Index of the historical pages (their URLs do not change)
```

Navigation: Install · Learn · Cheat sheet · Releases · Community · About, a
"Docs" link to Read the Docs, and the GitHub icon.

`/features` and `/get-started` become `/learn`. GitHub Pages cannot send a
real 301, so Astro emits an HTML page with a `<meta http-equiv="refresh">`
for each. That is enough for humans and for search engines, which treat a
0-second meta refresh as a permanent redirect. The six historical pages keep
their top-level URLs untouched and only gain a shared `ArchiveLayout`.

## 5. Content plan

Every claim is verifiable against the IPython docs or PyPI as of September
2026.

**Home.** Headline _Python, interactively._ One-line pitch: the enhanced
interactive shell for Python and the engine behind Jupyter kernels. Install
command with a copy button, "Read the docs" secondary. Animated terminal with
new scenarios (autosuggestion, `?`, `%timeit`, a traceback and `%debug`,
`await`, `%autoreload`). Fact strip: latest version and date (live), stars,
"since 2001", monthly releases, Python ≥ 3.11. "Three things called IPython"
(shell, kernel, library) with an "IPython or Jupyter?" callout. "Why not the
plain REPL?": six real transcripts and the comparison table. "What's new in
9". "Part of Jupyter" diagram: IPython → ipykernel → JupyterLab, Notebook, VS
Code, Spyder, Positron, Colab. "Get involved".

**Install.** Package managers with copy buttons, `uv tool install ipython`
and `uvx ipython` for zero-commitment trials, requirements, extras, project
environments, upgrade, verify, troubleshooting (PATH, wrong interpreter,
colours, `--no-tips`, vi mode).

**Learn.** Start the shell, prompts and output caching, then one section per
feature (autosuggestions, completion, introspection, magics, shell,
tracebacks, autoreload, await, history, display), then configuration and
startup files, IPython inside Jupyter and editors, embedding and scripting.

**Cheat sheet.** Prompt syntax, magics by group, keyboard shortcuts.
Generated from `src/data/magics.ts` and `src/data/shortcuts.ts`. Print
stylesheet.

**Releases.** Current version (live), how releases work (monthly cadence,
SPEC 0 window, deprecation policy), 9.x highlights, major-series table,
links.

**Community.** Help channels; contributing beyond code; the Jupyter code of
conduct with explicit LGBTQ+ visibility; security policy; governance (a
Jupyter subproject, Jupyter Foundation under the Linux Foundation);
sponsoring (Jupyter Foundation for organisations, NumFOCUS or jupyter.org for
individuals); citation with BibTeX (Pérez & Granger, CiSE 2007).

**About.** Timeline 2001 → 2026, people, funding, licence, brand assets.

## 6. Design direction

- **"A terminal you'd want to look at."** The hero is painted with the
  active colour theme's gradient (so pride and seasonal themes stay visible)
  and holds a real terminal; the rest of the page is light, airy and
  text-first. Light mode is light everywhere, terminals included: transcripts
  use a light palette like IPython's own `lightbg` scheme and switch to a navy
  `linux`-style palette in dark mode. Sections are numbered with IPython
  prompts (`In [1]:`, `In [2]:`) as a recurring motif.
- **Colour.** Keep the teal brand and derive every accent from the existing
  `--theme-*` variables so the colour themes and the seasonal banner keep
  working. Body text and links are clamped to WCAG-AA-safe colours whatever a
  theme picks (relative colour syntax with a fallback). Flags stay decorative.
- **Type.** Inter Variable for text, JetBrains Mono Variable for code, both
  self-hosted through Fontsource. No third-party font requests.
- **Code.** Every transcript renders through one `IPythonSession` component:
  green `In [n]:` and red `Out[n]:` prompts like the real shell,
  Shiki-highlighted Python, ghost text and key caps for autosuggestion and
  Tab, no client JavaScript.
- **Dark mode** is a first-class palette, not `!important` overrides.
- **Motion.** Only the terminal animates; it respects `prefers-reduced-motion`.

## 7. Technical plan

- Keep Astro 6, Tailwind 4, React 19. React is used only for the terminal
  animation, the theme controls and the seasonal banner.
- **One build-data module** (`src/lib/buildData.ts`) fetches PyPI and GitHub
  once per build, retries anonymously if the token is bad, and falls back to
  `src/data/fallback/build-data.json`. It never throws. No page contains
  fetch code.
- Content lives in typed data files under `src/data/` so text changes do not
  touch markup: features, magics, shortcuts, timeline, ecosystem, releases,
  comparison, team, site links.
- `PageLayout` wraps navigation, header and footer; `ArchiveLayout` restyles
  the historical pages without rewriting them.
- `@astrojs/sitemap`, canonical URLs, Open Graph and Twitter meta, a static
  `og.png`, `site: 'https://ipython.org'`.
- Meta-refresh redirects for `/features` and `/get-started`.
- Remove the global gradient-text rule and the dark-mode `!important`
  overrides; drop the second theme picker from the nav or the footer.
- CI: keep the Pages workflow, drop the copy-JSON step (no longer needed),
  add a Playwright screenshot job (light, dark, mobile) as a build artifact.

## 8. Rollout

1. **Prototype** (this branch): foundation, home, install, learn, cheat
   sheet, releases, community, about, archive. Old URLs kept.
2. **Review** by the maintainers: copy accuracy, the hand-curated people list
   in `src/data/team.ts`, which colour themes to keep.
3. **Ship** to `main`; the existing workflow publishes it.
4. **Follow-ups**, in priority order from the research:
   - Split `/learn` into one page per topic (`/learn/autoreload/`,
     `/learn/config/`, `/learn/debugging/`) so each ranks for its query.
   - An extensions showcase (autoreload, storemagic, and third-party ones
     such as ipython-gpt, ipychat, pipescript).
   - "Try it in your browser" with Pyodide (IPython 9.14 added Emscripten
     support).
   - A small news collection for release announcements with an RSS feed.
   - A "used by" strip, if institutions agree to be listed.

## 9. Maintainer decisions so far

- **Themes.** Reduce the generic ones if desired, but the pride themes
  (rainbow, gay, lesbian, trans) and the Pride-month banner stay. The
  prototype keeps all themes; the picker stays in the footer.
- **Sponsorship wording.** IPython and Jupyter are no longer fiscally
  sponsored by NumFOCUS. Jupyter is hosted by the Jupyter Foundation under
  the Linux Foundation; corporate sponsors go there. Individual donations
  through NumFOCUS remain welcome.
- **Credits.** No ranking by commit count. The About page shows a
  hand-curated maintainers and alumni list (`src/data/team.ts`, marked for
  review), an alphabetical avatar wall without numbers, and a list of
  contributions a commit graph does not show.
- **Historical URLs.** Unchanged. `/archive` is only an index.
