# What people say about IPython, and what peer sites do

_Research notes for the 2026 redesign, gathered 2 September 2026. Reddit and
the Hacker News search API were not reachable from the research environment,
so material from those two comes from search-indexed snippets and directly
reachable threads only._

## 1. What users love

- **`%autoreload`** is the single most-cited feature: "avoid restarting the
  session during development". Stack Overflow: "Reloading submodules in
  IPython" (595k views) and "Autoreload of modules in IPython" (336 votes).
  https://stackoverflow.com/q/1254370 ·
  https://switowski.com/blog/ipython-autoreload/ ·
  https://www.wrighters.io/using-autoreload-to-speed-up-ipython-and-jupyter-work/
- **Debugging** with `%debug` / `%pdb` post-mortem is a repeatedly blogged
  workflow. "Step-by-step debugging with IPython" has 141k views.
  https://switowski.com/blog/ipython-debugging/ ·
  https://stackoverflow.com/q/1623039
- **`%timeit`**: "What is %timeit in Python?" has 320k views. People meet the
  magic before they meet IPython. https://stackoverflow.com/q/29280470
- **Shell integration and the rich terminal.** An August 2026 post argues
  "IPython is all you need", praising `%rehashx` and inline images through
  the Kitty graphics protocol.
  https://nathancooper.io/blog/2026-08-10-ipython-is-all-you-need
- **General affection** and continuing new projects built on it: an MCP
  server around the IPython shell (2025), a pipe-syntax extension (2026,
  https://github.com/smacke/pipescript).
- A framing worth reusing: IPython "can be left running in a background
  terminal, faster than running cells".
  https://www.howtogeek.com/exploratory-programming-changed-how-i-work-with-data-heres-why-jupyter-and-ipython-replaced-my-editor/

## 2. Recurring confusions and complaints

- **IPython vs Jupyter vs ipykernel** is the number one conceptual confusion.
  "What is the difference between Python and IPython?" (273 votes, 192k
  views). https://stackoverflow.com/q/25709114 ·
  https://staticnotes.org/posts/jupyter-confusion/
- **"Is IPython still needed now that 3.13 has PyREPL?"** The community
  answer: the new REPL "doesn't offer ground-breaking features for folks
  already using IPython day-to-day" but "really shines when you can't or
  shouldn't install PyPI packages".
  https://treyhunner.com/2024/05/my-favorite-python-3-dot-13-feature/ ·
  https://peps.python.org/pep-0762/ ·
  https://news.ycombinator.com/item?id=40309594
- **Startup time** is a long-running open complaint (prompt_toolkit and jedi
  imports). https://github.com/ipython/ipython/issues/12191 ·
  https://github.com/ipython/ipython/issues/9908
- **prompt_toolkit pinning breakage** (8.18.0 vs prompt_toolkit 3.0.39/40).
  https://github.com/ipython/ipython/issues/14255
- **Install friction on modern distros:** "externally-managed-environment"
  on Debian 12 / Ubuntu 23.04; "VS Code, ipython and uv" is now its own
  Stack Overflow question. Windows/WSL path issues.
- **vi mode is under-served**: bracket deletion and repeat-command bugs;
  macOS right-arrow binding questions.
- **AI/LLM:** core has an opt-in autosuggest provider hook; the energy is in
  third-party extensions (ipychat, ipython-gpt). No backlash, no first-party
  story either. https://vinayak.io/2025/01/02/ipychat/ ·
  https://github.com/santiagobasulto/ipython-gpt
- **Config discoverability:** `ipython locate`, `profile_default/startup/`,
  `ipython_config.py` are buried; third-party blogs outrank the docs.
- **Misattribution:** people credit or blame IPython for other tools'
  behaviour ("I don't believe the interactive REPL in VS Code is IPython").
  https://news.ycombinator.com/item?id=29935010

## 3. Comparisons people make

- **vs ptpython:** IPython wins on introspection, rich display, session
  logging; ptpython is completion-focused.
  https://www.saashub.com/compare-ptpython-vs-ipython
- **vs bpython:** lower traffic; the lightweight curses option.
- **vs the 3.13+ REPL:** differentiators people name are magics, `%run`,
  autoreload, introspection, history, and twenty years of depth.
- **vs Jupyter / marimo:** marimo is a notebook alternative, not a terminal
  replacement, and itself recounts the IPython lineage.
  https://marimo.io/features/vs-jupyter-alternative

## 4. Ranked content topics

Derived from the 7,201 questions in the Stack Overflow `ipython` tag, sorted
by votes and views, plus the confusions above.

1. IPython vs Jupyter vs ipykernel vs Colab / VS Code (192k views).
2. `%autoreload` (595k + 336-vote questions).
3. Config file and startup files (`ipython_config.py`,
   `profile_default/startup/`, `ipython locate`, profiles).
4. Magic commands reference / cheat sheet (people use Cheatography instead).
5. Running a script (`%run`, arguments, `-d`, `-t`, `-p`) (240k views).
6. Debugging (`%debug`, `%pdb`, `%run -d`, ipdb) (141k views).
7. Introspection `?` / `??` and tab completion.
8. `%timeit` / `%time` / profiling (320k views).
9. History: `%history`, `%recall`, `%save`, search, persistence (91k views).
10. Install with pip / uv / conda / pipx and the "externally-managed" wall.
11. Keyboard shortcuts and keybinding customisation.
12. vi mode.
13. IPython inside VS Code / PyCharm / Spyder.
14. Embedding IPython in a program (`IPython.embed()`).
15. Shell integration: `!cmd`, `$var`, `%%bash`, `%rehashx` (89k views).
16. Citing IPython (BibTeX).
17. Clear screen / clear namespace: `%clear`, `%reset` (436k views).

## 5. Comparable project sites

| Site           | Hero                                              | CTA                       | Demo               | Pattern to borrow                                   |
| -------------- | ------------------------------------------------- | ------------------------- | ------------------ | --------------------------------------------------- |
| fishshell.com  | "Finally, a command line shell for the 90s"       | per-OS install blocks     | screenshots        | Benefit-named sections ("Reads Your Mind")          |
| nushell.sh     | "A new type of shell"                             | "Get Nu!"                 | screenshots        | One thesis sentence organising every feature        |
| starship.rs    | "minimal, blazing-fast, infinitely customizable"  | "Get Started"             | none               | Install command in the hero                         |
| julialang.org  | "The Julia Programming Language"                  | "Install v1.12.7"         | live code samples  | Version-stamped CTA, gallery of tiny real snippets  |
| marimo.io      | "The future of Python notebooks is here"          | "Get Started" / try online| hosted playground  | Browser-runnable demo, logo wall                    |
| docs.astral.sh | "An extremely fast Python package manager"        | the install command       | benchmark chart    | Docs are the home page                              |
| jupyter.org    | "Free software, open standards, and web services" | "Try it in your browser"  | yes                | Explicit relationship map ("The Kernel")            |
| bun.sh         | "a fast JavaScript runtime & toolkit"             | "Install Bun v1.4.0"      | workflow demo      | Honest head-to-head comparison table                |
| zellij.dev     | "Terminal Workspace with Batteries Included"      | "Explore features"        | none               | "Try without installing" one-liner                  |
| xon.sh         | "XONSH is a Python-powered shell"                 | Install · Docs · Sponsor  | none               | Named extension showcase; pronunciation in the hero |

### Patterns to borrow

1. Install command in the hero, version-stamped.
2. "Try without installing": `uvx ipython`, later a Pyodide terminal.
3. Benefit-named feature sections rather than feature names.
4. A gallery of tiny real snippets.
5. An honest comparison table: IPython vs 3.13 REPL vs ptpython vs bpython.
6. An explicit IPython → ipykernel → clients diagram.
7. Reference material one click from the hero; own the config and cheat
   sheet queries.
8. A named extension showcase and a "used by" strip.

### Things to avoid

1. Benchmark bravado. Startup time is a known open complaint.
2. A marketing site divorced from the docs.
3. Leading with the notebook heritage. Lead with the shell and the kernel;
   keep the history on the About page.
