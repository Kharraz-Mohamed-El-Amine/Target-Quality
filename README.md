# Target Quality Solutions · site vitrine

Landing page publique de Target Quality Solutions (Next.js 15, React 19, Tailwind CSS 4).

```bash
npm install
npm run dev
```

- `src/app/page.tsx` : la page ; `src/app/_landing/` : styles, aperçu interactif, compteurs.
- `src/app/tokens.css` : tokens de design TQS.
- `public/images/` : logo officiel et variantes pour fond sombre.

## Déploiement Vercel

Importer le dépôt dans Vercel (préréglage Next.js, aucun réglage requis). Variable optionnelle :
`NEXT_PUBLIC_PORTAL_URL` = adresse du portail ouverte par « Accéder au Portail ». Sans elle, le bouton
mène à `/portail` (« bientôt disponible »).
