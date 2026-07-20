import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import PageShell from "@/components/PageShell";
import { articles, guides, popularSearches } from "@/lib/data";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Recherchez un logiciel, un hébergeur, une solution dans les articles et comparatifs du Journal de la Tech.",
  robots: { index: false, follow: true },
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const nq = normalize(query);

  const foundArticles = query
    ? articles.filter((a) =>
        normalize(`${a.title} ${a.excerpt}`).includes(nq)
      )
    : [];
  const foundGuides = query
    ? guides.filter((g) =>
        normalize(`${g.title} ${g.description}`).includes(nq)
      )
    : [];

  return (
    <PageShell
      kicker="Recherche"
      title={query ? `Résultats pour « ${query} »` : "Recherche"}
      intro={
        query
          ? `${foundArticles.length + foundGuides.length} résultat(s) dans les articles et comparatifs.`
          : "Un logiciel, un hébergeur, une solution : cherchez dans les articles et comparatifs de la rédaction."
      }
    >
      <form
        action="/recherche"
        method="get"
        role="search"
        className="mx-auto flex w-full max-w-xl"
      >
        <label htmlFor="page-search" className="sr-only">
          Rechercher sur le site
        </label>
        <input
          id="page-search"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Un logiciel, un hébergeur, une solution…"
          className="h-12 flex-1 border border-ink/60 bg-card px-4 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rouge focus:outline-none focus:ring-1 focus:ring-rouge"
        />
        <button
          type="submit"
          className="h-12 shrink-0 cursor-pointer bg-rouge px-6 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-rouge-deep"
        >
          Rechercher
        </button>
      </form>

      {query ? (
        <div className="mt-12">
          {foundGuides.length > 0 && (
            <>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Comparatifs
              </h2>
              <ul className="mt-4 space-y-3">
                {foundGuides.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/comparatifs/${g.slug}`}
                      className="font-semibold text-ink transition-colors hover:text-rouge"
                    >
                      {g.title}
                    </Link>{" "}
                    <span className="text-sm text-ink-soft">— {g.count}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {foundArticles.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
                Articles
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {foundArticles.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </>
          )}
          {foundArticles.length + foundGuides.length === 0 && (
            <p className="text-center text-ink-soft">
              Aucun résultat. Essayez un autre terme, ou explorez les{" "}
              <Link href="/comparatifs" className="font-semibold text-rouge hover:text-rouge-deep">
                comparatifs
              </Link>
              .
            </p>
          )}
        </div>
      ) : (
        <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            Recherches populaires :
          </span>
          {popularSearches.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="border border-ink/20 bg-card px-3 py-1 font-mono text-[11px] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
            >
              {s.label}
            </Link>
          ))}
        </p>
      )}
    </PageShell>
  );
}
