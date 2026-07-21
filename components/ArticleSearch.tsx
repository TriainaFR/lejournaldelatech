"use client";

import { Children, useMemo, useState } from "react";

/**
 * Recherche instantanée dans les articles.
 *
 * Le rendu des cartes reste côté serveur : elles arrivent en `children`, dans
 * le même ordre que `index`, et ce composant se contente de masquer celles qui
 * ne correspondent pas. Aucun appel réseau, et les données éditoriales ne
 * partent pas dans le bundle client.
 */

export type SearchEntry = { slug: string; haystack: string };

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function ArticleSearch({
  index,
  children,
}: {
  index: SearchEntry[];
  children: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const cards = Children.toArray(children);

  const terms = useMemo(
    () => normalize(query).split(/\s+/).filter(Boolean),
    [query]
  );

  const visible = index
    .map((entry, i) => ({ entry, card: cards[i] }))
    .filter(({ entry }) => terms.every((t) => entry.haystack.includes(t)));

  return (
    <>
      <div className="mx-auto mb-8 max-w-xl">
        <form role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="recherche-articles" className="sr-only">
            Rechercher un article
          </label>
          <div className="relative">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="9" r="6" />
              <line x1="13.5" y1="13.5" x2="18" y2="18" />
            </svg>
            <input
              id="recherche-articles"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un article, un outil, une rubrique…"
              autoComplete="off"
              className="h-12 w-full border border-ink/25 bg-card pl-11 pr-4 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rouge focus:outline-none focus:ring-1 focus:ring-rouge"
            />
          </div>
        </form>

        <p
          aria-live="polite"
          className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint"
        >
          {query
            ? `${visible.length} résultat${visible.length > 1 ? "s" : ""} pour « ${query} »`
            : `${index.length} publication${index.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ entry, card }) => (
            <div key={entry.slug}>{card}</div>
          ))}
        </div>
      ) : (
        <div className="border border-ink/15 bg-paper-deep/60 p-8 text-center">
          <p className="leading-relaxed text-ink-soft">
            Aucun article ne correspond à cette recherche.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 cursor-pointer border border-ink/25 bg-card px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
          >
            Effacer la recherche
          </button>
        </div>
      )}
    </>
  );
}
