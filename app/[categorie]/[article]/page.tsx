import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import EditorialPhoto from "@/components/EditorialPhoto";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { articleContent } from "@/lib/articleContent";
import {
  articleImage,
  articles,
  articlesByCategory,
  categoryBySlug,
} from "@/lib/data";

const SITE_URL = "https://lejournaldelatech.fr";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ categorie: a.category, article: a.slug }));
}

function findArticle(categorie: string, slug: string) {
  return articles.find((a) => a.slug === slug && a.category === categorie);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorie: string; article: string }>;
}): Promise<Metadata> {
  const { categorie, article } = await params;
  const a = findArticle(categorie, article);
  if (!a) return {};

  const url = `${SITE_URL}/${a.category}/${a.slug}`;
  const description = a.metaDescription ?? a.excerpt.slice(0, 155);
  const img = articleImage(a);

  return {
    title: a.metaTitle ?? a.title,
    description,
    alternates: { canonical: `/${a.category}/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description,
      url,
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      authors: [a.author],
      section: categoryBySlug(a.category).name,
      tags: a.topics,
      ...(img ? { images: [{ url: img.src, alt: img.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: a.metaTitle ?? a.title,
      description,
      ...(img ? { images: [img.src] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ categorie: string; article: string }>;
}) {
  const { categorie, article } = await params;
  const a = findArticle(categorie, article);
  if (!a) notFound();

  const content = articleContent(a.slug);
  if (!content) notFound();

  const cat = categoryBySlug(a.category);
  const img = articleImage(a);
  const url = `${SITE_URL}/${a.category}/${a.slug}`;
  const others = articlesByCategory(a.category).filter((x) => x.slug !== a.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: a.title,
        description: a.metaDescription ?? a.excerpt,
        inLanguage: "fr-FR",
        datePublished: a.date,
        dateModified: a.updated ?? a.date,
        wordCount: content.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean)
          .length,
        articleSection: cat.name,
        ...(a.topics ? { about: a.topics.map((t) => ({ "@type": "Thing", name: t })) } : {}),
        ...(img ? { image: [`${SITE_URL}${img.src}`] } : {}),
        author: {
          "@type": "Organization",
          name: "La rédaction du Journal de la Tech",
          url: `${SITE_URL}/a-propos`,
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntityOfPage: url,
        citation: content.sources.map((s) => ({
          "@type": "CreativeWork",
          name: s.label,
          url: s.url,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: content.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: cat.name,
            item: `${SITE_URL}/${cat.slug}`,
          },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
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

        <article>
          {/* ——— Chapeau ——— */}
          <header className="mx-auto w-full max-w-[760px] px-6 pt-10">
            <nav
              aria-label="Fil d'Ariane"
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint"
            >
              <Link href="/" className="transition-colors hover:text-rouge">
                Accueil
              </Link>
              <span aria-hidden="true"> / </span>
              <Link
                href={`/${cat.slug}`}
                className="transition-colors hover:text-rouge"
              >
                {cat.name}
              </Link>
            </nav>

            <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
              Comparatif — {cat.name}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-[2.6rem]">
              {a.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {a.excerpt}
            </p>
            <p className="mt-5 border-t border-ink/15 pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
              Par {a.author} ·{" "}
              <time dateTime={a.date}>Publié le {a.dateLabel}</time>
              {a.updated && a.updatedLabel ? (
                <>
                  {" · "}
                  <time dateTime={a.updated}>Mis à jour le {a.updatedLabel}</time>
                </>
              ) : null}{" "}
              · Lecture {a.readingTime} min
            </p>
          </header>

          {/* ——— Image d'ouverture ——— */}
          <figure className="mx-auto mt-8 w-full max-w-[1000px] px-6">
            <div className="relative aspect-[16/9] overflow-hidden bg-night">
              <EditorialPhoto
                image={img}
                seed={a.seed}
                tone={cat.tone}
                glyph={cat.short.charAt(0)}
                sizes="(min-width: 1000px) 950px, 100vw"
                priority
              />
            </div>
            {img ? (
              <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                {img.alt} · Photo Unsplash
              </figcaption>
            ) : null}
          </figure>

          {/* ——— Sommaire ——— */}
          {content.toc.length > 2 ? (
            <nav
              aria-labelledby="sommaire"
              className="mx-auto mt-12 w-full max-w-[760px] px-6"
            >
              <div className="border border-ink/15 bg-paper-deep/60 p-6">
                <h2
                  id="sommaire"
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rouge"
                >
                  Au sommaire
                </h2>
                <ol className="mt-4 space-y-2 text-sm">
                  {content.toc.map((t, i) => (
                    <li key={t.id} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-silver-deep"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${t.id}`}
                        className="text-ink-soft transition-colors hover:text-rouge"
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          ) : null}

          {/* ——— Corps ——— */}
          <div
            className="article-body mx-auto mt-12 w-full max-w-[760px] px-6"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />

          {/* ——— Bloc auteur / méthode ——— */}
          <aside className="mx-auto mt-14 w-full max-w-[760px] px-6">
            <div className="border-t-2 border-rouge bg-paper-deep/60 p-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rouge">
                Comment nous travaillons
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Cet article a été rédigé par la rédaction du Journal de la Tech.
                Nos critères sont publics, nos sources citées et nos chiffres
                datés : aucune entreprise ne rémunère sa place dans nos
                classements.
              </p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
                <Link href="/methodologie" className="text-rouge hover:text-rouge-deep">
                  Notre méthodologie →
                </Link>
                <Link href="/charte-editoriale" className="text-rouge hover:text-rouge-deep">
                  Charte éditoriale →
                </Link>
                <Link href="/contact" className="text-rouge hover:text-rouge-deep">
                  Signaler une erreur →
                </Link>
              </p>
            </div>
          </aside>

          {/* ——— Suite de la rubrique ——— */}
          {others.length > 0 ? (
            <section
              aria-labelledby="a-lire-aussi"
              className="mx-auto mt-14 w-full max-w-[1240px] px-6"
            >
              <h2
                id="a-lire-aussi"
                className="font-display text-2xl font-semibold text-ink"
              >
                À lire aussi en {cat.name.toLowerCase()}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {others.slice(0, 3).map((o) => (
                  <ArticleCard key={o.slug} article={o} />
                ))}
              </div>
            </section>
          ) : (
            <section className="mx-auto mt-14 w-full max-w-[760px] px-6 text-center">
              <Link
                href={`/${cat.slug}`}
                className="inline-block border border-ink/25 bg-card px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
              >
                Toute la rubrique {cat.name}
              </Link>
            </section>
          )}

          <div className="h-16" />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
