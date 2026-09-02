/** Magic commands for the cheat sheet, grouped. `cell: true` marks %% magics. */
export interface Magic {
  name: string;
  desc: string;
  cell?: boolean;
  example?: string;
}
export interface MagicGroup {
  title: string;
  items: Magic[];
}

export const magicGroups: MagicGroup[] = [
  {
    title: 'Timing and profiling',
    items: [
      { name: '%time', desc: 'Time a single run of a statement.', example: '%time df.sort_values("x")' },
      { name: '%timeit', desc: 'Time many runs, report mean ± std. dev. -n loops, -r repeats, -o returns the result object.', example: '%timeit -n 100 f(x)' },
      { name: '%%time', desc: 'Time the whole cell once.', cell: true },
      { name: '%%timeit', desc: 'Time the whole cell many times. -v stores the result in a variable (9.1).', cell: true },
      { name: '%prun', desc: 'Profile a statement with cProfile. -s sorts, -l limits output.', example: '%prun -s cumulative main()' },
      { name: '%%prun', desc: 'Profile the whole cell.', cell: true },
      { name: '%run -p', desc: 'Run a script under the profiler.', example: '%run -p -s time script.py' },
    ],
  },
  {
    title: 'Running and editing code',
    items: [
      { name: '%run', desc: 'Run a script and keep its variables. -i shares your namespace, -d runs under the debugger, -t times it.', example: '%run -i analysis.py' },
      { name: '%load', desc: 'Load a file, URL, or history range into the input line for editing.', example: '%load https://…/example.py' },
      { name: '%edit', desc: 'Open $EDITOR on a file, an object, or a history range, then run what you saved.', example: '%edit mymodule.py' },
      { name: '%save', desc: 'Save history lines to a file.', example: '%save session.py 1-20' },
      { name: '%macro', desc: 'Name a range of history lines so you can re-run it as one command.', example: '%macro setup 1-4' },
      { name: '%rerun', desc: 'Re-run lines from history.', example: '%rerun -l 3' },
      { name: '%recall', desc: 'Put a previous input (or an object) back on the input line to edit it.', example: '%recall 12' },
      { name: '%paste / %cpaste', desc: 'Paste and run code from the clipboard, ignoring leading prompts and indentation.' },
      { name: '%store', desc: 'Persist a variable across sessions. -r restores, -d deletes.', example: '%store results' },
      { name: '%%writefile', desc: 'Write the cell to a file (-a to append).', cell: true, example: '%%writefile helpers.py' },
      { name: '%%script / %%bash / %%sh', desc: 'Run the cell with another interpreter or shell.', cell: true },
      { name: '%%capture', desc: 'Capture the cell\'s stdout, stderr and rich output into a variable.', cell: true, example: '%%capture out' },
    ],
  },
  {
    title: 'Debugging and errors',
    items: [
      { name: '%debug', desc: 'Open the debugger post-mortem on the last exception, or run a statement under it.', example: '%debug f(x)' },
      { name: '%%debug', desc: 'Run the whole cell under the debugger.', cell: true },
      { name: '%pdb', desc: 'Toggle automatic debugger on every uncaught exception.', example: '%pdb on' },
      { name: '%xmode', desc: 'Traceback verbosity: Minimal, Plain, Context (default), Verbose, Doctest (9.15).', example: '%xmode Verbose' },
      { name: '%tb', desc: 'Print the last traceback again.' },
    ],
  },
  {
    title: 'Namespace and objects',
    items: [
      { name: '%who', desc: 'List names you defined. Filter by type: %who function.' },
      { name: '%whos', desc: 'Like %who, as a table with types and values.' },
      { name: '%who_ls', desc: 'The same, returned as a Python list.' },
      { name: '%reset', desc: 'Delete all names you defined (-f skips the prompt, -s keeps history).' },
      { name: '%xdel', desc: 'Delete a variable and try to clear references IPython kept to it.' },
      { name: '%pdef / %pdoc / %psource / %pfile', desc: 'Print only the signature, docstring, source or file of an object.' },
      { name: '%pinfo / %pinfo2', desc: 'What obj? and obj?? call under the hood.' },
      { name: '%page', desc: 'Show a long object in the pager.' },
      { name: '%pprint', desc: 'Toggle pretty printing.' },
      { name: '%precision', desc: 'Set float display precision.', example: '%precision 3' },
    ],
  },
  {
    title: 'Shell and files',
    items: [
      { name: '!cmd', desc: 'Run a system command. Assign to capture output as a list.', example: 'files = !ls *.py' },
      { name: '!!cmd', desc: 'Run and return output as a list in one step.' },
      { name: '%cd', desc: 'Change directory (with bookmarks and history: %cd -, %cd -b name).' },
      { name: '%pwd', desc: 'Print the working directory.' },
      { name: '%ls / %cat / %mkdir / %cp / %mv / %rm', desc: 'Common shell commands available as magics (aliases).' },
      { name: '%env', desc: 'Read or set environment variables.', example: '%env OMP_NUM_THREADS=4' },
      { name: '%sx / %sc', desc: 'Run a shell command and capture the output (like !!).' },
      { name: '%alias', desc: 'Define a shell alias as a magic.', example: '%alias gs git status' },
      { name: '%rehashx', desc: 'Load every executable on $PATH as an alias.' },
      { name: '%bookmark', desc: 'Bookmark directories for %cd.' },
      { name: '%pip / %conda / %mamba', desc: 'Install packages into the running interpreter\'s environment.', example: '%pip install polars' },
    ],
  },
  {
    title: 'History',
    items: [
      { name: '%history', desc: 'Print history. -n shows numbers, -o outputs, -g greps, ranges like 1-10 or 1/5-.', example: '%history -n -g pandas' },
      { name: '%notebook', desc: 'Export the session as a Jupyter notebook, outputs included (9.1).', example: '%notebook session.ipynb' },
      { name: '_ , __ , ___', desc: 'Last three outputs (not magics, but you will use them constantly).' },
      { name: '_i, _ii, _iii / In[n] / Out[n]', desc: 'Previous inputs and any cached input or output by number.' },
    ],
  },
  {
    title: 'Extensions and reloading',
    items: [
      { name: '%load_ext / %reload_ext / %unload_ext', desc: 'Manage extensions.', example: '%load_ext autoreload' },
      { name: '%autoreload', desc: '0/off, 1/explicit (only %aimport-ed), 2/all, 3/complete (also new objects).', example: '%autoreload 2' },
      { name: '%aimport', desc: 'Mark modules for reloading (or exclude them with -).', example: '%aimport report' },
    ],
  },
  {
    title: 'Configuration and meta',
    items: [
      { name: '%lsmagic', desc: 'List every available magic (--json for machine-readable output, 9.16).' },
      { name: '%magic', desc: 'Show help for the magic system.' },
      { name: '%quickref', desc: 'Show the quick reference card.' },
      { name: '%config', desc: 'View or change configuration at runtime.', example: '%config TerminalInteractiveShell.editing_mode="vi"' },
      { name: '%colors', desc: 'Switch colour theme for the running session.', example: '%colors lightbg' },
      { name: '%automagic', desc: 'Allow magics without the % prefix.' },
      { name: '%matplotlib', desc: 'Choose the matplotlib backend and turn on interactive plotting.', example: '%matplotlib inline' },
      { name: '%gui', desc: 'Integrate a GUI event loop (qt, gtk, tk, wx, osx).' },
    ],
  },
];

/** Non-magic special syntax that makes the prompt different from `python`. */
export const promptSyntax = [
  { syntax: 'obj?', desc: 'Type, signature, docstring and file of obj.' },
  { syntax: 'obj??', desc: 'The same, plus the source code.' },
  { syntax: '?', desc: 'Quick introduction to IPython features.' },
  { syntax: 'np.*load*?', desc: 'Search names matching a wildcard pattern.' },
  { syntax: '%magic / %%magic', desc: 'Line magic (one line) or cell magic (the whole block).' },
  { syntax: '!cmd', desc: 'Run cmd in the system shell. $var and {expr} expand Python values.' },
  { syntax: 'x = !cmd', desc: 'Capture the output of cmd as a list (with .grep, .fields, .s, .n, .p).' },
  { syntax: 'expr;', desc: 'Run expr but do not print or cache its result.' },
  { syntax: 'await coro()', desc: 'Await at the top level; IPython runs an event loop for you.' },
  { syntax: ',f a b   or   ;f a b', desc: 'Auto-quote: call f("a", "b") or f("a b").' },
  { syntax: '/f a b', desc: 'Auto-parentheses: call f(a, b).' },
];
