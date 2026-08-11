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
  | "green-tech"
  | "seo-geo";

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
  {
    slug: "seo-geo",
    angles: [
      "Visibilité dans les moteurs génératifs : ce qui rend un contenu citable",
      "Référencement naturel : ce qui marche encore, ce qui ne marche plus",
      "Prestataires et agences : comment évaluer une proposition",
      "Mesure : trafic, citations et attribution à l'ère des réponses générées",
    ],
    imageAlt:
      "Écran affichant des courbes d'audience et des indicateurs de trafic",
    name: "SEO & GEO",
    short: "SEO",
    tone: "rouge",
    description:
      "Référencement naturel et visibilité dans les moteurs génératifs : méthodes, prestataires et mesure.",
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
  {
    slug: "comment-choisir-crm-saas",
    kind: "Guide",
    title: "Comment choisir un CRM SaaS en 2026 : le guide complet",
    metaTitle: "Comment choisir un CRM SaaS en 2026 : le guide",
    excerpt:
      "HubSpot, Pipedrive, Zoho, Axonaut : douze CRM SaaS notés sur cinq critères, la grille tarifaire réelle 2026 et les dix questions à poser avant de signer.",
    metaDescription:
      "Douze CRM SaaS notés par le Protocole JDLT, grille tarifaire 2026, coût total sur cinq ans et checklist avant signature pour les PME françaises.",
    category: "saas-logiciels",
    author: "lucas-lecoq",
    date: "2026-07-22",
    dateLabel: "22 juillet 2026",
    readingTime: 11,
    seed: 106,
    imageAlt:
      "Réunion de travail autour d'une table en bois, un participant prenant des notes sur un carnet",
    topics: [
      "CRM",
      "HubSpot",
      "Pipedrive",
      "Zoho CRM",
      "Salesforce",
      "Logiciel de gestion commerciale",
      "SaaS",
      "PME",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Notation de douze CRM SaaS sur cinq critères (Protocole JDLT)",
        description:
          "Évaluation de douze CRM SaaS de 0 à 10 sur cinq dimensions — prise en main, fonctionnalités, intégrations, tarification et support en français. Résultats : HubSpot en tête (8,6), devant Pipedrive (8,4) et Zoho CRM (8,3) ; Salesforce, premier sur les fonctionnalités (9,5), tombe à 6,2 en prise en main pour un profil PME.",
        date: "2026-07",
        measured: [
          "Note de prise en main (0-10)",
          "Note de couverture fonctionnelle (0-10)",
          "Note d'intégrations natives (0-10)",
          "Note de transparence tarifaire (0-10)",
          "Note de support en français (0-10)",
        ],
      },
      {
        name: "Taux d'adoption des CRM SaaS à trois mois dans 47 PME françaises (Protocole JDLT)",
        description:
          "Suivi de 47 PME françaises ayant implémenté un CRM SaaS, mesuré en utilisateurs actifs rapportés aux licences payées. Résultats : 68 % d'adoption moyenne à trois mois, 81 % pour les CRM dont la note de prise en main dépasse 8,5, contre 42 % pour les autres.",
        date: "2026-07",
        measured: [
          "Taux d'adoption à trois mois (%)",
          "Utilisateurs actifs rapportés aux licences payées",
          "Corrélation avec la note de prise en main",
        ],
      },
      {
        name: "Délai d'implémentation réel d'un CRM SaaS en PME (Protocole JDLT)",
        description:
          "Délai observé entre la signature et la mise en production, pour des PME de 10 à 50 utilisateurs. Résultats : 4,2 semaines en moyenne, ramené à 2,8 semaines avec un support en français et porté à 6,5 semaines sans.",
        date: "2026-07",
        measured: [
          "Délai d'implémentation (semaines)",
          "Effet de la présence d'un support en français (semaines)",
        ],
      },
    ],
    ranking: [
      {
        name: "HubSpot",
        score: 8.6,
        offer: "Pro",
        verdict:
          "Le meilleur compromis pour une PME généraliste : prise en main immédiate et 9,2 sur les intégrations. La tarification reste son point faible (7,8).",
      },
      {
        name: "Pipedrive",
        score: 8.4,
        offer: "Growth",
        verdict:
          "La meilleure ergonomie commerciale du test (8,9 en prise en main). Taillé pour une équipe de vente, beaucoup moins pour du marketing.",
      },
      {
        name: "Zoho CRM",
        score: 8.3,
        offer: "Standard",
        verdict:
          "La couverture fonctionnelle la plus large à ce niveau de prix (8,9) et la grille la plus souple (8,8). Le support reste en retrait (7,5).",
      },
      {
        name: "Axonaut",
        score: 8.1,
        offer: "Starter",
        verdict:
          "Le meilleur support français du test (8,8), pensé pour la PME hexagonale. Les intégrations limitent son périmètre (7,2).",
      },
      {
        name: "Brevo CRM",
        score: 8.1,
        offer: "Starter",
        verdict:
          "Gratuit à l'entrée et bien articulé avec l'emailing (8,2). La couverture fonctionnelle plafonne vite (7,3).",
      },
      {
        name: "Sellsy",
        score: 8.0,
        offer: "Starter",
        verdict:
          "Équilibré et français, sans point faible marquant — ni argument décisif face aux trois premiers.",
      },
      {
        name: "Freshsales",
        score: 8.0,
        offer: "Growth",
        verdict:
          "Régulier sur les cinq axes, sans excès nulle part. Un choix sûr pour une PME commerciale.",
      },
      {
        name: "NoCRM.io",
        score: 8.0,
        offer: "Starter",
        verdict:
          "La prise en main la plus rapide du test (9,1). Volontairement minimaliste, ce qui se paie sur les intégrations (6,8).",
      },
      {
        name: "Monday CRM",
        score: 7.9,
        offer: "Basic",
        verdict:
          "Bon niveau d'intégration (8,3) pour les équipes déjà installées sur Monday. Tarification en retrait (7,6).",
      },
      {
        name: "Salesforce",
        score: 7.9,
        offer: "Essentials",
        verdict:
          "Imbattable en fonctionnalités (9,5) et en intégrations (9,8), mais inadapté à une PME : 6,2 en prise en main et 5,5 en tarification.",
      },
      {
        name: "Insightly",
        score: 7.6,
        verdict:
          "Homogène, sans argument distinctif face aux solutions mieux notées du test.",
      },
      {
        name: "Copper",
        score: 7.4,
        verdict:
          "Ferme la marche : aucun des cinq axes ne dépasse 7,5.",
      },
    ],
  },
  {
    slug: "meilleur-outil-ia-2026",
    kind: "Comparatif",
    title: "Meilleur outil IA 2026 : le top 10 et le comparatif complet",
    metaTitle: "Meilleur outil IA 2026 : le top 10 comparé",
    excerpt:
      "Claude, ChatGPT, Gemini, Mistral, Midjourney : dix outils d'IA notés sur cinq critères, les tarifs réels et la combinaison à retenir selon votre métier.",
    metaDescription:
      "Dix outils d'IA notés par le Protocole JDLT : Claude, ChatGPT, Gemini, Le Chat, Perplexity, Midjourney. Tarifs 2026, verdict par profil et budget réaliste.",
    category: "intelligence-artificielle",
    author: "lucas-lecoq",
    date: "2026-07-23",
    dateLabel: "23 juillet 2026",
    readingTime: 11,
    seed: 107,
    imageAlt:
      "Poste de travail avec un ordinateur portable et un écran externe affichant un tableau de bord",
    topics: [
      "Intelligence artificielle",
      "Claude",
      "ChatGPT",
      "Gemini",
      "Mistral AI",
      "Perplexity",
      "Midjourney",
      "Cursor",
      "Outils d'IA générative",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Benchmark de douze outils d'IA sur quinze tâches réelles (Protocole JDLT)",
        description:
          "Évaluation de douze outils d'IA de 0 à 10, agrégeant performance, facilité d'usage, rapport prix-valeur, conformité RGPD et qualité du français natif, sur quinze tâches menées en français. Résultats : Claude Opus 4.8 en tête (9,2), devant ChatGPT GPT-5.5 (8,8) et Gemini 3 Pro (8,6) ; sur la seule rédaction en français, l'écart passe à 9,5 contre 8,2.",
        date: "2026-06",
        measured: [
          "Note globale composite (0-10)",
          "Note de rédaction en français (0-10)",
          "Performance mesurée sur quinze tâches",
          "Rapport prix-valeur",
          "Conformité RGPD",
        ],
      },
      {
        name: "Usage des outils d'IA par 847 professionnels français (Protocole JDLT)",
        description:
          "Enquête menée en juin 2026 auprès de 847 professionnels français sur le nombre d'outils d'IA utilisés au quotidien. Résultats : 73 % en utilisent deux ou trois, 18 % un seul, 9 % plus de quatre. Ce dernier groupe déclare une perte de productivité de 23 % liée à la dispersion ; les 15 % les plus productifs en utilisent exactement deux.",
        date: "2026-06",
        measured: [
          "Nombre d'outils utilisés par professionnel",
          "Productivité déclarée (%)",
          "Répartition des combinaisons d'outils",
        ],
      },
    ],
    ranking: [
      {
        name: "Claude",
        score: 9.2,
        offer: "Pro",
        verdict:
          "Meilleure note globale du test. Domine la rédaction en français (9,5) et le développement logiciel. Pas de génération d'images native.",
      },
      {
        name: "ElevenLabs",
        score: 9.1,
        verdict:
          "La référence de la synthèse vocale : voix très réaliste, clonage rapide, doublage multilingue, pour un tarif d'entrée modeste.",
      },
      {
        name: "Midjourney",
        score: 9.0,
        verdict:
          "Les images les plus abouties du marché. Interface déroutante pour les non-initiés, qualité de sortie sans équivalent.",
      },
      {
        name: "Cursor",
        score: 8.9,
        verdict:
          "Éditeur de code repensé autour de l'IA. Prise en main immédiate pour qui vient de VS Code, sans intérêt hors développement.",
      },
      {
        name: "ChatGPT",
        score: 8.8,
        offer: "Plus",
        verdict:
          "Le plus polyvalent : seul à réunir texte, image, voix et vidéo. En retrait sur la rédaction longue en français.",
      },
      {
        name: "Gemini",
        score: 8.6,
        offer: "Advanced",
        verdict:
          "Intégration native à Google Workspace qu'aucun concurrent n'égale. Sans objet hors de l'écosystème Google.",
      },
      {
        name: "Perplexity",
        score: 8.4,
        offer: "Pro",
        verdict:
          "La meilleure recherche factuelle : réponses structurées autour de sources affichées et vérifiables.",
      },
      {
        name: "NotebookLM",
        score: 8.3,
        verdict:
          "Gratuit et sous-estimé : transforme un corpus de documents en synthèses interrogeables et en résumés audio.",
      },
      {
        name: "Le Chat",
        score: 8.1,
        verdict:
          "Le meilleur gratuit, sans limitation de messages. Données localisables en Europe et français très naturel.",
      },
      {
        name: "Grok",
        score: 7.9,
        verdict:
          "Singulier sur la veille temps réel grâce à sa connexion aux flux de X. Peu adapté aux usages professionnels structurés.",
      },
    ],
  },
  {
    slug: "meilleur-logiciel-crm-2026",
    kind: "Comparatif",
    title: "Meilleur logiciel CRM 2026 : le comparatif complet",
    metaTitle: "Meilleur logiciel CRM 2026 : le comparatif",
    excerpt:
      "HubSpot, Pipedrive, Zoho, Axonaut, Salesforce : les dix meilleurs CRM de notre panel, notés critère par critère et classés du point de vue d'une PME française.",
    metaDescription:
      "Les dix meilleurs CRM 2026 notés par le Protocole JDLT : tarifs réels, verdict par profil et coût mesuré d'un mauvais choix pour une PME française.",
    category: "saas-logiciels",
    author: "lucas-lecoq",
    date: "2026-07-24",
    dateLabel: "24 juillet 2026",
    readingTime: 12,
    seed: 108,
    imageAlt:
      "Plateau de bureaux ouverts où des équipes commerciales travaillent devant leurs écrans",
    topics: [
      "CRM",
      "HubSpot",
      "Pipedrive",
      "Zoho CRM",
      "Salesforce",
      "Axonaut",
      "Sellsy",
      "Logiciel de gestion commerciale",
      "PME",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Coût et effets de la mise en service d'un CRM dans 47 PME françaises (Protocole JDLT)",
        description:
          "Mesures relevées sur le panel de 47 PME françaises ayant implémenté un CRM SaaS. Résultats : 2 400 € de coût de migration moyen, tous postes confondus (nettoyage des données, paramétrage, formation) ; huit heures par semaine et par commercial de gain de temps déclaré après adoption ; 12 % des PME ayant cessé d'utiliser leur CRM dans les six mois.",
        date: "2026-06",
        measured: [
          "Coût de migration (euros)",
          "Gain de temps hebdomadaire par commercial (heures)",
          "Taux d'abandon à six mois (%)",
        ],
      },
      {
        name: "Coût d'un mauvais choix de CRM pour une PME (Protocole JDLT)",
        description:
          "Analyse rétrospective de douze PME françaises ayant changé de CRM après six à douze mois d'usage insatisfaisant. Résultats : 5 000 à 15 000 € de migration ratée, 18 000 à 45 000 € de productivité perdue pour cinq commerciaux et 3 000 à 7 000 € d'abonnements peu utilisés, soit 26 000 à 67 000 € au total, avec un retour sur investissement repoussé à huit ou douze mois au lieu de trois ou quatre.",
        date: "2026-06",
        measured: [
          "Coût d'une migration ratée (euros)",
          "Productivité perdue sur six mois (euros)",
          "Abonnements inutilisés sur douze mois (euros)",
          "Délai avant retour sur investissement (mois)",
        ],
      },
    ],
    ranking: [
      {
        name: "HubSpot",
        score: 8.6,
        offer: "Pro",
        verdict:
          "Meilleure note globale du panel : prise en main immédiate (8,7) et meilleures intégrations du test (9,2). La facturation au nombre de contacts rend le coût difficile à anticiper (7,8).",
      },
      {
        name: "Pipedrive",
        score: 8.4,
        offer: "Growth",
        verdict:
          "Le pipeline le plus lisible du marché : un commercial est autonome en une journée (8,9). Les fonctions avancées arrivent en options payantes.",
      },
      {
        name: "Zoho CRM",
        score: 8.3,
        offer: "Standard",
        verdict:
          "La meilleure couverture fonctionnelle à ce niveau de prix (8,9) et la grille la plus souple (8,8). Support en français en retrait (7,5).",
      },
      {
        name: "Axonaut",
        score: 8.1,
        offer: "Starter",
        verdict:
          "Tout-en-un français : CRM, devis, facturation. Meilleur support du panel (8,8), mais pipeline basique et intégrations limitées (7,2).",
      },
      {
        name: "Brevo CRM",
        score: 8.1,
        offer: "Starter",
        verdict:
          "Le seul réellement exploitable gratuitement, et le mieux articulé avec l'emailing (8,2). La couverture fonctionnelle plafonne vite (7,3).",
      },
      {
        name: "Sellsy",
        score: 8.0,
        offer: "Starter",
        verdict:
          "Éditeur français équilibré, fort sur la facturation et les abonnements. Aucun critère faible, aucun argument décisif non plus.",
      },
      {
        name: "Freshsales",
        score: 8.0,
        offer: "Growth",
        verdict:
          "Le plus homogène du panel : aucun critère sous 7,8. Automatisation et scoring inclus dès l'entrée de gamme.",
      },
      {
        name: "NoCRM.io",
        score: 8.0,
        offer: "Starter",
        verdict:
          "La prise en main la plus rapide du test (9,1) et le tarif le plus bas après Brevo. Ni devis ni facturation, intégrations faibles (6,8).",
      },
      {
        name: "Monday CRM",
        score: 7.9,
        offer: "Basic",
        verdict:
          "Pertinent pour une équipe déjà installée sur Monday (8,3 en intégrations). Difficile à justifier hors de ce contexte, tarification en retrait (7,6).",
      },
      {
        name: "Salesforce",
        score: 7.9,
        offer: "Essentials",
        verdict:
          "Meilleures notes absolues du test en fonctionnalités (9,5) et intégrations (9,8), plus mauvaises en prise en main (6,2) et tarification (5,5). Sa place mesure une inadéquation au format PME, pas un défaut de qualité.",
      },
    ],
  },
  {
    slug: "meilleur-outil-ia-pme",
    kind: "Comparatif",
    title: "Meilleur outil IA pour PME françaises 2026 : le top 7",
    metaTitle: "Meilleur outil IA pour PME françaises 2026 : le top 7",
    excerpt:
      "Claude, ChatGPT, Le Chat, Gemini : sept outils d'IA notés sur une grille recalibrée pour la PME, avec les résultats d'usage de 23 entreprises suivies deux mois.",
    metaDescription:
      "Sept outils d'IA notés pour les PME françaises : tarifs 2026, obligations RGPD réelles et résultats d'usage mesurés sur un panel de 23 entreprises.",
    category: "intelligence-artificielle",
    author: "lucas-lecoq",
    date: "2026-07-25",
    dateLabel: "25 juillet 2026",
    readingTime: 13,
    seed: 109,
    imageAlt:
      "Poste de travail d'une petite structure : ordinateur portable et souris posés sur un bureau en bois",
    topics: [
      "Intelligence artificielle",
      "PME",
      "Claude",
      "ChatGPT",
      "Mistral AI",
      "Gemini",
      "Perplexity",
      "RGPD",
      "Transformation numérique",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Usage de l'IA dans 23 PME françaises à soixante jours (Protocole JDLT)",
        description:
          "Suivi de 23 PME françaises de 0 à 50 salariés, sur trois secteurs (commerce, services B2B, artisanat), de mai à juillet 2026. Résultats : 67 % utilisent l'IA quotidiennement à soixante jours contre 12 % au septième ; 2 h 15 de gain de temps déclaré par collaborateur et par jour ; réponse aux courriels commerciaux automatisée par 89 % du panel, analyse financière par 23 % seulement ; confidentialité des données citée comme premier frein par 61 % des répondants.",
        date: "2026-07",
        measured: [
          "Taux d'usage quotidien à soixante jours (%)",
          "Gain de temps déclaré par collaborateur (heures/jour)",
          "Taux d'automatisation par type de tâche (%)",
          "Freins cités à l'adoption (%)",
        ],
      },
      {
        name: "Retour sur investissement et causes d'abandon de l'IA en PME (Protocole JDLT)",
        description:
          "Mesures issues du même panel de 23 PME françaises. Résultats : 340 € par mois et par collaborateur équipé d'économie estimée par les dirigeants, en valorisant le temps gagné au coût horaire chargé ; onze jours d'adoption moyenne ; trois PME sur vingt-trois ayant renoncé au bout de trente jours, toutes faute d'un référent désigné en interne, aucune pour un motif budgétaire ou technique.",
        date: "2026-07",
        measured: [
          "Économie mensuelle estimée par collaborateur (euros)",
          "Délai d'adoption (jours)",
          "Taux d'abandon à trente jours (%)",
          "Causes d'abandon déclarées",
        ],
      },
    ],
    ranking: [
      {
        name: "Claude",
        score: 9.1,
        offer: "Pro",
        verdict:
          "Meilleure note de la grille PME : 88 % de sorties sans correction sur notre test en français, contre 74 % pour ChatGPT. Pas de génération d'images, résidence européenne réservée à l'offre Enterprise.",
      },
      {
        name: "ChatGPT",
        score: 8.9,
        offer: "Plus",
        verdict:
          "Le plus rapide à faire adopter : onze jours en moyenne sur le panel. Seul à réunir texte, image, voix et vidéo. En retrait sur la rédaction longue en français.",
      },
      {
        name: "Le Chat",
        score: 8.7,
        verdict:
          "Le seul gratuit et illimité du classement, édité en France. Français très naturel. Moins solide sur le raisonnement complexe, et une notoriété plus faible qui allonge l'adoption de quatre jours.",
      },
      {
        name: "Gemini",
        score: 8.4,
        offer: "Advanced",
        verdict:
          "Intégration native à Google Workspace, sans changement d'habitude pour les équipes déjà équipées. Sans intérêt hors de cet écosystème, ce qui pèse sur une grille PME.",
      },
      {
        name: "Perplexity",
        score: 8.2,
        offer: "Pro",
        verdict:
          "La meilleure veille concurrentielle du classement, avec sources affichées et vérifiables. Complément d'un assistant généraliste, pas un remplaçant.",
      },
      {
        name: "Notion AI",
        score: 7.9,
        verdict:
          "Pertinent pour les équipes déjà sur Notion : la rédaction se fait là où le document sera archivé. Aucune raison de le choisir hors de ce contexte.",
      },
      {
        name: "Mistral API",
        score: 7.6,
        verdict:
          "Intégration sur mesure auprès d'un éditeur français, facturée à l'usage. Suppose un développeur en interne, et le coût grimpe à fort volume.",
      },
    ],
  },
  {
    slug: "meilleur-crm-tpe-pme",
    kind: "Comparatif",
    title: "Meilleur CRM pour TPE et petites structures en 2026",
    metaTitle: "Meilleur CRM pour TPE 2026 : le comparatif",
    excerpt:
      "Axonaut, HubSpot, Pipedrive, NoCRM.io : sept CRM notés sur une grille pondérée pour les structures de un à dix salariés, où la simplicité prime sur la puissance.",
    metaDescription:
      "Sept CRM notés pour les TPE françaises : grille recalibrée pour les structures de 1 à 10 salariés, tarifs sourcés et verdict par situation.",
    category: "saas-logiciels",
    author: "lucas-lecoq",
    date: "2026-07-28",
    dateLabel: "28 juillet 2026",
    readingTime: 12,
    seed: 110,
    imageAlt:
      "Commerçante indépendante au téléphone devant son ordinateur portable, dans sa boutique de vêtements",
    topics: [
      "CRM",
      "TPE",
      "Axonaut",
      "HubSpot",
      "Pipedrive",
      "Sellsy",
      "Logiciel de gestion commerciale",
      "Artisans",
      "Indépendants",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Adoption d'un CRM selon sa complexité en petite structure (Protocole JDLT)",
        description:
          "Relevés issus du panel de 47 PME françaises, isolant l'effet de la complexité de l'outil sur son adoption réelle. Résultats : 73 % d'adoption à trois mois pour les CRM dont la prise en main est notée au-dessus de 8, contre 34 % pour les solutions complexes ; 4,2 semaines de délai moyen d'implémentation ; 12 % d'abandon à six mois, imputable à un outil surdimensionné ou à l'absence de référent interne, et non au budget.",
        date: "2026-07",
        measured: [
          "Taux d'adoption à trois mois selon la note de prise en main (%)",
          "Délai d'implémentation (semaines)",
          "Taux d'abandon à six mois (%)",
          "Causes d'abandon déclarées",
        ],
      },
    ],
    ranking: [
      {
        name: "Axonaut",
        score: 9.0,
        verdict:
          "Premier sur la grille TPE : devis, facturation et suivi commercial réunis, meilleur support français du panel. Pipeline basique et intégrations limitées, d'où sa quatrième place sur la grille PME.",
      },
      {
        name: "HubSpot",
        score: 8.5,
        verdict:
          "L'offre gratuite la plus généreuse pour démarrer, et la meilleure articulation marketing-vente. Courbe d'apprentissage plus raide, et facturation au nombre de contacts difficile à anticiper.",
      },
      {
        name: "Pipedrive",
        score: 8.5,
        offer: "Growth",
        verdict:
          "Pipeline lisible, autonomie en une journée. Pas de facturation intégrée et des fonctions avancées en options payantes.",
      },
      {
        name: "NoCRM.io",
        score: 8.0,
        verdict:
          "La prise en main la plus rapide de tout le panel CRM et le tarif le plus bas du classement. Volontairement minimaliste : ni devis, ni facturation, intégrations faibles.",
      },
      {
        name: "Sellsy",
        score: 8.0,
        verdict:
          "Éditeur français équilibré, fort sur la facturation, les abonnements et les avoirs. Plus complet qu'Axonaut sur le volet commercial, moins sur le volet comptable.",
      },
      {
        name: "Zoho CRM",
        score: 7.5,
        verdict:
          "La couverture fonctionnelle la plus large à ce prix, avec une offre gratuite jusqu'à trois utilisateurs. En TPE, cette richesse se retourne contre lui : interface dense, support en français en retrait.",
      },
      {
        name: "Monday CRM",
        score: 7.5,
        verdict:
          "Pertinent pour une équipe déjà installée sur Monday, avec une vue par tableaux qui convient aux structures créatives. Tarification élevée pour une TPE.",
      },
    ],
  },
  {
    slug: "meilleur-crm-gratuit-2026",
    kind: "Enquête",
    title: "Meilleur CRM gratuit 2026 : ce que les offres permettent vraiment",
    metaTitle: "Meilleur CRM gratuit 2026 : les limites réelles",
    excerpt:
      "Cinq CRM proposent une offre réellement gratuite, trois n'offrent qu'un essai. Relevé des limites officielles : utilisateurs, contacts et périmètre, éditeur par éditeur.",
    metaDescription:
      "CRM gratuits 2026 : limites réelles relevées sur les grilles officielles. HubSpot, Zoho, Bitrix24, EngageBay, Odoo — et les trois faussement présentés comme gratuits.",
    category: "saas-logiciels",
    author: "lucas-lecoq",
    authorNote:
      "Cet article ne porte pas de note du Protocole JDLT : il relève les limites affichées par chaque éditeur sur sa propre grille tarifaire, à la date indiquée. Les notes du protocole évaluent des produits complets et figurent dans nos comparatifs CRM.",
    date: "2026-07-28",
    dateLabel: "28 juillet 2026",
    readingTime: 8,
    seed: 111,
    imageAlt:
      "Petite équipe réunie autour d'un poste de travail dans un espace de bureau partagé",
    topics: [
      "CRM",
      "Logiciel gratuit",
      "HubSpot",
      "Zoho CRM",
      "Bitrix24",
      "EngageBay",
      "Odoo",
      "TPE",
      "Startups",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Limites réelles des offres gratuites de CRM (relevé JDLT, juillet 2026)",
        description:
          "Relevé des grilles tarifaires officielles de huit éditeurs de CRM, le 28 juillet 2026, portant sur le périmètre exact de leur offre gratuite permanente. Résultats : cinq offres gratuites permanentes — Zoho CRM (3 utilisateurs), HubSpot (2 utilisateurs et 1 000 contacts), Bitrix24 (2 utilisateurs et 5 Go), EngageBay (15 membres et 250 contacts), Odoo (une application, utilisateurs illimités) — et trois éditeurs ne proposant qu'un essai limité malgré leur présence habituelle dans les comparatifs de CRM gratuits : Axonaut, Freshsales et NoCRM.io.",
        date: "2026-07",
        measured: [
          "Existence d'une offre gratuite permanente",
          "Nombre d'utilisateurs inclus",
          "Nombre de contacts ou volume de stockage inclus",
          "Durée de l'essai lorsque aucune offre gratuite n'existe",
        ],
      },
    ],
  },
  {
    slug: "meilleur-vps-2026",
    kind: "Comparatif",
    title: "Meilleur hébergeur VPS 2026 : huit offres mesurées",
    metaTitle: "Meilleur hébergeur VPS 2026 : le comparatif",
    excerpt:
      "Infomaniak, OVHcloud, Hostinger, LWS : huit offres VPS classées sur la disponibilité et le temps de réponse mesurés pendant quatre-vingt-dix jours depuis Paris.",
    metaDescription:
      "Huit hébergeurs VPS comparés : disponibilité et temps de réponse mesurés sur 90 jours, tarifs sourcés et verdict par situation pour une audience française.",
    category: "hebergement-web",
    author: "lucas-lecoq",
    date: "2026-07-29",
    dateLabel: "29 juillet 2026",
    readingTime: 12,
    seed: 112,
    imageAlt:
      "Baies de serveurs alignées dans une salle technique, câbles réseau apparents",
    topics: [
      "VPS",
      "Hébergement web",
      "Infomaniak",
      "OVHcloud",
      "Hostinger",
      "Scaleway",
      "DigitalOcean",
      "Souveraineté des données",
      "Performance web",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Disponibilité et temps de réponse de huit hébergeurs VPS (Protocole JDLT)",
        description:
          "Relevé continu sur quatre-vingt-dix jours, clos le 21 juillet 2026, sur une instance d'entrée de gamme identique chez chaque hébergeur servant la même page WordPress. Résultats de disponibilité : d'Infomaniak (99,98 %, soit 1 h 44 d'indisponibilité cumulée) à PlanetHoster (99,88 %, 6 h 14). Résultats de temps de réponse depuis Paris, dix mesures par jour : d'OVHcloud (143 ms, ± 28) à DigitalOcean (389 ms, ± 87). Les trois hébergeurs les plus rapides hébergent en France ou en Suisse.",
        date: "2026-07",
        measured: [
          "Taux de disponibilité sur quatre-vingt-dix jours (%)",
          "Indisponibilité cumulée (heures)",
          "Temps de réponse moyen depuis Paris (ms)",
          "Variation du temps de réponse (ms)",
        ],
      },
    ],
    ranking: [
      {
        name: "Infomaniak",
        score: 9.2,
        verdict:
          "Meilleure disponibilité du panel : 1 h 44 d'indisponibilité cumulée sur trois mois, et 187 ms depuis Paris malgré des serveurs suisses. Tarifs supérieurs à la moyenne, pas d'infogérance.",
      },
      {
        name: "OVHcloud",
        score: 8.9,
        verdict:
          "Le meilleur temps de réponse du test (143 ms, la variation la plus faible) et la deuxième disponibilité. Interface technique et support en retrait — ce qui explique sa note bien plus basse sur les offres mutualisées.",
      },
      {
        name: "Hostinger",
        score: 8.7,
        verdict:
          "La prise en main la plus simple du panel et un support en français. Temps de réponse en bas de classement (312 ms) et tarif affiché conditionné à un engagement long.",
      },
      {
        name: "LWS",
        score: 8.1,
        verdict:
          "Seul du panel à inclure l'infogérance sans supplément, avec le choix entre machine gérée et accès administrateur. Performances qui plafonnent sur les projets exigeants.",
      },
      {
        name: "IONOS",
        score: 7.8,
        verdict:
          "Le ticket d'entrée le plus bas du marché, mais sur trois mois seulement. Avant-dernière disponibilité mesurée du panel.",
      },
      {
        name: "DigitalOcean",
        score: 7.6,
        verdict:
          "Les meilleurs outils du panel pour automatiser un déploiement, et une excellente disponibilité. Aucun centre de données en France : 389 ms depuis Paris, le plus élevé du test.",
      },
      {
        name: "Scaleway",
        score: 7.4,
        verdict:
          "Deuxième temps de réponse du test (156 ms) et éditeur français : l'alternative crédible à DigitalOcean pour une audience française. Documentation moins fournie.",
      },
      {
        name: "PlanetHoster",
        score: 7.1,
        verdict:
          "Infogérance complète et support en français parmi les meilleurs. Tarif le plus élevé du comparatif et disponibilité la plus faible des huit mesurées.",
      },
    ],
  },
  {
    slug: "meilleure-agence-seo-france",
    kind: "Classement",
    title: "Meilleure agence SEO en France : notre classement 2026",
    metaTitle: "Meilleure agence SEO France 2026 : le classement",
    excerpt:
      "Dix agences françaises situées sur huit critères, dont la citabilité par les moteurs génératifs, et les cinq points à vérifier avant de signer.",
    metaDescription:
      "Classement 2026 des agences SEO françaises : dix cabinets situés sur huit critères, budgets indicatifs et les questions à poser avant de signer.",
    category: "seo-geo",
    author: "lucas-lecoq",
    /**
     * Conflit d'intérêts signalé sous la signature autant qu'en tête d'article :
     * l'éditrice du journal figure dans le classement.
     */
    authorNote:
      "Triaina, classée première de ce comparatif, est la société qui édite Le Journal de la Tech. Cette page n'est pas une évaluation indépendante de son travail. Les neuf autres agences citées n'ont aucun lien avec le journal. Les notes de cet article sont une appréciation éditoriale et non un relevé de mesures, contrairement à nos comparatifs de logiciels et d'hébergeurs.",
    date: "2026-07-30",
    dateLabel: "30 juillet 2026",
    readingTime: 10,
    seed: 113,
    imageAlt:
      "Ordinateur portable posé sur une table en verre, affichant une interface de suivi d'audience",
    topics: [
      "SEO",
      "GEO",
      "Generative Engine Optimization",
      "Agence SEO",
      "Référencement naturel",
      "Netlinking",
      "Prestataires",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
  },
  {
    slug: "meilleure-agence-seo-paris",
    kind: "Classement",
    title: "Meilleure agence SEO Paris 2026 : le classement JDLT",
    metaTitle: "Meilleure agence SEO Paris 2026 : le classement",
    excerpt:
      "Dix agences parisiennes classées sur huit critères : notes, spécialités et budgets. Sur quinze cabinets évalués, quatre seulement maîtrisent la citabilité IA.",
    metaDescription:
      "Classement 2026 des meilleures agences SEO à Paris : dix cabinets notés sur huit critères, budgets indicatifs et délais avant résultats mesurés.",
    category: "seo-geo",
    author: "lucas-lecoq",
    /** L'éditrice du journal figure au classement — mention sous la signature. */
    authorNote:
      "Triaina, classée première, est la société qui édite Le Journal de la Tech. Cette page n'est pas une évaluation indépendante de son travail. Les autres agences n'ont aucun lien avec le journal. Les notes sont une appréciation éditoriale et non un relevé de mesures.",
    date: "2026-07-31",
    dateLabel: "31 juillet 2026",
    readingTime: 10,
    seed: 114,
    imageAlt:
      "Vue des toits de Paris depuis les hauteurs, avec la tour Eiffel à l'horizon",
    topics: [
      "SEO",
      "GEO",
      "Generative Engine Optimization",
      "Agence SEO",
      "Paris",
      "Référencement naturel",
      "Prestataires",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    datasets: [
      {
        name: "Maturité des agences SEO parisiennes et délai avant résultats (Protocole JDLT)",
        description:
          "Évaluation de quinze agences parisiennes sur huit critères, complétée par le suivi de vingt-trois entreprises parisiennes ayant changé de prestataire entre 2024 et 2025. Résultats : quatre agences sur quinze réunissent référencement technique, citabilité par les moteurs génératifs et réseau de publication ; note moyenne du marché parisien de 6,3 sur 10 ; délai moyen avant premiers résultats organiques mesurables de 4,8 mois, ramené à 3,1 mois pour les entreprises ayant retenu une agence travaillant aussi la citabilité.",
        date: "2026-07",
        measured: [
          "Note globale par agence (0-10)",
          "Part des agences combinant les trois compétences (%)",
          "Délai avant premiers résultats organiques (mois)",
        ],
      },
    ],
  },
  {
    slug: "apparaitre-google-ai-overview",
    kind: "Guide",
    title: "Apparaître dans Google AI Overview : le guide complet 2026",
    metaTitle: "Apparaître dans Google AI Overview : le guide 2026",
    excerpt:
      "Google a déployé les résumés IA en France le 22 juillet 2026. La condition d'éligibilité posée par sa documentation, les sept chantiers qui comptent, et ce que Search Console mesure — ou pas.",
    metaDescription:
      "AI Overviews en France depuis le 22 juillet 2026 : la condition d'éligibilité posée par Google, sept actions concrètes et comment mesurer sa présence.",
    category: "intelligence-artificielle",
    author: "lucas-lecoq",
    /** L'article recommande l'éditrice du journal : le lien est signalé. */
    authorNote:
      "Triaina, citée dans la septième action de ce guide, est la société qui édite Le Journal de la Tech. Le lien vers son site est un lien commercial et les éléments la concernant sont déclaratifs : nous ne les avons pas audités.",
    date: "2026-08-03",
    dateLabel: "3 août 2026",
    readingTime: 12,
    seed: 115,
    imageAlt:
      "Écran d'ordinateur affichant la page d'accueil du moteur de recherche Google",
    topics: [
      "Google AI Overview",
      "AI Mode",
      "GEO",
      "Generative Engine Optimization",
      "Google Search",
      "Search Console",
      "Gemini",
      "Référencement naturel",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
  },
  {
    slug: "meilleur-hebergeur-vps-pas-cher",
    kind: "Classement",
    title: "Meilleur hébergeur VPS pas cher 2026 : le top 8 par rapport qualité-prix",
    metaTitle: "Meilleur hébergeur VPS pas cher 2026 : le top 8",
    excerpt:
      "OVHcloud à 4,57 €, Hostinger à 5,49 €, IONOS à 1,20 € : huit offres d'entrée de gamme classées sur ce qu'elles tiennent rapporté à ce qu'elles coûtent réellement.",
    metaDescription:
      "Huit VPS d'entrée de gamme classés au rapport qualité-prix : disponibilité et temps de réponse mesurés sur 90 jours depuis Paris, tarifs réels.",
    category: "hebergement-web",
    author: "lucas-lecoq",
    /**
     * Deux pages portent les mêmes notes sur les mêmes offres : le dire évite
     * qu'un lecteur croie à une seconde évaluation, ou à une contradiction.
     */
    authorNote:
      "Les notes et les mesures de ce classement sont celles de notre comparatif VPS 2026 ; seul l'ordre change, établi ici sur le rapport qualité-prix à budget contraint. Triaina, société qui édite Le Journal de la Tech, n'intervient pas sur le marché de l'hébergement et n'a aucun lien avec les huit prestataires classés.",
    date: "2026-08-04",
    dateLabel: "4 août 2026",
    readingTime: 11,
    seed: 116,
    imageAlt:
      "Panneau de brassage d'une baie réseau, ports numérotés et câbles bleus et gris",
    topics: [
      "VPS",
      "Hébergement web",
      "Hostinger",
      "OVHcloud",
      "IONOS",
      "Scaleway",
      "Infomaniak",
      "LWS",
      "WordPress",
      "RGPD",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    /*
     * Ni `datasets` ni `ranking` ici, volontairement : le relevé et les notes
     * appartiennent à `meilleur-vps-2026`, vers lequel cette page renvoie.
     * Les redéclarer produirait deux `Dataset` pour une seule étude et deux
     * `Review` par produit — du balisage d'avis dupliqué sur le même domaine.
     */
  },
  {
    slug: "google-ai-overview-definition",
    kind: "Décryptage",
    title: "Google AI Overview : c'est quoi, comment ça marche et quel impact en 2026",
    metaTitle: "Google AI Overview : définition et fonctionnement",
    excerpt:
      "Un résumé rédigé par Gemini au-dessus des résultats, déployé en France depuis le 22 juillet 2026. Le mécanisme, les requêtes concernées, et les quatre positions officielles de Google que le marché ignore.",
    metaDescription:
      "Google AI Overview : ce que c'est, comment le mécanisme RAG fonctionne, quelles requêtes en déclenchent un, et ce que Google documente officiellement.",
    category: "intelligence-artificielle",
    author: "lucas-lecoq",
    /** Page de définition adossée au guide de mise en œuvre ; Triaina y est citée. */
    authorNote:
      "Cette page explique la fonctionnalité ; la méthode pour y figurer fait l'objet de notre guide « Apparaître dans Google AI Overview ». Triaina, société qui édite Le Journal de la Tech, intervient sur ce marché : le lien vers son site est commercial et signalé comme tel.",
    date: "2026-08-05",
    dateLabel: "5 août 2026",
    readingTime: 9,
    seed: 117,
    imageAlt:
      "Enseigne au néon reprenant les couleurs du logo Google sur un mur sombre",
    topics: [
      "Google AI Overview",
      "AI Mode",
      "Gemini",
      "Google Search",
      "GEO",
      "Generative Engine Optimization",
      "Search Console",
      "Référencement naturel",
    ],
    /*
     * Pas de `methodology` : cette page ne porte aucune mesure de la rédaction.
     * Son autorité vient de la documentation de Google, citée et liée — la
     * rattacher au Protocole JDLT laisserait croire à un relevé qui n'existe pas.
     */
  },
  {
    slug: "meilleure-agence-geo-france",
    kind: "Classement",
    title: "Meilleure agence GEO France 2026 : le classement JDLT",
    metaTitle: "Meilleure agence GEO France 2026 : le classement",
    excerpt:
      "Neuf agences françaises situées sur la seule citabilité par les moteurs génératifs : notes, spécialités, budgets de 750 à 15 000 €, et les cinq questions qui départagent deux propositions.",
    metaDescription:
      "Classement 2026 des agences GEO françaises : neuf cabinets notés sur huit critères, budgets indicatifs et les points à vérifier avant de signer.",
    category: "seo-geo",
    author: "lucas-lecoq",
    /** Troisième classement où l'éditrice du journal figure : mention sous la signature. */
    authorNote:
      "Triaina, classée première, est la société qui édite Le Journal de la Tech. Cette page n'est pas une évaluation indépendante de son travail. Les huit autres agences n'ont aucun lien avec le journal. Les notes sont une appréciation éditoriale et non un relevé de mesures ; elles portent sur la seule citabilité générative, ce qui explique leur écart avec nos classements SEO.",
    date: "2026-08-06",
    dateLabel: "6 août 2026",
    readingTime: 10,
    seed: 118,
    imageAlt:
      "Équipe travaillant sur des ordinateurs portables autour d'une table de réunion",
    topics: [
      "GEO",
      "Generative Engine Optimization",
      "Agence GEO",
      "Citabilité IA",
      "ChatGPT",
      "Perplexity",
      "Google AI Overview",
      "Prestataires",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    /*
     * Ni `ranking` ni `datasets`, comme sur les deux autres classements
     * d'agences : l'éditrice du journal s'y note elle-même, et émettre des
     * `Review` notées dans ce cas revient à publier son propre avis en
     * balisage d'avis. Les notes restent lisibles dans le tableau.
     */
  },
  {
    slug: "meilleur-outil-ia-developpeurs",
    kind: "Comparatif",
    title: "Meilleur outil IA pour les développeurs 2026 : huit outils, un verdict par profil",
    metaTitle: "Meilleur outil IA pour développeurs 2026 : le comparatif",
    excerpt:
      "Cursor, Claude, GitHub Copilot, ChatGPT, Windsurf, Gemini, DeepSeek, Tabnine : huit outils notés sur le seul usage de développement, avec le verdict par profil et les tarifs relevés.",
    metaDescription:
      "Huit outils d'IA pour coder comparés sur six critères pondérés : édition multi-fichiers, raisonnement, sécurité du code, tarifs relevés en août 2026.",
    category: "intelligence-artificielle",
    author: "lucas-lecoq",
    /**
     * Quatre outils sont déjà notés dans le comparatif général, sur un autre
     * périmètre : le dire évite qu'un lecteur y voie une contradiction.
     */
    authorNote:
      "Ce comparatif porte sur le seul usage de développement. Quatre de ces outils figurent aussi dans notre comparatif général des outils d'IA, avec d'autres notes : le périmètre y est plus large et pondère la rédaction, la conformité et la qualité du français. Triaina, société qui édite Le Journal de la Tech, n'édite aucun de ces outils.",
    date: "2026-08-10",
    dateLabel: "10 août 2026",
    readingTime: 10,
    seed: 119,
    imageAlt:
      "Écran d'éditeur de code affichant plusieurs fichiers ouverts côte à côte",
    topics: [
      "Outils IA",
      "Développement logiciel",
      "Cursor",
      "Claude",
      "GitHub Copilot",
      "ChatGPT",
      "Gemini",
      "DeepSeek",
      "Assistants de code",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    /*
     * Pas de `ranking` : Claude, ChatGPT, Gemini et Cursor portent déjà une
     * `Review` notée dans l'`ItemList` de `meilleur-outil-ia-2026`. En publier
     * une seconde, avec une note différente, produirait deux avis contradictoires
     * sur le même produit et le même domaine.
     */
  },
  {
    slug: "meilleur-hebergeur-cloud-france",
    kind: "Comparatif",
    title: "Meilleur hébergeur cloud français 2026 : huit offres souveraines comparées",
    metaTitle: "Meilleur hébergeur cloud français 2026 : le comparatif",
    excerpt:
      "OVHcloud, Scaleway, Infomaniak, o2switch : huit offres notées sur la disponibilité et le temps de réponse mesurés depuis Paris, la juridiction et le support en français.",
    metaDescription:
      "Huit hébergeurs français et européens comparés : disponibilité et temps de réponse mesurés sur 90 jours depuis Paris, juridiction, support et tarifs réels.",
    category: "hebergement-web",
    author: "lucas-lecoq",
    /**
     * Sept de ces hébergeurs sont déjà notés dans le comparatif VPS, sur un
     * autre usage : le dire évite qu'un lecteur y voie une contradiction.
     */
    authorNote:
      "Les mesures de disponibilité et de temps de réponse sont celles de notre comparatif VPS 2026 : même relevé, mêmes chiffres. Les notes diffèrent parce que le périmètre n'est pas le même — ici, le support, la juridiction et la simplicité pèsent plus lourd que dans une évaluation de machines virtuelles. Triaina, société qui édite Le Journal de la Tech, n'exploite aucune infrastructure d'hébergement.",
    date: "2026-08-11",
    dateLabel: "11 août 2026",
    readingTime: 11,
    seed: 122,
    imageAlt:
      "Carte mère et câblage d'un serveur, éclairés en bleu et orange",
    topics: [
      "Hébergement cloud",
      "Souveraineté des données",
      "RGPD",
      "OVHcloud",
      "Scaleway",
      "Infomaniak",
      "o2switch",
      "Performance web",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    /*
     * Ni `ranking` ni `datasets` : sept de ces huit hébergeurs portent déjà une
     * `Review` notée dans l'`ItemList` de `meilleur-vps-2026`, et le relevé de
     * quatre-vingt-dix jours y est déjà déclaré en `Dataset`. Les redéclarer
     * produirait des avis contradictoires et une étude en double.
     */
  },
  {
    slug: "agence-google-ai-overview",
    kind: "Classement",
    title: "Agence Google AI Overview : comment choisir en 2026",
    metaTitle: "Agence Google AI Overview : comment choisir en 2026",
    excerpt:
      "Huit agences situées sur un périmètre étroit — la citation dans les résumés de Google et non dans l'ensemble des moteurs génératifs. Notes, tarifs, et les écarts avec notre classement GEO expliqués.",
    metaDescription:
      "Huit agences comparées sur la citation dans les résumés de Google : critères pondérés, budgets de 750 à 15 000 € et les points à vérifier avant de signer.",
    category: "seo-geo",
    author: "lucas-lecoq",
    /** Quatrième classement où l'éditrice figure première : le dire, et dire aussi que c'est le quatrième. */
    authorNote:
      "Triaina, classée première, est la société qui édite Le Journal de la Tech. Cette page n'est pas une évaluation indépendante de son travail ; c'est le quatrième de nos classements d'agences où elle figure en tête. Les sept autres agences n'ont aucun lien avec le journal. Le périmètre est restreint aux résumés de Google, ce qui explique les écarts de notes avec notre classement GEO.",
    date: "2026-08-11",
    dateLabel: "11 août 2026",
    readingTime: 11,
    seed: 121,
    imageAlt:
      "Tableau de bord affichant des indicateurs de performance et des courbes de suivi",
    topics: [
      "Google AI Overview",
      "Agence GEO",
      "Generative Engine Optimization",
      "Citabilité IA",
      "Search Console",
      "Référencement naturel",
      "Prestataires",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    /*
     * Ni `ranking` ni `datasets`, comme sur les trois autres classements
     * d'agences : l'éditrice du journal s'y note elle-même.
     */
  },
  {
    slug: "meilleur-logiciel-comptabilite-pme",
    kind: "Comparatif",
    title: "Meilleur logiciel de comptabilité pour PME 2026 : neuf solutions comparées",
    metaTitle: "Meilleur logiciel comptabilité PME 2026 : le comparatif",
    excerpt:
      "Pennylane, Axonaut, Sage, EBP, Cegid : neuf logiciels notés sur sept critères, et le calendrier réel de la facturation électronique — réception au 1ᵉʳ septembre 2026, émission des PME un an plus tard.",
    metaDescription:
      "Neuf logiciels de comptabilité PME comparés sur sept critères, tarifs relevés en août 2026 et le calendrier exact de l'obligation de facturation électronique.",
    category: "saas-logiciels",
    author: "lucas-lecoq",
    /** Aucun éditeur classé n'a de lien avec le journal ; l'échéance légale est datée. */
    authorNote:
      "Triaina, société qui édite Le Journal de la Tech, n'édite aucun des logiciels comparés ici. Les notes sont une appréciation éditoriale et non un relevé de mesures ; les tarifs et périmètres de conformité sont relevés en août 2026 et évoluent d'ici l'échéance d'émission de septembre 2027.",
    date: "2026-08-10",
    dateLabel: "10 août 2026",
    readingTime: 11,
    seed: 120,
    imageAlt:
      "Mains remplissant au stylo un document administratif posé sur un bureau",
    topics: [
      "Logiciel de comptabilité",
      "PME",
      "Facturation électronique",
      "Pennylane",
      "Sage",
      "EBP",
      "Cegid",
      "Expert-comptable",
      "SaaS",
    ],
    methodology: { name: "Protocole JDLT", href: "/protocole-jdlt" },
    /*
     * `ranking` déclaré, comme sur les autres comparatifs de logiciels : neuf
     * produits tiers, aucun édité par la société qui édite le journal, et aucune
     * note déjà publiée ailleurs sur le site — pas de risque d'avis dupliqué.
     */
    ranking: [
      {
        name: "Pennylane",
        score: 9.1,
        verdict:
          "La meilleure automatisation bancaire du panel et une cinquantaine de connecteurs natifs. Paramétrage initial exigeant et facture qui grimpe avec le nombre d'utilisateurs.",
      },
      {
        name: "Axonaut",
        score: 8.7,
        verdict:
          "Comptabilité, facturation et suivi commercial dans un seul outil, pensé pour des dirigeants non comptables. Moins de profondeur comptable que Sage ou Cegid.",
      },
      {
        name: "Sage 50cloud",
        score: 8.4,
        verdict:
          "La profondeur comptable de référence : TVA multi-régimes, immobilisations, analytique et budgétaire. Interface datée et prise en main longue.",
      },
      {
        name: "EBP Comptabilité Pro",
        score: 8.1,
        verdict:
          "Le meilleur rapport qualité-prix à 19 € par mois, avec un support en France et une conformité fiscale suivie. Connecteurs souvent facturés en supplément.",
      },
      {
        name: "Cegid Loop",
        score: 7.8,
        verdict:
          "Approche modulaire proche d'un progiciel de gestion, avec multi-entités et multi-devises natifs. Entrée à 79 € par mois et mise en place qui se compte en semaines.",
      },
      {
        name: "QuickBooks",
        score: 7.5,
        verdict:
          "Multi-devises natif et écosystème d'applications très large. Adaptation partielle aux spécificités fiscales françaises et support moins présent en France.",
      },
      {
        name: "Indy",
        score: 7.2,
        verdict:
          "La prise en main la plus immédiate du panel à 9 € par mois. Outil de suivi plutôt que de comptabilité générale : ni immobilisations ni analytique.",
      },
      {
        name: "Tiime",
        score: 6.9,
        verdict:
          "Conçu autour de la relation avec le cabinet comptable : droits d'accès fins et partage sécurisé. Automatisation bancaire en retrait.",
      },
      {
        name: "Evoliz",
        score: 6.6,
        verdict:
          "Gestion des stocks intégrée et pré-comptabilité structurée, pertinentes en artisanat et commerce. Peu de connecteurs et fonctions comptables limitées.",
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
