import type { MetadataRoute } from "next";
import { authors } from "@/lib/authors";
import { articlesByCategory, articlesSorted, categories } from "@/lib/data";

const BASE = "https://lejournaldelatech.fr";

/**
 * `lastmod` doit refléter une vraie modification du contenu.
 *
 * Le dater sur l'heure du build ferait « bouger » toutes les pages à chaque
 * déploiement : Google constate que la date ment et finit par ignorer le champ
 * pour l'ensemble du site. On le déduit donc des articles, et on l'omet quand
 * aucun signal fiable n'existe — une absence vaut mieux qu'une date fausse.
 */
function lastmod(list: { date: string; updated?: string }[]): Date | undefined {
  const stamps = list.map((a) => new Date(a.updated ?? a.date).getTime());
  return stamps.length ? new Date(Math.max(...stamps)) : undefined;
}

/**
 * Seules les pages réellement publiées sont listées.
 *
 * Le sitemap n'annonce que ce qui est indexable : pas de page de listing
 * (`/articles`, qui n'a pas de contenu propre), pas de rubrique encore vide.
 * Y déclarer une URL en `noindex` enverrait un signal contradictoire et
 * dépenserait du budget d'exploration au détriment des articles.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const published = articlesSorted();
  const dernierArticle = lastmod(published);

  // Pages institutionnelles : éditées à la main, sans date de modification
  // suivie — on ne leur en invente pas.
  const pages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: dernierArticle,
      changeFrequency: "daily",
      priority: 1,
    },
    { url: `${BASE}/a-propos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/methodologie`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/protocole-jdlt`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/charte-editoriale`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/mentions-legales`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/confidentialite`, changeFrequency: "yearly", priority: 0.1 },
  ];

  // Seules les rubriques alimentées : une rubrique vide est en `noindex`,
  // elle n'a donc rien à faire ici. Elle réapparaît à sa première publication.
  const rubriques: MetadataRoute.Sitemap = categories
    .filter((c) => articlesByCategory(c.slug).length > 0)
    .map((c) => ({
      url: `${BASE}/${c.slug}`,
      lastModified: lastmod(articlesByCategory(c.slug)),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const articles: MetadataRoute.Sitemap = published.map((a) => ({
    url: `${BASE}/${a.category}/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const auteurs: MetadataRoute.Sitemap = Object.keys(authors).map((slug) => ({
    url: `${BASE}/auteurs/${slug}`,
    lastModified: lastmod(published.filter((a) => a.author === slug)),
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...pages, ...rubriques, ...articles, ...auteurs];
}
