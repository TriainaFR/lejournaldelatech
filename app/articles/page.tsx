import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import ArticleSearch, { type SearchEntry } from "@/components/ArticleSearch";
import PageShell from "@/components/PageShell";
import {
  activeCategories,
  articlesSorted,
  categoryBySlug,
  type Article,
} from "@/lib/data";

/** Texte indexé pour la recherche : titre, chapô, rubrique, sujets, auteur. */
function haystack(a: Article): string {
  return [
    a.title,
    a.excerpt,
    a.kind ?? "Comparatif",
    categoryBySlug(a.category).name,
    ...(a.topics ?? []),
  ]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

const SITE_URL = "https://lejournaldelatech.fr";

const DESCRIPTION =
  "Toutes les publications du Journal de la Tech : comparatifs chiffrés, guides et enquêtes sur les logiciels SaaS, l'intelligence artificielle, l'hébergement web et la tech durable.";

export const metadata: Metadata = {
  title: "Tous les articles",
  description: DESCRIPTION,
  alternates: { canonical: "/articles" },
  openGraph: {
    type: "website",
    title: "Tous les articles — Le Journal de la Tech",
    description: DESCRIPTION,
    url: `${SITE_URL}/articles`,
  },
};

export default function ArticlesPage() {
  const items = articlesSorted();
  const rubriques = activeCategories();
  const index: SearchEntry[] = items.map((a) => ({
    slug: a.slug,
    haystack: haystack(a),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/articles#page`,
        url: `${SITE_URL}/articles`,
        name: "Tous les articles — Le Journal de la Tech",
        description: DESCRIPTION,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: items.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/${a.category}/${a.slug}`,
            name: a.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tous les articles",
            item: `${SITE_URL}/articles`,
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      kicker="Le fil du journal"
      title="Tous les articles"
      intro={`${items.length} publications, de la plus récente à la plus ancienne.`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <nav
        aria-label="Parcourir par rubrique"
        className="mb-8 flex flex-wrap justify-center gap-2"
      >
        {rubriques.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="border border-ink/20 bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <ArticleSearch index={index}>
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </ArticleSearch>
    </PageShell>
  );
}
