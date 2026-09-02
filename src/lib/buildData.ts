/**
 * Build-time data: latest release from PyPI, repository stats and contributors
 * from GitHub. Fetched once per build, with a committed fallback so the site
 * always builds even when an API is down, rate-limited, or the token is stale.
 *
 * Pages import `buildData` and never call fetch themselves.
 */
import fallback from "../data/fallback/build-data.json";

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  name?: string | null;
}

export interface BuildData {
  version: string;
  /** ISO date (YYYY-MM-DD) of the latest release upload. */
  releaseDate: string;
  requiresPython: string;
  stars: number;
  forks: number;
  openIssues: number;
  contributors: Contributor[];
  fetchedAt: string;
  /** Which sources were live at build time (for a small "as of" note). */
  live: { pypi: boolean; github: boolean };
}

const TIMEOUT_MS = 10_000;

function cleanToken(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let t = raw.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) t = t.slice(1, -1);
  t = t.replace(/\s+/g, "");
  return t.length > 0 ? t : undefined;
}

const token = cleanToken(import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN);

async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T | null> {
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) {
      console.warn(`[buildData] ${url} -> ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[buildData] ${url} failed:`, err instanceof Error ? err.message : err);
    return null;
  }
}

async function fetchPyPI(): Promise<Partial<BuildData> | null> {
  type PyPI = {
    info: { version: string; requires_python?: string };
    releases: Record<string, { upload_time: string }[]>;
  };
  const data = await getJson<PyPI>("https://pypi.org/pypi/ipython/json");
  if (!data?.info?.version) return null;
  const files = data.releases?.[data.info.version] ?? [];
  const upload = files.length ? files[files.length - 1].upload_time : undefined;
  return {
    version: data.info.version,
    releaseDate: upload ? upload.slice(0, 10) : fallback.releaseDate,
    requiresPython: data.info.requires_python || fallback.requiresPython,
  };
}

async function fetchGitHub(): Promise<Partial<BuildData> | null> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  type Repo = { stargazers_count: number; forks_count: number; open_issues_count: number };
  const repo = await getJson<Repo>("https://api.github.com/repos/ipython/ipython", headers);
  if (!repo) {
    // A bad token must not sink the build: retry anonymously once.
    if (token) {
      const anon = await getJson<Repo>("https://api.github.com/repos/ipython/ipython");
      if (anon) return { stars: anon.stargazers_count, forks: anon.forks_count, openIssues: anon.open_issues_count };
    }
    return null;
  }

  const result: Partial<BuildData> = {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
  };

  const list = await getJson<Contributor[]>(
    "https://api.github.com/repos/ipython/ipython/contributors?per_page=24",
    headers,
  );
  if (Array.isArray(list) && list.length > 0) {
    const known = new Map(fallback.contributors.map((c) => [c.login, c.name]));
    const contributors: Contributor[] = [];
    for (const c of list) {
      let name: string | null | undefined = known.get(c.login);
      // Only spend per-user requests when authenticated (60 req/h anonymously).
      if (name === undefined && token) {
        const user = await getJson<{ name?: string }>(`https://api.github.com/users/${c.login}`, headers);
        name = user?.name ?? null;
      }
      contributors.push({
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
        contributions: c.contributions,
        name: name ?? null,
      });
    }
    result.contributors = contributors;
  }
  return result;
}

async function load(): Promise<BuildData> {
  const [pypi, github] = await Promise.all([fetchPyPI(), fetchGitHub()]);
  const data: BuildData = {
    ...(fallback as Omit<BuildData, "live">),
    ...(pypi ?? {}),
    ...(github ?? {}),
    fetchedAt: new Date().toISOString(),
    live: { pypi: pypi !== null, github: github !== null },
  };
  console.log(
    `[buildData] IPython ${data.version} (${data.releaseDate}) · ${data.stars} stars · ` +
      `${data.contributors.length} contributors · live: pypi=${data.live.pypi} github=${data.live.github}`,
  );
  return data;
}

export const buildData: BuildData = await load();

/** "September 1, 2026" */
export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
}

/** 16776 -> "16.8k" */
export function compact(n: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}
