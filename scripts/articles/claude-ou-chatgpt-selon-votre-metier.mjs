const config = {
  title: "Claude ou ChatGPT selon votre métier",

  /**
   * Article satellite : les chiffres proviennent de sources externes citées
   * dans le texte, pas du Protocole JDLT. Aucun encadré « donnée exclusive »
   * ni balisage Dataset ici — on ne revendique que ce que la rédaction mesure.
   */
  // L'encadré porte déjà son intitulé « L'essentiel ».
  replacements: [["<strong>TL;DR</strong> - ", ""]],

  /** Maillage : renvois vers le comparatif pilier, publié. */
  links: [
    [
      "consultez notre comparatif complet : \\[LIEN INTERNE: Claude vs ChatGPT : le comparatif complet pour choisir en 2026\\]\\.",
      "consultez notre comparatif complet : [[lien:claude-vs-chatgpt|Claude vs ChatGPT]].",
    ],
    [
      "voir notre comparatif pilier : \\[LIEN INTERNE: Claude vs ChatGPT : le comparatif complet pour choisir en 2026\\]\\.",
      "voir notre comparatif pilier : [[lien:claude-vs-chatgpt|Claude vs ChatGPT]].",
    ],
  ],
};

export default config;
