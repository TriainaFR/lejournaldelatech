import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import PageShell from "@/components/PageShell";
import {
  articlesByCategory,
  categories,
  type CategorySlug,
} from "@/lib/data";

export const dynamicParams = false;

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${cat.name} — Le Journal de la Tech`,
        description: cat.description,
        url: `https://lejournaldelatech.fr/${cat.slug}`,
        inLanguage: "fr-FR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://lejournaldelatech.fr/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: cat.name,
            item: `https://lejournaldelatech.fr/${cat.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <PageShell kicker="Univers" title={cat.name} intro={cat.description}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <p className="text-center text-ink-soft">
          Les premiers articles de cette rubrique arrivent très bientôt.
        </p>
      )}
    </PageShell>
  );
}
