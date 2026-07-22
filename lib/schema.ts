/**
 * Briques de balisage partagées entre les pages.
 *
 * ⚠️ RÈGLE — ne jamais référencer l'organisation par `{ "@id": … }` seul.
 *
 * Le nœud complet `NewsMediaOrganization` vit dans le graphe du layout, donc
 * dans une AUTRE balise <script> que celui des pages. Les validateurs de Google
 * ne résolvent pas ces renvois d'un script à l'autre : une référence nue lève
 * « Type d'objet non valide pour le champ creator » (constaté en Search
 * Console le 22/07/2026 sur les 8 `Dataset` du site).
 *
 * Utiliser `EDITEUR` partout où une propriété validée par Google attend une
 * organisation : `creator` (Dataset), `author` (Review), `publisher`
 * (Article, WebPage). Le `@id` y est conservé, donc les deux nœuds fusionnent
 * et l'entité reste unique.
 *
 * Les renvois internes à un même graphe (`isPartOf`, `hasPart`, `mainEntity`
 * vers un nœud défini dans le même script) peuvent rester des `@id` nus.
 */

export const SITE_URL = "https://lejournaldelatech.fr";
export const SITE_NAME = "Le Journal de la Tech";

/** Organisation éditrice, en objet typé et non en simple renvoi. */
export const EDITEUR = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
};

/**
 * Conditions de réutilisation. Google exige `license` sur les `Dataset` ; on
 * pointe vers les mentions légales, qui portent les conditions réelles.
 */
export const LICENCE = `${SITE_URL}/mentions-legales`;
