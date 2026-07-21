import { articles } from "./data";

/**
 * Maillage interne différé.
 *
 * Les articles peuvent viser des pages piliers pas encore publiées via le
 * marqueur `[[lien:<slug>|texte]]`. Tant que la cible n'existe pas, le marqueur
 * rend du texte simple — jamais de lien mort. Dès qu'un article portant ce slug
 * est ajouté à `lib/data.ts`, le lien s'active partout, tout seul.
 */

/** Piliers planifiés : sert à documenter le maillage et à contrôler l'orthographe des slugs. */
export const plannedPillars: { slug: string; label: string }[] = [
  { slug: "meilleur-outil-ia-2026", label: "Meilleur outil IA 2026" },
  { slug: "alternative-chatgpt", label: "Alternative à ChatGPT" },
  { slug: "meilleur-vps-2026", label: "Meilleur VPS 2026" },
  { slug: "meilleur-hebergeur-web-2026", label: "Meilleur hébergeur web 2026" },
  {
    slug: "meilleur-logiciel-gestion-projet",
    label: "Meilleur logiciel de gestion de projet",
  },
];

export function pillarHref(slug: string): string | undefined {
  const target = articles.find((a) => a.slug === slug);
  return target ? `/${target.category}/${target.slug}` : undefined;
}

const MARKER = /\[\[lien:([a-z0-9-]+)\|([^\]]+)\]\]/g;

/** Remplace les marqueurs par un lien si la cible existe, sinon par son texte. */
export function resolveInternalLinks(html: string): string {
  return html.replace(MARKER, (_m, slug: string, text: string) => {
    const href = pillarHref(slug);
    return href ? `<a href="${href}">${text}</a>` : text;
  });
}

/** Cibles encore manquantes — utile pour piloter le calendrier éditorial. */
export function pendingPillars(): { slug: string; label: string }[] {
  return plannedPillars.filter((p) => !pillarHref(p.slug));
}
