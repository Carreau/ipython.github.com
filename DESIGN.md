# ipython.org design system

Short reference for anyone editing the site. Tokens and components live in
`src/styles/global.css`, `src/layouts/` and `src/components/`.

## Principles

- Answer "what is IPython, how is it different from Jupyter, how do I install
  it" above the fold. Everything else supports that.
- Show, don't tell: real transcripts rendered with `IPythonSession`, not
  feature adjectives.
- Light, text-first pages with a dark terminal as the only "loud" element.
- Sections are numbered with the IPython prompt motif: `In [1]:`, `In [2]:`.
- Colour themes (including the pride themes) only change `--theme-primary`,
  `--theme-secondary`, `--theme-accent`. Text colours are fixed and WCAG-AA on
  their surfaces; flags and gradients stay decorative.
- Motion is limited to the hero terminal and respects `prefers-reduced-motion`.

## Tokens (Tailwind utilities)

| Utility                          | Meaning                                   |
| -------------------------------- | ----------------------------------------- |
| `text-ink` / `-muted` / `-faint` | Body text, secondary text, captions       |
| `bg-surface` / `-2` / `-3`       | Page, tinted section, chip/inline code    |
| `border-line` / `-strong`        | Hairlines                                 |
| `text-brand-text`                | Links and accents (contrast-clamped)      |
| `bg-brand`, `bg-brand-soft`      | Primary button, soft tint                 |
| `bg-term`, `text-term-ink`       | Terminal surface (always dark)            |
| `text-prompt-in` / `-out`        | Green In[] and red Out[] prompt colours   |
| `font-mono`                      | JetBrains Mono (self-hosted)              |

Classes: `container-x` (max-w-6xl), `container-prose` (max-w-3xl), `eyebrow`,
`btn btn-primary|btn-secondary|btn-ghost|btn-on-dark [btn-lg]`, `card`,
`chip`, `prose`, `table-plain`, `brand-strip`, `bg-dots`.

## Components

- `layouts/PageLayout.astro` – nav, standard header (`title`, `eyebrow`,
  `lede`), footer. `noHeader` for custom heroes.
- `layouts/ArchiveLayout.astro` – historical pages.
- `Section.astro` – `n`, `id`, `title`, `lede`, `tone="default|alt|dark"`,
  `narrow`.
- `IPythonSession.astro` – `session` (transcript string), `title`,
  `chrome=false`. Prompt lines are detected (`In [1]:`, `...:`, `Out[1]:`,
  `$ `, `ipdb> `). Inline markers: `{{ghost:text}}`, `{{cursor}}`,
  `{{kbd:Tab}}`, `{{dim:text}}`, `{{err:text}}`, `{{hl:text}}`.
- `CommandBlock.astro` – one shell command with a copy button.
- `CodeBlock.astro` – Shiki code (`code`, `lang`, `title`, `copy`).
- `Callout.astro` – `title`, `tone="info|tip|warn"`.
- `Card.astro` – `title`, `href`, `external`; slot `icon`.
- `Stat.astro` – `value`, `label`, `sub`, `href`.
- `LiveVersion.tsx` – build-time version refreshed from PyPI on the client.
- `AnimatedTerminal.tsx` – the animated hero terminal (React island).

## Data

All copy that is a list lives in `src/data/`: `site.ts` (nav, links,
citation, footer), `features.ts`, `magics.ts`, `shortcuts.ts`,
`timeline.ts`, `ecosystem.ts`, `releases.ts`, `team.ts`.

`src/lib/buildData.ts` fetches PyPI and GitHub once per build and falls back
to `src/data/fallback/build-data.json`. It never throws. Use
`buildData.version`, `buildData.releaseDate`, `buildData.stars`,
`buildData.contributors`, plus `formatDate()` and `compact()`.

## Links

Internal links go through `baseUrl('install')` from `src/lib/utils`.
External links come from `links` in `src/data/site.ts`.

## Checking your work

```
npm run build                       # must pass
python3 <scratch>/shot-local.py out- home install   # screenshots
DARK=1 python3 ... / MOBILE=1 python3 ...
```
