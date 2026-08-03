import { statSync } from "node:fs";
import { join } from "node:path";
import { authorBySlug } from "@/lib/authors";
import {
  articleImage,
  articlesSorted,
  categoryBySlug,
} from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/schema";

/**
 * `/rss.xml` — fil de syndication du journal.
 *
 * Généré depuis `lib/data.ts`, comme le sitemap et `llms.txt` : un fil figé
 * se périme à la première publication.
 *
 * Le fil diffuse le chapô, pas le corps de l'article. Un `content:encoded`
 * complet dispenserait de venir sur le site, ce qui va contre le modèle
 * économique du journal — et prive les articles des liens internes, du
 * balisage et des mentions de transparence qui les accompagnent.
 */

const SITE_DESCRIPTION =
  "Comparatifs indépendants et guides d'achat : logiciels SaaS, outils IA, hébergeurs web, panneaux solaires et mobilité. Le média français de la tech utile.";

export const dynamic = "force-static";

/**
 * Échappement XML, valable aussi bien en nœud texte qu'en valeur d'attribut.
 *
 * Apostrophe et guillemet passent par une référence numérique plutôt que par
 * `&apos;` / `&quot;` : `&apos;` n'existe pas en HTML 4, et plusieurs lecteurs
 * de flux repassent les titres dans un analyseur HTML. Sur un fil français,
 * où l'apostrophe est partout, la référence numérique évite le rendu littéral.
 */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&#34;")
    .replace(/'/g, "&#39;");
}

/**
 * RFC 822, exigé par la spécification RSS. Midi UTC : la date reste la bonne
 * sous tous les fuseaux, sans dépendre de l'heure d'été.
 */
function rfc822(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toUTCString();
}

/**
 * Poids réel de la vignette, en octets.
 *
 * `length` est un attribut obligatoire d'`enclosure`, et un `0` de complaisance
 * est signalé par les validateurs. La lecture disque est possible ici parce que
 * la route est `force-static` : elle s'exécute au build, en Node, jamais à la
 * requête. Fichier introuvable — image supprimée mais `imageAlt` conservé —
 * renvoie `null`, et l'`enclosure` est alors omise plutôt que fausse.
 */
function poidsFichier(src: string): number | null {
  try {
    return statSync(join(process.cwd(), "public", src)).size;
  } catch {
    return null;
  }
}

export function GET(): Response {
  const published = articlesSorted();

  /**
   * Date de dernière modification du fil : celle de l'article le plus récent
   * plutôt que l'heure de build, qui changerait à chaque déploiement même
   * sans nouvelle publication et ferait resignaler le fil pour rien.
   */
  const derniere = published[0];
  const lastBuild = derniere
    ? rfc822(derniere.updated ?? derniere.date)
    : rfc822("2026-07-01");

  const items = published.map((a) => {
    const url = `${SITE_URL}/${a.category}/${a.slug}`;
    const cat = categoryBySlug(a.category);
    const auteur = authorBySlug(a.author);
    const img = articleImage(a);
    const poids = img ? poidsFichier(img.src) : null;

    return [
      "    <item>",
      `      <title>${esc(a.title)}</title>`,
      `      <link>${esc(url)}</link>`,
      `      <guid isPermaLink="true">${esc(url)}</guid>`,
      `      <description>${esc(a.excerpt)}</description>`,
      `      <dc:creator>${esc(auteur.name)}</dc:creator>`,
      `      <category>${esc(cat.name)}</category>`,
      `      <pubDate>${rfc822(a.date)}</pubDate>`,
      /* Vignette des lecteurs de flux : omise si l'image ou son poids manque. */
      img && poids !== null
        ? `      <enclosure url="${esc(`${SITE_URL}${img.src}`)}" type="image/jpeg" length="${poids}" />`
        : null,
      "    </item>",
    ]
      .filter(Boolean)
      .join("\n");
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${esc(SITE_NAME)}</title>`,
    `    <link>${SITE_URL}</link>`,
    `    <description>${esc(SITE_DESCRIPTION)}</description>`,
    "    <language>fr-FR</language>",
    `    <copyright>© ${new Date(lastBuild).getUTCFullYear()} Triaina — tous droits réservés</copyright>`,
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    "    <ttl>60</ttl>",
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    "    <image>",
    `      <url>${SITE_URL}/images/cat-intelligence-artificielle.jpg</url>`,
    `      <title>${esc(SITE_NAME)}</title>`,
    `      <link>${SITE_URL}</link>`,
    "    </image>",
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
