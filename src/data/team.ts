/**
 * People behind IPython. This list is curated by hand on purpose: commit
 * counts do not capture reviewing, triage, documentation, design, community
 * support or funding work. Keep entries short; link to GitHub profiles.
 *
 * TODO(maintainers): review and complete before shipping.
 */
export interface Person {
  name: string;
  login?: string;
  role: string;
}

export const maintainers: Person[] = [
  { name: 'Matthias Bussonnier', login: 'Carreau', role: 'Lead maintainer and release manager since 2015' },
];

/** Founders and past core developers, roughly in order of joining. */
export const alumni: Person[] = [
  { name: 'Fernando Pérez', login: 'fperez', role: 'Created IPython in 2001; co-founder of Project Jupyter' },
  { name: 'Brian Granger', login: 'ellisonbg', role: 'Kernel architecture, the Notebook; co-founder of Project Jupyter' },
  { name: 'Min Ragan-Kelley', login: 'minrk', role: 'ZeroMQ architecture, ipyparallel, ipykernel, JupyterHub' },
  { name: 'Ville Vainio', login: 'vivainio', role: 'Maintainer of the 0.7 – 0.9 era; extensions, Windows support' },
  { name: 'Thomas Kluyver', login: 'takluyver', role: 'Python 3 port, history system, kernel and nbformat' },
  { name: 'Paul Ivanov', login: 'ivanov', role: 'Notebook, testing, community; the 1.0 roadmap' },
  { name: 'Jonathan Frederic', login: 'jdfreder', role: 'ipywidgets and the notebook front-end' },
  { name: 'Jason Grout', login: 'jasongrout', role: 'Widgets, JupyterLab' },
  { name: 'Sylvain Corlay', login: 'SylvainCorlay', role: 'Widgets, xeus, the Jupyter protocol' },
  { name: 'Kyle Kelley', login: 'rgbkrk', role: 'Kernel gateway, nteract' },
  { name: 'Damián Avila', login: 'damianavila', role: 'Notebook extensions, RISE' },
  { name: 'Bradley Froehle', login: 'bfroehle', role: 'Parallel computing, Windows' },
  { name: 'Jörgen Stenarson', login: 'jstenar', role: 'Windows support, readline' },
  { name: 'Robert Kern', role: 'Early core developer; Traits and the 0.x shell' },
  { name: 'Gaël Varoquaux', login: 'GaelVaroquaux', role: 'Early GUI front-ends and the interactive shell' },
];

/** Ways people contribute that a commit graph will not show. */
export const otherContributions = [
  'Reviewing pull requests and triaging the issue tracker',
  'Answering questions on Discourse, Zulip and Stack Overflow',
  'Writing and translating documentation and tutorials',
  'Reporting bugs with reproducible examples',
  'Maintaining downstream packages: ipykernel, prompt_toolkit, Jedi, Pygments',
  'Packaging IPython for conda-forge, Debian, Fedora, Homebrew and others',
  'Funding developer time (see the funding history)',
];

/** Organisations that have funded IPython development. Verified entries only. */
export const funders = [
  { name: 'Alfred P. Sloan Foundation', year: '2013 – 2014', note: '$1.15M grant for the IPython Notebook' , href: 'sloan-grant' },
  { name: 'Microsoft', year: '2013', note: '$100k donation through NumFOCUS', href: 'microsoft-donation-2013' },
  { name: 'D. E. Shaw group', year: '2026', note: 'Continued Python 3.11 support in the 9.x series', href: 'https://ipython.readthedocs.io/en/stable/whatsnew/version9.html' },
];
