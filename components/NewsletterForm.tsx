"use client";

import { useRef, useState } from "react";

/**
 * Formulaire d'inscription — UI seule pour l'instant.
 * Brancher sur un fournisseur (Brevo, Mailjet…) avant la mise en production.
 */
export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  const statusRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="w-full max-w-xl">
      {!done && (
        <form
          className="flex w-full flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
            requestAnimationFrame(() => statusRef.current?.focus());
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Votre adresse e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Votre adresse e-mail"
            className="h-12 flex-1 rounded-none border border-silver-deep/60 bg-white px-4 font-sans text-sm text-ink placeholder:text-ink-soft focus:border-rouge focus:outline-none focus:ring-1 focus:ring-rouge"
          />
          <button
            type="submit"
            className="h-12 shrink-0 cursor-pointer bg-rouge px-6 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-rouge-bright"
          >
            Je m&apos;abonne
          </button>
        </form>
      )}
      <p
        ref={statusRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className={`text-lg text-paper focus:outline-none ${done ? "" : "sr-only"}`}
      >
        {done
          ? "Merci ! Votre inscription à La Dépêche Tech est bien notée."
          : ""}
      </p>
    </div>
  );
}
