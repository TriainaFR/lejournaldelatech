import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { articlesSorted } from "@/lib/data";
import { EDITEUR, SITE_URL } from "@/lib/schema";

const DESCRIPTION =
  "Le Protocole JDLT est la méthodologie d'évaluation des outils d'IA du Journal de la Tech : benchmarks vérifiés, tests en français natif, coût réel calculé et grille de conformité RGPD.";

export const metadata: Metadata = {
  title: "Protocole JDLT : notre méthodologie d'évaluation des outils d'IA",
  description: DESCRIPTION,
  alternates: { canonical: "/protocole-jdlt" },
  openGraph: {
    type: "article",
    title: "Protocole JDLT — la méthodologie d'évaluation IA du Journal de la Tech",
    description: DESCRIPTION,
    url: `${SITE_URL}/protocole-jdlt`,
  },
};

const AXES: { titre: string; texte: string; controle: string }[] = [
  {
    titre: "Benchmarks publics vérifiés",
    texte:
      "Nous ne recopions pas les chiffres qui circulent : chaque score est rattaché à sa source, à sa date et au modèle exact évalué (version comprise). Un benchmark dont nous ne retrouvons pas la publication d'origine n'est pas cité.",
    controle: "Source, date et version du modèle indiquées pour chaque score",
  },
  {
    titre: "Tests en français natif",
    texte:
      "Cinquante prompts standardisés en français professionnel — rédaction B2B, résumé de contrat, reformulation juridique — soumis à chaque modèle dans les mêmes conditions. Notation sur la cohérence stylistique, la précision lexicale, l'absence de calques anglais et le respect des conventions typographiques françaises.",
    controle: "50 prompts identiques, notés à l'aveugle sur 4 critères",
  },
  {
    titre: "Coût réel calculé",
    texte:
      "Les grilles tarifaires ne disent pas ce que coûte un outil. Nous simulons un cas d'usage d'entreprise documenté (volume d'appels, tokens en entrée et en sortie) et publions le détail du calcul, tarifs datés à l'appui, pour que chacun puisse le refaire avec ses propres volumes.",
    controle: "Hypothèses publiées, calcul reproductible, tarifs datés",
  },
  {
    titre: "Grille de conformité RGPD",
    texte:
      "Pour chaque outil : existence d'un accord de traitement (DPA), résidence des données, politique d'entraînement sur les contenus clients, certifications détenues et alertes réglementaires en cours. Un outil peut être excellent techniquement et inutilisable pour une entreprise française.",
    controle: "DPA, résidence, entraînement, certifications, alertes",
  },
];

export default function ProtocoleJdltPage() {
  const applications = articlesSorted().filter(
    (a) => a.methodology?.name === "Protocole JDLT"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/protocole-jdlt#page`,
        url: `${SITE_URL}/protocole-jdlt`,
        name: "Protocole JDLT — méthodologie d'évaluation des outils d'IA",
        description: DESCRIPTION,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: EDITEUR,
        mainEntity: {
          "@type": "DefinedTerm",
          "@id": `${SITE_URL}/protocole-jdlt#terme`,
          name: "Protocole JDLT",
          description:
            "Cadre d'évaluation des outils d'intelligence artificielle du Journal de la Tech, en quatre axes : benchmarks vérifiés, tests en français natif, coût réel calculé et conformité RGPD.",
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Méthodologies éditoriales du Journal de la Tech",
            url: `${SITE_URL}/methodologie`,
          },
        },
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/protocole-jdlt#howto`,
        name: "Évaluer un outil d'IA selon le Protocole JDLT",
        description: DESCRIPTION,
        inLanguage: "fr-FR",
        step: AXES.map((a, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: a.titre,
          text: a.texte,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Méthodologie",
            item: `${SITE_URL}/methodologie`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Protocole JDLT",
            item: `${SITE_URL}/protocole-jdlt`,
          },
        ],
      },
    ],
  };

  return (
    <PageShell
      kicker="Méthodologie"
      title="Le Protocole JDLT"
      intro="Notre cadre d'évaluation des outils d'intelligence artificielle : quatre axes, appliqués à l'identique à chaque comparatif que nous publions."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-[760px]">
        <p className="leading-relaxed text-ink-soft">
          La plupart des comparatifs d&apos;IA reposent sur les mêmes scores
          publics, recopiés d&apos;un article à l&apos;autre. Nous avons voulu
          un cadre stable, nommé et réutilisable, qui produise des données que
          l&apos;on ne trouve nulle part ailleurs — et que nos lecteurs puissent
          contester chiffre par chiffre.
        </p>

        <ol className="mt-10 space-y-10">
          {AXES.map((a, i) => (
            <li key={a.titre} className="border-t-2 border-rouge pt-5">
              <p
                aria-hidden="true"
                className="font-mono text-sm font-semibold text-rouge"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                {a.titre}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{a.texte}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                Contrôle : {a.controle}
              </p>
            </li>
          ))}
        </ol>

        <section
          aria-labelledby="donnees-proprietaires"
          className="mt-14 border border-ink/15 bg-paper-deep/60 p-6"
        >
          <h2
            id="donnees-proprietaires"
            className="font-display text-xl font-semibold text-ink"
          >
            Deux séries de données produites par la rédaction
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Deux axes du protocole génèrent des données originales, mesurées par
            nos soins et republiées à chaque édition d&apos;un comparatif : le{" "}
            <strong className="font-semibold text-ink">
              test de fiabilité en français
            </strong>{" "}
            (50 prompts professionnels, taux de sorties exploitables sans
            correction) et la{" "}
            <strong className="font-semibold text-ink">
              simulation de coût réel
            </strong>{" "}
            (cas d&apos;usage PME documenté, calcul détaillé, tarifs datés).
            Elles sont signalées dans nos articles par un encadré dédié.
          </p>
        </section>

        {applications.length > 0 ? (
          <section aria-labelledby="applications" className="mt-14">
            <h2
              id="applications"
              className="font-display text-xl font-semibold text-ink"
            >
              Comparatifs évalués selon ce protocole
            </h2>
            <ul className="mt-4 space-y-3">
              {applications.map((a) => (
                <li key={a.slug} className="flex gap-3">
                  <span aria-hidden="true" className="font-mono text-rouge">
                    →
                  </span>
                  <Link
                    href={`/${a.category}/${a.slug}`}
                    className="font-semibold text-ink transition-colors hover:text-rouge"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-12 border-t border-ink/15 pt-6 leading-relaxed text-ink-soft">
          Une erreur de calcul, un chiffre contestable, une source à
          actualiser ?{" "}
          <Link
            href="/contact"
            className="font-semibold text-rouge hover:text-rouge-deep"
          >
            Écrivez-nous
          </Link>{" "}
          : les corrections sont publiées et datées, comme le prévoit notre{" "}
          <Link
            href="/charte-editoriale"
            className="font-semibold text-rouge hover:text-rouge-deep"
          >
            charte éditoriale
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
