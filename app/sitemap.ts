import type { MetadataRoute } from "next";
import { categories, guides, intentTiles } from "@/lib/data";

const BASE = "https://lejournaldelatech.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/comparatifs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/actualites`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/methodologie`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/charte-editoriale`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE}/comparatifs/${g.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const intentPages: MetadataRoute.Sitemap = intentTiles.map((t) => ({
    url: `${BASE}${t.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Les pages articles (contenu de démonstration) sont volontairement exclues
  // du sitemap tant qu'elles sont en noindex.
  return [...staticPages, ...categoryPages, ...guidePages, ...intentPages];
}
