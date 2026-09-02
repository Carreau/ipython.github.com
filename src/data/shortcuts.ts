/** Default (Emacs-mode) terminal shortcuts. Vi mode: %config TerminalInteractiveShell.editing_mode="vi" */
export interface Shortcut {
  keys: string[];
  desc: string;
}
export interface ShortcutGroup {
  title: string;
  items: Shortcut[];
}

export const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'Completion and suggestions',
    items: [
      { keys: ['Tab'], desc: 'Complete the name, argument, path or key under the cursor. Press again to cycle.' },
      { keys: ['→', 'Ctrl+E', 'End'], desc: 'Accept the whole autosuggestion.' },
      { keys: ['Ctrl+→', 'Alt+F'], desc: 'Accept one word of the autosuggestion.' },
      { keys: ['↑ / ↓'], desc: 'Browse history; with text typed, only matching lines (and other suggestions).' },
      { keys: ['Ctrl+R'], desc: 'Reverse incremental search through history.' },
      { keys: ['Ctrl+S'], desc: 'Forward incremental search.' },
    ],
  },
  {
    title: 'Editing',
    items: [
      { keys: ['Ctrl+A', 'Ctrl+E'], desc: 'Start / end of line.' },
      { keys: ['Alt+B', 'Alt+F'], desc: 'Back / forward one word.' },
      { keys: ['Ctrl+K'], desc: 'Cut to end of line.' },
      { keys: ['Ctrl+U'], desc: 'Cut to start of line.' },
      { keys: ['Ctrl+W', 'Alt+Backspace'], desc: 'Cut the previous word.' },
      { keys: ['Ctrl+Y'], desc: 'Paste the last cut text.' },
      { keys: ['Ctrl+_'], desc: 'Undo.' },
      { keys: ['Ctrl+T'], desc: 'Swap the two characters around the cursor.' },
      { keys: ['Alt+.'], desc: 'Insert the last argument of the previous command.' },
      { keys: ['F2', 'Ctrl+X Ctrl+E'], desc: 'Edit the current input in $EDITOR.' },
    ],
  },
  {
    title: 'Running and multi-line input',
    items: [
      { keys: ['Enter'], desc: 'Run, or add a line if the code is incomplete.' },
      { keys: ['Ctrl+O'], desc: 'Insert a newline without running (start a multi-line block).' },
      { keys: ['Esc Enter', 'Alt+Enter'], desc: 'Run now, even in the middle of a block.' },
      { keys: ['Ctrl+C'], desc: 'Interrupt running code, or clear the current input.' },
      { keys: ['Ctrl+D'], desc: 'Exit IPython (on an empty line).' },
      { keys: ['Ctrl+L'], desc: 'Clear the screen.' },
      { keys: ['Ctrl+Z'], desc: 'Suspend to the shell (Unix); fg brings it back.' },
    ],
  },
];
