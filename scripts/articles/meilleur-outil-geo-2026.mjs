const config = {
  title: "Meilleur outil GEO 2026",

  /** Lien commercial vers l'éditrice du journal : pas une source citée. */
  excludeSources: ["triaina.fr"],

  /**
   * Relevé produit par la rédaction le 14/08/2026 à partir des grilles
   * tarifaires publiques des dix-huit éditeurs : écart entre le prix d'appel
   * affiché et le prix réel de la couverture annoncée.
   */
  dataBlocks: [
    {
      start: "<p>Sur les dix-huit outils recensés le 14 août 2026",
      end: "C'est un critère de sélection en soi.</p>",
      label:
        "Relevé exclusif — Protocole JDLT · Prix d'appel affiché contre prix réel de la couverture annoncée, 18 outils, 14 août 2026",
    },
  ],
};

export default config;
