import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC =
  "/private/tmp/claude-501/-Users-l-l-Desktop-Triaina-Site-Web--lejournaldelatech/05db6a12-8585-4edf-a0c8-18a12cf3e696/scratchpad/article-raw.html";
const OUT_DIR =
  "/Users/l.l/Desktop/Triaina/Site Web /lejournaldelatech/content/articles";
const OUT = `${OUT_DIR}/claude-vs-chatgpt.ts`;

let html = readFileSync(SRC, "utf8").trim();

/* — 1. Le titre devient le <h1> de la page, on le retire du corps — */
html = html.replace(/^<h1>.*?<\/h1>/s, "");

/* — 2. Séparateurs : les titres portent déjà leur filet — */
html = html.replace(/<hr\s*\/?>/g, "");

/* — 3. Nettoyage des tableaux issus de l'éditeur — */
html = html
  .replace(/<colgroup>.*?<\/colgroup>/gs, "")
  .replace(/\s*style="min-width:[^"]*"/g, "")
  .replace(/\s*colspan="1"/g, "")
  .replace(/\s*rowspan="1"/g, "");

/* — 4. Coquilles éditoriales du texte source — */
html = html
  .replace("TL;DR - Lequel choisir ?Claude", "Lequel choisir ? Claude")
  .replace(
    "ChatGPT ou claude n'est même pas une question",
    "ChatGPT ou Claude n'est même pas une question"
  );

/* — 5. Typographie française : incises en tiret cadratin — */
html = html.replace(/ - /g, " — ");

/* — 6. Maillage interne différé : le lien s'activera à la publication du pilier — */
html = html
  .replace(
    /, notamment dans notre guide \[LIEN INTERNE : Meilleur outil IA 2026\]\./,
    ", notamment dans notre guide [[lien:meilleur-outil-ia-2026|Meilleur outil IA 2026]]."
  )
  .replace(
    /Notre guide \[LIEN INTERNE : Alternative à ChatGPT\] couvre les options souveraines en détail\./,
    "Notre guide [[lien:alternative-chatgpt|Alternative à ChatGPT]] couvre les options souveraines en détail."
  );

/* — 6 bis. Le Protocole JDLT renvoie vers sa page de référence — */
html = html.replace(
  "est notre cadre d'évaluation maison",
  'est notre <a href="/protocole-jdlt">cadre d’évaluation maison</a>'
);

/* — 7. Le premier blockquote devient l'encadré TL;DR — */
html = html.replace(
  /<blockquote>(.*?)<\/blockquote>/s,
  (_m, inner) =>
    `<aside class="tldr"><p class="tldr-label">L’essentiel</p>${inner}</aside>`
);

/* — 7 bis. Les données propriétaires sont mises en avant (différenciateur) — */
function wrapBlock(source, startNeedle, endNeedle, label) {
  const start = source.indexOf(startNeedle);
  if (start === -1) throw new Error(`Bloc introuvable : ${startNeedle}`);
  const endAt = source.indexOf(endNeedle, start);
  if (endAt === -1) throw new Error(`Fin de bloc introuvable : ${endNeedle}`);
  const end = endAt + endNeedle.length;
  const inner = source.slice(start, end);
  const badge = `<p class="data-badge">${label}</p>`;
  return (
    source.slice(0, start) +
    `<aside class="donnee-jdlt">${badge}${inner}</aside>` +
    source.slice(end)
  );
}

html = wrapBlock(
  html,
  "<p><strong>Protocole JDLT — test de fiabilité en français",
  "</ul>",
  "Donnée exclusive — Protocole JDLT · Test de fiabilité en français"
);

html = wrapBlock(
  html,
  "<p><strong>Cas d'usage :</strong>",
  "50 000+ appels/mois.</p>",
  "Donnée exclusive — Protocole JDLT · Simulation de coût réel"
);

/* — 8. Identifiants d'ancre sur les titres + sommaire — */
const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const toc = [];
html = html.replace(/<h([23])>(.*?)<\/h\1>/g, (_m, level, inner) => {
  const text = inner.replace(/<[^>]+>/g, "").trim();
  const id = slug(text);
  if (level === "2") toc.push({ id, text });
  return `<h${level} id="${id}">${inner}</h${level}>`;
});

/* — 9. Tableaux défilables sur mobile — */
html = html.replace(
  /<table>(.*?)<\/table>/gs,
  (_m, inner) => `<div class="table-wrap"><table>${inner}</table></div>`
);

/* — 10. Extraction des questions/réponses pour le balisage FAQPage — */
const faqSection = html.split('<h2 id="faq-claude-vs-chatgpt">')[1] ?? "";
const faq = [];
for (const m of faqSection.matchAll(
  /<p><strong>(.*?)<\/strong>\s*(.*?)<\/p>/gs
)) {
  const question = m[1].replace(/<[^>]+>/g, "").trim();
  const answer = m[2].replace(/<[^>]+>/g, "").trim();
  if (question.endsWith("?") && answer) faq.push({ question, answer });
}

/* — 11. Sources : liste d'autorité pour l'E-E-A-T — */
const sources = [];
for (const m of html.matchAll(/<a[^>]*href="(https?:[^"]+)"[^>]*>(.*?)<\/a>/g)) {
  sources.push({ url: m[1], label: m[2].replace(/<[^>]+>/g, "").trim() });
}

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  OUT,
  `/**
 * Corps de l'article « Claude vs ChatGPT ».
 * Généré depuis le HTML fourni par la rédaction, nettoyé (tableaux, ancres,
 * typographie française) — ne pas éditer à la main sans reporter les changements.
 */

export const html = \`${esc(html.trim())}\`;

/** Sommaire dérivé des titres de niveau 2. */
export const toc: { id: string; text: string }[] = ${JSON.stringify(toc, null, 2)};

/** Questions/réponses de la FAQ, balisées en FAQPage. */
export const faq: { question: string; answer: string }[] = ${JSON.stringify(faq, null, 2)};

/** Sources citées, reprises en fin d'article et dans le balisage. */
export const sources: { url: string; label: string }[] = ${JSON.stringify(sources, null, 2)};
`,
  "utf8"
);

const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
console.log(`OK — ${words} mots, ${toc.length} sections, ${faq.length} FAQ, ${sources.length} sources`);
console.log(toc.map((t) => `  · ${t.text} (#${t.id})`).join("\n"));
