import type { MetadataRoute } from "next";

const BASE = "https://lejournaldelatech.fr";

/**
 * Mode pré-lancement : seules les pages avec du contenu réel sont listées.
 * Réintégrer rubriques, comparatifs et articles à leur publication.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/methodologie`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/charte-editoriale`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
