import type { Metadata } from "next";
import Link from "next/link";
import ArticleArt from "@/components/ArticleArt";
import PageShell from "@/components/PageShell";
import { comparatifsProgramme, guides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Comparatifs & guides d'achat",
  description:
    "Tous les comparatifs du Journal de la Tech : meilleurs logiciels SaaS, hébergeurs web, entreprises de panneaux solaires et outils d'IA. Tests indépendants, critères publics.",
  alternates: { canonical: "/comparatifs" },
};

export default function ComparatifsPage() {
  return (
    <PageShell
      kicker="Sélections & guides d'achat"
      title="Les comparatifs"
      intro="Des bancs d'essai indépendants, mis à jour et datés : aucune entreprise ne rémunère sa place dans nos classements, et nos critères sont publics."
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {guides.map((g, i) => (
          <article key={g.slug}>
            <Link href={`/comparatifs/${g.slug}`} className="group block">
              <figure className="relative aspect-[16/9] overflow-hidden bg-night">
                <ArticleArt
                  seed={g.seed}
                  tone={i % 2 === 0 ? "rouge" : "silver"}
                  className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.21,1)] group-hover:scale-[1.035]"
                />
              </figure>
              <h2 className="mt-5 font-display text-2xl font-semibold leading-snug text-ink">
                <span className="headline-link">{g.title}</span>
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{g.description}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                {g.count}
              </p>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-16 border border-ink/15 bg-card p-6">
        <h2 className="font-display text-xl font-semibold text-ink">
          Au programme de la rédaction
        </h2>
        <table className="mt-4 w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparatifs en cours de publication et leur dernière mise à jour
          </caption>
          <thead>
            <tr className="border-b-2 border-rouge font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              <th scope="col" className="py-2 pr-3">Comparatif</th>
              <th scope="col" className="hidden py-2 pr-3 md:table-cell">Univers</th>
              <th scope="col" className="py-2 pr-3">Volume</th>
              <th scope="col" className="py-2">Mise à jour</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {comparatifsProgramme.map((row) => (
              <tr key={row.comparatif}>
                <th scope="row" className="py-3 pr-3 font-medium text-ink">
                  {row.comparatif}
                </th>
                <td className="hidden py-3 pr-3 text-ink-soft md:table-cell">
                  {row.univers}
                </td>
                <td className="py-3 pr-3 text-ink-soft">{row.volume}</td>
                <td className="py-3 text-ink-soft">
                  <time dateTime={row.majIso}>{row.maj}</time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
