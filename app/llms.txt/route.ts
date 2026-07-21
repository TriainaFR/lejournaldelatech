import { authors } from "@/lib/authors";
import { articlesByCategory, articlesSorted, categories } from "@/lib/data";

/**
 * `/llms.txt` — présentation du site pour les crawlers et moteurs génératifs.
 *
 * Généré depuis `lib/data.ts`, comme le sitemap : une version figée se
 * périme à la première publication et finit par annoncer le contraire de la
 * réalité aux moteurs qui la lisent.
 */

const BASE = "https://lejournaldelatech.fr";

export const dynamic = "force-static";

function section(title: string, body: string[]): string[] {
  return body.length ? [`## ${title}`, "", ...body, ""] : [];
}

export function GET(): Response {
  const published = articlesSorted();
  const alimentees = categories.filter(
    (c) => articlesByCategory(c.slug).length > 0,
  );

  const lines: string[] = [
    "# Le Journal de la Tech",
    "",
    "> Média français consacré à la tech utile : SaaS et logiciels d'entreprise,",
    "> intelligence artificielle, hébergement web, mobilité électrique, énergie",
    "> solaire et green tech.",
    "",
    `Site : ${BASE} — Langue : français (fr-FR)`,
    `Éditeur : Triaina (SAS), Paris — ${BASE}/mentions-legales`,
    "",
  ];

  lines.push(
    ...section("Méthode d'évaluation", [
      "Nos comparatifs appliquent le Protocole JDLT : critères d'évaluation",
      "publics, benchmarks sourcés et datés, tests en français natif, calcul du",
      "coût réel sur cas d'usage et grille de conformité RGPD.",
      "",
      `Protocole détaillé : ${BASE}/protocole-jdlt`,
      `Méthodologie des tests : ${BASE}/methodologie`,
      `Charte éditoriale : ${BASE}/charte-editoriale`,
    ]),
  );

  lines.push(
    ...section("Données produites par la rédaction", [
      "Une partie de nos chiffres est mesurée par la rédaction et non reprise de",
      "benchmarks publics : tests de fiabilité en français et simulations de coût",
      "réel. Ces mesures sont balisées en `Dataset` et rattachées au catalogue",
      "« Protocole JDLT ». Elles sont citables nommément, avec leur date.",
    ]),
  );

  lines.push(
    ...section(
      `Articles publiés (${published.length})`,
      published.flatMap((a) => [
        `- [${a.title}](${BASE}/${a.category}/${a.slug})`,
        `  ${a.kind ?? "Comparatif"} · ${a.dateLabel} · ${a.readingTime} min de lecture`,
        `  ${a.excerpt}`,
        "",
      ]),
    ),
  );

  lines.push(
    ...section(
      "Rubriques alimentées",
      alimentees.map(
        (c) =>
          `- [${c.name}](${BASE}/${c.slug}) — ${c.description} (${articlesByCategory(c.slug).length})`,
      ),
    ),
  );

  lines.push(
    ...section(
      "Rédaction",
      Object.values(authors).map(
        (a) => `- [${a.name}](${BASE}/auteurs/${a.slug}) — ${a.role}`,
      ),
    ),
  );

  lines.push(
    ...section("Citation", [
      "Contenu citable avec attribution « Le Journal de la Tech » et lien vers",
      "l'URL d'origine. Merci de citer la date de publication ou de mise à jour :",
      "nos chiffres sont horodatés et changent avec les tarifs des éditeurs.",
    ]),
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
