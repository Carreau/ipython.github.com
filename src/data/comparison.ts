/**
 * Honest comparison for "why not the plain REPL?". Values: true, false, or a
 * short note. Keep it fair: the default REPL is fine, IPython adds depth.
 */
export type Cell = boolean | string;
export interface Row {
  feature: string;
  ipython: Cell;
  pyrepl: Cell;
  ptpython: Cell;
  bpython: Cell;
}

export const comparisonColumns = [
  { key: 'ipython', label: 'IPython 9' },
  { key: 'pyrepl', label: 'python 3.13+ REPL' },
  { key: 'ptpython', label: 'ptpython' },
  { key: 'bpython', label: 'bpython' },
] as const;

export const comparisonRows: Row[] = [
  { feature: 'Ships with Python, nothing to install', ipython: false, pyrepl: true, ptpython: false, bpython: false },
  { feature: 'Syntax colours and multi-line editing', ipython: true, pyrepl: true, ptpython: true, bpython: true },
  { feature: 'Tab completion on live objects', ipython: true, pyrepl: 'names only', ptpython: true, bpython: true },
  { feature: 'Autosuggestions from history', ipython: true, pyrepl: false, ptpython: true, bpython: 'inline hints' },
  { feature: 'obj? / obj?? introspection', ipython: true, pyrepl: 'help(obj)', ptpython: false, bpython: 'docstring popup' },
  { feature: 'Magics: %timeit, %run, %debug, %history …', ipython: true, pyrepl: false, ptpython: false, bpython: false },
  { feature: '%autoreload edited modules', ipython: true, pyrepl: false, ptpython: false, bpython: 'reload key' },
  { feature: 'Shell commands with !, capture output', ipython: true, pyrepl: false, ptpython: false, bpython: false },
  { feature: 'Persistent, searchable history across sessions', ipython: true, pyrepl: 'basic', ptpython: true, bpython: true },
  { feature: 'Rich tracebacks with source context', ipython: true, pyrepl: 'Python 3.11+ markers', ptpython: false, bpython: false },
  { feature: 'Top-level await', ipython: true, pyrepl: 'python -m asyncio', ptpython: true, bpython: false },
  { feature: 'Powers Jupyter notebooks', ipython: true, pyrepl: false, ptpython: false, bpython: false },
  { feature: 'Images and rich output in the terminal', ipython: 'Kitty protocol', pyrepl: false, ptpython: false, bpython: false },
  { feature: 'vi editing mode', ipython: true, pyrepl: false, ptpython: true, bpython: false },
];

export const comparisonNote =
  'The default REPL got much better in Python 3.13 and is the right tool when you cannot install packages. IPython is for the sessions where you stay a while.';
