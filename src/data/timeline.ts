/** Project history for /about. Dates verified against PyPI and the docs. */
export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export const timeline: Milestone[] = [
  { year: '2001', title: 'A better prompt', text: 'Fernando Pérez, then a physics graduate student, writes IPython as a personal "afternoon hack" that merges two earlier projects, IPP and LazyPython, into an enhanced interactive shell for Python.' },
  { year: '2005', title: 'Interactive parallel computing', text: 'Brian Granger and Min Ragan-Kelley join. Work on distributed and parallel computing (the future ipyparallel) begins alongside the shell.' },
  { year: '2007', title: 'The paper', text: '"IPython: A System for Interactive Scientific Computing" is published in Computing in Science & Engineering. It remains the canonical citation.' },
  { year: '2010', title: 'The kernel is born', text: 'IPython splits into a kernel and front-ends talking over ZeroMQ. The Qt console arrives in 0.11 the following year, and the architecture that Jupyter still uses today is in place.' },
  { year: '2011', title: 'The Notebook', text: 'IPython 0.12 ships the IPython Notebook: a browser-based interface mixing code, prose and output that will change how scientific computing is taught and shared.' },
  { year: '2012', title: 'FSF award', text: 'Fernando Pérez receives the Free Software Foundation Award for the Advancement of Free Software for IPython.' },
  { year: '2013', title: 'Funding and 1.0', text: 'The Alfred P. Sloan Foundation awards $1.15M to the project; Microsoft donates $100k. IPython 1.0 is released in August after twelve years of 0.x versions.' },
  { year: '2014', title: 'Project Jupyter', text: 'The language-agnostic pieces (notebook, protocol, front-ends) are announced as Project Jupyter, a home for interactive computing beyond Python.' },
  { year: '2015', title: 'The Big Split', text: 'IPython 4.0 completes the split: the notebook, ipykernel, ipywidgets and ipyparallel become separate packages, and IPython goes back to being the Python shell and kernel.' },
  { year: '2016', title: 'prompt_toolkit', text: 'IPython 5.0 replaces readline with prompt_toolkit, bringing syntax highlighting as you type, multi-line editing and vi mode to the terminal. 5.x is the last series for Python 2.' },
  { year: '2017', title: 'Python 3 only', text: 'IPython 6.0 drops Python 2. The same year the ACM Software System Award goes to the Jupyter team for IPython and Jupyter.' },
  { year: '2018', title: 'Async at the prompt', text: 'IPython 7.0 adds top-level await and an event loop integrated into the shell.' },
  { year: '2022', title: 'Tracebacks and suggestions', text: 'IPython 8.0 rewrites tracebacks with precise source highlighting and adds fish-style autosuggestions from history.' },
  { year: '2025', title: 'IPython 9', text: 'A rewrite of colour and theme handling, tips at startup, opt-in LLM completions, a smaller wheel, and the removal of years of deprecated code. Minor releases now land roughly every month.' },
  { year: '2026', title: 'Today', text: 'Images rendered inline in the terminal, faster startup, Pyodide support, and a steady stream of completer and debugger improvements. Maintained by Matthias Bussonnier with contributors around the world.' },
];
