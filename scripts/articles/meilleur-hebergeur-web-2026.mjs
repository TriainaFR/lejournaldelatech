const config = {
  title: "Meilleur hébergeur web 2026",

  /** La signature est rendue par le gabarit (byline + encadré auteur). */
  removeBlocks: [
    {
      start: "<p>👤 <strong>Par </strong>",
      end: "calcul du coût réel sur 3 ans.</em></p>",
    },
  ],

  /** Coquilles du texte source. */
  replacements: [["TL;DR - Le verdict direct.", "Le verdict direct."]],

  /** Maillage : les trois comparatifs frères sont publiés. */
  links: [
    [
      "est notre cadre d'évaluation maison, déjà utilisé dans nos comparatifs \\[LIEN INTERNE: Claude vs ChatGPT : le comparatif complet pour choisir en 2026\\] et \\[LIEN INTERNE: Meilleur hébergeur WordPress : comparatif 2026\\]",
      'est notre <a href="/protocole-jdlt">cadre d’évaluation maison</a>, déjà utilisé dans nos comparatifs [[lien:claude-vs-chatgpt|Claude vs ChatGPT]] et [[lien:meilleur-hebergeur-wordpress|Meilleur hébergeur WordPress]]',
    ],
    [
      "consultez notre \\[LIEN INTERNE: Meilleur hébergeur WordPress : comparatif 2026\\]",
      "consultez notre comparatif [[lien:meilleur-hebergeur-wordpress|Meilleur hébergeur WordPress]]",
    ],
    [
      "notre \\[LIEN INTERNE: Meilleur hébergeur WordPress : comparatif 2026\\] détaille les options infogérées\\.",
      "notre comparatif [[lien:meilleur-hebergeur-wordpress|Meilleur hébergeur WordPress]] détaille les options infogérées.",
    ],
    [
      "notre comparatif \\[LIEN INTERNE: Notion vs Obsidian : quel outil choisir en 2026\\]",
      "notre comparatif [[lien:notion-vs-obsidian|Notion vs Obsidian]]",
    ],
  ],

  /** Études produites par la rédaction. */
  dataBlocks: [
    {
      start: "<h3>Site vitrine HTML statique — résultats juillet 2026</h3>",
      end: "C'est pourquoi ce test élargi est indispensable.</p></blockquote>",
      label:
        "Donnée exclusive — Protocole JDLT · Performances mesurées sur trois types de sites",
    },
    {
      start: "<h3>Méthodologie JDLT — coût réel 3 ans</h3>",
      end: "et d'encaisser la hausse au renouvellement.</p>",
      label: "Donnée exclusive — Protocole JDLT · Coût réel sur 3 ans",
    },
  ],
};

export default config;
