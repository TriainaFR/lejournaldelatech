/**
 * Pipeline de publication d'un article.
 *
 *   node scripts/build-article.mjs <slug>
 *
 * Lit le HTML livré par la rédaction (`scripts/raw/<slug>.html`) et sa
 * configuration de transformation (`scripts/articles/<slug>.mjs`), puis écrit
 * le corps prêt à rendre dans `content/articles/<slug>.ts`.
 *
 * Transformations communes à tous les articles : retrait du <h1> (porté par la
 * page), nettoyage des résidus d'éditeur, typographie française, ancres sur les
 * titres, tableaux défilables, extraction du sommaire, de la FAQ et des sources.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2];

if (!slug) {
  console.error("Usage : node scripts/build-article.mjs <slug>");
  process.exit(1);
}

const config = (
  await import(pathToFileURL(`${ROOT}/scripts/articles/${slug}.mjs`).href)
).default;

let html = readFileSync(`${ROOT}/scripts/raw/${slug}.html`, "utf8").trim();

/* — Le titre devient le <h1> de la page, on le retire du corps — */
html = html.replace(/^<h1>.*?<\/h1>/s, "");

/* — Séparateurs : les titres portent déjà leur filet — */
html = html.replace(/<hr\s*\/?>/g, "");

/* — Nettoyage des tableaux issus de l'éditeur — */
html = html
  .replace(/<colgroup>.*?<\/colgroup>/gs, "")
  .replace(/\s*style="min-width:[^"]*"/g, "")
  .replace(/\s*colspan="1"/g, "")
  .replace(/\s*rowspan="1"/g, "");

/* — Corrections éditoriales propres à l'article — */
for (const [from, to] of config.replacements ?? []) {
  if (!html.includes(from)) throw new Error(`Remplacement introuvable : ${from}`);
  html = html.replaceAll(from, to);
}

/* — Typographie française : incises en tiret cadratin — */
html = html.replace(/ - /g, " — ");

/* — Maillage interne différé et liens de méthodologie — */
for (const [pattern, replacement] of config.links ?? []) {
  const re = new RegExp(pattern, "g");
  if (!re.test(html)) throw new Error(`Lien introuvable : ${pattern}`);
  html = html.replace(new RegExp(pattern, "g"), replacement);
}

/* — Le premier blockquote devient l'encadré « L'essentiel » — */
html = html.replace(
  /<blockquote>(.*?)<\/blockquote>/s,
  (_m, inner) =>
    `<aside class="tldr"><p class="tldr-label">L’essentiel</p>${inner}</aside>`
);

/* — Données produites par la rédaction : mises en avant (différenciateur) — */
function wrapBlock(source, { start: startNeedle, end: endNeedle, label }) {
  const start = source.indexOf(startNeedle);
  if (start === -1) throw new Error(`Bloc introuvable : ${startNeedle}`);
  const endAt = source.indexOf(endNeedle, start);
  if (endAt === -1) throw new Error(`Fin de bloc introuvable : ${endNeedle}`);
  const end = endAt + endNeedle.length;
  return (
    source.slice(0, start) +
    `<aside class="donnee-jdlt"><p class="data-badge">${label}</p>` +
    source.slice(start, end) +
    "</aside>" +
    source.slice(end)
  );
}

for (const block of config.dataBlocks ?? []) {
  html = wrapBlock(html, block);
}

/* — Identifiants d'ancre sur les titres + sommaire — */
const slugify = (s) =>
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
  const id = slugify(text);
  if (level === "2") toc.push({ id, text });
  return `<h${level} id="${id}">${inner}</h${level}>`;
});

/* — Tableaux défilables sur mobile — */
html = html.replace(
  /<table>(.*?)<\/table>/gs,
  (_m, inner) => `<div class="table-wrap"><table>${inner}</table></div>`
);

/* — Questions/réponses pour le balisage FAQPage — */
const faqAnchor = toc.find((t) => t.text.toUpperCase().startsWith("FAQ"));
const faqSection = faqAnchor
  ? html.split(`<h2 id="${faqAnchor.id}">`)[1] ?? ""
  : "";
const faq = [];
/** Le balisage FAQPage attend du texte : on y déplie les marqueurs de lien. */
const plain = (s) =>
  s
    .replace(/\[\[lien:[a-z0-9-]+\|([^\]]+)\]\]/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
for (const m of faqSection.matchAll(/<p><strong>(.*?)<\/strong>\s*(.*?)<\/p>/gs)) {
  const question = plain(m[1]);
  const answer = plain(m[2]);
  if (question.endsWith("?") && answer) faq.push({ question, answer });
}

/* — Sources citées : autorité et vérifiabilité — */
const sources = [];
for (const m of html.matchAll(
  /<a[^>]*href="(https?:[^"]+)"[^>]*>(.*?)<\/a>/g
)) {
  sources.push({ url: m[1], label: m[2].replace(/<[^>]+>/g, "").trim() });
}

const esc = (s) =>
  s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

mkdirSync(`${ROOT}/content/articles`, { recursive: true });
writeFileSync(
  `${ROOT}/content/articles/${slug}.ts`,
  `/**
 * Corps de l'article « ${config.title} ».
 * Généré par scripts/build-article.mjs depuis scripts/raw/${slug}.html —
 * modifier la source ou la config, puis relancer le script.
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
console.log(
  `${slug} — ${words} mots, ${toc.length} sections, ${faq.length} FAQ, ${sources.length} sources, ${(config.dataBlocks ?? []).length} encadré(s) de données`
);
