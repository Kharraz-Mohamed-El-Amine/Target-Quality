"use client";

import { useActionState } from "react";
import { CircleCheck, Send, TriangleAlert } from "lucide-react";
import { sendContact, type ContactField, type ContactState } from "./contact-action";

const INITIAL: ContactState = { status: "idle" };

function Field({
  name,
  label,
  state,
  optional = false,
  multiline = false,
  ...input
}: {
  name: ContactField;
  label: string;
  state: ContactState;
  optional?: boolean;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel";
  maxLength?: number;
}) {
  const error = state.errors?.[name];
  const shared = {
    id: `contact-${name}`,
    name,
    required: !optional,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `contact-${name}-error` : undefined,
    className: "lp-input",
    ...input,
  };
  return (
    <div className={multiline ? "sm:col-span-2" : undefined}>
      <label htmlFor={shared.id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-text">
        {label}
        {optional && <span className="text-xs font-normal text-text-secondary">facultatif</span>}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input {...shared} />}
      {error && (
        <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Formulaire de contact : validation et envoi côté serveur (contact-action.ts), saisie conservée en cas d'erreur. */
export function ContactForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(sendContact, INITIAL);

  if (state.status === "sent") {
    return (
      <div role="status" className="lp-fade flex min-h-72 flex-col items-center justify-center gap-3 text-center">
        <CircleCheck className="size-10 text-success" aria-hidden />
        <p className="text-lg font-semibold text-text">Message envoyé</p>
        <p className="max-w-sm text-base text-text-secondary">Merci. Notre équipe revient vers vous à l&apos;adresse indiquée dans les meilleurs délais.</p>
      </div>
    );
  }

  return (
    // la clé remonte le formulaire après chaque réponse : les defaultValue reprennent la saisie renvoyée
    <form key={JSON.stringify(state.values ?? {})} action={action} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field name="name" label="Nom" state={state} autoComplete="name" maxLength={100} />
      <Field name="company" label="Société" state={state} optional autoComplete="organization" maxLength={120} />
      <Field name="email" label="E-mail" state={state} type="email" inputMode="email" autoComplete="email" maxLength={200} />
      <Field name="phone" label="Téléphone" state={state} optional type="tel" inputMode="tel" autoComplete="tel" maxLength={40} />
      <Field name="message" label="Message" state={state} multiline maxLength={4000} />

      {/* champ piège pour les robots : hors écran, hors tabulation, ignoré des lecteurs d'écran */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Site web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "failed" && (
        <p role="alert" className="flex items-start gap-2 rounded-md bg-danger-soft px-3 py-2.5 text-sm text-danger-soft-text sm:col-span-2">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            Le message n&apos;a pas pu être envoyé. Réessayez dans un instant ou écrivez-nous directement à{" "}
            <a href={`mailto:${email}`} className="font-medium underline underline-offset-2">
              {email}
            </a>
            .
          </span>
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
        <p className="text-sm text-text-secondary">Vos informations servent uniquement à vous répondre.</p>
        <span className="lp-glow">
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending || undefined}
            className="pressable inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-md font-medium text-on-accent hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Envoi en cours…" : "Envoyer le message"}
            <Send className="size-4" aria-hidden />
          </button>
        </span>
      </div>
    </form>
  );
}
