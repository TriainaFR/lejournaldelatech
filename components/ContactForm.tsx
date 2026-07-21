"use client";

import emailjs from "@emailjs/browser";
import Link from "next/link";
import { useRef, useState } from "react";

/**
 * Formulaire de contact envoyé via EmailJS (aucun serveur à maintenir).
 *
 * Renseigner les trois identifiants dans `.env.local` :
 *   NEXT_PUBLIC_EMAILJS_SERVICE_ID
 *   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 *   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 *
 * Les champs correspondent aux variables du modèle EmailJS « Contact Us » :
 * {{name}}, {{email}}, {{title}} et {{message}}. Tant que la configuration est
 * absente, le formulaire l'indique au lieu d'échouer silencieusement.
 */

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const SUJETS = [
  "Proposer un sujet",
  "Signaler une erreur",
  "Droit de réponse",
  "Partenariat ou publicité",
  "Autre",
];

type State = "idle" | "sending" | "sent" | "error";

const champ =
  "h-12 w-full border border-ink/25 bg-card px-4 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rouge focus:outline-none focus:ring-1 focus:ring-rouge";
const label =
  "block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  const configure = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Piège à robots : un humain ne remplit pas un champ masqué.
    if ((form.elements.namedItem("website") as HTMLInputElement)?.value) {
      return;
    }

    if (!configure) {
      setState("error");
      setMessage(
        "Le formulaire n'est pas encore configuré. Écrivez-nous directement à redaction@lejournaldelatech.fr."
      );
      return;
    }

    setState("sending");
    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, form, {
        publicKey: PUBLIC_KEY!,
      });
      setState("sent");
      setMessage(
        "Message envoyé. La rédaction vous répond sous deux jours ouvrés."
      );
      form.reset();
    } catch {
      setState("error");
      setMessage(
        "L'envoi a échoué. Réessayez dans un instant, ou écrivez-nous à redaction@lejournaldelatech.fr."
      );
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Votre nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${champ} mt-2`}
            placeholder="Prénom et nom"
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Votre e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${champ} mt-2`}
            placeholder="vous@exemple.fr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="title" className={label}>
          Objet
        </label>
        <select
          id="title"
          name="title"
          required
          defaultValue={SUJETS[0]}
          className={`${champ} mt-2 cursor-pointer`}
        >
          {SUJETS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Votre message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          minLength={20}
          className="mt-2 w-full border border-ink/25 bg-card p-4 font-sans text-sm leading-relaxed text-ink placeholder:text-ink-faint focus:border-rouge focus:outline-none focus:ring-1 focus:ring-rouge"
          placeholder="Décrivez votre demande. Si vous signalez une erreur, indiquez l'article et le passage concerné."
        />
      </div>

      {/* Champ leurre, masqué aux humains et aux lecteurs d'écran */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-12 shrink-0 cursor-pointer bg-rouge px-6 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-rouge-deep disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? "Envoi en cours…" : "Envoyer le message"}
        </button>
        <p className="text-xs leading-relaxed text-ink-faint">
          Vos données servent uniquement à traiter cette demande. Voir notre{" "}
          <Link
            href="/confidentialite"
            className="font-semibold text-rouge hover:text-rouge-deep"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </div>

      <p
        ref={statusRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className={`border-l-2 pl-3 text-sm leading-relaxed focus:outline-none ${
          state === "sent"
            ? "border-rouge text-ink"
            : state === "error"
              ? "border-rouge text-rouge-deep"
              : "sr-only border-transparent"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
