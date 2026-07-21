import type { MetadataRoute } from "next";
import { authors } from "@/lib/authors";
import { articlesByCategory, articlesSorted, categories } from "@/lib/data";

const BASE = "https://lejournaldelatech.fr";

/** Seules les pages réellement publiées sont listées. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/articles`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/methodologie`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/protocole-jdlt`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/charte-editoriale`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  // Une rubrique sans article reste utile (ligne éditoriale, sujets à venir)
  // mais pèse moins qu'une rubrique alimentée.
  const rubriques: MetadataRoute.Sitemap = categories.map((c) => {
    const alimentee = articlesByCategory(c.slug).length > 0;
    return {
      url: `${BASE}/${c.slug}`,
      lastModified: now,
      changeFrequency: alimentee ? ("weekly" as const) : ("monthly" as const),
      priority: alimentee ? 0.7 : 0.3,
    };
  });

  const articles: MetadataRoute.Sitemap = articlesSorted().map((a) => ({
    url: `${BASE}/${a.category}/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const auteurs: MetadataRoute.Sitemap = Object.keys(authors).map((slug) => ({
    url: `${BASE}/auteurs/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...pages, ...rubriques, ...articles, ...auteurs];
}
