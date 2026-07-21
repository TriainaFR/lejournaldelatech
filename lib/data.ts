/**
 * Contenu de démonstration de la home page.
 * À remplacer par un CMS (ou des fichiers MDX) quand la production éditoriale démarre.
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

export const categories: Category[] = [
  {
    slug: "intelligence-artificielle",
    imageAlt: "Lettres « AI » en trois dimensions sur un circuit imprimé bleu",
    name: "Intelligence artificielle",
    short: "IA",
    tone: "rouge",
    description:
      "Modèles, agents, régulation et cas d'usage : l'actualité de l'IA décryptée pour les entreprises, avec nos comparatifs des meilleurs outils.",
  },
  {
    slug: "saas-logiciels",
    imageAlt: "Ordinateur portable affichant du code dans un bureau lumineux",
    name: "SaaS & Logiciels",
    short: "SaaS",
    tone: "ink",
    description:
      "CRM, comptabilité, RH, marketing : tests et comparatifs des logiciels SaaS qui équipent les TPE et PME françaises, par secteur et par prix.",
  },
  {
    slug: "hebergement-web",
    imageAlt: "Baies de serveurs câblées dans un datacenter",
    name: "Hébergement web",
    short: "Hébergement",
    tone: "silver",
    description:
      "Performances mesurées, support, écologie des datacenters : nos bancs d'essai des hébergeurs web français et européens.",
  },
  {
    slug: "mobilite",
    imageAlt: "Prise de recharge branchée sur une voiture électrique",
    name: "Mobilité",
    short: "Mobilité",
    tone: "ink",
    description:
      "Véhicules électriques, bornes de recharge, rétrofit, logistique urbaine : la mobilité durable côté usages et côté entreprises.",
  },
  {
    slug: "energie-solaire",
    imageAlt: "Rangées de panneaux solaires dans un champ sous un ciel nuageux",
    name: "Énergie & Solaire",
    short: "Solaire",
    tone: "rouge",
    description:
      "Panneaux solaires, autoconsommation, installateurs certifiés RGE : prix constatés, aides et classements région par région.",
  },
  {
    slug: "green-tech",
    imageAlt: "Mains tenant une jeune plante au-dessus d'un sol forestier",
    name: "Green tech",
    short: "Green tech",
    tone: "silver",
    description:
      "Éco-conception, mesure carbone, numérique responsable : les technologies qui réduisent l'empreinte environnementale, sans greenwashing.",
  },
];

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  author: string;
  date: string; // ISO
  dateLabel: string;
  readingTime: number; // minutes
  /** graine de variation pour l'illustration générée (repli sans photo) */
  seed: number;
  /** alt de la photo /public/images/art-<slug>.jpg ; absent = pas de photo */
  imageAlt?: string;
};

// Aucun article publié pour l'instant : les cartes, rubriques et pages
// article réapparaîtront automatiquement dès qu'on ajoute des entrées ici.
export const articles: Article[] = [];

export type Guide = {
  slug: string;
  title: string;
  description: string;
  count: string;
  seed: number;
  /** alt de la photo /public/images/guide-<slug>.jpg ; absent = pas de photo */
  imageAlt?: string;
};

/** Comparatifs & guides d'achat — le cœur du positionnement GEO/SEO */
export const guides: Guide[] = [
  {
    slug: "meilleurs-logiciels-saas",
    imageAlt: "Écran affichant du code source coloré",
    title: "Les meilleurs logiciels SaaS par secteur et par prix",
    description:
      "CRM, comptabilité, RH, marketing : notre sélection testée et mise à jour chaque mois.",
    count: "48 logiciels à l'essai",
    seed: 21,
  },
  {
    slug: "meilleurs-hebergeurs-web",
    imageAlt: "La Terre vue de l'espace avec les lumières des villes",
    title: "Les meilleurs hébergeurs web en 2026",
    description:
      "Performances mesurées, support, écologie des datacenters : le banc d'essai de référence.",
    count: "16 hébergeurs au banc d'essai",
    seed: 22,
  },
  {
    slug: "meilleures-entreprises-panneaux-solaires",
    imageAlt: "Grande centrale solaire au sol sous un ciel bleu",
    title: "Les meilleures entreprises de panneaux solaires",
    description:
      "Installateurs certifiés RGE, garanties, prix au kWc : le classement région par région.",
    count: "60 installateurs à l'étude",
    seed: 23,
  },
  {
    slug: "meilleurs-outils-ia",
    imageAlt: "Gros plan sur les composants d'une carte électronique",
    title: "Les meilleurs outils d'IA pour les entreprises",
    description:
      "Assistants, génération, analyse de données : les solutions qui tiennent leurs promesses.",
    count: "35 outils à l'évaluation",
    seed: 24,
  },
];

export const tickerItems: string[] = [
  "Bienvenue sur Le Journal de la Tech, média indépendant de la tech utile",
  "Meilleurs logiciels SaaS : premier classement en préparation",
  "Banc d'essai hébergeurs web : 16 offres en cours de test",
  "Installateurs solaires : enquête région par région en cours",
  "La Dépêche Tech : nos comparatifs en avant-première, chaque jeudi",
];

export type IntentTile = {
  title: string;
  href: string;
  keywords: { label: string; href: string }[];
};

/** Tuiles d'intention « Chaque projet, sa solution » — portes d'entrée SEO */
export const intentTiles: IntentTile[] = [
  {
    title: "Lancer son site web",
    href: "/guides/lancer-son-site-web",
    keywords: [
      { label: "Hébergeurs", href: "/hebergement-web" },
      { label: "CMS", href: "/saas-logiciels" },
      { label: "Nom de domaine", href: "/guides/lancer-son-site-web" },
    ],
  },
  {
    title: "Équiper sa PME",
    href: "/guides/equiper-sa-pme",
    keywords: [
      { label: "CRM", href: "/comparatifs/meilleurs-logiciels-saas" },
      { label: "Comptabilité", href: "/saas-logiciels" },
      { label: "RH", href: "/saas-logiciels" },
    ],
  },
  {
    title: "Passer au solaire",
    href: "/guides/passer-au-solaire",
    keywords: [
      {
        label: "Installateurs",
        href: "/comparatifs/meilleures-entreprises-panneaux-solaires",
      },
      { label: "Prix au kWc", href: "/energie-solaire" },
      { label: "Aides 2026", href: "/energie-solaire" },
    ],
  },
  {
    title: "Électrifier sa flotte",
    href: "/guides/electrifier-sa-flotte",
    keywords: [
      { label: "Véhicules", href: "/mobilite" },
      { label: "Bornes", href: "/mobilite" },
      { label: "Rétrofit", href: "/mobilite" },
    ],
  },
  {
    title: "Automatiser avec l'IA",
    href: "/guides/automatiser-avec-ia",
    keywords: [
      { label: "Assistants", href: "/comparatifs/meilleurs-outils-ia" },
      { label: "Agents", href: "/intelligence-artificielle" },
      { label: "Conformité", href: "/intelligence-artificielle" },
    ],
  },
  {
    title: "Réduire son empreinte",
    href: "/guides/reduire-son-empreinte",
    keywords: [
      { label: "Mesure carbone", href: "/green-tech" },
      { label: "Éco-conception", href: "/green-tech" },
      { label: "Hébergement vert", href: "/hebergement-web" },
    ],
  },
];

export type FaqItem = { question: string; answer: string };

/** Questions longue traîne — affichées en accordéon + balisées FAQPage */
export const faqItems: FaqItem[] = [
  {
    question: "Quel est le meilleur hébergeur web en 2026 ?",
    answer:
      "Il n'existe pas un meilleur hébergeur unique : tout dépend du trafic, du budget et de vos exigences écologiques. Notre banc d'essai en cours mesure les performances réelles de 16 hébergeurs français et européens, leur support et l'empreinte de leurs datacenters, pour les classer par profil d'usage — premier classement à paraître.",
  },
  {
    question: "Quel logiciel CRM choisir pour une PME française ?",
    answer:
      "Pour une PME française, les critères décisifs sont le prix réel par utilisateur, l'hébergement des données en Europe, les intégrations (facturation, emailing) et un support en français. Notre comparatif 2026, en préparation, passera douze CRM au crible sur ces critères, après trois mois de tests en conditions réelles.",
  },
  {
    question:
      "Combien coûte une installation de panneaux solaires en 2026 ?",
    answer:
      "Comptez en moyenne entre 7 000 et 12 000 € pour une installation résidentielle de 3 à 6 kWc, aides déduites, selon la région et la complexité de la toiture. Notre guide à paraître détaillera les prix au kWc constatés, les aides en vigueur et les pièges des devis, région par région.",
  },
  {
    question: "Comment choisir un outil d'IA fiable pour son entreprise ?",
    answer:
      "Trois questions à poser avant de signer : où sont hébergées et comment sont utilisées vos données, quel est le coût réel à l'usage (et pas seulement l'abonnement), et l'outil est-il conforme à l'AI Act et au RGPD ? Notre sélection des meilleurs outils d'IA, en cours d'évaluation sur 35 solutions, paraîtra prochainement.",
  },
  {
    question: "Qu'est-ce que la green tech, et pourquoi ça compte ?",
    answer:
      "La green tech désigne les technologies conçues pour réduire l'impact environnemental : énergies renouvelables, mobilité électrique, éco-conception logicielle, mesure carbone. C'est l'un des secteurs les plus dynamiques de la tech française — et l'un des axes éditoriaux fondateurs du Journal de la Tech.",
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "48", label: "logiciels SaaS à l'essai" },
  { value: "16", label: "hébergeurs au banc d'essai" },
  { value: "60", label: "installateurs solaires à l'étude" },
];

export const popularSearches: { label: string; href: string }[] = [
  { label: "Meilleur CRM 2026", href: "/comparatifs/meilleurs-logiciels-saas" },
  { label: "Hébergeur écologique", href: "/comparatifs/meilleurs-hebergeurs-web" },
  {
    label: "Prix panneaux solaires",
    href: "/comparatifs/meilleures-entreprises-panneaux-solaires",
  },
  { label: "Meilleur outil IA", href: "/comparatifs/meilleurs-outils-ia" },
  { label: "Borne de recharge", href: "/mobilite" },
];

/** Programme éditorial des comparatifs — table extractible (SEO/GEO) */
export const comparatifsProgramme: {
  comparatif: string;
  univers: string;
  volume: string;
  maj: string;
}[] = [
  {
    comparatif: "Meilleurs logiciels SaaS par prix",
    univers: "SaaS & Logiciels",
    volume: "48 solutions",
    maj: "Été 2026",
  },
  {
    comparatif: "Meilleurs hébergeurs web",
    univers: "Hébergement",
    volume: "16 hébergeurs",
    maj: "Été 2026",
  },
  {
    comparatif: "Meilleures entreprises de panneaux solaires",
    univers: "Énergie & Solaire",
    volume: "60 installateurs",
    maj: "Été 2026",
  },
  {
    comparatif: "Meilleurs outils d'IA pour entreprises",
    univers: "Intelligence artificielle",
    volume: "35 outils",
    maj: "Automne 2026",
  },
];

export function categoryBySlug(slug: CategorySlug): Category {
  return categories.find((c) => c.slug === slug)!;
}

export function articlesByCategory(slug: CategorySlug): Article[] {
  return articles.filter((a) => a.category === slug);
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

export function guideImage(g: Guide): EditorialImage | undefined {
  return g.imageAlt
    ? { src: `/images/guide-${g.slug}.jpg`, alt: g.imageAlt }
    : undefined;
}
