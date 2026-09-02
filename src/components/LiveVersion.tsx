import { useEffect, useState } from "react";

/**
 * Renders the version known at build time and, once hydrated, refreshes it
 * from PyPI so the number stays current between deploys.
 */
export default function LiveVersion({ initial }: { initial: string }) {
  const [version, setVersion] = useState(initial);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://pypi.org/pypi/ipython/json", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const v = d?.info?.version;
        if (typeof v === "string" && v) setVersion(v);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);
  return <span>{version}</span>;
}
