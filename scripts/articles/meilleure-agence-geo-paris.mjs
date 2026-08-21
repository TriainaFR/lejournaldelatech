const config = {
  title: "Meilleure agence GEO Paris 2026",

  /** Lien commercial vers l'éditrice du journal : pas une source citée. */
  excludeSources: ["triaina.fr"],

  /**
   * Relevé produit par la rédaction le 21/08/2026 : trois des dix agences du
   * tableau revendiquent l'antériorité sur le GEO en France, et le site de
   * Triaina l'attribue lui-même à Webconversion. Vérifiable, original, et
   * défavorable à l'éditrice — c'est le différenciateur de la page.
   */
  dataBlocks: [
    {
      start: "<p>Le mot « pionnier » revient dans la communication",
      end: "Demandez des travaux datés plutôt qu'un adjectif.</p>",
      label:
        "Relevé exclusif — Protocole JDLT · Trois agences du même tableau revendiquent l'antériorité sur le GEO, 21 août 2026",
    },
  ],
};

export default config;
