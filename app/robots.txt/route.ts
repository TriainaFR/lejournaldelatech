/**
 * `/robots.txt`
 *
 * Écrit à la main plutôt que via `MetadataRoute.Robots` : l'API de Next ne
 * permet pas d'émettre de directive `Content-Signal`, qui déclare aux
 * moteurs et aux agents ce qu'ils peuvent faire du contenu.
 *
 * Position du journal — à relire si le positionnement change :
 *   search=yes     l'indexation classique, évidemment ;
 *   ai-input=yes   la citation en temps réel dans une réponse générée, qui
 *                  est l'objectif éditorial du site ;
 *   ai-train=no    l'absorption du contenu dans les poids d'un modèle, qui
 *                  n'apporte ni trafic ni attribution.
 *
 * Ces signaux expriment une préférence, pas un blocage technique : ils sont
 * lus par les acteurs qui s'y conforment. Le blocage effectif, si un jour il
 * est voulu, se règle côté Cloudflare.
 */

const BASE = "https://lejournaldelatech.fr";

/**
 * Ordre des signaux repris de l'exemple canonique de la spécification, pour
 * ne pas dépendre de la tolérance des analyseurs qui la lisent.
 */
const SIGNALS = "ai-train=no, search=yes, ai-input=yes";

/**
 * Robots d'IA explicitement autorisés. Le wildcard suffirait, mais les
 * nommer lève l'ambiguïté : le journal veut être exploré et cité par les
 * moteurs génératifs, c'est la raison d'être de son travail de sourçage.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
];

export const dynamic = "force-static";

export function GET(): Response {
  const lines = [
    "# Le Journal de la Tech",
    "# Préférences d'usage du contenu : voir les directives Content-Signal.",
    "",
    "User-agent: *",
    "Allow: /",
    `Content-Signal: ${SIGNALS}`,
    "",
    "# Moteurs génératifs et robots d'IA — exploration et citation autorisées.",
    ...AI_CRAWLERS.flatMap((bot) => [
      `User-agent: ${bot}`,
      "Allow: /",
      `Content-Signal: ${SIGNALS}`,
      "",
    ]),
    `Sitemap: ${BASE}/sitemap.xml`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
