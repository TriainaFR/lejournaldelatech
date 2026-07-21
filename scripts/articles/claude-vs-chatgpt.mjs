const config = {
  title: "Claude vs ChatGPT",

  /** Coquilles du texte source. */
  replacements: [
    ["TL;DR - Lequel choisir ?Claude", "Lequel choisir ? Claude"],
    [
      "ChatGPT ou claude n'est même pas une question",
      "ChatGPT ou Claude n'est même pas une question",
    ],
  ],

  /** Maillage : marqueurs différés + page de méthodologie. */
  links: [
    [
      ", notamment dans notre guide \\[LIEN INTERNE : Meilleur outil IA 2026\\]\\.",
      ", notamment dans notre guide [[lien:meilleur-outil-ia-2026|Meilleur outil IA 2026]].",
    ],
    [
      "Notre guide \\[LIEN INTERNE : Alternative à ChatGPT\\] couvre les options souveraines en détail\\.",
      "Notre guide [[lien:alternative-chatgpt|Alternative à ChatGPT]] couvre les options souveraines en détail.",
    ],
    [
      "est notre cadre d'évaluation maison",
      'est notre <a href="/protocole-jdlt">cadre d’évaluation maison</a>',
    ],
  ],

  /** Études produites par la rédaction. */
  dataBlocks: [
    {
      start: "<p><strong>Protocole JDLT — test de fiabilité en français",
      end: "</ul>",
      label: "Donnée exclusive — Protocole JDLT · Test de fiabilité en français",
    },
    {
      start: "<p><strong>Cas d'usage :</strong>",
      end: "50 000+ appels/mois.</p>",
      label: "Donnée exclusive — Protocole JDLT · Simulation de coût réel",
    },
  ],
};

export default config;
