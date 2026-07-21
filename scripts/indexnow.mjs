#!/usr/bin/env node
/**
 * Soumission IndexNow — prévient Bing, Yandex, Seznam, Naver et Yep qu'une URL
 * a changé, sans passer par une console webmaster.
 *
 * Google ne participe PAS à IndexNow : pour Google, seuls le sitemap déclaré
 * dans robots.txt et la Search Console font foi.
 *
 * Usage :
 *   node scripts/indexnow.mjs                       # tout le sitemap
 *   node scripts/indexnow.mjs <url> [<url>...]      # URLs précises
 *   node scripts/indexnow.mjs --dry-run             # affiche sans envoyer
 *   node scripts/indexnow.mjs --host staging.x.fr   # autre hôte
 *
 * À lancer APRÈS déploiement : les moteurs vérifient la clé et lisent les URLs
 * dans la foulée. Soumettre une URL qui renvoie encore un 404 est contre-productif.
 */

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const KEY = "11ac43af4a39e363ad6ef131cc77afb8";
const ENDPOINT = "https://api.indexnow.org/indexnow";
/** Limite du protocole : 10 000 URLs par requête. */
const MAX_URLS = 10_000;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const hostIndex = argv.indexOf("--host");
const host = hostIndex !== -1 ? argv[hostIndex + 1] : "lejournaldelatech.fr";
const explicitUrls = argv.filter(
  (a, i) => a.startsWith("http") && i !== hostIndex + 1,
);

const origin = `https://${host}`;
const keyLocation = `${origin}/${KEY}.txt`;

/** Récupère les URLs du sitemap publié. */
async function urlsFromSitemap() {
  const res = await fetch(`${origin}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(
      `sitemap.xml inaccessible (HTTP ${res.status}). Le site est-il déployé ?`,
    );
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("Aucune <loc> trouvée dans le sitemap.");
  return urls;
}

/**
 * Vérifie que la clé est servie à la racine du domaine. C'est la cause n°1 des
 * refus (403) : sans ce fichier, le moteur ne peut pas prouver que le domaine
 * nous appartient.
 */
async function checkKeyFile() {
  const local = join(root, "public", `${KEY}.txt`);
  if (!existsSync(local)) {
    throw new Error(
      `public/${KEY}.txt est absent du dépôt — la clé et le script ont divergé.`,
    );
  }
  const res = await fetch(keyLocation);
  if (!res.ok) {
    throw new Error(
      `${keyLocation} renvoie HTTP ${res.status}. Déployez d'abord le fichier de clé.`,
    );
  }
  const body = (await res.text()).trim();
  if (body !== KEY) {
    throw new Error(
      `${keyLocation} ne contient pas la clé attendue (reçu : « ${body.slice(0, 40)} »).`,
    );
  }
}

/** Messages des codes de retour IndexNow — sinon un 403 nu n'apprend rien. */
function explain(status) {
  return (
    {
      200: "OK — URLs acceptées.",
      202: "Accepté — la clé est en cours de validation par le moteur.",
      400: "Requête invalide — format du payload incorrect.",
      403: "Clé refusée — le fichier de clé n'est pas lisible à la racine du domaine.",
      422: "URLs rejetées — elles n'appartiennent pas à l'hôte déclaré, ou la clé ne correspond pas.",
      429: "Trop de requêtes — espacez les soumissions.",
    }[status] ?? "Réponse inattendue."
  );
}

async function main() {
  const urls = explicitUrls.length ? explicitUrls : await urlsFromSitemap();

  const foreign = urls.filter((u) => !u.startsWith(`${origin}/`) && u !== origin);
  if (foreign.length) {
    throw new Error(
      `${foreign.length} URL(s) hors du domaine ${host} : ${foreign.slice(0, 3).join(", ")}`,
    );
  }
  if (urls.length > MAX_URLS) {
    throw new Error(`${urls.length} URLs — le maximum par requête est ${MAX_URLS}.`);
  }

  console.log(`Hôte      : ${host}`);
  console.log(`Clé       : ${keyLocation}`);
  console.log(`URLs      : ${urls.length}`);
  urls.forEach((u) => console.log(`  · ${u}`));

  if (dryRun) {
    console.log("\n--dry-run : rien n'a été envoyé.");
    return;
  }

  await checkKeyFile();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation, urlList: urls }),
  });

  console.log(`\nHTTP ${res.status} — ${explain(res.status)}`);
  if (!res.ok && res.status !== 202) {
    const body = await res.text();
    if (body.trim()) console.error(body.slice(0, 500));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(`Échec : ${err.message}`);
  process.exitCode = 1;
});
