# Démonstration de la Page de Gestion des Mots de Passe

## 🎯 Objectif
Cette page permet aux administrateurs de gérer de manière sécurisée tous les mots de passe des entreprises partenaires.

## 🔐 Fonctionnalités principales

### 1. **Affichage sécurisé des mots de passe**
- Les mots de passe sont masqués par défaut (••••••••)
- Bouton "Voir/Masquer" pour afficher temporairement le mot de passe
- Interface claire et organisée

### 2. **Gestion complète (CRUD)**
- **Créer** : Ajouter de nouveaux mots de passe
- **Lire** : Consulter tous les mots de passe existants
- **Modifier** : Éditer les informations existantes
- **Supprimer** : Retirer des entrées obsolètes

### 3. **Recherche et filtrage**
- Recherche par nom d'entreprise ou personne de contact
- Filtrage par wilaya
- Interface de recherche intuitive

### 4. **Sécurité**
- Mots de passe masqués par défaut
- Confirmation avant suppression
- Validation des champs obligatoires

## 🚀 Comment utiliser

### **Accéder à la page**
1. Cliquer sur "Gestion MDP" dans la navbar
2. **Écran de connexion** : Saisir le mot de passe administrateur
3. **Mot de passe requis** : `garaouii2024`
4. Après authentification, la page s'affiche avec tous les mots de passe existants

### **Ajouter un nouveau mot de passe**
1. Cliquer sur "Ajouter un mot de passe"
2. Remplir le formulaire :
   - Nom de l'entreprise (obligatoire)
   - Mot de passe (obligatoire)
   - Personne de contact
   - Téléphone
   - Wilaya
3. Cliquer sur "Ajouter"

### **Modifier un mot de passe existant**
1. Cliquer sur "Modifier" à côté de l'entrée souhaitée
2. Le formulaire se remplit avec les données actuelles
3. Modifier les champs nécessaires
4. Cliquer sur "Mettre à jour"

### **Supprimer un mot de passe**
1. Cliquer sur "Supprimer" à côté de l'entrée
2. Confirmer la suppression dans la boîte de dialogue

### **Rechercher et filtrer**
1. **Recherche** : Saisir dans le champ "Rechercher"
2. **Filtre par wilaya** : Sélectionner une wilaya dans le menu déroulant

## 📊 Structure des données

Chaque entrée contient :
- **ID** : Identifiant unique
- **Nom de l'entreprise** : Nom officiel
- **Mot de passe** : Identifiants de connexion
- **Personne de contact** : Nom du responsable
- **Téléphone** : Numéro de contact
- **Wilaya** : Région administrative
- **Statut de visibilité** : Mot de passe masqué/visible

## 🎨 Interface utilisateur

### **Header**
- Titre de la page
- Description des fonctionnalités

### **Contrôles**
- Barre de recherche
- Filtre par wilaya
- Bouton d'ajout

### **Formulaire**
- Champs organisés en grille responsive
- Validation des champs obligatoires
- Boutons d'action (Ajouter/Modifier, Annuler)

### **Liste des mots de passe**
- Cartes individuelles pour chaque entrée
- Informations organisées clairement
- Boutons d'action (Modifier, Supprimer)
- Badge de wilaya coloré

## 🔍 Fonctionnalités de recherche

### **Recherche textuelle**
- Recherche dans le nom de l'entreprise
- Recherche dans le nom du contact
- Recherche insensible à la casse

### **Filtrage par wilaya**
- Liste dynamique des wilayas disponibles
- Option "Toutes les wilayas" pour réinitialiser
- Filtrage combiné avec la recherche

## 🔐 Système de sécurité

### **Protection par mot de passe**
- **Mot de passe requis** : `garaouii2024`
- **Accès restreint** : Seuls les administrateurs autorisés
- **Session sécurisée** : Déconnexion automatique après fermeture
- **Interface de connexion** : Écran dédié avec validation

### **Gestion des sessions**
- **Authentification** : Vérification du mot de passe administrateur
- **Déconnexion** : Bouton rouge pour fermer la session
- **Réinitialisation** : Tous les formulaires se vident à la déconnexion
- **Sécurité** : Impossible d'accéder au contenu sans authentification

## ⚠️ Sécurité et bonnes pratiques

### **Affichage des mots de passe**
- Masqués par défaut
- Affichage temporaire uniquement
- Bouton de masquage rapide

### **Gestion des données**
- Validation des champs obligatoires
- Confirmation avant suppression
- Interface intuitive pour éviter les erreurs

### **Accès administrateur**
- **Page protégée par mot de passe** : `garaouii2024`
- **Accès réservé** : Seuls les administrateurs Garoui peuvent y accéder
- **Sécurité renforcée** : Protection contre l'accès non autorisé
- **Déconnexion** : Bouton de déconnexion pour fermer la session
- **Gestion centralisée** : Contrôle total des accès et modifications

## 🧪 Données de test disponibles

La page contient actuellement 6 entreprises partenaires avec leurs mots de passe :

1. **Mono Electric** - `mono2024`
2. **BMS Electric SARL** - `bms2024`
3. **SAIEG (Sonelgaz)** - `saieg2024`
4. **Schneider Electric Algérie** - `schneider2024`
5. **Legrand Algérie** - `legrand2024`
6. **Entreprise Électrique Plus** - `entreprise2024`

## 🔮 Évolutions futures possibles

### **Fonctionnalités avancées**
- Export des données en CSV/PDF
- Historique des modifications
- Gestion des permissions utilisateur
- Chiffrement des mots de passe

### **Intégrations**
- Synchronisation avec la base de données
- API pour la gestion automatisée
- Notifications de changement
- Audit trail complet

### **Interface**
- Mode sombre
- Tableau avec tri des colonnes
- Pagination pour de grandes listes
- Recherche avancée avec filtres multiples

## 📱 Responsive design

La page s'adapte automatiquement à tous les écrans :
- **Desktop** : Affichage en grille avec toutes les informations
- **Tablet** : Adaptation de la grille et des contrôles
- **Mobile** : Interface empilée et contrôles optimisés

## 🎯 Cas d'usage typiques

### **Administrateur système**
- Gestion quotidienne des accès
- Ajout de nouvelles entreprises
- Mise à jour des informations

### **Support client**
- Consultation des accès existants
- Aide à la récupération de mot de passe
- Vérification des informations

### **Audit et conformité**
- Inventaire des accès
- Vérification des données
- Documentation des accès
