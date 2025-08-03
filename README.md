# ⚡ Garoui Électricité - Site Web Professionnel

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.18.1-black.svg)](https://www.framer.com/motion/)

Site web moderne et responsive pour **Garoui Électricité**, entreprise spécialisée dans les services électriques. Application React/TypeScript avec interface utilisateur intuitive et animations fluides.

## 🚀 Fonctionnalités

### 📋 Services Électriques
- **Catalogue de services** : Branchement simple/complexe, coupure & rétablissement, pose/dépose compteur
- **Demande de devis** : Formulaire multi-étapes avec validation
- **Dashboard client** : Suivi des demandes et historique
- **Services HT/BT** : Travaux haute et basse tension
- **Éclairage public** : Installation et maintenance

### 👥 Recrutement
- Formulaire de candidature multi-étapes
- Upload de CV et documents
- Dashboard RH pour gestion des candidatures
- Filtres et recherche avancée

### 🤝 Sous-traitance
- Formulaire d'inscription entreprise
- Upload de documents légaux
- Listing des partenaires
- Système de validation

### 📦 Catalogue Matériel
- Grille de produits avec filtres
- Recherche avancée
- Fiches produits détaillées
- Système de catégorisation

### 📞 Contact & Partenaires
- Formulaire de contact
- Coordonnées complètes
- Listing des partenaires
- Accessibilité optimisée

## 🛠️ Technologies

- **Frontend** : React 18.3.1, TypeScript 5.5.3
- **Build Tool** : Vite 5.4.2
- **Styling** : Tailwind CSS 3.4.1
- **Animations** : Framer Motion 12.18.1
- **Icons** : Lucide React 0.344.0
- **Routing** : React Router DOM 7.6.2
- **Forms** : React Hook Form 7.58.1
- **Validation** : Yup 1.6.1
- **UI Components** : Headless UI 2.2.4

## 📦 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation des dépendances
```bash
# Cloner le repository
git clone https://github.com/votre-username/garoui-electricite.git
cd garoui-electricite

# Installer les dépendances
npm install
```

### Lancement en développement
```bash
# Démarrer le serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:5173
```

## 📜 Scripts Disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement
npm run preview      # Prévisualise le build de production

# Production
npm run build        # Crée un build optimisé pour la production

# Qualité du code
npm run lint         # Lance ESLint pour vérifier le code
```

## 🏗️ Structure du Projet

```
garoui/
├── public/                    # Assets statiques
│   ├── bg.jpg
│   ├── service.jpg
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/           # Composants réutilisables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Select.tsx
│   │   ├── layout/           # Composants de mise en page
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/         # Pages principales
│   │       ├── HomePage.tsx
│   │       ├── ServicesPage.tsx
│   │       ├── MaterialPage.tsx
│   │       ├── RecruitmentPage.tsx
│   │       ├── SubcontractingPage.tsx
│   │       └── ContactPage.tsx
│   ├── hooks/                # Hooks personnalisés
│   │   └── useNavigation.ts
│   ├── types/                # Types TypeScript
│   │   └── index.ts
│   ├── App.tsx              # Composant principal avec routing
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── package.json
├── tailwind.config.js       # Configuration Tailwind
├── vite.config.ts           # Configuration Vite
└── tsconfig.json           # Configuration TypeScript
```

## 🎨 Design System

### Palette de Couleurs
- **Primary** : `#002B45` (Bleu foncé)
- **Background** : `#F5F7F9` (Gris clair)
- **Accent** : `#009FE3` (Bleu accent)
- **Text** : `#1E293B` (Slate 800)

### Typographie
- **Titres** : Font-bold, tailles responsives
- **Corps** : Font-normal, line-height optimisé
- **Accessibilité** : Contraste AA respecté

### Composants
- **Cards** : Bordures arrondies, ombres subtiles
- **Buttons** : États hover, focus, disabled
- **Forms** : Validation en temps réel
- **Modals** : Animations fluides avec Framer Motion

## 🔧 Configuration

### Personnalisation des Couleurs
Modifiez `tailwind.config.js` pour changer la palette :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#002B45',
        accent: '#009FE3',
        background: '#F5F7F9',
      }
    }
  }
}
```

### Ajout de Nouvelles Pages
1. Créez le composant dans `src/components/sections/`
2. Ajoutez la route dans `src/App.tsx`
3. Mettez à jour la navigation dans `Header.tsx`

## 📱 Responsive Design

L'application est entièrement responsive avec :
- **Mobile First** : Optimisé pour les petits écrans
- **Breakpoints** : sm, md, lg, xl, 2xl
- **Navigation** : Menu hamburger sur mobile
- **Grilles** : Adaptatives selon la taille d'écran

## ♿ Accessibilité

- **Contraste** : Niveau AA respecté
- **Navigation** : Clavier et lecteurs d'écran
- **ARIA** : Labels et descriptions appropriés
- **Focus** : Indicateurs visuels clairs
- **Alt Text** : Pour toutes les images

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Déploiement sur Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Déploiement sur Netlify
```bash
# Build et déploiement automatique depuis GitHub
# Connectez votre repository à Netlify
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

**Garoui Électricité**
- 📧 Email : contact@garoui-electricite.fr
- 🌐 Site : [garoui-electricite.fr](https://garoui-electricite.fr)
- 📍 Localisation : France

## 🙏 Remerciements

- [React](https://reactjs.org/) - Framework JavaScript
- [Vite](https://vitejs.dev/) - Build tool rapide
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide](https://lucide.dev/) - Icônes

---

<div align="center">
  <strong>⚡ Développé avec passion pour Garoui Électricité ⚡</strong>
</div> "# Garoui-Electrity" 
"# Garoui-Electrity" 
"# Garoui-Electrity" 
