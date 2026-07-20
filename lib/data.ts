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

export const articles: Article[] = [
  {
    slug: "ia-souveraine-entreprises-francaises",
    imageAlt: "Main d'un robot humanoïde blanc tendue en avant",
    title:
      "IA souveraine : pourquoi les entreprises françaises rapatrient leurs modèles",
    excerpt:
      "Hébergement européen, maîtrise des données, coûts d'inférence : enquête sur un mouvement de fond qui redessine le marché de l'IA en France, des startups aux grands groupes.",
    category: "intelligence-artificielle",
    author: "Rédaction JLT",
    date: "2026-07-20",
    dateLabel: "20 juillet 2026",
    readingTime: 8,
    seed: 1,
  },
  {
    slug: "comparatif-crm-pme-2026",
    imageAlt: "Équipe en réunion devant un mur de post-its colorés",
    title: "CRM pour PME : notre comparatif 2026 des 12 meilleures solutions",
    excerpt:
      "Prix réels, intégrations, support en français : nous avons testé douze CRM pendant trois mois pour départager les solutions adaptées aux PME françaises.",
    category: "saas-logiciels",
    author: "Rédaction JLT",
    date: "2026-07-19",
    dateLabel: "19 juillet 2026",
    readingTime: 14,
    seed: 2,
  },
  {
    slug: "hebergeurs-verts-datacenters-france",
    imageAlt: "Panneau de brassage réseau avec câbles Ethernet",
    title:
      "Datacenters bas carbone : le classement des hébergeurs web les plus verts",
    excerpt:
      "PUE, énergie renouvelable, récupération de chaleur : notre méthodologie passe au crible les promesses écologiques des hébergeurs français et européens.",
    category: "hebergement-web",
    author: "Rédaction JLT",
    date: "2026-07-18",
    dateLabel: "18 juillet 2026",
    readingTime: 11,
    seed: 3,
  },
  {
    slug: "retrofit-electrique-flottes-entreprise",
    imageAlt: "Mécanicien effectuant une intervention sur un moteur de véhicule",
    title:
      "Rétrofit électrique : la seconde vie des flottes d'entreprise a commencé",
    excerpt:
      "Convertir plutôt que remplacer : le rétrofit s'impose comme l'option la plus sobre pour électrifier les véhicules utilitaires. Coûts, aides et acteurs à connaître.",
    category: "mobilite",
    author: "Rédaction JLT",
    date: "2026-07-17",
    dateLabel: "17 juillet 2026",
    readingTime: 7,
    seed: 4,
  },
  {
    slug: "panneaux-solaires-installateurs-certifies",
    imageAlt: "Panneaux solaires en toiture avec une éolienne en arrière-plan",
    title:
      "Panneaux solaires : comment choisir son installateur certifié RGE en 2026",
    excerpt:
      "Garanties, rendement réel, pièges des devis : le guide complet pour sélectionner une entreprise d'installation fiable, région par région.",
    category: "energie-solaire",
    author: "Rédaction JLT",
    date: "2026-07-16",
    dateLabel: "16 juillet 2026",
    readingTime: 12,
    seed: 5,
  },
  {
    slug: "numerique-responsable-referentiel-rgesn",
    imageAlt: "Sentier traversant une forêt dense et lumineuse",
    title:
      "Numérique responsable : ce que le nouveau référentiel change pour vos sites",
    excerpt:
      "Éco-conception, sobriété des interfaces, mesure d'impact : décryptage des exigences qui s'imposent progressivement aux services numériques.",
    category: "green-tech",
    author: "Rédaction JLT",
    date: "2026-07-15",
    dateLabel: "15 juillet 2026",
    readingTime: 6,
    seed: 6,
  },
  {
    slug: "agents-ia-support-client-saas",
    imageAlt: "Poste de travail avec ordinateur portable et téléphone de bureau",
    title:
      "Agents IA et support client : les éditeurs SaaS français passent à l'échelle",
    excerpt:
      "Résolution autonome des tickets, escalade intelligente : comment les éditeurs hexagonaux intègrent les agents IA sans dégrader l'expérience client.",
    category: "intelligence-artificielle",
    author: "Rédaction JLT",
    date: "2026-07-14",
    dateLabel: "14 juillet 2026",
    readingTime: 9,
    seed: 7,
  },
  {
    slug: "facturation-electronique-logiciels-conformes",
    imageAlt: "Documents de facturation, calculatrice et smartphone",
    title:
      "Facturation électronique : les logiciels prêts pour l'échéance de septembre",
    excerpt:
      "La réforme entre dans sa phase décisive. Tour d'horizon des plateformes de dématérialisation partenaires et des solutions conformes pour TPE et PME.",
    category: "saas-logiciels",
    author: "Rédaction JLT",
    date: "2026-07-13",
    dateLabel: "13 juillet 2026",
    readingTime: 10,
    seed: 8,
  },
  {
    slug: "edge-computing-hebergement-proximite",
    imageAlt: "Vue aérienne des gratte-ciel d'une grande ville au crépuscule",
    title: "Edge computing : l'hébergement de proximité devient un argument SEO",
    excerpt:
      "Latence, Core Web Vitals, souveraineté : pourquoi la localisation des serveurs pèse désormais dans les arbitrages techniques des sites à fort trafic.",
    category: "hebergement-web",
    author: "Rédaction JLT",
    date: "2026-07-12",
    dateLabel: "12 juillet 2026",
    readingTime: 8,
    seed: 9,
  },
  {
    slug: "velos-cargo-logistique-urbaine",
    imageAlt: "Vélo urbain appuyé contre un mur sombre en ville",
    title:
      "Vélos-cargos électriques : la logistique urbaine change de braquet",
    excerpt:
      "Les flottes de vélos-cargos remplacent les utilitaires en centre-ville. Modèles économiques, acteurs français et retours d'expérience chiffrés.",
    category: "mobilite",
    author: "Rédaction JLT",
    date: "2026-07-11",
    dateLabel: "11 juillet 2026",
    readingTime: 6,
    seed: 10,
  },
  {
    slug: "autoconsommation-collective-immeubles",
    imageAlt: "Immeubles collectifs vus en contre-plongée",
    title:
      "Autoconsommation collective : le solaire partagé séduit les copropriétés",
    excerpt:
      "Cadre juridique assoupli, tarifs en hausse : l'autoconsommation collective devient rentable. Ce qu'il faut savoir avant de lancer un projet en immeuble.",
    category: "energie-solaire",
    author: "Rédaction JLT",
    date: "2026-07-10",
    dateLabel: "10 juillet 2026",
    readingTime: 9,
    seed: 11,
  },
  {
    slug: "greentech-francaise-levees-2026",
    imageAlt: "Éoliennes dans un champ au coucher du soleil",
    title:
      "Greentech française : les levées de fonds qui comptent au premier semestre",
    excerpt:
      "Stockage d'énergie, matériaux biosourcés, mesure carbone : cartographie des startups écologiques françaises qui ont convaincu les investisseurs.",
    category: "green-tech",
    author: "Rédaction JLT",
    date: "2026-07-09",
    dateLabel: "9 juillet 2026",
    readingTime: 7,
    seed: 12,
  },
];

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
    count: "48 logiciels comparés",
    seed: 21,
  },
  {
    slug: "meilleurs-hebergeurs-web",
    imageAlt: "La Terre vue de l'espace avec les lumières des villes",
    title: "Les meilleurs hébergeurs web en 2026",
    description:
      "Performances mesurées, support, écologie des datacenters : le banc d'essai de référence.",
    count: "16 hébergeurs testés",
    seed: 22,
  },
  {
    slug: "meilleures-entreprises-panneaux-solaires",
    imageAlt: "Grande centrale solaire au sol sous un ciel bleu",
    title: "Les meilleures entreprises de panneaux solaires",
    description:
      "Installateurs certifiés RGE, garanties, prix au kWc : le classement région par région.",
    count: "60 installateurs évalués",
    seed: 23,
  },
  {
    slug: "meilleurs-outils-ia",
    imageAlt: "Gros plan sur les composants d'une carte électronique",
    title: "Les meilleurs outils d'IA pour les entreprises",
    description:
      "Assistants, génération, analyse de données : les solutions qui tiennent leurs promesses.",
    count: "35 outils passés au crible",
    seed: 24,
  },
];

export const tickerItems: string[] = [
  "L'Union européenne précise le calendrier d'application de l'AI Act pour les PME",
  "Un datacenter alimenté à 100 % par géothermie ouvre en Alsace",
  "Le marché français du SaaS dépasse les 20 milliards d'euros",
  "Bornes de recharge : le cap des 250 000 points publics est franchi",
  "Le photovoltaïque français bat son record de production mensuelle",
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
      "Il n'existe pas un meilleur hébergeur unique : tout dépend du trafic, du budget et de vos exigences écologiques. Notre banc d'essai mesure les performances réelles de 16 hébergeurs français et européens, leur support et l'empreinte de leurs datacenters, puis les classe par profil d'usage — du site vitrine au e-commerce à fort trafic.",
  },
  {
    question: "Quel logiciel CRM choisir pour une PME française ?",
    answer:
      "Pour une PME française, les critères décisifs sont le prix réel par utilisateur, l'hébergement des données en Europe, les intégrations (facturation, emailing) et un support en français. Notre comparatif 2026 passe douze CRM au crible sur ces critères, avec trois mois de tests en conditions réelles.",
  },
  {
    question:
      "Combien coûte une installation de panneaux solaires en 2026 ?",
    answer:
      "Comptez en moyenne entre 7 000 et 12 000 € pour une installation résidentielle de 3 à 6 kWc, aides déduites, selon la région et la complexité de la toiture. Notre guide détaille les prix au kWc constatés, les aides en vigueur et les pièges des devis, région par région.",
  },
  {
    question: "Comment choisir un outil d'IA fiable pour son entreprise ?",
    answer:
      "Trois questions à poser avant de signer : où sont hébergées et comment sont utilisées vos données, quel est le coût réel à l'usage (et pas seulement l'abonnement), et l'outil est-il conforme à l'AI Act et au RGPD ? Notre sélection des meilleurs outils d'IA évalue 35 solutions sur ces critères.",
  },
  {
    question: "Qu'est-ce que la green tech, et pourquoi ça compte ?",
    answer:
      "La green tech désigne les technologies conçues pour réduire l'impact environnemental : énergies renouvelables, mobilité électrique, éco-conception logicielle, mesure carbone. C'est l'un des secteurs les plus dynamiques de la tech française — et l'un des axes éditoriaux fondateurs du Journal de la Tech.",
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "48", label: "logiciels SaaS comparés" },
  { value: "16", label: "hébergeurs testés en conditions réelles" },
  { value: "60", label: "installateurs solaires évalués" },
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
  majIso: string;
}[] = [
  {
    comparatif: "Meilleurs logiciels SaaS par prix",
    univers: "SaaS & Logiciels",
    volume: "48 solutions",
    maj: "Juillet 2026",
    majIso: "2026-07",
  },
  {
    comparatif: "Meilleurs hébergeurs web",
    univers: "Hébergement",
    volume: "16 hébergeurs",
    maj: "Juillet 2026",
    majIso: "2026-07",
  },
  {
    comparatif: "Meilleures entreprises de panneaux solaires",
    univers: "Énergie & Solaire",
    volume: "60 installateurs",
    maj: "Juin 2026",
    majIso: "2026-06",
  },
  {
    comparatif: "Meilleurs outils d'IA pour entreprises",
    univers: "Intelligence artificielle",
    volume: "35 outils",
    maj: "Juillet 2026",
    majIso: "2026-07",
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
