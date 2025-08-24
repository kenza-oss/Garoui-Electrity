# Démonstration de la Page Entreprise

## Fonctionnalités implémentées

### 1. Vérification automatique de l'entreprise
- La page vérifie automatiquement si l'entreprise est déjà partenaire
- Utilise le localStorage pour persister l'information de l'entreprise connectée
- Affiche un indicateur de chargement pendant la vérification

### 2. Deux scénarios d'affichage

#### Scénario 1 : Entreprise non partenaire
- Affiche deux boutons :
  - **"Vérifier si mon entreprise existe"** : Ouvre un modal de recherche
  - **"Demander à devenir partenaire"** : Ouvre le formulaire de demande

#### Scénario 2 : Entreprise déjà partenaire
- Affiche le dashboard avec deux onglets :
  - **"Mes Offres"** : Gérer les offres d'emploi publiées
  - **"Mes Candidatures"** : Consulter les CV reçus

### 3. Modal de recherche d'entreprise
- Permet de rechercher par nom ou mot de passe
- Affiche les détails de l'entreprise si trouvée
- Deux options après confirmation :
  - Confirmer que c'est l'entreprise de l'utilisateur
  - Demander un nouveau partenariat

### 4. Gestion des offres d'emploi
- Création de nouvelles offres
- Affichage des offres existantes
- Gestion des candidatures reçues

### 5. Gestion des candidatures
- Filtrage par poste et statut
- Mise à jour du statut des candidatures
- Vue détaillée des candidatures

## Comment tester

### Test 1 : Première visite (entreprise non partenaire)
1. Aller sur la page "Entreprise"
2. Voir les deux boutons d'action
3. Cliquer sur "Vérifier si mon entreprise existe"
4. Rechercher "Mono Electric" ou utiliser le mot de passe "mono2024"
5. Confirmer l'entreprise trouvée

### Test 2 : Entreprise confirmée
1. Après confirmation, voir le dashboard
2. Naviguer entre les onglets "Mes Offres" et "Mes Candidatures"
3. Créer une nouvelle offre d'emploi
4. Gérer les candidatures reçues

### Test 3 : Changer d'entreprise
1. Dans le dashboard, cliquer sur "Changer d'entreprise"
2. Retourner au formulaire de vérification
3. Tester avec une autre entreprise

## Entreprises de test disponibles

- **Mono Electric** - mot de passe: `mono2024`
- **BMS Electric SARL** - mot de passe: `bms2024`
- **SAIEG (Sonelgaz)** - mot de passe: `saieg2024`
- **Schneider Electric Algérie** - mot de passe: `schneider2024`
- **Legrand Algérie** - mot de passe: `legrand2024`
- **Entreprise Électrique Plus** - mot de passe: `entreprise2024`

## Intégration avec la page Recrutement

Les offres d'emploi des entreprises partenaires s'affichent automatiquement dans la page Recrutement avec :
- Nom de l'entreprise visible
- Coordonnées masquées pour les utilisateurs gratuits
- Coordonnées visibles pour les utilisateurs premium
- Possibilité de postuler directement

## Stockage des données

- **localStorage** : ID de l'entreprise partenaire actuelle
- **État local** : Données des offres et candidatures
- **Types TypeScript** : Interfaces complètes pour la gestion des données

## Prochaines étapes possibles

1. **Authentification** : Système de connexion pour les entreprises
2. **API Backend** : Remplacement des données mock par de vraies API
3. **Notifications** : Alertes pour nouvelles candidatures
4. **Statistiques** : Tableaux de bord avec métriques
5. **Gestion des documents** : Upload et stockage des CV
