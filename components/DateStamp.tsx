"use client";

/**
 * Date du jour. Rendue côté serveur avec la date du build, remplacée par la
 * date réelle à l'hydratation — d'où le suppressHydrationWarning (pattern
 * recommandé par React pour les horodatages).
 */
export default function DateStamp() {
  const raw = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  const label = raw.charAt(0).toUpperCase() + raw.slice(1);

  return <span suppressHydrationWarning>{label}</span>;
}
