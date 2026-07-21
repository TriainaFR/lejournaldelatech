import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import PageShell from "@/components/PageShell";
import {
  activeCategories,
  articlesByCategory,
  categories,
  type CategorySlug,
} from "@/lib/data";

const SITE_URL = "https://lejournaldelatech.fr";

export const dynamicParams = false;

/** Toutes les rubriques ont une page, y compris avant leur premier article. */
export function generateStaticParams() {
  return categories.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
  const { categorie } = await params;
  const cat = categories.find((c) => c.slug === categorie);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      type: "website",
      title: `${cat.name} — Le Journal de la Tech`,
      description: cat.description,
      url: `${SITE_URL}/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorie: string }>;
}) {
  const { categorie } = await params;
  const cat = categories.find((c) => c.slug === categorie);
  if (!cat) notFound();

  const items = articlesByCategory(categorie as CategorySlug);
  const autres = activeCategories().filter((c) => c.slug !== cat.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/${cat.slug}#page`,
        name: `${cat.name} — Le Journal de la Tech`,
        description: cat.description,
        url: `${SITE_URL}/${cat.slug}`,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@type": "Thing", name: cat.name },
        ...(items.length > 0
          ? {
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: items.length,
                itemListElement: items.map((a, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  url: `${SITE_URL}/${a.category}/${a.slug}`,
                  name: a.title,
                })),
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: cat.name,
            item: `${SITE_URL}/${cat.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <PageShell kicker="Rubrique" title={cat.name} intro={cat.description}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className="mb-8 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint"
      >
        <Link href="/" className="transition-colors hover:text-rouge">
          Accueil
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-soft">{cat.name}</span>
      </nav>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-[760px]">
          <section aria-labelledby="au-programme">
            <h2
              id="au-programme"
              className="font-display text-2xl font-semibold text-ink"
            >
              Ce que nous traiterons dans cette rubrique
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Cette rubrique n&apos;a pas encore d&apos;article publié. Voici
              les sujets sur lesquels la rédaction travaille, avec la même
              méthode que nos autres comparatifs : critères publics, mesures
              reproductibles et prix réels.
            </p>
            <ul className="mt-6 space-y-4">
              {cat.angles.map((a) => (
                <li key={a} className="flex gap-3 leading-relaxed text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono font-bold text-rouge"
                  >
                    →
                  </span>
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
              <Link
                href="/protocole-jdlt"
                className="text-rouge hover:text-rouge-deep"
              >
                Notre méthode d&apos;évaluation →
              </Link>
              <Link href="/contact" className="text-rouge hover:text-rouge-deep">
                Proposer un sujet →
              </Link>
            </p>
          </section>

          {autres.length > 0 ? (
            <section aria-labelledby="rubriques-publiees" className="mt-14">
              <h2
                id="rubriques-publiees"
                className="rule-double pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink"
              >
                Rubriques déjà publiées
              </h2>
              <ul className="mt-5 space-y-4">
                {autres.map((c) => {
                  const n = articlesByCategory(c.slug).length;
                  return (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="group block border-b border-ink/10 pb-4"
                      >
                        <span className="font-display text-lg font-medium text-ink">
                          <span className="headline-link">{c.name}</span>
                        </span>
                        <span className="mt-1 block text-sm text-ink-soft">
                          {c.description}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.1em] text-rouge">
                          {n} article{n > 1 ? "s" : ""} →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </PageShell>
  );
}
