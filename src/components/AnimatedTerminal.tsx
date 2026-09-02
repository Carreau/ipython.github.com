import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/**
 * The hero terminal: a small set of real IPython transcripts, typed out line by
 * line and cycled through, with dot navigation.
 *
 * Styling reuses the `.ipy-*` classes from `src/styles/global.css` so the
 * animated terminal and the static `IPythonSession.astro` blocks look the same.
 * Syntax colours match the `github-dark-default` Shiki theme used there.
 *
 * Transcript conventions are the same as IPythonSession:
 *   In [1]: / ...: / Out[1]: / $ / ipdb>  prompts, plus inline markers
 *   {{ghost:…}} {{cursor}} {{kbd:…}} {{dim:…}} {{err:…}} {{hl:…}}
 */

type TerminalExample = {
  name: string;
  lines: string[];
};

interface AnimatedTerminalProps {
  version?: string | null;
}

/** Remove common leading whitespace and split into lines. */
function dedentAndSplit(text: string): string[] {
  const lines = text.split("\n");
  while (lines.length > 0 && lines[0].trim().length === 0) lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim().length === 0) lines.pop();

  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length > 0) {
      minIndent = Math.min(minIndent, line.match(/^(\s*)/)?.[1].length ?? 0);
    }
  }
  if (!isFinite(minIndent)) return lines;
  return lines.map((line) => (line.trim().length === 0 ? "" : line.slice(minIndent)));
}

const getExamples = (version: string = "9.17.1"): TerminalExample[] => [
  {
    name: "Autosuggestions",
    lines: dedentAndSplit(`
      $ ipython
      IPython ${version} -- An enhanced Interactive Python.

      In [1]: import pandas as pd

      In [2]: df = pd.read_csv("sales-2026.csv")

      In [3]: df.gr{{ghost:oupby("region").revenue.sum()}}{{cursor}}
      {{dim:ghost text from your history — press → to accept}}

      In [4]: df.groupby("region").revenue.sum().idxmax()
      Out[4]: 'EMEA'

      In [5]: df.columns{{kbd:Tab}}
    `),
  },
  {
    name: "Introspection",
    lines: dedentAndSplit(`
      $ ipython
      IPython ${version} -- An enhanced Interactive Python.

      In [1]: import json

      In [2]: json.dumps?
      Signature: json.dumps(obj, *, skipkeys=False, ...)
      Docstring: Serialize obj to a JSON formatted str.
      File:      /usr/lib/python3.13/json/__init__.py
      Type:      function

      In [3]: json.dumps??      {{dim:# the same, plus the source}}
      Source:
      def dumps(obj, *, skipkeys=False, ensure_ascii=True, ...):
          ...

      In [4]: %quickref             {{dim:# or ? for the full help}}
    `),
  },
  {
    name: "Timing",
    lines: dedentAndSplit(`
      $ ipython
      IPython ${version} -- An enhanced Interactive Python.

      In [1]: %timeit sorted(range(10_000), reverse=True)
      146 μs ± 1.9 μs per loop (mean ± std. dev. of 7 runs)

      In [2]: %%time
         ...: total = sum(x * x for x in range(2_000_000))
         ...:
      CPU times: user 118 ms, sys: 2 ms, total: 120 ms
      Wall time: 121 ms

      In [3]: %run analysis.py   {{dim:# keeps its variables around}}

      In [4]: %who
      df	 results	 total
    `),
  },
  {
    name: "Debugging",
    lines: dedentAndSplit(`
      $ ipython
      IPython ${version} -- An enhanced Interactive Python.

      In [1]: def mean(xs):
         ...:     return sum(xs) / len(xs)

      In [2]: mean([])
      -----------------------------------------------------
      ZeroDivisionError     Traceback (most recent call last)
      Cell In[1], line 2, in mean(xs)
      ----> 2     return sum(xs) / len(xs)

      ZeroDivisionError: division by zero

      In [3]: %debug
      ipdb> xs
      []
    `),
  },
  {
    name: "Top-level await",
    lines: dedentAndSplit(`
      $ ipython
      IPython ${version} -- An enhanced Interactive Python.

      In [1]: import httpx

      In [2]: async with httpx.AsyncClient() as client:
         ...:     r = await client.get("https://ipython.org")
         ...:

      In [3]: r.status_code
      Out[3]: 200

      In [4]: import asyncio

      In [5]: await asyncio.sleep(0.1)
      {{dim:await works at the prompt — no asyncio.run()}}
    `),
  },
  {
    name: "Autoreload",
    lines: dedentAndSplit(`
      $ ipython
      IPython ${version} -- An enhanced Interactive Python.

      In [1]: %load_ext autoreload

      In [2]: %autoreload 2

      In [3]: from report import score

      In [4]: score(df)     {{dim:# now edit report.py ...}}
      Out[4]: 0.71

      In [5]: score(df)     {{dim:# ... new code, same session}}
      Out[5]: 0.83
    `),
  },
];

const LINE_DELAY = 300; // ms between lines appearing
const BLANK_EXTRA = 250; // blank lines pause a little longer
const EXAMPLE_DELAY = 4200; // pause on the finished transcript

/* -------------------------------------------------------------- rendering */

const MARKER = /(\{\{(?:ghost|kbd|dim|err|hl):[^}]*\}\}|\{\{cursor\}\})/;

// Colours come from the mode-aware terminal tokens in global.css so the
// terminal is light in light mode and navy in dark mode, like IPythonSession.
const SYNTAX = {
  keyword: "var(--syn-kw)",
  string: "var(--syn-str)",
  number: "var(--syn-num)",
  magic: "var(--syn-magic)",
  comment: "var(--term-muted)",
} as const;

const KEYWORDS = [
  "def", "class", "async", "await", "import", "from", "if", "elif", "else",
  "return", "for", "while", "in", "as", "with", "and", "or", "not", "is",
  "try", "except", "finally", "lambda", "yield", "True", "False", "None",
];

type Piece = { text: string; color?: string };

/** Small Python highlighter: strings, comments, numbers, keywords, magics. */
function highlightPython(text: string): Piece[] {
  const pieces: Piece[] = [];
  const re = new RegExp(
    [
      String.raw`(#[^\n]*)`, // comment
      String.raw`('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")`, // string
      String.raw`(^\s*%{1,2}[A-Za-z_]\w*|(?<![\w.])![A-Za-z_][\w-]*)`, // magic / shell
      String.raw`(\b\d[\d_]*\.?\d*(?:[eE][-+]?\d+)?\b)`, // number
      String.raw`(\b(?:${KEYWORDS.join("|")})\b)`, // keyword
    ].join("|"),
    "g",
  );
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) pieces.push({ text: text.slice(last, m.index) });
    const color = m[1]
      ? SYNTAX.comment
      : m[2]
        ? SYNTAX.string
        : m[3]
          ? SYNTAX.magic
          : m[4]
            ? SYNTAX.number
            : SYNTAX.keyword;
    pieces.push({ text: m[0], color });
    last = m.index + m[0].length;
  }
  if (last < text.length) pieces.push({ text: text.slice(last) });
  return pieces;
}

function renderMarker(marker: string, key: string): ReactNode {
  if (marker === "{{cursor}}") return <span key={key} className="ipy-cursor" aria-hidden="true" />;
  const parsed = marker.match(/^\{\{(\w+):([^}]*)\}\}$/);
  if (!parsed) return <span key={key}>{marker}</span>;
  const [, kind, text] = parsed;
  if (kind === "kbd") return <span key={key} className="ipy-kbd">{text}</span>;
  return <span key={key} className={`ipy-${kind}`}>{text}</span>;
}

/** Render one line's content: markers verbatim, the rest highlighted or plain. */
function renderContent(text: string, code: boolean, plainClass: string): ReactNode[] {
  const out: ReactNode[] = [];
  text.split(MARKER).forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("{{") && MARKER.test(part)) {
      out.push(renderMarker(part, `m${i}`));
      return;
    }
    if (!code) {
      out.push(
        <span key={`p${i}`} className={plainClass}>
          {part}
        </span>,
      );
      return;
    }
    highlightPython(part).forEach((piece, j) => {
      out.push(
        <span key={`c${i}-${j}`} style={piece.color ? { color: piece.color } : undefined}>
          {piece.text}
        </span>,
      );
    });
  });
  return out;
}

function TerminalLine({ line }: { line: string }) {
  let m: RegExpMatchArray | null;
  if ((m = line.match(/^(In \[\d+\]: ?)(.*)$/))) {
    return (
      <div>
        <span className="ipy-in">{m[1]}</span>
        {renderContent(m[2], true, "")}
      </div>
    );
  }
  if ((m = line.match(/^(\s*\.\.\.: ?)(.*)$/))) {
    return (
      <div>
        <span className="ipy-in">{m[1]}</span>
        {renderContent(m[2], true, "")}
      </div>
    );
  }
  if ((m = line.match(/^(Out\[\d+\]: ?)(.*)$/))) {
    return (
      <div>
        <span className="ipy-out">{m[1]}</span>
        {renderContent(m[2], true, "")}
      </div>
    );
  }
  if ((m = line.match(/^(\$ )(.*)$/))) {
    return (
      <div>
        <span className="ipy-shell">{m[1]}</span>
        {renderContent(m[2], false, "ipy-text")}
      </div>
    );
  }
  if ((m = line.match(/^(ipdb> )(.*)$/))) {
    return (
      <div>
        <span className="ipy-ipdb">{m[1]}</span>
        {renderContent(m[2], true, "")}
      </div>
    );
  }
  if (/^([A-Z]\w*(Error|Exception|Warning)\b|-{5,}|-+> )/.test(line)) {
    return <div>{renderContent(line, false, "ipy-err")}</div>;
  }
  if (line.trim() === "") return <div>{" "}</div>;
  return <div>{renderContent(line, false, "ipy-text")}</div>;
}

/* ------------------------------------------------------------- component */

export default function AnimatedTerminal({ version }: AnimatedTerminalProps) {
  const examples = useMemo(() => getExamples(version || undefined), [version]);
  const [currentExample, setCurrentExample] = useState(0);
  const [shown, setShown] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const set = (visible: boolean) => {
      isVisibleRef.current = visible;
      setIsVisible(visible);
    };
    const onVisibility = () => set(!document.hidden);
    const onBlur = () => set(false);
    const onFocus = () => set(!document.hidden);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    set(!document.hidden && document.hasFocus());

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const example = examples[currentExample];

  useEffect(() => {
    if (!example) return;
    // Reduced motion: show the finished transcript at once and stay put.
    if (reduced) {
      setShown(example.lines.length);
      return;
    }
    if (!isVisible) return;

    if (shown < example.lines.length) {
      const line = example.lines[shown];
      const delay = line && line.trim().length === 0 ? LINE_DELAY + BLANK_EXTRA : LINE_DELAY;
      const timer = setTimeout(() => {
        if (isVisibleRef.current) setShown((n) => n + 1);
      }, delay);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      if (isVisibleRef.current) {
        setCurrentExample((prev) => (prev + 1) % examples.length);
        setShown(0);
      }
    }, EXAMPLE_DELAY);
    return () => clearTimeout(timer);
  }, [example, examples.length, shown, isVisible, reduced]);

  const switchToExample = (index: number) => {
    if (index < 0 || index >= examples.length) return;
    setCurrentExample(index);
    setShown(reduced ? examples[index].lines.length : 0);
  };

  // Reserve the height of the tallest transcript so nothing jumps.
  const maxLines = Math.max(...examples.map((ex) => ex.lines.length));
  const bodyHeight = `calc(${maxLines} * 1.65 * 0.8125rem + 2rem)`;

  return (
    <div>
      <figure className="ipy-session">
        <figcaption className="ipy-chrome">
          <span className="ipy-dots" aria-hidden="true">
            <i style={{ background: "#ff5f57" }} />
            <i style={{ background: "#febc2e" }} />
            <i style={{ background: "#28c840" }} />
          </span>
          <span className="ml-2 truncate">ipython — {example?.name}</span>
        </figcaption>
        <pre style={{ minHeight: bodyHeight }} aria-live="off">
          <code>
            {example?.lines.slice(0, shown).map((line, i) => (
              <TerminalLine key={`${currentExample}-${i}`} line={line} />
            ))}
          </code>
        </pre>
      </figure>

      <div className="mt-4 flex items-center justify-center gap-2.5">
        {examples.map((ex, index) => (
          <button
            key={ex.name}
            type="button"
            onClick={() => switchToExample(index)}
            className={
              "h-2.5 w-2.5 rounded-full transition " +
              (index === currentExample
                ? "scale-125 bg-[var(--prompt-in)]"
                : "bg-[var(--term-line)] hover:bg-[var(--term-muted)]")
            }
            aria-label={`Show example: ${ex.name}`}
            aria-current={index === currentExample ? "true" : undefined}
            title={ex.name}
          />
        ))}
      </div>
    </div>
  );
}
