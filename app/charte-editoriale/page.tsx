import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Charte éditoriale",
  description:
    "La charte éditoriale du Journal de la Tech : indépendance, transparence des sources, distinction stricte entre contenu éditorial et publicité, corrections publiques.",
  alternates: { canonical: "/charte-editoriale" },
};

const RULES: { title: string; text: string }[] = [
  {
    title: "Indépendance éditoriale",
    text: "Les choix de sujets, les tests et les classements relèvent de la seule rédaction. Aucun annonceur, éditeur ou constructeur n'intervient dans nos contenus.",
  },
  {
    title: "Transparence des sources",
    text: "Nos affirmations sont sourcées : données publiques, mesures effectuées par la rédaction, entretiens. Les estimations sont présentées comme telles.",
  },
  {
    title: "Publicité signalée",
    text: "Tout contenu sponsorisé est clairement identifié. Les liens d'affiliation, lorsqu'ils existent, sont signalés et n'influencent ni les notes ni l'ordre des classements.",
  },
  {
    title: "Droit à la correction",
    text: "Une erreur signalée est vérifiée puis corrigée publiquement, avec mention de la modification et de sa date.",
  },
  {
    title: "IA : un outil, pas un auteur",
    text: "Nos contenus sont écrits et validés par la rédaction. Lorsque des outils d'IA assistent la production (recherche, mise en forme), la responsabilité éditoriale reste humaine.",
  },
];

export default function CharteEditorialePage() {
  return (
    <PageShell
      kicker="Le Journal"
      title="Charte éditoriale"
      intro="Cinq engagements, applicables à chaque article et chaque comparatif publié par la rédaction."
    >
      <div className="mx-auto max-w-[720px]">
        <ol className="space-y-8">
          {RULES.map((r, i) => (
            <li key={r.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="font-mono text-2xl font-semibold leading-none text-rouge"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {r.title}
                </h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </PageShell>
  );
}
