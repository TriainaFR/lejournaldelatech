import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleArt from "@/components/ArticleArt";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { articles, categoryBySlug } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ categorie: a.category, article: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string; article: string }>;
}): Promise<Metadata> {
  const { categorie, article } = await params;
  const a = articles.find(
    (x) => x.slug === article && x.category === categorie
  );
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt.slice(0, 155),
    alternates: { canonical: `/${a.category}/${a.slug}` },
    // Contenu de démonstration : on désindexe jusqu'à publication réelle.
    robots: { index: false, follow: true },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ categorie: string; article: string }>;
}) {
  const { categorie, article } = await params;
  const a = articles.find(
    (x) => x.slug === article && x.category === categorie
  );
  if (!a) notFound();
  const cat = categoryBySlug(a.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.title,
        description: a.excerpt,
        inLanguage: "fr-FR",
        datePublished: a.date,
        dateModified: a.date,
        author: { "@type": "Organization", name: "Rédaction Le Journal de la Tech" },
        publisher: { "@id": "https://lejournaldelatech.fr/#organization" },
        articleSection: cat.name,
        mainEntityOfPage: `https://lejournaldelatech.fr/${a.category}/${a.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lejournaldelatech.fr/" },
          { "@type": "ListItem", position: 2, name: cat.name, item: `https://lejournaldelatech.fr/${cat.slug}` },
          { "@type": "ListItem", position: 3, name: a.title, item: `https://lejournaldelatech.fr/${a.category}/${a.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <article className="mx-auto w-full max-w-[880px] px-6 py-12">
          <nav aria-label="Fil d'Ariane" className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            <Link href="/" className="hover:text-rouge">Accueil</Link>
            <span aria-hidden="true"> / </span>
            <Link href={`/${cat.slug}`} className="hover:text-rouge">{cat.name}</Link>
          </nav>
          <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
            {cat.name}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl">
            {a.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{a.excerpt}</p>
          <p className="mt-4 border-b border-ink/15 pb-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            Par {a.author} · <time dateTime={a.date}>{a.dateLabel}</time> ·
            Lecture {a.readingTime} min
          </p>
          <figure className="relative mt-8 aspect-[16/9] overflow-hidden bg-night">
            <ArticleArt
              seed={a.seed}
              tone={cat.tone}
              glyph={cat.short.charAt(0)}
              className="absolute inset-0 h-full w-full"
            />
            <figcaption className="sr-only">Illustration — {cat.name}</figcaption>
          </figure>
          <div className="mt-8 border border-ink/15 bg-paper-deep/60 p-6 text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
              Article en préparation
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              La version intégrale de cet article est en cours de rédaction et
              sera publiée très prochainement. Abonnez-vous à{" "}
              <Link href="/#newsletter" className="font-semibold text-rouge hover:text-rouge-deep">
                La Dépêche Tech
              </Link>{" "}
              pour être averti de sa parution.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
