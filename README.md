# Site Medixis

Site vitrine de Medixis (vente, distribution et import de matériel médical, Casablanca).
Même technologie que Medicaris : Next.js 16 + Tailwind 4, sortie `standalone` pour Cap Connect (cPanel Node.js).

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Gammes, produits, marques | Espace admin : `/admin` |
| Textes des trois métiers, contenu de secours | `lib/content.ts` |
| Téléphone, domaine, mentions légales | `lib/constants.ts` |
| Couleurs | `app/globals.css` |
| Titre et description Google | `app/layout.tsx` |

Tout ce qui est marqué `[À COMPLÉTER]` ou `[À CONFIRMER]` attend une information du client.

## Formulaire de contact

Variables d'environnement à régler dans cPanel → Setup Node.js App :
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_FROM`, `CONTACT_TO`.

## Espace admin (Supabase)

1. Supabase → SQL Editor → coller `supabase/migrations/0001_init.sql` → Run (une seule fois).
   Vérifier avant la dernière ligne : l'e-mail autorisé à administrer.
2. Supabase → Authentication → Users → Add user : créer le compte avec ce même e-mail.
3. Supabase → Authentication → Sign In / Providers : désactiver « Allow new users to sign up ».
4. Se connecter sur `/admin/login`.

Sécurité : seuls les e-mails de la table `admins` peuvent modifier le contenu.
Pour ajouter quelqu'un : `insert into admins (email) values ('...');` puis créer son compte.

Tant que les tables n'existent pas, le site public affiche le contenu de secours de `lib/content.ts`.
