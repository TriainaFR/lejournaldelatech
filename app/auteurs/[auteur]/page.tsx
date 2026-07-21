import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import PageShell from "@/components/PageShell";
import { authors, type AuthorSlug } from "@/lib/authors";
import { articlesSorted } from "@/lib/data";

const SITE_URL = "https://lejournaldelatech.fr";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(authors).map((auteur) => ({ auteur }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ auteur: string }>;
}): Promise<Metadata> {
  const { auteur } = await params;
  const author = authors[auteur as AuthorSlug];
  if (!author) return {};
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio.slice(0, 155),
    alternates: { canonical: `/auteurs/${author.slug}` },
    openGraph: {
      type: "profile",
      title: `${author.name} — Le Journal de la Tech`,
      description: author.bio.slice(0, 155),
      url: `${SITE_URL}/auteurs/${author.slug}`,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ auteur: string }>;
}) {
  const { auteur } = await params;
  const author = authors[auteur as AuthorSlug];
  if (!author) notFound();

  const signed = articlesSorted().filter((a) => a.author === author.slug);
  const url = `${SITE_URL}/auteurs/${author.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: `${author.name} — ${author.role}`,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#${author.slug}` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#${author.slug}`,
        name: author.name,
        url,
        jobTitle: author.role,
        description: author.bio,
        knowsAbout: author.expertise,
        sameAs: author.sameAs,
        worksFor: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: author.name, item: url },
        ],
      },
    ],
  };

  return (
    <PageShell kicker="La rédaction" title={author.name} intro={author.role}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-[760px]">
        <p className="text-lg leading-relaxed text-ink-soft">{author.bio}</p>

        <h2 className="mt-10 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rouge">
          Domaines d&apos;expertise
        </h2>
        <p className="mt-3 flex flex-wrap gap-2">
          {author.expertise.map((e) => (
            <span
              key={e}
              className="border border-ink/20 bg-card px-3 py-1 font-mono text-[11px] text-ink-soft"
            >
              {e}
            </span>
          ))}
        </p>

        <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
          {author.sameAs.map((u) => (
            <a
              key={u}
              href={u}
              rel="noopener noreferrer me"
              target="_blank"
              className="text-rouge hover:text-rouge-deep"
            >
              LinkedIn →
            </a>
          ))}
          <Link href="/protocole-jdlt" className="text-rouge hover:text-rouge-deep">
            Le Protocole JDLT →
          </Link>
          <Link href="/contact" className="text-rouge hover:text-rouge-deep">
            Le contacter →
          </Link>
        </p>
      </div>

      {signed.length > 0 ? (
        <section aria-labelledby="ses-articles" className="mt-16">
          <h2
            id="ses-articles"
            className="mb-8 font-display text-2xl font-semibold text-ink"
          >
            Ses publications
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {signed.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
