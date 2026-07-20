import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { intentTiles } from "@/lib/data";

export const dynamicParams = false;

function slugOf(href: string) {
  return href.replace("/guides/", "");
}

export function generateStaticParams() {
  return intentTiles.map((t) => ({ slug: slugOf(t.href) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tile = intentTiles.find((t) => slugOf(t.href) === slug);
  if (!tile) return {};
  return {
    title: `${tile.title} : le guide`,
    description: `${tile.title} : les solutions comparées par la rédaction (${tile.keywords
      .map((k) => k.label.toLowerCase())
      .join(", ")}), avec critères publics et prix constatés.`,
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuideIntentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tile = intentTiles.find((t) => slugOf(t.href) === slug);
  if (!tile) notFound();

  return (
    <PageShell
      kicker="Que choisir pour…"
      title={tile.title}
      intro="Ce guide pratique rassemble nos comparatifs, tests et conseils pour mener ce projet de bout en bout."
    >
      <div className="mx-auto max-w-[720px]">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Par où commencer
        </h2>
        <ul className="mt-4 space-y-3">
          {tile.keywords.map((k) => (
            <li key={k.label} className="flex gap-3 leading-relaxed">
              <span aria-hidden="true" className="mt-0.5 font-mono font-bold text-rouge">→</span>
              <Link
                href={k.href}
                className="font-semibold text-ink transition-colors hover:text-rouge"
              >
                {k.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 border border-ink/15 bg-paper-deep/60 p-6 text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
            Guide en préparation
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            La version complète de ce guide (étapes, budgets, pièges à éviter)
            est en cours de rédaction. En attendant, explorez les{" "}
            <Link href="/comparatifs" className="font-semibold text-rouge hover:text-rouge-deep">
              comparatifs de la rédaction
            </Link>
            .
          </p>
        </div>
      </div>
    </PageShell>
  );
}
