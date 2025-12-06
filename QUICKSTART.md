# Démarrage Rapide - Twalé

## Installation en 5 Minutes

### 1. Installation des Dépendances

```bash
npm install
```

### 2. Configuration

Les variables d'environnement sont déjà configurées dans `.env` - rien à faire !

### 3. Lancement

```bash
npm run dev
```

### 4. Accès

L'application s'ouvre automatiquement. Vous pouvez :

- **Web** : Appuyez sur `w` dans le terminal
- **iOS Simulator** : Appuyez sur `i`
- **Android Emulator** : Appuyez sur `a`
- **Scan QR Code** : Utilisez l'app Expo Go sur votre téléphone

## Premier Test

### Créer un Compte

1. Cliquez sur "Créer un compte"
2. Remplissez :
   - Nom : Jean Dupont
   - Téléphone : +509 1234 5678
   - Email : test@example.com
   - Mot de passe : test123456
3. Cliquez sur "S'inscrire"

Vous serez automatiquement connecté et redirigé vers l'écran d'accueil.

### Explorer l'Application

**Onglet Accueil**
- Sélectionnez un service (VTC, Taxi, etc.)
- Entrez un point de départ et destination
- Choisissez un type de véhicule
- Voyez les tarifs

**Onglet Courses**
- Consultez l'historique de vos courses
- Filtrez par statut

**Onglet Portefeuille**
- Consultez votre solde
- Cliquez sur "Recharger" pour simuler un ajout

**Onglet Profil**
- Voyez vos informations
- Testez la déconnexion

## Architecture Rapide

```
Twalé/
├── app/                    # Routes Expo Router
│   ├── (auth)/            # Écrans authentification
│   ├── (tabs)/            # Écrans principaux (tabs)
│   └── index.tsx          # Splash screen
├── components/            # Composants réutilisables
├── contexts/             # Contextes React (Auth)
├── lib/                  # Utilitaires (Supabase client)
├── types/                # Types TypeScript
└── .env                  # Configuration (prêt !)
```

## Base de Données

La base de données Supabase est déjà configurée avec :

- ✅ 11 tables créées
- ✅ Sécurité RLS activée
- ✅ Politiques configurées
- ✅ Triggers installés

### Tables Principales

- `profiles` - Utilisateurs
- `bookings` - Réservations
- `wallets` - Portefeuilles
- `transactions` - Transactions
- `rides` - Courses
- `vehicles` - Véhicules
- `support_tickets` - Support
- `notifications` - Notifications

## Commandes Utiles

```bash
# Développement
npm run dev               # Lancer l'app

# Vérifications
npm run typecheck        # Vérifier TypeScript
npm run lint             # Linter le code

# Build
npm run build:web        # Build version web
```

## Tester avec Supabase

### Accéder à la Console

1. Allez sur https://supabase.com
2. Projet : `rgnsjvmibkomfgwpylpo`
3. Consultez les tables dans "Table Editor"

### Requêtes SQL

Dans l'onglet "SQL Editor", testez :

```sql
-- Voir tous les profils
SELECT * FROM profiles;

-- Voir les portefeuilles
SELECT * FROM wallets;

-- Créer une réservation test
INSERT INTO bookings (...)
```

## Problèmes Courants

### Port déjà utilisé
```bash
# Tuer le processus sur port 8081
npx kill-port 8081
```

### Cache problématique
```bash
# Nettoyer et relancer
npx expo start --clear
```

### TypeScript Errors
```bash
# Vérifier les erreurs
npm run typecheck
```

## Prochaines Étapes

1. **Ajouter des données de test** : Consultez `TESTING.md`
2. **Explorer le code** : Commencez par `app/(tabs)/index.tsx`
3. **Comprendre l'auth** : Voir `contexts/AuthContext.tsx`
4. **Personnaliser** : Modifiez les couleurs dans `lib/constants.ts`

## Documentation Complète

- `README.md` - Vue d'ensemble
- `FEATURES.md` - Liste des fonctionnalités
- `TESTING.md` - Guide de test
- `DEPLOYMENT.md` - Guide de déploiement

## Support

Besoin d'aide ? Consultez :
- Documentation Expo : https://docs.expo.dev
- Documentation Supabase : https://supabase.com/docs
- Documentation React Native : https://reactnative.dev

## Statut du Projet

✅ **Prêt pour le développement**

L'application est fonctionnelle avec :
- Authentification complète
- Navigation fluide
- Interface moderne
- Base de données configurée
- Sécurité activée

Vous pouvez commencer à développer les fonctionnalités avancées !
