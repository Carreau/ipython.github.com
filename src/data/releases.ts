/** Release history and policy for /releases. First-release dates from PyPI. */
export interface MajorSeries {
  series: string;
  first: string;
  note: string;
}

export const majorSeries: MajorSeries[] = [
  { series: '9.x', first: '2025-02-28', note: 'Current. Theme rewrite, tips, LLM hooks, terminal graphics, monthly releases. Python ≥ 3.11.' },
  { series: '8.x', first: '2022-01-12', note: 'Rewritten tracebacks, autosuggestions, SPEC 0 support window. Python ≥ 3.8 → 3.10.' },
  { series: '7.x', first: '2018-09-27', note: 'Top-level await, async REPL. Python ≥ 3.4 → 3.8.' },
  { series: '6.x', first: '2017-04-19', note: 'Python 3 only.' },
  { series: '5.x', first: '2016-07-08', note: 'prompt_toolkit terminal. Last series supporting Python 2 (LTS until 2020).' },
  { series: '4.x', first: '2015-08-12', note: '"The Big Split": notebook, kernel, widgets and parallel move to their own packages.' },
  { series: '3.x', first: '2015-02-27', note: 'Multi-language notebooks, the last release before Jupyter.' },
  { series: '2.x', first: '2014-04-02', note: 'Interactive widgets, modal notebook UI.' },
  { series: '1.x', first: '2013-08-09', note: 'First 1.0 after twelve years of 0.x releases. nbconvert joins IPython.' },
  { series: '0.x', first: '2001', note: 'From a personal hack to the Notebook (0.12, 2011).' },
];

/** Highlights of the 9.x series, newest first. Source: whatsnew/version9. */
export const nineHighlights = [
  { version: '9.17', date: '2026-08-28', title: 'Faster startup', text: 'Lazy imports and lazy magic registration shave startup time; %aimport understands "as" aliases; IPYTHON_KITTY_GRAPHICS controls graphics detection.' },
  { version: '9.16', date: '2026-07-31', title: 'Safer completions', text: 'Annotation evaluation now goes through the completion policy, closing an arbitrary-code-execution path; HTML attributes in display objects are escaped; %lsmagic --json.' },
  { version: '9.15', date: '2026-06-26', title: '%xmode Doctest', text: 'A traceback mode you can paste straight into doctests. Quoted %run arguments no longer glob. Autoreload honours encoding cookies.' },
  { version: '9.14', date: '2026-05-29', title: 'Runs in the browser', text: 'Pyodide and Emscripten support (no psutil requirement), reproducible banners, and sturdier SQLite history fallbacks.' },
  { version: '9.13', date: '2026-04-24', title: 'Images in the terminal', text: 'image/png output is drawn natively in terminals that support the Kitty graphics protocol. Python 3.11 support continues, funded by the D. E. Shaw group.' },
  { version: '9.12', date: '2026-03-27', title: 'Security fix', text: 'Fix for CVE-2025-30167 (shared with ipykernel), function names in the fast traceback path, and SQLite connections closed deterministically.' },
  { version: '9.11', date: '2026-03-05', title: 'Reproducible banners', text: 'SOURCE_DATE_EPOCH support and a system_raise_on_error option to make failed shell commands raise.' },
  { version: '9.8', date: '2025-12-03', title: 'Concurrent cells', text: 'run_cell_async is re-entrant; %history accepts open-ended ranges; better completion for annotated assignments and unions.' },
  { version: '9.7', date: '2025-11-05', title: 'Gruvbox and hybrid completion', text: 'A Gruvbox Dark theme, PYTHONSAFEPATH respected, and tab completion that combines typing, runtime and static analysis.' },
  { version: '9.3', date: '2025-05-31', title: 'Complete what you have not imported', text: 'The completer can suggest attributes of modules not yet imported, with per-module policy overrides.' },
  { version: '9.1', date: '2025-04-07', title: '%notebook with outputs', text: 'Exporting a session to a notebook now includes outputs and errors; %%timeit -v saves its result.' },
  { version: '9.0', date: '2025-02-28', title: 'IPython 9', text: 'Colour and theme handling rewritten (256 colours, unicode, pride themes), tips at startup, opt-in LLM autosuggestions, a 28% smaller wheel and most deprecated APIs removed.' },
];

export const releasePolicy = {
  cadence: 'A minor release roughly every month, usually at the end of the month, with bug-fix releases in between when needed. Major versions arrive every few years and are where deprecated code is removed.',
  python: 'IPython follows SPEC 0: a Python version is supported for about three years after its release. IPython 9 requires Python 3.11 or newer; 3.14 is supported and 3.15 is being tested.',
  deprecation: 'Features are deprecated with a warning for at least one major cycle before removal, so upgrading one major version at a time is safe. Read the "What\'s new" page for your target version before upgrading a shared environment.',
};
