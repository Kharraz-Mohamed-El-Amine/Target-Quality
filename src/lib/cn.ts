/** Concatène des classes conditionnelles (sans dépendance : pas de fusion de conflits Tailwind). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
