import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChartColumn, ClipboardCheck, Crosshair, ListChecks } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CountUp } from "./_landing/count-up";
import { HeroPreview } from "./_landing/hero-preview";
import "./_landing/landing.css";

// Site vitrine public. Le portail vit ailleurs : son adresse vient de NEXT_PUBLIC_PORTAL_URL.
export const metadata: Metadata = {
  title: "Target Quality Solutions · Excellence qualité industrielle",
  description:
    "Audits et conformité, contrôle qualité, suivi des missions et reporting en temps réel : Target Quality Solutions sécurise vos lignes de production.",
};

const PORTAL = process.env.NEXT_PUBLIC_PORTAL_URL || "/portail";

const NAV = [
  { href: "#plateforme", label: "Plateforme" },
  { href: "#chiffres", label: "Chiffres clés" },
  { href: "#services", label: "Services" },
];

const SERVICES = [
  {
    icon: ClipboardCheck,
    title: "Audits & Conformité",
    text: "Grilles d'audit structurées, écarts tracés et plans d'action suivis jusqu'à leur clôture, selon vos référentiels.",
    points: ["Grilles par site et par poste", "Écarts et actions horodatés"],
  },
  {
    icon: Crosshair,
    title: "Contrôle Qualité",
    text: "Tri, retouche et mur qualité au plus près de la ligne : chaque pièce contrôlée est comptée, chaque défaut est qualifié.",
    points: ["Tri et retouche sur site", "Défauts qualifiés à la pièce"],
  },
  {
    icon: ListChecks,
    title: "Suivi des IT / Missions",
    text: "Instructions de travail validées, équipes affectées et avancement des missions visibles à tout moment, du lancement à la clôture.",
    points: ["Instructions de travail versionnées", "Affectation des équipes"],
  },
  {
    icon: ChartColumn,
    title: "Reporting & Analytics",
    text: "Rapports quotidiens, indicateurs de performance et accès client dédié pour décider sur des faits, pas sur des impressions.",
    points: ["Rapports envoyés chaque jour", "Portail client en lecture"],
  },
];

function Brand({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 rounded-sm ${className ?? ""}`} aria-label="Target Quality Solutions, accueil">
      <Image src="/images/logo-tqs-mark-dark.png" alt="" width={424} height={287} priority className="h-9 w-auto sm:h-10" />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className="text-base font-bold tracking-[0.14em] text-text sm:text-md">TARGET QUALITY</span>
        <span className="mt-1 text-2xs font-medium tracking-[0.34em] text-text-secondary uppercase">Solutions</span>
      </span>
    </Link>
  );
}

/** `compact` (en-tête) : le libellé se réduit à « Portail » sur téléphone, le nom accessible reste complet. */
function PortalCta({ size = "md", quiet = false, compact = false }: { size?: "md" | "lg"; quiet?: boolean; compact?: boolean }) {
  return (
    <span className="lp-glow" data-quiet={quiet ? "" : undefined}>
      <ButtonLink href={PORTAL} prefetch={false} variant="primary" size={size} aria-label="Accéder au Portail">
        <span>
          <span className={compact ? "max-sm:hidden" : undefined}>Accéder au </span>Portail
        </span>
        <ArrowRight aria-hidden className={compact ? "max-sm:hidden" : undefined} />
      </ButtonLink>
    </span>
  );
}

export default function Home() {
  return (
    <div className="lp">
      <div className="lp-backdrop" aria-hidden />

      <header className="lp-header">
        <div className="lp-container flex h-16 items-center justify-between gap-4">
          <Brand />
          <nav aria-label="Sections" className="flex items-center gap-1 text-base font-medium max-md:hidden">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="lp-navlink">
                {n.label}
              </a>
            ))}
          </nav>
          <PortalCta quiet compact />
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="lp-container grid items-center gap-12 pt-14 pb-16 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24">
          <div>
            <p className="lp-badge lp-rise" style={{ "--i": 0 } as React.CSSProperties}>
              <span className="lp-badge-dot" aria-hidden />
              Precision <span className="lp-badge-sep" aria-hidden>|</span> Compliance <span className="lp-badge-sep" aria-hidden>|</span> Excellence
            </p>
            <h1 className="lp-title lp-rise mt-6" style={{ "--i": 1 } as React.CSSProperties}>
              Transformez votre qualité industrielle en <span className="lp-gradient-text">avantage mesurable</span>.
            </h1>
            <p className="lp-lead lp-rise mt-6 max-w-xl" style={{ "--i": 2 } as React.CSSProperties}>
              Target Quality Solutions déploie ses équipes sur vos lignes, contrôle chaque pièce et vous rend la main sur vos indicateurs&nbsp;: conformité, missions et
              délais, suivis en temps réel sur un seul portail.
            </p>
            <div className="lp-rise mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <PortalCta size="lg" />
              <a
                href="#services"
                className="lp-glass pressable inline-flex h-11 items-center gap-2 rounded-md px-5 text-md font-medium text-text hover:border-border-input"
              >
                En savoir plus
              </a>
            </div>
            <p className="lp-rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted" style={{ "--i": 4 } as React.CSSProperties}>
              <span>Équipes sur site</span>
              <span aria-hidden>·</span>
              <span>Traçabilité à la pièce</span>
              <span aria-hidden>·</span>
              <span>Rapports quotidiens</span>
            </p>
          </div>

          <div id="plateforme" className="lp-rise" style={{ "--i": 3 } as React.CSSProperties}>
            <HeroPreview />
          </div>
        </section>

        {/* Chiffres clés */}
        <section id="chiffres" aria-labelledby="chiffres-titre" className="lp-container pb-20 lg:pb-28">
          <h2 id="chiffres-titre" className="sr-only">
            Chiffres clés
          </h2>
          <div className="lp-glass lp-metrics grid md:grid-cols-3">
            <div className="lp-metric">
              <p className="lp-metric-value lp-gradient-text">
                <CountUp value={99.8} decimals={1} suffix={" %"} />
              </p>
              <p className="mt-3 text-md font-medium text-text">Conformité</p>
              <p className="mt-1 text-sm text-text-secondary">Pièces livrées conformes après contrôle.</p>
            </div>
            <div className="lp-metric">
              <p className="lp-metric-value lp-gradient-text">
                <CountUp value={40} prefix="+" suffix={" %"} />
              </p>
              <p className="mt-3 text-md font-medium text-text">Efficacité opérationnelle</p>
              <p className="mt-1 text-sm text-text-secondary">Moins de ressaisies, des décisions plus rapides.</p>
            </div>
            <div className="lp-metric">
              <p className="lp-metric-value lp-gradient-text">24/7</p>
              <p className="mt-3 text-md font-medium text-text">Suivi en temps réel</p>
              <p className="mt-1 text-sm text-text-secondary">Vos missions visibles à toute heure, sur tous vos sites.</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" aria-labelledby="services-titre" className="lp-container pb-20 lg:pb-28">
          <div className="max-w-2xl">
            <p className="lp-eyebrow">Nos cœurs de métier</p>
            <h2 id="services-titre" className="lp-h2 mt-3">
              Quatre piliers pour une qualité sans angle mort.
            </h2>
            <p className="lp-lead mt-4">De l&apos;audit au rapport, chaque étape est mesurée, tracée et partagée avec vous.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <li key={s.title} className="lp-glass lp-card flex flex-col">
                <span className="lp-card-icon">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-text">{s.title}</h3>
                <p className="mt-2 text-base text-text-secondary">{s.text}</p>
                <ul className="mt-auto flex flex-col gap-1.5 pt-5 text-sm text-text">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="size-1.5 shrink-0 rounded-pill bg-teal" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Appel final */}
        <section className="lp-container pb-20 lg:pb-28">
          <div className="lp-glass lp-cta isolate flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <h2 className="lp-h2">Vos indicateurs vous attendent.</h2>
              <p className="lp-lead mt-3">Connectez-vous au portail pour suivre vos missions, vos rapports et votre conformité.</p>
            </div>
            <PortalCta size="lg" />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="lp-container flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <Image src="/images/logo-tqs-dark.png" alt="Target Quality Solutions" width={540} height={423} className="h-20 w-auto" />
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-2 text-base">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="lp-navlink">
                {n.label}
              </a>
            ))}
            <Link href={PORTAL} prefetch={false} className="lp-navlink">
              Portail
            </Link>
          </nav>
        </div>
        <div className="border-t border-border">
          <p className="lp-container py-5 text-sm text-text-muted">
            © {new Date().getFullYear()} TARGET QUALITY SOLUTIONS. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
