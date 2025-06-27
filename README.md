# Garoui Électricité – Application Web Moderne

Application web complète pour la gestion des services, recrutement, sous-traitance, catalogue matériel, partenaires et contact de Garoui Électricité.

## Fonctionnalités principales
- **Accueil** : Présentation, slogan, CTA principaux
- **Services** : Cards, devis, dashboard client
- **Catalogue matériel** : Grille produits, filtres, recherche, fiche produit
- **Recrutement** : Formulaire multi-étapes, upload, dashboard RH
- **Sous-traitance** : Formulaire entreprise, upload, listing partenaires
- **Partenaires** : Listing public, fiche individuelle, filtres
- **Contact** : Formulaire, coordonnées, accessibilité
- **Design** : Palette #002B45, #F5F7F9, accent, responsive, accessibilité AA

## Installation
```bash
npm install
npm run dev
```

## Scripts utiles
- `npm run dev` : Lancer le serveur de développement
- `npm run build` : Build de production
- `npm run preview` : Prévisualisation du build
- `npm run lint` : Linter le code

## Structure du projet
```
├─ src/
│  ├─ components/
│  │  ├─ common/         # Composants réutilisables (Button, Card, Input...)
│  │  ├─ layout/         # Header, Footer
│  │  └─ sections/       # Pages principales (HomePage, ServicesPage...)
│  ├─ types/             # Types TypeScript partagés
│  ├─ hooks/             # Hooks personnalisés
│  ├─ App.tsx            # Routing principal
│  └─ main.tsx           # Entrée app
├─ public/
├─ index.html
├─ tailwind.config.js    # Palette, typo, responsive
├─ package.json
└─ ...
```

## Personnalisation
- **Palette** : modifiez `tailwind.config.js`
- **Logo** : remplacez le composant/logo dans `Header.tsx` et `Footer.tsx`
- **Données** : branchez une API ou modifiez les mocks dans les pages concernées

## Accessibilité & Responsive
- Contraste AA, focus visibles, aria-labels, mobile-first

## Contact
contact@garoui-electricite.fr

---

© 2024 Garoui Électricité. Tous droits réservés. 