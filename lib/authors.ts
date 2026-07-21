/**
 * Auteurs de la rédaction.
 *
 * Chaque article est signé par une entité identifiée, reprise dans la byline,
 * la page auteur et le balisage `Person` — c'est un signal E-E-A-T central pour
 * un média qui publie des tests et des classements.
 */

export type AuthorSlug = "lucas-lecoq";

export type Author = {
  slug: AuthorSlug;
  name: string;
  /** fonction affichée sous la signature */
  role: string;
  /** présentation courte, reprise sur la page auteur et dans le balisage */
  bio: string;
  /** domaines d'expertise — alimente `knowsAbout` */
  expertise: string[];
  /** profils externes — alimentent `sameAs` */
  sameAs: string[];
};

export const authors: Record<AuthorSlug, Author> = {
  "lucas-lecoq": {
    slug: "lucas-lecoq",
    name: "Lucas Lecoq",
    role: "Rédacteur et consultant chez Le Journal de la Tech",
    bio: "Lucas Lecoq est rédacteur et consultant au Journal de la Tech. Il conçoit et mène les tests du Protocole JDLT : déploiements réels chez les hébergeurs, mesures de performance depuis Paris, calculs de coût total sur trois ans et vérification des engagements de conformité. Il écrit sur les logiciels d'entreprise, l'intelligence artificielle, l'hébergement web et la tech durable.",
    expertise: [
      "Hébergement web",
      "SaaS et logiciels d'entreprise",
      "Intelligence artificielle",
      "Performance web",
      "RGPD",
    ],
    sameAs: ["https://www.linkedin.com/in/lucas-lecoq/"],
  },
};

export function authorBySlug(slug: AuthorSlug): Author {
  return authors[slug];
}

export function authorHref(slug: AuthorSlug): string {
  return `/auteurs/${slug}`;
}
