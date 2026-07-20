import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Méthodologie des tests",
  description:
    "Comment le Journal de la Tech teste et classe logiciels SaaS, hébergeurs, outils IA et installateurs solaires : critères publics, pondération expliquée, tests recoupés.",
  alternates: { canonical: "/methodologie" },
};

const PILLARS: { title: string; text: string }[] = [
  {
    title: "Critères publics",
    text: "Chaque comparatif ouvre sur la liste complète des critères évalués et leur pondération. Si un critère change entre deux éditions, nous l'indiquons.",
  },
  {
    title: "Tests en conditions réelles",
    text: "Les logiciels sont utilisés plusieurs semaines sur des cas d'usage concrets ; les hébergeurs sont mesurés sur des sites réels (performances, disponibilité, support).",
  },
  {
    title: "Prix réels constatés",
    text: "Nous publions les prix effectivement constatés (abonnements, options, coûts cachés), pas les prix d'appel des grilles marketing.",
  },
  {
    title: "Mises à jour datées",
    text: "Chaque classement affiche sa date de dernière révision. Un comparatif non révisé depuis plus de six mois est signalé.",
  },
  {
    title: "Zéro place payée",
    text: "Aucune entreprise ne peut acheter sa position. Les liens sponsorisés, lorsqu'ils existent, sont signalés et exclus des classements.",
  },
];

export default function MethodologiePage() {
  return (
    <PageShell
      kicker="Le Journal"
      title="Méthodologie des tests"
      intro="La crédibilité d'un comparatif tient à sa méthode. Voici la nôtre, appliquée à chaque banc d'essai publié."
    >
      <div className="mx-auto max-w-[720px]">
        <ol className="space-y-8">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="font-mono text-2xl font-semibold leading-none text-rouge"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
