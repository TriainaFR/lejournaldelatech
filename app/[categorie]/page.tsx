import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import PageShell from "@/components/PageShell";
import {
  activeCategories,
  articlesByCategory,
  type CategorySlug,
} from "@/lib/data";

const SITE_URL = "https://lejournaldelatech.fr";

export const dynamicParams = false;

/** Seules les rubriques qui ont au moins un article existent. */
export function generateStaticParams() {
  return activeCategories().map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string }>;
}): Promise<Metadata> {
  const { categorie } = await params;
  const cat = activeCategories().find((c) => c.slug === categorie);
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
  const cat = activeCategories().find((c) => c.slug === categorie);
  if (!cat) notFound();

  const items = articlesByCategory(categorie as CategorySlug);

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
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </PageShell>
  );
}
