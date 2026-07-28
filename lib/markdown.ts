/**
 * Conversion du corps des articles en Markdown, pour les agents qui
 * demandent `Accept: text/markdown`.
 *
 * On convertit depuis la source éditoriale plutôt que depuis la page rendue :
 * un agent reçoit ainsi l'article seul, sans masthead, navigation ni pied de
 * page. C'est ce qui distingue cette implémentation d'une conversion faite au
 * niveau du CDN, qui ne voit que le HTML final.
 */

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&eacute;": "é",
  "&egrave;": "è",
  "&agrave;": "à",
  "&ccedil;": "ç",
  "&rsquo;": "’",
  "&hellip;": "…",
  "&mdash;": "—",
  "&ndash;": "–",
};

function decode(s: string): string {
  return s.replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? e);
}

const BASE = "https://lejournaldelatech.fr";

/**
 * Convertit le contenu d'un bloc en Markdown : gras, italique, liens, code.
 *
 * Les liens internes sont absolutisés : un agent qui cite un extrait hors du
 * site doit pouvoir suivre la référence, ce qu'un chemin relatif ne permet pas.
 */
function inline(html: string): string {
  return decode(
    html
      .replace(/<\/?(strong|b)>/g, "**")
      .replace(/<\/?(em|i)>/g, "_")
      .replace(/<code>([\s\S]*?)<\/code>/g, "`$1`")
      .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_m, href: string, texte: string) =>
        `[${texte}](${href.startsWith("/") ? BASE + href : href})`,
      )
      .replace(/<br\s*\/?>/g, "  \n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+/g, " ")
    .trim();
}

/** Reconstruit un tableau Markdown à partir d'un `<table>`. */
function table(html: string): string {
  const rows = [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
    [...r[1].matchAll(/<(th|td)>([\s\S]*?)<\/\1>/g)].map((c) =>
      inline(c[2]).replace(/\|/g, "\\|"),
    ),
  );
  if (!rows.length) return "";

  const [head, ...body] = rows;
  const lignes = [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...body.map((r) => `| ${r.join(" | ")} |`),
  ];
  return lignes.join("\n");
}

/** Convertit une liste `<ul>`/`<ol>` en liste Markdown. */
function list(html: string, ordered: boolean): string {
  return [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)]
    .map((m, i) => {
      const texte = inline(m[1].replace(/<\/?p>/g, " "));
      return `${ordered ? `${i + 1}.` : "-"} ${texte}`;
    })
    .join("\n");
}

/**
 * Convertit le corps HTML d'un article en Markdown.
 *
 * Le pipeline de publication produit un HTML régulier — titres, paragraphes,
 * listes, tableaux et encadrés — ce qui permet une conversion par balayage
 * séquentiel, sans dépendance externe.
 */
export function htmlToMarkdown(html: string): string {
  const blocs: string[] = [];

  // Les encadrés de données portent un libellé qu'il faut conserver : c'est
  // ce qui signale à un agent qu'il lit une mesure de la rédaction.
  const source = html
    .replace(
      /<aside class="donnee-jdlt"><p class="data-badge">([\s\S]*?)<\/p>([\s\S]*?)<\/aside>/g,
      (_m, label, corps) => `<blockquote data-label="${inline(label)}">${corps}</blockquote>`,
    )
    .replace(
      /<aside class="tldr"><p class="tldr-label">([\s\S]*?)<\/p>([\s\S]*?)<\/aside>/g,
      (_m, label, corps) => `<blockquote data-label="${inline(label)}">${corps}</blockquote>`,
    )
    .replace(/<div class="table-wrap">([\s\S]*?)<\/div>/g, "$1");

  const RE =
    /<h([23])[^>]*>([\s\S]*?)<\/h\1>|<blockquote(?: data-label="([^"]*)")?>([\s\S]*?)<\/blockquote>|<table>([\s\S]*?)<\/table>|<(ul|ol)>([\s\S]*?)<\/\6>|<p>([\s\S]*?)<\/p>/g;

  for (const m of source.matchAll(RE)) {
    if (m[1]) {
      blocs.push(`${"#".repeat(Number(m[1]))} ${inline(m[2])}`);
    } else if (m[4] !== undefined) {
      const interne = [...m[4].matchAll(/<p>([\s\S]*?)<\/p>/g)]
        .map((p) => inline(p[1]))
        .filter(Boolean);
      const listes = [...m[4].matchAll(/<(ul|ol)>([\s\S]*?)<\/\1>/g)]
        .map((l) => list(l[2], l[1] === "ol"))
        .filter(Boolean);
      const contenu = [...interne, ...listes].join("\n\n");
      const entete = m[3] ? `**${m[3]}**\n\n` : "";
      blocs.push(
        (entete + contenu)
          .split("\n")
          .map((l) => `> ${l}`.trimEnd())
          .join("\n"),
      );
    } else if (m[5]) {
      blocs.push(table(m[5]));
    } else if (m[7]) {
      blocs.push(list(m[7], m[6] === "ol"));
    } else if (m[8]) {
      const texte = inline(m[8]);
      if (texte) blocs.push(texte);
    }
  }

  return blocs.filter(Boolean).join("\n\n");
}
