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

/** Seules les pages réellement publiées sont listées. */
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
    {
      url: `${BASE}/articles`,
      lastModified: dernierArticle,
      changeFrequency: "daily",
      priority: 0.8,
    },
    { url: `${BASE}/a-propos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/methodologie`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/protocole-jdlt`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/charte-editoriale`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/mentions-legales`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/confidentialite`, changeFrequency: "yearly", priority: 0.1 },
  ];

  // Une rubrique sans article reste utile (ligne éditoriale, sujets à venir)
  // mais pèse moins qu'une rubrique alimentée.
  const rubriques: MetadataRoute.Sitemap = categories.map((c) => {
    const dedans = articlesByCategory(c.slug);
    return {
      url: `${BASE}/${c.slug}`,
      lastModified: lastmod(dedans),
      changeFrequency: dedans.length ? ("weekly" as const) : ("monthly" as const),
      priority: dedans.length ? 0.7 : 0.3,
    };
  });

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
