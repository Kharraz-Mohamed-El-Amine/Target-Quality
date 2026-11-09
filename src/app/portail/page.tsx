import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import "../_landing/landing.css";

export const metadata: Metadata = { title: "Portail", robots: { index: false } };

// Page d'attente : affichée tant que NEXT_PUBLIC_PORTAL_URL ne pointe pas vers le portail en ligne.
export default function PortalSoon() {
  return (
    <div className="lp grid place-items-center px-5">
      <div className="lp-backdrop" aria-hidden />
      <main className="lp-glass w-full max-w-md rounded-lg p-8 text-center">
        <Image src="/images/logo-tqs-mark-dark.png" alt="" width={424} height={287} priority className="mx-auto h-14 w-auto" />
        <h1 className="mt-6 text-2xl font-semibold text-text">Le portail arrive bientôt</h1>
        <p className="mt-3 text-md text-text-secondary">
          L&apos;espace de suivi de vos missions, rapports et indicateurs est en cours de mise en service.
        </p>
        <ButtonLink href="/" className="mt-8">
          <ArrowLeft aria-hidden />
          Retour à l&apos;accueil
        </ButtonLink>
      </main>
    </div>
  );
}
