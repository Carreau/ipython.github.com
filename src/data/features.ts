/**
 * "Why IPython?" feature list with real transcripts. Used on the home page
 * and expanded on /learn. Keep transcripts honest: every line should be
 * something IPython 9 actually prints.
 */
export interface Feature {
  id: string;
  title: string;
  /** One sentence, shown in cards. */
  blurb: string;
  /** Longer explanation for /learn (plain text, may contain <code>). */
  detail: string;
  session: string;
  docs?: string;
  since?: string;
}

export const features: Feature[] = [
  {
    id: 'autosuggest',
    title: 'Autosuggestions from your history',
    blurb: 'Fish-style ghost text completes the line you are typing from what you ran before. Accept with → or Ctrl-E, one word with Ctrl-→.',
    detail:
      'As you type, IPython searches your persistent history for a matching line and shows the rest in grey. Press <kbd>→</kbd>, <kbd>Ctrl</kbd>+<kbd>E</kbd> or <kbd>End</kbd> to accept the whole suggestion, or <kbd>Ctrl</kbd>+<kbd>→</kbd> to accept a single word. <kbd>↑</kbd> cycles through other matches. Suggestions can also come from a language model if you opt in.',
    session: `
      In [1]: import pandas as pd

      In [2]: df = pd.read_csv("sales-2026.csv", parse_dates=["day"])

      In [3]: df.gr{{ghost:oupby("region").revenue.sum().sort_values()}}{{cursor}}
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/config/shortcuts/index.html',
    since: '8.0',
  },
  {
    id: 'completion',
    title: 'Tab completion that knows your objects',
    blurb: 'Complete attributes, arguments, dict keys, file paths and modules you have not even imported yet.',
    detail:
      'Completion is evaluated against the live objects in your session, so it knows the columns of your DataFrame and the keys of your dict, not just the names in a static file. Since 9.3 it can also suggest attributes of modules you have not imported yet. A configurable policy decides how much code the completer is allowed to evaluate.',
    session: `
      In [1]: from pathlib import Path

      In [2]: p = Path.home() / "data"

      In [3]: p.{{kbd:Tab}}
      {{dim:absolute()   as_posix()   exists()   glob()   is_dir()   iterdir()   mkdir()   ...}}

      In [4]: config = {"batch_size": 32, "lr": 1e-3}

      In [5]: config["{{kbd:Tab}}
      {{dim:batch_size   lr}}
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/config/options/terminal.html',
  },
  {
    id: 'introspection',
    title: 'Ask any object about itself',
    blurb: 'Append ? for the signature and docstring, ?? for the source. Works on functions, classes, modules and methods.',
    detail:
      'Introspection is the fastest way to learn a library without leaving the shell. <code>obj?</code> shows the type, signature, docstring and where the object is defined; <code>obj??</code> adds the source when it is available. <code>?</code> on its own opens the built-in quick reference, and <code>%pdef</code>, <code>%pdoc</code>, <code>%psource</code> and <code>%pfile</code> give you each piece separately.',
    session: `
      In [1]: import json

      In [2]: json.dumps?
      Signature: json.dumps(obj, *, skipkeys=False, ensure_ascii=True, check_circular=True, ...)
      Docstring: Serialize \`\`obj\`\` to a JSON formatted \`\`str\`\`.
      File:      ~/.pyenv/versions/3.13.5/lib/python3.13/json/__init__.py
      Type:      function

      In [3]: json.dumps??        # the same, plus the full source
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/interactive/reference.html#dynamic-object-information',
  },
  {
    id: 'magics',
    title: 'Magic commands for the boring parts',
    blurb: '%timeit, %run, %debug, %%time, %who, %history: one-word commands for the things you do fifty times a day.',
    detail:
      'Magics are commands that start with <code>%</code> (one line) or <code>%%</code> (a whole cell). They are not Python; they are shortcuts the shell understands. <code>%timeit</code> runs a statement many times and reports the mean and standard deviation, <code>%run</code> executes a script and keeps its variables in your namespace, <code>%who</code> lists what you have defined. Type <code>%lsmagic</code> to see them all, or <code>%timeit?</code> for the help of any one of them.',
    session: `
      In [1]: %timeit sorted(range(10_000), reverse=True)
      146 μs ± 1.9 μs per loop (mean ± std. dev. of 7 runs, 10,000 loops each)

      In [2]: %run analysis.py       # runs the script, keeps its variables

      In [3]: %who
      df	 results	 summarize

      In [4]: %%time
         ...: results = [summarize(chunk) for chunk in df.groupby("region")]
         ...:
      CPU times: user 812 ms, sys: 24 ms, total: 836 ms
      Wall time: 841 ms
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/interactive/magics.html',
  },
  {
    id: 'shell',
    title: 'The shell is one keystroke away',
    blurb: 'Prefix a line with ! to run it in your system shell. Capture the output as a list, or expand Python variables into the command.',
    detail:
      'Anything after <code>!</code> goes to your system shell. Assign the result to capture stdout as a list with <code>.grep()</code>, <code>.fields()</code> and <code>.s</code>/<code>.n</code>/<code>.p</code> attributes. <code>$name</code> and <code>{expr}</code> expand Python values into the command. Common commands (<code>ls</code>, <code>cd</code>, <code>cat</code>, <code>mkdir</code>…) are also available as magics, and <code>%cd</code> changes the shell\'s working directory for real.',
    session: `
      In [1]: !git status --short
       M ipython/core/magic.py

      In [2]: files = !ls *.csv

      In [3]: files.grep("2026")
      Out[3]: ['q1-2026.csv', 'q2-2026.csv']

      In [4]: !wc -l {files[0]}
      18213 q1-2026.csv

      In [5]: %cd ~/projects/report
      /home/you/projects/report
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/interactive/reference.html#system-shell-access',
  },
  {
    id: 'tracebacks',
    title: 'Tracebacks you can actually read',
    blurb: 'Errors show the offending code with context, colours and the exact expression that failed. Then %debug drops you right there.',
    detail:
      'IPython renders exceptions with syntax highlighting, a few lines of context around each frame and a marker on the exact node that raised. <code>%xmode</code> switches between <code>Minimal</code>, <code>Plain</code>, <code>Context</code>, <code>Verbose</code> (with local variables) and, since 9.15, <code>Doctest</code>. After an exception, <code>%debug</code> opens the debugger post-mortem at the failing frame, and <code>ipython --pdb</code> does that automatically.',
    session: `
      In [1]: def mean(xs):
         ...:     return sum(xs) / len(xs)
         ...:

      In [2]: mean([])
      ---------------------------------------------------------------------------
      ZeroDivisionError                         Traceback (most recent call last)
      Cell In[2], line 1
      ----> 1 mean([])

      Cell In[1], line 2, in mean(xs)
            1 def mean(xs):
      ----> 2     return sum(xs) / len(xs)

      ZeroDivisionError: division by zero

      In [3]: %debug
      > <ipython-input-1>(2)mean()
      ipdb> xs
      []
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/interactive/reference.html#automatic-invocation-of-pdb-on-exceptions',
  },
  {
    id: 'autoreload',
    title: 'Edit your code, keep your session',
    blurb: '%autoreload re-imports modules you change on disk, so your data stays loaded while you fix the function that processes it.',
    detail:
      'Loading a dataset takes minutes; fixing a typo in the function that uses it takes seconds. With <code>%autoreload 2</code> IPython watches the modules you have imported and swaps in the new code before each command, without restarting or reloading anything by hand. Existing objects pick up new methods too. It is the feature long-time users mention first.',
    session: `
      In [1]: %load_ext autoreload

      In [2]: %autoreload 2

      In [3]: from report import score

      In [4]: score(df)              # edit report.py in your editor ...
      Out[4]: 0.71

      In [5]: score(df)              # ... and the new code just runs
      Out[5]: 0.83
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/config/extensions/autoreload.html',
  },
  {
    id: 'await',
    title: 'await at the top level',
    blurb: 'Call async code directly at the prompt. No event-loop boilerplate, no asyncio.run().',
    detail:
      'IPython runs your input on an event loop, so <code>await</code> works at the top level of a cell, exactly like inside an <code>async def</code>. It plays well with asyncio, trio and curio libraries and is what makes exploring async APIs in a shell bearable.',
    session: `
      In [1]: import httpx

      In [2]: async with httpx.AsyncClient() as client:
         ...:     r = await client.get("https://pypi.org/pypi/ipython/json")
         ...:

      In [3]: r.json()["info"]["version"]
      Out[3]: '9.17.1'
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/interactive/autoawait.html',
    since: '7.0',
  },
  {
    id: 'history',
    title: 'Every input and output, remembered',
    blurb: 'Outputs are cached in Out[n] and _, inputs in In[n]. History persists across sessions and is searchable with Ctrl-R.',
    detail:
      'Every result is kept: <code>_</code> is the last output, <code>__</code> the one before, <code>Out[3]</code> any of them by number. Inputs live in <code>In</code> and <code>_i</code>. History is written to an SQLite database in your profile, so <kbd>Ctrl</kbd>+<kbd>R</kbd> and <kbd>↑</kbd> find commands from last week. <code>%history</code> prints ranges, <code>%save</code> writes them to a file, <code>%rerun</code> runs them again, and <code>%notebook</code> exports the session as a Jupyter notebook.',
    session: `
      In [1]: 21 * 2
      Out[1]: 42

      In [2]: _ + 1
      Out[2]: 43

      In [3]: Out[1] * 10
      Out[3]: 420

      In [4]: %history -n 1-3
         1: 21 * 2
         2: _ + 1
         3: Out[1] * 10

      In [5]: %save session.py 1-3
      The following commands were written to file \`session.py\`:
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/interactive/reference.html#input-caching-system',
  },
  {
    id: 'display',
    title: 'Rich output, even in a terminal',
    blurb: 'Colour themes, tips at startup, and PNG images rendered inline in terminals that speak the Kitty graphics protocol.',
    detail:
      'IPython 9 rewrote its colour handling: pick a theme with <code>--colors</code> or the <code>%colors</code> magic (<code>linux</code>, <code>lightbg</code>, <code>neutral</code>, <code>nocolor</code>, the pride themes, Gruvbox Dark…). Since 9.13, <code>image/png</code> output such as <code>IPython.display.Image</code> or a matplotlib figure is drawn directly in the terminal when it supports the Kitty graphics protocol (kitty, WezTerm, Ghostty, Konsole). And a one-line tip at startup helps you discover features like these; turn it off with <code>--no-tip</code>.',
    session: `
      $ ipython --colors=linux
      IPython 9.17.1 -- An enhanced Interactive Python. Type '?' for help.
      Tip: Use \`%autoreload 2\` to reload modules automatically when they change.

      In [1]: from IPython.display import Image

      In [2]: Image("plot.png")          # drawn inline in kitty, WezTerm, Ghostty ...
    `,
    docs: 'https://ipython.readthedocs.io/en/stable/whatsnew/version9.html',
    since: '9.0',
  },
];

/** The features shown on the home page, in order. */
export const homeFeatureIds = ['autosuggest', 'introspection', 'magics', 'tracebacks', 'autoreload', 'shell'];
