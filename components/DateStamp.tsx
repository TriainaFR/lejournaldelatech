"use client";

import { useSyncExternalStore } from "react";
import { labelFromIso, todayIso } from "@/lib/date";

/**
 * Date d'édition toujours juste chez le visiteur.
 *
 * Le site étant statique, le HTML livré porte la date du build : elle sert de
 * valeur d'hydratation (`initialIso`), puis le client bascule immédiatement sur
 * la date réelle. L'abonnement la rafraîchit ensuite au passage de minuit et
 * au retour sur l'onglet, pour un onglet laissé ouvert plusieurs jours.
 */
function subscribe(onStoreChange: () => void): () => void {
  let timer: number | undefined;

  const scheduleMidnight = () => {
    const now = new Date();
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      2
    );
    timer = window.setTimeout(() => {
      onStoreChange();
      scheduleMidnight();
    }, nextDay.getTime() - now.getTime());
  };

  const refresh = () => {
    if (document.visibilityState === "visible") onStoreChange();
  };

  scheduleMidnight();
  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("focus", refresh);

  return () => {
    if (timer !== undefined) window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", refresh);
    window.removeEventListener("focus", refresh);
  };
}

export default function DateStamp({
  initialIso,
  initialLabel,
}: {
  initialIso: string;
  initialLabel: string;
}) {
  const iso = useSyncExternalStore(
    subscribe,
    () => todayIso(),
    () => initialIso
  );

  return (
    <time dateTime={iso}>
      {iso === initialIso ? initialLabel : labelFromIso(iso)}
    </time>
  );
}
