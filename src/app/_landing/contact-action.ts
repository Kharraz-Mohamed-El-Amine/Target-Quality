"use server";

// Formulaire « Contactez-nous » : le message part par e-mail vers la boîte de contact, via l'API HTTP
// de Resend (aucune dépendance). L'adresse du visiteur est mise en « répondre à ».
const TO = process.env.CONTACT_TO || "contact@targetquality.net";
const FROM = process.env.CONTACT_FROM || "Site Target Quality Solutions <site@targetquality.net>";

export type ContactField = "name" | "company" | "email" | "phone" | "message";
export type ContactState = {
  status: "idle" | "sent" | "invalid" | "failed";
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const LIMITS: Record<ContactField, number> = { name: 100, company: 120, email: 200, phone: 40, message: 4000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// une seule ligne : rien de ce que saisit le visiteur ne peut ajouter un en-tête au message
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const read = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  const values: Record<ContactField, string> = {
    name: oneLine(read("name")),
    company: oneLine(read("company")),
    email: oneLine(read("email")),
    phone: oneLine(read("phone")),
    message: read("message"),
  };

  // champ piège, invisible pour un humain : un robot qui le remplit reçoit un « envoyé » sans envoi
  if (read("website")) return { status: "sent" };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Indiquez votre nom.";
  if (!EMAIL.test(values.email)) errors.email = "Indiquez une adresse e-mail valide.";
  if (values.message.length < 10) errors.message = "Décrivez votre besoin en quelques mots (10 caractères au moins).";
  for (const k of Object.keys(LIMITS) as ContactField[]) {
    if (values[k].length > LIMITS[k]) errors[k] = `${LIMITS[k]} caractères au plus.`;
  }
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY absente : message non envoyé");
    return { status: "failed", values };
  }

  const text = [
    `Nom : ${values.name}`,
    `Société : ${values.company || "non renseignée"}`,
    `E-mail : ${values.email}`,
    `Téléphone : ${values.phone || "non renseigné"}`,
    "",
    values.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: values.email,
        subject: `Contact site : ${values.name}${values.company ? ` (${values.company})` : ""}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] envoi refusé", res.status, await res.text().catch(() => ""));
      return { status: "failed", values };
    }
  } catch (e) {
    console.error("[contact] envoi impossible", e);
    return { status: "failed", values };
  }
  return { status: "sent" };
}
