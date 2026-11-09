"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

type View = {
  id: string;
  label: string;
  kpi: string;
  kpiLabel: string;
  trend: string;
  bars: number[]; // 12 semaines, 0..1
  rows: { name: string; value: string; tone: "success" | "info" | "warning" }[];
};

// Données de démonstration : l'aperçu montre la forme du portail, pas un client réel.
const VIEWS: View[] = [
  {
    id: "conformite",
    label: "Conformité",
    kpi: "99,8 %",
    kpiLabel: "Pièces conformes après contrôle",
    trend: "+1,2 pt sur 12 semaines",
    bars: [0.62, 0.66, 0.64, 0.71, 0.74, 0.72, 0.79, 0.83, 0.81, 0.88, 0.93, 0.98],
    rows: [
      { name: "Ligne A · Faisceaux", value: "99,9 %", tone: "success" },
      { name: "Ligne B · Emboutissage", value: "99,7 %", tone: "success" },
      { name: "Ligne C · Plasturgie", value: "98,4 %", tone: "warning" },
    ],
  },
  {
    id: "missions",
    label: "Missions",
    kpi: "128",
    kpiLabel: "Missions actives ce mois",
    trend: "+14 depuis le mois dernier",
    bars: [0.4, 0.46, 0.52, 0.48, 0.58, 0.63, 0.6, 0.7, 0.76, 0.72, 0.84, 0.9],
    rows: [
      { name: "Tri sélectif · Lot 4812", value: "En cours", tone: "info" },
      { name: "Retouche · Lot 4797", value: "Clôturée", tone: "success" },
      { name: "Mur qualité · Lot 4803", value: "À valider", tone: "warning" },
    ],
  },
  {
    id: "delais",
    label: "Délais",
    kpi: "2 h 10",
    kpiLabel: "Délai moyen de prise en charge",
    trend: "−35 min sur 12 semaines",
    bars: [0.95, 0.9, 0.92, 0.84, 0.8, 0.76, 0.78, 0.68, 0.62, 0.6, 0.52, 0.46],
    rows: [
      { name: "Alerte → équipe sur site", value: "2 h 10", tone: "success" },
      { name: "Saisie → rapport client", value: "Temps réel", tone: "info" },
      { name: "Clôture → facturation", value: "24 h", tone: "success" },
    ],
  },
];

const TONE = {
  success: "bg-success-soft text-success",
  info: "bg-info-soft text-info",
  warning: "bg-warning-soft text-warning",
} as const;

/** Carte d'aperçu du portail : trois vues, barres qui se redressent d'une vue à l'autre. */
export function HeroPreview() {
  const [active, setActive] = useState(0);
  const view = VIEWS[active]!;

  return (
    <div className="lp-glass lp-preview p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-pill bg-success opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-pill bg-success" />
          </span>
          <span className="text-sm font-medium text-text">Tableau de bord qualité</span>
        </div>
        <span className="font-mono text-2xs tracking-wider text-text-secondary uppercase">Aperçu · démo</span>
      </div>

      <div role="tablist" aria-label="Vue de l'aperçu" className="mt-4 flex gap-1 rounded-md bg-sunken/70 p-1">
        {VIEWS.map((v, i) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            id={`lp-tab-${v.id}`}
            aria-selected={i === active}
            aria-controls="lp-preview-panel"
            className="lp-seg"
            onClick={() => setActive(i)}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div id="lp-preview-panel" role="tabpanel" aria-labelledby={`lp-tab-${view.id}`} className="mt-5">
        <div key={view.id} className="lp-fade flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-text-secondary">{view.kpiLabel}</p>
            <p className="tabular mt-1 text-display font-bold tracking-tight text-text">{view.kpi}</p>
          </div>
          <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-pill bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
            <TrendingUp className="size-3.5" aria-hidden />
            {view.trend}
          </span>
        </div>

        {/* les barres gardent leur nœud d'une vue à l'autre : seule l'échelle change, la transition se retargette */}
        <div className="mt-5 flex h-28 items-end gap-1.5 border-b border-border" aria-hidden>
          {view.bars.map((h, i) => (
            <span
              key={i}
              className="lp-bar"
              data-last={i === view.bars.length - 1 ? "" : undefined}
              style={{ transform: `scaleY(${h})`, "--i": i } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-2xs text-text-secondary" aria-hidden>
          <span>S-12</span>
          <span>Cette semaine</span>
        </div>

        <ul key={`${view.id}-rows`} className="lp-fade mt-4 flex flex-col gap-1.5">
          {view.rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between gap-3 rounded-md bg-sunken/60 px-3 py-2">
              <span className="truncate text-sm text-text">{r.name}</span>
              <span className={`tabular shrink-0 rounded-pill px-2 py-0.5 text-xs font-medium ${TONE[r.tone]}`}>{r.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
