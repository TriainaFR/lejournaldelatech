import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { guides } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

const METHODO = [
  "Critères publics, pondération expliquée en tête de classement",
  "Tests en conditions réelles, recoupés sur plusieurs semaines",
  "Prix réels constatés, mis à jour à chaque révision",
  "Aucune place payée : la publicité est signalée, jamais mélangée aux classements",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  return {
    title: g.title,
    description: `${g.description} ${g.count}, critères publics et mises à jour datées.`,
    alternates: { canonical: `/comparatifs/${g.slug}` },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lejournaldelatech.fr/" },
      { "@type": "ListItem", position: 2, name: "Comparatifs", item: "https://lejournaldelatech.fr/comparatifs" },
      { "@type": "ListItem", position: 3, name: g.title, item: `https://lejournaldelatech.fr/comparatifs/${g.slug}` },
    ],
  };

  return (
    <PageShell kicker="Guide d'achat" title={g.title} intro={g.description}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-[720px]">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
          {g.count}
        </p>
        <h2 className="mt-6 font-display text-2xl font-semibold text-ink">
          Notre méthodologie
        </h2>
        <ul className="mt-4 space-y-3">
          {METHODO.map((m) => (
            <li key={m} className="flex gap-3 leading-relaxed text-ink-soft">
              <span aria-hidden="true" className="mt-0.5 font-mono font-bold text-rouge">→</span>
              {m}
            </li>
          ))}
        </ul>
        <div className="mt-10 border border-ink/15 bg-paper-deep/60 p-6 text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
            Classement en préparation
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Le premier classement complet est en cours de finalisation par la
            rédaction. Abonnez-vous à{" "}
            <Link href="/#newsletter" className="font-semibold text-rouge hover:text-rouge-deep">
              La Dépêche Tech
            </Link>{" "}
            pour le recevoir en avant-première, ou consultez la{" "}
            <Link href="/methodologie" className="font-semibold text-rouge hover:text-rouge-deep">
              méthodologie détaillée
            </Link>
            .
          </p>
        </div>
      </div>
    </PageShell>
  );
}
