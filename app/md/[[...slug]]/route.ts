import { articleContent } from "@/lib/articleContent";
import { authorBySlug } from "@/lib/authors";
import {
  articles,
  articlesByCategory,
  articlesSorted,
  categories,
  categoryBySlug,
  type CategorySlug,
} from "@/lib/data";
import { resolveInternalLinks } from "@/lib/internalLinks";
import { htmlToMarkdown } from "@/lib/markdown";

/**
 * Version Markdown du site, servie aux agents.
 *
 * Cette route n'est pas destinée aux lecteurs : elle est atteinte par
 * réécriture depuis `proxy.ts` quand une requête demande
 * `Accept: text/markdown`. Elle reste accessible en direct sous `/md/...`,
 * mais en `noindex` — c'est une représentation alternative des pages, pas un
 * contenu supplémentaire à faire explorer.
 */

const BASE = "https://lejournaldelatech.fr";

function reponse(markdown: string): Response {
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

/** Article complet : chapô, signature, corps, méthodologie et sources. */
function articleMarkdown(slug: string, categorie: string): string | undefined {
  const a = articles.find((x) => x.slug === slug && x.category === categorie);
  if (!a) return undefined;
  const contenu = articleContent(a.slug);
  if (!contenu) return undefined;

  const auteur = authorBySlug(a.author);
  const cat = categoryBySlug(a.category);
  const url = `${BASE}/${a.category}/${a.slug}`;

  const parts = [
    `# ${a.title}`,
    "",
    `${a.kind ?? "Comparatif"} · ${cat.name} · ${a.dateLabel}`,
    `Par ${auteur.name}, ${auteur.role}`,
    `Source : ${url}`,
    "",
    `> ${a.excerpt}`,
    "",
    "---",
    "",
    htmlToMarkdown(resolveInternalLinks(contenu.html)),
  ];

  if (a.methodology) {
    parts.push(
      "",
      "---",
      "",
      `Méthode appliquée : ${a.methodology.name} — ${BASE}${a.methodology.href}`,
    );
  }

  if (a.datasets?.length) {
    parts.push("", "## Données produites par la rédaction", "");
    a.datasets.forEach((d) => {
      parts.push(`### ${d.name}`, "", d.description, "", `Période : ${d.date}`, "");
    });
  }

  parts.push(
    "",
    "---",
    "",
    `Citation : « ${a.title} », Le Journal de la Tech, ${a.dateLabel}. ${url}`,
  );

  return parts.join("\n");
}

/** Index d'une rubrique. */
function rubriqueMarkdown(slug: CategorySlug): string {
  const cat = categoryBySlug(slug);
  const items = articlesByCategory(slug);
  const parts = [`# ${cat.name}`, "", cat.description, "", `Source : ${BASE}/${slug}`, ""];

  if (!items.length) {
    parts.push("Aucun article publié dans cette rubrique à ce jour.");
    return parts.join("\n");
  }

  parts.push("---", "");
  items.forEach((a) => {
    parts.push(
      `## ${a.title}`,
      "",
      `${a.kind ?? "Comparatif"} · ${a.dateLabel} · ${a.readingTime} min`,
      "",
      a.excerpt,
      "",
      `${BASE}/${a.category}/${a.slug}`,
      "",
    );
  });
  return parts.join("\n");
}

/** Sommaire du site, servi pour l'accueil et les chemins sans équivalent. */
function sommaireMarkdown(): string {
  const publies = articlesSorted();
  const parts = [
    "# Le Journal de la Tech",
    "",
    "Média français consacré à la tech utile : SaaS et logiciels d'entreprise,",
    "intelligence artificielle, hébergement web, mobilité, énergie et green tech.",
    "",
    `Source : ${BASE}`,
    `Méthode d'évaluation : ${BASE}/protocole-jdlt`,
    "",
    "---",
    "",
    `## Articles publiés (${publies.length})`,
    "",
  ];
  publies.forEach((a) => {
    parts.push(
      `- **${a.title}** — ${a.kind ?? "Comparatif"}, ${a.dateLabel}`,
      `  ${a.excerpt}`,
      `  ${BASE}/${a.category}/${a.slug}`,
      "",
    );
  });

  const alimentees = categories.filter((c) => articlesByCategory(c.slug).length > 0);
  parts.push("## Rubriques", "");
  alimentees.forEach((c) => {
    parts.push(`- **${c.name}** — ${c.description} · ${BASE}/${c.slug}`);
  });

  return parts.join("\n");
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { slug: [] },
    ...categories.map((c) => ({ slug: [c.slug] })),
    ...articles.map((a) => ({ slug: [a.category, a.slug] })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<Response> {
  const { slug = [] } = await params;

  if (slug.length === 2) {
    const md = articleMarkdown(slug[1], slug[0]);
    if (md) return reponse(md);
  }

  if (slug.length === 1 && categories.some((c) => c.slug === slug[0])) {
    return reponse(rubriqueMarkdown(slug[0] as CategorySlug));
  }

  // Accueil, pages institutionnelles et chemins inconnus : on renvoie le
  // sommaire plutôt qu'une erreur, pour qu'un agent trouve toujours de quoi
  // s'orienter.
  return reponse(sommaireMarkdown());
}
