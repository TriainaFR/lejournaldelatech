/**
 * Données du site.
 *
 * `articles` est vide tant que la rédaction n'a rien publié : dès qu'une entrée
 * est ajoutée, il faudra recréer les routes correspondantes (page rubrique et
 * page article) et rebrancher la navigation.
 */

export type CategorySlug =
  | "intelligence-artificielle"
  | "saas-logiciels"
  | "hebergement-web"
  | "mobilite"
  | "energie-solaire"
  | "green-tech";

export type EditorialImage = { src: string; alt: string };

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  /** teinte dominante de l'illustration générée (repli sans photo) */
  tone: "rouge" | "silver" | "ink";
  description: string;
  /** alt de la photo /public/images/cat-<slug>.jpg ; absent = pas de photo */
  imageAlt?: string;
};

/** Les thématiques couvertes par le journal (ligne éditoriale). */
export const categories: Category[] = [
  {
    slug: "intelligence-artificielle",
    imageAlt: "Lettres « AI » en trois dimensions sur un circuit imprimé bleu",
    name: "Intelligence artificielle",
    short: "IA",
    tone: "rouge",
    description:
      "Modèles, agents, régulation et cas d'usage concrets en entreprise.",
  },
  {
    slug: "saas-logiciels",
    imageAlt: "Ordinateur portable affichant du code dans un bureau lumineux",
    name: "SaaS & Logiciels",
    short: "SaaS",
    tone: "ink",
    description:
      "CRM, comptabilité, RH, marketing : les outils qui équipent les TPE et PME.",
  },
  {
    slug: "hebergement-web",
    imageAlt: "Baies de serveurs câblées dans un datacenter",
    name: "Hébergement web",
    short: "Hébergement",
    tone: "silver",
    description:
      "Performances, support, souveraineté et écologie des datacenters.",
  },
  {
    slug: "mobilite",
    imageAlt: "Prise de recharge branchée sur une voiture électrique",
    name: "Mobilité",
    short: "Mobilité",
    tone: "ink",
    description:
      "Véhicules électriques, bornes, rétrofit et logistique urbaine.",
  },
  {
    slug: "energie-solaire",
    imageAlt: "Rangées de panneaux solaires dans un champ sous un ciel nuageux",
    name: "Énergie & Solaire",
    short: "Solaire",
    tone: "rouge",
    description:
      "Photovoltaïque, autoconsommation, aides et installateurs certifiés.",
  },
  {
    slug: "green-tech",
    imageAlt: "Mains tenant une jeune plante au-dessus d'un sol forestier",
    name: "Green tech",
    short: "Green tech",
    tone: "silver",
    description:
      "Éco-conception, mesure carbone et sobriété numérique, sans greenwashing.",
  },
];

export type Article = {
  slug: string;
  title: string;
  /** titre optimisé pour la balise <title> (sinon `title`) */
  metaTitle?: string;
  excerpt: string;
  /** meta description ≤ 160 caractères (sinon `excerpt` tronqué) */
  metaDescription?: string;
  category: CategorySlug;
  author: string;
  date: string; // ISO — publication
  dateLabel: string;
  /** ISO — dernière mise à jour, si différente de la publication */
  updated?: string;
  updatedLabel?: string;
  readingTime: number; // minutes
  /** graine de variation pour l'illustration générée (repli sans photo) */
  seed: number;
  /** alt de la photo /public/images/art-<slug>.jpg ; absent = pas de photo */
  imageAlt?: string;
  /** entités couvertes — alimente `about` du balisage Article (GEO) */
  topics?: string[];
};

export const articles: Article[] = [
  {
    slug: "claude-vs-chatgpt",
    title: "Claude vs ChatGPT : le comparatif complet pour choisir en 2026",
    metaTitle: "Claude vs ChatGPT 2026 : le comparatif complet",
    excerpt:
      "Raisonnement, code, français, RGPD, coût réel de l'API : notre comparatif complet de Claude et ChatGPT, benchmarks vérifiés et simulation chiffrée pour une PME française à l'appui.",
    metaDescription:
      "Claude ou ChatGPT en 2026 ? Benchmarks vérifiés, tests en français, conformité RGPD et coût réel de l'API comparés pour les entreprises françaises.",
    category: "intelligence-artificielle",
    author: "La rédaction",
    date: "2026-07-21",
    dateLabel: "21 juillet 2026",
    readingTime: 14,
    seed: 101,
    imageAlt:
      "Main d'un robot humanoïde blanc tendue en avant, symbole des assistants d'intelligence artificielle",
    topics: [
      "Claude",
      "ChatGPT",
      "Anthropic",
      "OpenAI",
      "Intelligence artificielle générative",
      "RGPD",
    ],
  },
];

export type FaqItem = { question: string; answer: string };

/**
 * Questions longue traîne — affichées en accordéon et balisées FAQPage.
 * Chaque réponse se suffit à elle-même : elle n'annonce aucun contenu à venir.
 */
export const faqItems: FaqItem[] = [
  {
    question: "Comment choisir son hébergeur web en 2026 ?",
    answer:
      "Partez de votre trafic réel et de vos contraintes, pas du prix d'appel. Vérifiez la localisation des serveurs (l'Union européenne pour les données personnelles), la présence d'un support en français joignable, les sauvegardes automatiques incluses, la facilité de migration en cas de départ, et le prix de renouvellement — souvent deux à trois fois supérieur au tarif de première année.",
  },
  {
    question: "Quels critères comptent vraiment pour un logiciel SaaS de PME ?",
    answer:
      "Quatre points décident de la réussite d'un déploiement : le coût réel par utilisateur une fois les options ajoutées, l'hébergement des données et la conformité RGPD, les intégrations avec vos outils existants (facturation, emailing, comptabilité), et la réversibilité — pouvez-vous exporter vos données dans un format exploitable si vous changez d'avis ?",
  },
  {
    question: "Combien coûte une installation de panneaux solaires ?",
    answer:
      "Pour une installation résidentielle de 3 à 6 kWc, les devis constatés se situent le plus souvent entre 7 000 et 12 000 €, aides déduites, selon la région, l'accessibilité de la toiture et le matériel retenu. Exigez toujours plusieurs devis détaillés, la certification RGE de l'installateur, et méfiez-vous des offres de démarchage téléphonique.",
  },
  {
    question: "Comment évaluer un outil d'IA pour son entreprise ?",
    answer:
      "Trois questions avant de signer : où sont hébergées vos données et sont-elles utilisées pour entraîner le modèle, quel est le coût réel à l'usage (et pas seulement l'abonnement affiché), et le fournisseur documente-t-il sa conformité à l'AI Act et au RGPD ? Testez toujours sur un cas d'usage réel avant de généraliser.",
  },
  {
    question: "Qu'est-ce que la green tech ?",
    answer:
      "La green tech désigne les technologies conçues pour réduire l'impact environnemental : énergies renouvelables, mobilité électrique, éco-conception logicielle, mesure et pilotage du carbone. C'est l'un des secteurs les plus dynamiques de la tech française, et l'un des axes éditoriaux fondateurs du Journal de la Tech.",
  },
];

export function categoryBySlug(slug: CategorySlug): Category {
  return categories.find((c) => c.slug === slug)!;
}

export function articlesByCategory(slug: CategorySlug): Article[] {
  return articles
    .filter((a) => a.category === slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Rubriques ayant au moins un article : les seules à exposer publiquement. */
export function activeCategories(): Category[] {
  return categories.filter((c) => articlesByCategory(c.slug).length > 0);
}

export function articlesSorted(): Article[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Photos éditoriales : fichiers nommés par convention dans /public/images. */
export function articleImage(a: Article): EditorialImage | undefined {
  return a.imageAlt
    ? { src: `/images/art-${a.slug}.jpg`, alt: a.imageAlt }
    : undefined;
}

export function categoryImage(c: Category): EditorialImage | undefined {
  return c.imageAlt
    ? { src: `/images/cat-${c.slug}.jpg`, alt: c.imageAlt }
    : undefined;
}
