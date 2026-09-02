/** Projects around IPython, for the ecosystem section. */
export interface EcoProject {
  name: string;
  role: string;
  desc: string;
  href: string;
}

export const ecosystem: EcoProject[] = [
  { name: 'ipykernel', role: 'Kernel', desc: 'Wraps IPython in the Jupyter messaging protocol so notebooks, JupyterLab, VS Code and other clients can run Python through it.', href: 'https://github.com/ipython/ipykernel' },
  { name: 'Jupyter Notebook & JupyterLab', role: 'Front-ends', desc: 'The browser interfaces that grew out of the IPython Notebook. Every Python notebook you open runs on IPython underneath.', href: 'https://jupyter.org/' },
  { name: 'ipywidgets', role: 'Widgets', desc: 'Interactive sliders, buttons and plots that talk to the kernel. Started in IPython 2.0, now its own project.', href: 'https://ipywidgets.readthedocs.io/' },
  { name: 'ipyparallel', role: 'Parallel computing', desc: 'Run IPython engines across cores and clusters and drive them interactively. Split out of IPython in 4.0.', href: 'https://ipyparallel.readthedocs.io/' },
  { name: 'traitlets', role: 'Configuration', desc: 'The typed-attribute and configuration system behind ipython_config.py and the rest of Jupyter.', href: 'https://traitlets.readthedocs.io/' },
  { name: 'prompt_toolkit · Jedi · Pygments', role: 'Foundations', desc: 'The libraries that give the terminal its editing, completion and colour. IPython contributes back to all three.', href: 'https://python-prompt-toolkit.readthedocs.io/' },
];

export const clients = ['JupyterLab', 'Jupyter Notebook', 'VS Code', 'Spyder', 'Positron', 'PyCharm', 'Google Colab', 'Emacs', 'Neovim'];
