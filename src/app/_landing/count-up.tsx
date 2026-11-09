"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1400;
const format = (n: number, decimals: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Compteur qui monte jusqu'à `value` quand il entre à l'écran, une seule fois.
 * La valeur finale est l'état par défaut (rendu serveur, sans JS, onglet en arrière-plan) : le décompte
 * ne part de zéro qu'à la première image réellement dessinée. « Moins de mouvement » = pas de décompte.
 */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const tick = (now: number) => {
          start ||= now;
          const t = Math.min(1, (now - start) / DURATION);
          setShown(value * (1 - Math.pow(1 - t, 4))); // ease-out quart : rapide puis se pose
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      setShown(value);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {/* la valeur finale reste celle annoncée aux lecteurs d'écran pendant le décompte */}
      <span aria-hidden>
        {prefix}
        {format(shown, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {format(value, decimals)}
        {suffix}
      </span>
    </span>
  );
}
