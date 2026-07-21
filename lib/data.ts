/**
 * Données du site.
 *
 * `articles` est vide tant que la rédaction n'a rien publié : dès qu'une entrée
 * est ajoutée, il faudra recréer les routes correspondantes (page rubrique et
 * page article) et rebrancher la navigation.
 */

import type { AuthorSlug } from "./authors";

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
  /** sujets que la rubrique couvre — affichés tant qu'aucun article n'est publié */
  angles: string[];
  /** alt de la photo /public/images/cat-<slug>.jpg ; absent = pas de photo */
  imageAlt?: string;
};

/** Les thématiques couvertes par le journal (ligne éditoriale). */
export const categories: Category[] = [
  {
    slug: "intelligence-artificielle",
    angles: [
      "Comparatifs d'assistants et d'outils d'IA pour les entreprises",
      "Coût réel des API et des abonnements, calculé cas d'usage par cas d'usage",
      "Conformité : AI Act, RGPD, hébergement des données et sous-traitance",
      "Agents et automatisation : ce qui fonctionne vraiment en production",
    ],
    imageAlt: "Lettres « AI » en trois dimensions sur un circuit imprimé bleu",
    name: "Intelligence artificielle",
    short: "IA",
    tone: "rouge",
    description:
      "Modèles, agents, régulation et cas d'usage concrets en entreprise.",
  },
  {
    slug: "saas-logiciels",
    angles: [
      "Comparatifs de logiciels par métier : CRM, comptabilité, RH, marketing",
      "Coût total sur trois ans, renouvellements et coûts cachés",
      "Réversibilité : export des données et sortie d'un éditeur",
      "Facturation électronique et obligations réglementaires",
    ],
    imageAlt: "Ordinateur portable affichant du code dans un bureau lumineux",
    name: "SaaS & Logiciels",
    short: "SaaS",
    tone: "ink",
    description:
      "CRM, comptabilité, RH, marketing : les outils qui équipent les TPE et PME.",
  },
  {
    slug: "hebergement-web",
    angles: [
      "Bancs d'essai des hébergeurs : performances mesurées depuis la France",
      "Coût réel sur trois ans, renouvellement inclus",
      "Souveraineté, RGPD et localisation des datacenters",
      "Mutualisé, VPS, cloud, dédié : quel type pour quel trafic",
    ],
    imageAlt: "Baies de serveurs câblées dans un datacenter",
    name: "Hébergement web",
    short: "Hébergement",
    tone: "silver",
    description:
      "Performances, support, souveraineté et écologie des datacenters.",
  },
  {
    slug: "mobilite",
    angles: [
      "Véhicules électriques et utilitaires : autonomie et coût d'usage réels",
      "Bornes de recharge : réseaux, tarifs et disponibilité mesurée",
      "Rétrofit et seconde vie des flottes d'entreprise",
      "Logistique urbaine : vélos-cargos et livraison décarbonée",
    ],
    imageAlt: "Prise de recharge branchée sur une voiture électrique",
    name: "Mobilité",
    short: "Mobilité",
    tone: "ink",
    description:
      "Véhicules électriques, bornes, rétrofit et logistique urbaine.",
  },
  {
    slug: "energie-solaire",
    angles: [
      "Panneaux solaires : prix au kWc constatés et rendement réel",
      "Installateurs certifiés RGE : comment les départager, région par région",
      "Aides, autoconsommation et retour sur investissement",
      "Stockage et pilotage de la production",
    ],
    imageAlt: "Rangées de panneaux solaires dans un champ sous un ciel nuageux",
    name: "Énergie & Solaire",
    short: "Solaire",
    tone: "rouge",
    description:
      "Photovoltaïque, autoconsommation, aides et installateurs certifiés.",
  },
  {
    slug: "green-tech",
    angles: [
      "Éco-conception des services numériques et sobriété des interfaces",
      "Mesure de l'empreinte carbone : outils et méthodes vérifiables",
      "Datacenters bas carbone et récupération de chaleur",
      "Startups françaises de la transition : ce qu'elles font vraiment",
    ],
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
  /** genre affiché en surtitre : « Comparatif », « Guide », « Enquête »… */
  kind?: string;
  /** titre optimisé pour la balise <title> (sinon `title`) */
  metaTitle?: string;
  excerpt: string;
  /** meta description ≤ 160 caractères (sinon `excerpt` tronqué) */
  metaDescription?: string;
  category: CategorySlug;
  /** clé de l'auteur dans lib/authors.ts */
  author: AuthorSlug;
  /** précision de transparence affichée sous la signature */
  authorNote?: string;
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
  /** méthodologie appliquée — alimente `isBasedOn` */
  methodology?: { name: string; href: string };
  /**
   * Études produites par la rédaction, balisées en `Dataset` : c'est ce qui
   * distingue nos comparatifs des contenus qui recopient les benchmarks
   * publics, et ce que les moteurs génératifs peuvent citer nommément.
   */
  datasets?: {
    name: string;
    description: string;
    /** période couverte, format ISO (AAAA-MM) */
    date: string;
    /** grandeurs mesurées */
    measured: string[];
  }[];
  /**
   * Classement noté par la rédaction : balisé en ItemList de Product évalués,
   * pour que le verdict soit citable produit par produit.
   */
  ranking?: {
    name: string;
    /** note sur 10 attribuée par la rédaction */
    score: number;
    /** offre ou formule évaluée */
    offer?: string;
    verdict: string;
  }[];
};

export const articles: Article[] = [
  {
    slug: "claude-ou-chatgpt-selon-votre-metier",
    kind: "Guide",
    title: "Claude ou ChatGPT selon votre métier : le guide par cas d'usage",
    metaTitle: "Claude ou ChatGPT selon votre métier : le guide 2026",
    excerpt:
      "Rédacteur, développeur, marketeur, dirigeant de PME : le bon assistant dépend de ce que vous en faites. Notre guide de choix métier par métier, sources à l'appui.",
    metaDescription:
      "Claude ou ChatGPT selon votre métier : rédaction, code, marketing, PME et création visuelle comparés cas d'usage par cas d'usage, avec les chiffres publiés en 2026.",
    category: "intelligence-artificielle",
    author: "lucas-lecoq",
    authorNote:
      "Les chiffres cités dans ce guide proviennent d'études publiées par des tiers, indiquées à chaque affirmation. Ils complètent, sans les remplacer, les mesures que la rédaction conduit elle-même dans ses comparatifs.",
    date: "2026-07-21",
    dateLabel: "21 juillet 2026",
    readingTime: 11,
    seed: 105,
    imageAlt:
      "Réunion d'équipe autour d'une table de conférence, ordinateurs portables ouverts",
    topics: [
      "Claude",
      "ChatGPT",
      "Rédaction assistée par IA",
      "Assistance au code",
      "Marketing de contenu",
      "Productivité en entreprise",
    ],
  },
  {
    slug: "meilleur-hebergeur-web-2026",
    title:
      "Meilleur hébergeur web : comparatif 2026 pour les entreprises françaises",
    metaTitle: "Meilleur hébergeur web 2026 : comparatif entreprises",
    excerpt:
      "Trois types de sites déployés chez chaque hébergeur, performances mesurées depuis Paris et coût réel calculé sur trois ans : notre comparatif des cinq hébergeurs web qui comptent en France.",
    metaDescription:
      "Quel hébergeur web choisir en 2026 ? TTFB mesurés sur site vitrine, PrestaShop et WordPress, coût réel sur 3 ans et conformité RGPD : o2switch, Infomaniak, Hostinger, OVHcloud, PlanetHoster.",
    category: "hebergement-web",
    author: "lucas-lecoq",
    authorNote:
      "Lucas a mené les tests de performance de ce comparatif en direct, via le Protocole JDLT : déploiement réel de trois types de sites chez chaque hébergeur, mesures GTmetrix Pro et Pingdom depuis Paris, calcul du coût réel sur trois ans.",
    date: "2026-07-21",
    dateLabel: "21 juillet 2026",
    readingTime: 19,
    seed: 104,
    imageAlt:
      "Ingénieure consultant une tablette dans une allée de baies de serveurs éclairée en bleu",
    topics: [
      "Hébergement web",
      "o2switch",
      "Infomaniak",
      "Hostinger",
      "OVHcloud",
      "PlanetHoster",
      "PrestaShop",
      "Core Web Vitals",
      "RGPD",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Performances des hébergeurs web sur trois types de sites (Protocole JDLT)",
        description:
          "Un site vitrine HTML statique, une boutique PrestaShop de 50 produits et un site WordPress standard déployés chez chaque hébergeur, mesurés depuis Paris avec GTmetrix Pro et Pingdom, moyenne de cinq tests par site. Résultats : 89 ms de TTFB sur HTML statique pour o2switch contre 312 ms pour OVHcloud, et jusqu'à 847 ms sur PrestaShop.",
        date: "2026-07",
        measured: [
          "TTFB moyen sur site vitrine HTML (ms)",
          "TTFB moyen sur PrestaShop (ms)",
          "TTFB moyen sur WordPress (ms)",
          "LCP et score PageSpeed",
          "Disponibilité mesurée sur 30 jours (%)",
        ],
      },
      {
        name: "Coût réel d'un hébergement web sur trois ans (Protocole JDLT)",
        description:
          "Coût total sur 36 mois, renouvellement inclus, en euros TTC, pour un site standard sans nom de domaine. Résultats : 248 € chez Infomaniak, 260 € chez OVHcloud, 302 € chez o2switch, 360 à 430 € chez Hostinger et jusqu'à 576 € chez PlanetHoster.",
        date: "2026-07",
        measured: [
          "Prix promotionnel de la première année (€/mois)",
          "Prix de renouvellement (€/mois)",
          "Coût total sur 36 mois (€ TTC)",
        ],
      },
    ],
    ranking: [
      {
        name: "o2switch",
        offer: "Grow",
        score: 9.2,
        verdict:
          "Meilleures performances du panel sur les trois types de sites et tarif stable au renouvellement.",
      },
      {
        name: "Infomaniak",
        offer: "Starter",
        score: 8.8,
        verdict:
          "Le moins cher sur trois ans, prix identique au renouvellement et certifications environnementales complètes.",
      },
      {
        name: "Hostinger",
        offer: "Premium",
        score: 8.4,
        verdict:
          "Bon rapport qualité-prix la première année, à condition d'anticiper un renouvellement deux à quatre fois plus élevé.",
      },
      {
        name: "PlanetHoster",
        offer: "The World",
        score: 7.9,
        verdict:
          "Isolation par projet et sauvegardes longues, mais le coût sur trois ans le plus élevé du panel.",
      },
      {
        name: "OVHcloud",
        offer: "Perso",
        score: 7.5,
        verdict:
          "Infrastructure française complète, pénalisée par des performances faibles sur l'offre mutualisée d'entrée.",
      },
    ],
  },
  {
    slug: "claude-vs-chatgpt",
    title: "Claude vs ChatGPT : le comparatif complet pour choisir en 2026",
    metaTitle: "Claude vs ChatGPT 2026 : le comparatif complet",
    excerpt:
      "Raisonnement, code, français, RGPD, coût réel de l'API : notre comparatif complet de Claude et ChatGPT, benchmarks vérifiés et simulation chiffrée pour une PME française à l'appui.",
    metaDescription:
      "Claude ou ChatGPT en 2026 ? Benchmarks vérifiés, tests en français, conformité RGPD et coût réel de l'API comparés pour les entreprises françaises.",
    category: "intelligence-artificielle",
    author: "lucas-lecoq",
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
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Test de fiabilité en français — Claude Sonnet 5 vs GPT-5.5 (Protocole JDLT)",
        description:
          "Cinquante prompts standardisés en français professionnel soumis aux deux modèles dans les mêmes conditions, notés sur la cohérence stylistique, la précision lexicale, l'absence de calques anglais et le respect des conventions typographiques françaises. Résultat : 88 % de sorties exploitables sans correction pour Claude, 74 % pour ChatGPT.",
        date: "2026-07",
        measured: [
          "Taux de sorties sans correction nécessaire (%)",
          "Calques syntaxiques anglais",
          "Conformité typographique française",
        ],
      },
      {
        name: "Simulation de coût réel API pour une PME française (Protocole JDLT)",
        description:
          "Coût mensuel calculé pour un cas d'usage documenté — 200 appels API de synthèse de comptes-rendus, 4 000 tokens en entrée et 700 en sortie par appel — aux tarifs en vigueur au 21 juillet 2026. Résultat : environ 3,00 $ avec Claude Sonnet 5 contre 4,10 $ avec GPT-5.4, soit 27 % d'écart.",
        date: "2026-07",
        measured: [
          "Coût mensuel en dollars",
          "Tokens en entrée et en sortie",
          "Écart de prix entre modèles (%)",
        ],
      },
    ],
  },
  {
    slug: "meilleur-hebergeur-wordpress",
    title:
      "Meilleur hébergeur WordPress : comparatif 2026 pour les entreprises françaises",
    metaTitle: "Meilleur hébergeur WordPress 2026 : comparatif entreprises",
    excerpt:
      "Performances mesurées depuis Paris, coût réel calculé sur trois ans, support et conformité RGPD : notre comparatif des cinq hébergeurs WordPress qui comptent pour une entreprise française.",
    metaDescription:
      "Quel hébergeur WordPress choisir en 2026 ? TTFB mesurés, coût réel sur 3 ans renouvellement inclus, support français et RGPD comparés : o2switch, Infomaniak, Hostinger, OVH, PlanetHoster.",
    category: "hebergement-web",
    author: "lucas-lecoq",
    date: "2026-07-21",
    dateLabel: "21 juillet 2026",
    readingTime: 16,
    seed: 102,
    imageAlt:
      "Câbles réseau colorés branchés sur un commutateur dans une baie de serveurs",
    topics: [
      "WordPress",
      "Hébergement web",
      "o2switch",
      "Infomaniak",
      "Hostinger",
      "OVHcloud",
      "PlanetHoster",
      "RGPD",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Test de performance des hébergeurs WordPress depuis Paris (Protocole JDLT)",
        description:
          "Site WordPress identique déployé chez chaque hébergeur (thème Astra, 10 pages, sans plugin de cache tiers), mesuré depuis Paris avec GTmetrix Pro et Pingdom, moyenne de cinq tests consécutifs. Résultats : 312 ms de TTFB pour o2switch, 418 ms pour Infomaniak, 487 ms pour Hostinger, 641 ms pour OVH.",
        date: "2026-07",
        measured: [
          "TTFB moyen (ms)",
          "LCP moyen (s)",
          "Disponibilité mesurée sur 30 jours (%)",
        ],
      },
      {
        name: "Coût réel d'un hébergement WordPress sur trois ans (Protocole JDLT)",
        description:
          "Coût total sur 36 mois, renouvellement inclus, en euros TTC, pour un site WordPress standard sans nom de domaine. Résultats : 207 € chez Infomaniak, 245 € chez OVH, 252 € chez o2switch, 300 à 360 € chez Hostinger et jusqu'à 576 € chez PlanetHoster.",
        date: "2026-07",
        measured: [
          "Prix promotionnel de la première année (€/mois)",
          "Prix de renouvellement (€/mois)",
          "Coût total sur 36 mois (€ TTC)",
        ],
      },
    ],
    ranking: [
      {
        name: "o2switch",
        offer: "Grow",
        score: 9.2,
        verdict:
          "Meilleures performances mesurées et tarif stable au renouvellement : notre recommandation pour une entreprise française.",
      },
      {
        name: "Infomaniak",
        offer: "Starter",
        score: 8.8,
        verdict:
          "Le moins cher sur trois ans, prix identique au renouvellement et certifications environnementales les plus complètes.",
      },
      {
        name: "Hostinger",
        offer: "Premium",
        score: 8.4,
        verdict:
          "Excellent prix d'appel, mais un renouvellement deux à quatre fois plus élevé qu'il faut anticiper.",
      },
      {
        name: "PlanetHoster",
        offer: "World Standard",
        score: 7.8,
        verdict:
          "Isolation par projet et sauvegardes longues, au prix du coût sur trois ans le plus élevé du panel.",
      },
      {
        name: "OVHcloud",
        offer: "WordPress Perso",
        score: 7.5,
        verdict:
          "Infrastructure française à prix d'entrée bas, mais performances décevantes sur l'offre mutualisée.",
      },
    ],
  },
  {
    slug: "notion-vs-obsidian",
    title: "Notion vs Obsidian : quel outil choisir en 2026",
    metaTitle: "Notion vs Obsidian 2026 : le comparatif chiffré",
    excerpt:
      "Coût total pour une équipe de dix personnes, performances mesurées sur 500 notes, collaboration et souveraineté des données : notre comparatif chiffré de Notion et Obsidian.",
    metaDescription:
      "Notion ou Obsidian en 2026 ? Coût réel sur 12 mois pour 10 personnes, benchmark mesuré sur 500+ notes, collaboration et RGPD comparés pour les entreprises françaises.",
    category: "saas-logiciels",
    author: "lucas-lecoq",
    date: "2026-07-21",
    dateLabel: "21 juillet 2026",
    readingTime: 14,
    seed: 103,
    imageAlt:
      "Carnet de notes ouvert avec un stylo plume et une paire de lunettes posés sur un bureau",
    topics: [
      "Notion",
      "Obsidian",
      "Gestion de connaissances",
      "Prise de notes",
      "Markdown",
      "Logiciel collaboratif",
      "RGPD",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Coût total de possession de Notion et Obsidian pour une équipe de dix personnes (Protocole JDLT)",
        description:
          "Coût sur douze mois pour dix utilisateurs, tous postes inclus : abonnements, licences, intégrations et plugins, complété par une estimation du temps d'implémentation. Résultats : environ 2 400 $ pour Notion Business contre 980 $ pour Obsidian Sync Standard et licence commerciale, soit 59 % d'écart avant intégration du coût humain.",
        date: "2026-07",
        measured: [
          "Coût annuel des abonnements (dollars)",
          "Coût des licences et intégrations (dollars)",
          "Temps d'implémentation par utilisateur (heures)",
        ],
      },
      {
        name: "Benchmark de performance de Notion et Obsidian sur 500+ notes (Protocole JDLT)",
        description:
          "Mesures effectuées sur MacBook Pro M3 sous macOS Sequoia 15.4, sur une base de 512 notes et pages, moyenne de cinq mesures consécutives. Résultats : 0,4 s de démarrage pour Obsidian contre 3,1 s pour Notion, et une consommation mémoire 2,5 à 3 fois inférieure.",
        date: "2026-07",
        measured: [
          "Temps de démarrage de l'application (s)",
          "Temps de chargement d'une page et d'une base (s)",
          "Temps de recherche plein texte (s)",
          "Mémoire vive consommée au repos et sous charge (Mo)",
        ],
      },
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
