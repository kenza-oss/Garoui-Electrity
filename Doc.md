# Rapport de Liaison Frontend ↔ Backend

- Projet: Vite + React 18 + TypeScript + Tailwind
- Constat: Pages riches en formulaires mais données mockées/localStorage, pas de vrai routage, aucune couche API.

## Diagnostic

- `Garoui-Electrity/src/App.tsx:1`: navigation gérée par état local au lieu de routes (pas de deep-linking ni de garde de routes).
- `Garoui-Electrity/src/components/sections/RecruitmentPage.tsx:1`: offres d’emploi/candidatures en mock + localStorage.
- `Garoui-Electrity/src/components/sections/SubcontractingPage.tsx:1`: formulaire sous-traitance en pur client; uploads non envoyés à un serveur.
- `Garoui-Electrity/src/components/sections/PasswordManagementPage.tsx:1`: gestion de mots de passe en clair côté frontend (faille critique) → doit être backend-only.
- `Garoui-Electrity/src/components/sections/ContactPage.tsx:1`: envoi local (aucun appel API).
- `Garoui-Electrity/src/hooks/useCompanyVerification.ts:1`: « vérification partenaire » en mock côté client.
- `Garoui-Electrity/README.md:1`: encodage corrompu et mention de React Router non reflétée dans le code.

## Objectif

- Remplacer mocks/localStorage par des appels API.
- Introduire un vrai routage (public/privé) avec protections.
- Ajouter couche HTTP typée, auth, upload fichiers, gestion erreurs/chargement.

## Architecture Frontend (proposée)

- Couche API: `src/lib/http.ts` (Axios/fetch) + services par domaine (`src/services/*`).
- Gestion requêtes: `@tanstack/react-query` (cache, loading, retry, mutations).
- Routage: `react-router-dom` (layout public + layout admin). Supprimer l’état `activeSection`.
- Config: `VITE_API_URL` dans `.env` (Vite).
- Sécurité: JWT en cookies HttpOnly (idéal) + refresh; interceptors.
- Upload: `FormData` vers endpoints dédiés (progression, validation MIME/taille).
- Erreurs/états: toasts/alertes, loaders, empty states uniformes.

### Fichiers à ajouter (exemple)

- `src/lib/http.ts`: client HTTP (baseURL, interceptors auth/erreurs).
- `src/services/jobOffers.ts`: `listJobOffers`, `createJobOffer`, `applyToJob`.
- `src/services/partners.ts`: `listPartners`, `createPartnerApplication` (multipart).
- `src/services/contact.ts`: `sendContactMessage`.
- `src/hooks/useJobOffers.ts`, `src/hooks/usePartners.ts`: queries/mutations via React Query.
- Migration du routing dans `src/App.tsx` vers `react-router-dom` (routes publiques/privées).

## Architecture Backend (minimal viable)

- Stack conseillée: NestJS (TypeScript) + Postgres.
- Modules: `auth`, `partners`, `job-offers`, `applications`, `quotes`, `contacts`, `products`, `companies`, `files`.
- Stockage fichiers: S3 compatible (MinIO) ou disque + reverse-proxy; URLs présignées.

## Spécifications API (exemples)

- Auth
  - `POST /api/auth/login` { email, password } → { accessToken, refreshToken, role }
  - `POST /api/auth/refresh`
  - `POST /api/auth/logout`
- Offres d’emploi
  - `GET /api/job-offers?search=&wilaya=&contractType=&page=&limit=`
  - `POST /api/job-offers` (admin/entreprise)
  - `GET /api/job-offers/:id`
  - `POST /api/job-offers/:id/applications` (multipart: cv, coverLetter)
  - `GET /api/job-offers/:id/applications` (propriétaire)
- Sous-traitance/Partenaires
  - `GET /api/partners` (public, filtrable)
  - `POST /api/partners/applications` (multipart: registre, attestation, références)
  - `GET /api/partners/applications` (admin)
  - `PATCH /api/partners/applications/:id` { status }
- Entreprises
  - `GET /api/companies/:id`
  - `GET /api/companies/verify?name=...`
- Devis/Abonnements
  - `POST /api/quotes`
  - `GET /api/quotes` (admin)
- Contact
  - `POST /api/contacts` { name, email, phone, message }
- Produits
  - `GET /api/products?search=&category=&voltage=`

## Modifications Frontend prioritaires

- Routage
  - Remplacer la navigation par état (`src/App.tsx`) par `react-router-dom`.
  - Layout public: Accueil, Services, Matériel, Partenaires, Contact.
  - Layout recrutement: Offres, Candidature.
  - Layout admin: gestion offres/candidatures/partenaires; protéger par auth/roles.
- Retrait des mocks/localStorage
  - `RecruitmentPage.tsx`: utiliser `GET /api/job-offers`, `POST /api/job-offers/:id/applications` (multipart).
  - `SubcontractingPage.tsx`: `POST /api/partners/applications` (multipart) + `GET /api/partners` filtrable.
  - `ContactPage.tsx`: `POST /api/contacts` avec feedback succès/erreur.
  - `useCompanyVerification.ts`: remplacer par `GET /api/companies/verify` ou login entreprise.
- “Gestion MDP” (sécurité)
  - Supprimer l’affichage de mots de passe côté frontend et retirer le champ `password` du type `Partner`.
  - Déplacer la fonctionnalité en back-office sécurisé (reset/rotation, jamais lecture en clair).
- Couche API/Hooks
  - Ajouter `src/lib/http.ts`, `src/services/*`, `src/hooks/*` et intégrer React Query pour data server.
- Config & CORS
  - `.env` et `.env.example`: `VITE_API_URL=http://localhost:3000`.
  - Backend: CORS autorisant l’origine Vite; cookies HttpOnly si utilisés.

## Exemples concrets

### Client HTTP `src/lib/http.ts`

```ts
import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    // TODO: gérer 401 + refresh
    return Promise.reject(err);
  }
);
```

### Service Offres `src/services/jobOffers.ts`

```ts
import { http } from '../lib/http';

export const listJobOffers = (params?: any) => http.get('/job-offers', { params }).then(r => r.data);
export const getJobOffer = (id: string) => http.get(`/job-offers/${id}`).then(r => r.data);
export const applyToJob = (id: string, formData: FormData) =>
  http.post(`/job-offers/${id}/applications`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
```

### Hook React Query `src/hooks/useJobOffers.ts`

```ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { listJobOffers, applyToJob } from '../services/jobOffers';

export const useJobOffers = (params: any) => useQuery({ queryKey: ['jobOffers', params], queryFn: () => listJobOffers(params) });
export const useApplyToJob = (id: string) => useMutation({ mutationFn: (fd: FormData) => applyToJob(id, fd) });
```

## Sécurité

- Auth: JWT access + refresh (refresh en cookie HttpOnly), rôles `admin`/`company`/`public`.
- Données sensibles: jamais de mots de passe en clair côté client; préférer des workflows de réinitialisation.
- Uploads: limiter types/tailles, antivirus si possible; stockage externe; URLs signées.
- Validation: côté backend (class-validator), sanitizer des entrées, rate limit, logs/audit.

## Déploiement

- Front: build Vite et déploiement (Vercel/Netlify/Nginx).
- Back: NestJS sur VPS/Render/Fly.io; Postgres managé ou self-host; migrations (Prisma/TypeORM).
- CI/CD: lint, build, tests, migrations; variables d’environnement par environnement.

## Plan d’implémentation (phases)

1) Routage + couche HTTP + `.env` + React Query
2) Recrutement (listage offres, candidature fichiers)
3) Sous-traitance (inscription multipart, listing partenaires filtrable)
4) Contact + Devis (endpoints simples)
5) Admin sécurisé (remplacer « Gestion MDP »), rôles et protections de routes
6) Durcissement sécurité, observabilité, monitoring
