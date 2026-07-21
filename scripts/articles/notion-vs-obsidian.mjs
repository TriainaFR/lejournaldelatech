const config = {
  title: "Notion vs Obsidian",

  /** Coquilles du texte source. */
  replacements: [["TL;DR - Le verdict direct.", "Le verdict direct."]],

  /** Maillage : articles frères publiés, méthodologie, piliers différés. */
  links: [
    [
      "est notre cadre d'évaluation maison, déjà appliqué dans nos comparatifs Claude vs ChatGPT et Meilleur hébergeur WordPress 2026",
      'est notre <a href="/protocole-jdlt">cadre d’évaluation maison</a>, déjà appliqué dans nos comparatifs [[lien:claude-vs-chatgpt|Claude vs ChatGPT]] et [[lien:meilleur-hebergeur-wordpress|Meilleur hébergeur WordPress]]',
    ],
    [
      "Ce protocole sera réutilisé dans notre guide \\[LIEN INTERNE: Meilleur outil IA 2026\\] et notre comparatif \\[LIEN INTERNE: Meilleur logiciel gestion projet\\]\\.",
      "Ce protocole sera réutilisé dans notre guide [[lien:meilleur-outil-ia-2026|Meilleur outil IA 2026]] et notre comparatif [[lien:meilleur-logiciel-gestion-projet|Meilleur logiciel de gestion de projet]].",
    ],
    [
      "consultez notre comparatif \\[LIEN INTERNE: Meilleur logiciel gestion projet\\]\\.",
      "consultez notre comparatif [[lien:meilleur-logiciel-gestion-projet|Meilleur logiciel de gestion de projet]].",
    ],
    [
      "consultez notre guide \\[LIEN INTERNE: Meilleur logiciel gestion projet\\]\\.",
      "consultez notre guide [[lien:meilleur-logiciel-gestion-projet|Meilleur logiciel de gestion de projet]].",
    ],
  ],

  /** Études produites par la rédaction. */
  dataBlocks: [
    {
      start: "<h3>Notion Business — 10 utilisateurs, 1 an</h3>",
      end: "Pour une équipe non technique, Notion peut s'avérer moins coûteux sur 12 mois une fois le coût humain intégré.</p>",
      label: "Donnée exclusive — Protocole JDLT · Coût total sur 12 mois (10 personnes)",
    },
    {
      start: "<p><strong>Environnement de test :</strong></p>",
      end: "la latence de Notion est imperceptible.</p>",
      label: "Donnée exclusive — Protocole JDLT · Benchmark sur 500+ notes",
    },
  ],
};

export default config;
