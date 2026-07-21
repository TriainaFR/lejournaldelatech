const config = {
  title: "Meilleur hébergeur WordPress",

  /** Coquilles du texte source. */
  replacements: [["TL;DR - Le verdict direct.", "Le verdict direct."]],

  /** Maillage : marqueurs différés + page de méthodologie + article frère. */
  links: [
    [
      "consultez notre guide \\[LIEN INTERNE: Meilleur VPS 2026\\]\\.",
      "consultez notre guide [[lien:meilleur-vps-2026|Meilleur VPS 2026]].",
    ],
    [
      "Voir notre comparatif \\[LIEN INTERNE: Meilleur hébergeur web 2026\\] pour les options cloud et dédiées\\.",
      "Voir notre comparatif [[lien:meilleur-hebergeur-web-2026|Meilleur hébergeur web 2026]] pour les options cloud et dédiées.",
    ],
    [
      // les incises sont déjà passées en tiret cadratin à ce stade du pipeline
      "un VPS managé s'impose — voir notre guide \\[LIEN INTERNE: Meilleur VPS 2026\\]\\.",
      "un VPS managé s'impose — voir notre guide [[lien:meilleur-vps-2026|Meilleur VPS 2026]].",
    ],
    [
      "est notre cadre d'évaluation maison, déjà utilisé dans notre comparatif Claude vs ChatGPT",
      'est notre <a href="/protocole-jdlt">cadre d’évaluation maison</a>, déjà utilisé dans notre comparatif [[lien:claude-vs-chatgpt|Claude vs ChatGPT]]',
    ],
  ],

  /** Études produites par la rédaction. */
  dataBlocks: [
    {
      start: "<p><strong>1. Test de performance réel",
      end: "<p><em>Test JDLT, juillet 2026. Site WordPress standardisé, mesures depuis Paris.</em></p>",
      label: "Donnée exclusive — Protocole JDLT · Test de performance réel",
    },
    {
      start: "<p><strong>2. Coût réel sur 3 ans",
      end: "<p><em>Calcul JDLT sur 36 mois, TVA 20 % incluse, domaine non compris. Prix constatés en juillet 2026.</em></p>",
      label: "Donnée exclusive — Protocole JDLT · Coût réel sur 3 ans",
    },
  ],
};

export default config;
