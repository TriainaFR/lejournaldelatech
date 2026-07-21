/** Utilitaires de date partagés entre le serveur (rendu statique) et le client. */

const FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Date du jour au format ISO court (YYYY-MM-DD), en heure locale. */
export function todayIso(d: Date = new Date()): string {
  const mois = String(d.getMonth() + 1).padStart(2, "0");
  const jour = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mois}-${jour}`;
}

/** « Mardi 21 juillet 2026 » — midi pour éviter tout décalage de fuseau. */
export function labelFromIso(iso: string): string {
  const raw = FORMATTER.format(new Date(`${iso}T12:00:00`));
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}
