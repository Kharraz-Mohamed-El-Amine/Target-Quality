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

Importer le dépôt dans Vercel (préréglage Next.js). Variables d'environnement :

- `RESEND_API_KEY` : clé d'API [Resend](https://resend.com), nécessaire au formulaire de contact. Le domaine
  `targetquality.net` doit être vérifié dans Resend (enregistrements DNS) pour l'expéditeur `site@targetquality.net`.
  Sans clé, le formulaire affiche une erreur et renvoie vers l'adresse e-mail.
- `CONTACT_FROM`, `CONTACT_TO` (facultatives) : expéditeur et destinataire, par défaut `contact@targetquality.net`.
- `NEXT_PUBLIC_PORTAL_URL` (facultative) : adresse du portail ouverte par « Accéder au Portail ». Sans elle, le bouton
  mène à `/portail` (« bientôt disponible »).
