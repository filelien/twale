# Structure du Projet Twalé

## 📁 Arborescence Complète

```
twale/
├── app/                                # Routes et écrans (Expo Router)
│   ├── (auth)/                        # Groupe authentification
│   │   ├── _layout.tsx               # Layout auth
│   │   ├── welcome.tsx               # Écran bienvenue
│   │   ├── login.tsx                 # Connexion
│   │   └── register.tsx              # Inscription
│   ├── (tabs)/                       # Groupe navigation tabs
│   │   ├── _layout.tsx               # Layout tabs avec navigation
│   │   ├── index.tsx                 # Accueil / Réservation
│   │   ├── rides.tsx                 # Historique courses
│   │   ├── wallet.tsx                # Portefeuille
│   │   └── profile.tsx               # Profil utilisateur
│   ├── _layout.tsx                   # Layout racine avec AuthProvider
│   ├── +not-found.tsx                # Page 404
│   └── index.tsx                     # Splash screen + routing
│
├── components/                        # Composants réutilisables
│   ├── Button.tsx                    # Bouton avec variantes
│   └── Card.tsx                      # Carte stylisée
│
├── contexts/                          # Contextes React
│   └── AuthContext.tsx               # Auth + session + profil
│
├── hooks/                             # Hooks personnalisés
│   └── useFrameworkReady.ts          # Hook framework Expo
│
├── lib/                               # Bibliothèques et utilitaires
│   ├── supabase.ts                   # Client Supabase configuré
│   └── constants.ts                  # Constantes (couleurs, types)
│
├── types/                             # Types TypeScript
│   ├── database.ts                   # Types base de données
│   └── env.d.ts                      # Types environnement
│
├── assets/                            # Assets statiques
│   └── images/
│       ├── icon.png                  # Icône app
│       └── favicon.png               # Favicon web
│
├── .env                               # Variables d'environnement ✨
├── .gitignore                        # Fichiers ignorés par Git
├── .prettierrc                       # Configuration Prettier
├── app.json                          # Configuration Expo
├── package.json                      # Dépendances npm
├── tsconfig.json                     # Configuration TypeScript
│
└── 📚 Documentation
    ├── README.md                     # Vue d'ensemble
    ├── QUICKSTART.md                 # Démarrage rapide
    ├── FEATURES.md                   # Liste fonctionnalités
    ├── TESTING.md                    # Guide de test
    ├── DEPLOYMENT.md                 # Guide déploiement
    └── PROJECT_STRUCTURE.md          # Ce fichier
```

## 📄 Détails des Fichiers

### 🔐 Authentification (app/(auth)/)

#### `welcome.tsx`
Écran d'accueil avec :
- Logo Twalé
- Description services
- Liste fonctionnalités
- Boutons Inscription / Connexion

#### `login.tsx`
Formulaire de connexion :
- Email / Mot de passe
- Validation client
- Gestion erreurs
- Lien vers inscription

#### `register.tsx`
Formulaire d'inscription :
- Nom, téléphone, email, mot de passe
- Validation complète
- Création profil + wallet
- Redirection automatique

### 🏠 Application Principale (app/(tabs)/)

#### `index.tsx` - Accueil / Réservation
Interface de réservation avec :
- Sélection type de service (VTC, Taxi, Partagé, Livraison)
- Saisie itinéraire (départ → destination)
- Choix type de véhicule (Standard, Premium, XL)
- Affichage tarifs
- Bouton réservation

**Composants** :
- ServiceCard : Carte de sélection service
- LocationInput : Saisie adresses
- VehicleCard : Sélection véhicule

#### `rides.tsx` - Historique
Liste des courses avec :
- Filtres (Toutes, Terminées, Annulées)
- Carte par course :
  - Badge statut coloré
  - Date/heure
  - Itinéraire complet
  - Type service
  - Prix
- Chargement depuis Supabase
- État vide élégant

#### `wallet.tsx` - Portefeuille
Gestion financière :
- Carte solde animée
- Bouton recharge
- Modal ajout fonds :
  - Saisie montant
  - Montants rapides
  - Sélection méthode
- Historique transactions :
  - Icônes crédit/débit
  - Dates et montants
  - État transaction

#### `profile.tsx` - Profil
Informations utilisateur :
- Avatar avec badge vérifié
- Nom, rating, nb courses
- Infos personnelles :
  - Téléphone
  - Email
  - Pays
- Menu options :
  - Paramètres
  - Support
  - Sécurité
- Bouton déconnexion
- Version app

### 🧩 Composants (components/)

#### `Button.tsx`
Bouton réutilisable avec :
- Variantes : primary, secondary, outline, danger
- Tailles : small, medium, large
- États : loading, disabled
- Support icônes
- Full width option

**Props** :
```typescript
variant?: 'primary' | 'secondary' | 'outline' | 'danger'
size?: 'small' | 'medium' | 'large'
loading?: boolean
disabled?: boolean
fullWidth?: boolean
icon?: ReactNode
```

#### `Card.tsx`
Carte stylisée avec :
- Bordures arrondies
- Ombre légère
- Padding personnalisable
- Style override

### 🔧 Contextes (contexts/)

#### `AuthContext.tsx`
Gestion authentification complète :
- État utilisateur et session
- Profil utilisateur chargé
- Fonctions :
  - `signUp(email, password, fullName, phone)`
  - `signIn(email, password)`
  - `signOut()`
  - `refreshProfile()`
- Création auto profil + wallet
- Écoute changements auth

**Hook** :
```typescript
const { user, profile, session, loading, signUp, signIn, signOut } = useAuth();
```

### 📚 Bibliothèques (lib/)

#### `supabase.ts`
Client Supabase configuré :
- URL et clé depuis .env
- AsyncStorage pour persistance
- Auto refresh token
- Pas de détection URL (mobile)

#### `constants.ts`
Constantes app :
- **COLORS** : Palette complète
- **SPACING** : Système 4/8px
- **BORDER_RADIUS** : Tailles arrondis
- **VEHICLE_TYPES** : Types véhicules
- **SERVICE_TYPES** : Types services
- **PAYMENT_METHODS** : Méthodes paiement
- **CURRENCIES** : Devises (HTG, USD)

### 📦 Types (types/)

#### `database.ts`
Types TypeScript pour :
- `Profile` : Profil utilisateur
- `Vehicle` : Véhicule
- `Booking` : Réservation
- `Wallet` : Portefeuille
- `Transaction` : Transaction
- `SupportTicket` : Ticket support
- `Notification` : Notification
- Enums : UserType, VehicleType, ServiceType, etc.

#### `env.d.ts`
Types variables environnement :
- Supabase (URL, Key)
- Mapbox, Stripe
- Traffic API
- Twilio, Sentry, etc.

### ⚙️ Configuration

#### `.env`
Variables d'environnement :
- ✅ Supabase (Auth + DB)
- ✅ Mapbox (Maps)
- ✅ Stripe (Paiements)
- ✅ Traffic API (Tarification)
- ✅ Sentry (Monitoring)
- ✅ OCR (Documents)

#### `app.json`
Configuration Expo :
- Nom : bolt-expo-nativewind
- Version : 1.0.0
- Orientation : portrait
- Expo Router activé
- New Architecture activé
- Plugins : router, font, web-browser

#### `package.json`
Dépendances :
- React Native 0.81.4
- Expo 54.0.10
- Expo Router 6.0.8
- Supabase JS
- Lucide React Native
- Stripe React Native
- AsyncStorage
- Navigation

#### `tsconfig.json`
Configuration TypeScript :
- Mode strict activé
- Path aliases (@/*)
- Types Expo
- Includes : tous TS/TSX

## 🗄️ Base de Données

### Tables Supabase

**profiles** : Utilisateurs
- id, user_type, full_name, phone, avatar_url
- language, country_code, rating, total_trips
- verified, created_at, updated_at

**vehicles** : Véhicules
- id, driver_id, vehicle_type
- brand, model, year, license_plate, color
- seats, verified, active

**bookings** : Réservations
- id, user_id, service_type, vehicle_type
- pickup_location, dropoff_location, stops
- scheduled_time, passengers, status
- estimated_price, final_price, payment_method
- driver_id, vehicle_id, special_requests, promo_code

**rides** : Courses actives
- id, booking_id, driver_id, passenger_id
- start_time, end_time
- start_location, end_location, route
- distance_km, duration_minutes, status
- current_location (real-time)

**wallets** : Portefeuilles
- id, user_id, balance, currency

**transactions** : Transactions
- id, user_id, type, amount, currency
- status, payment_method, reference
- booking_id, description, metadata

**support_tickets** : Support
- id, user_id, subject, description
- category, status, priority
- booking_id, assigned_to

**sos_alerts** : Alertes urgence
- id, user_id, ride_id, location
- type, status, emergency_contacts_notified

**ratings** : Évaluations
- id, booking_id, from_user_id, to_user_id
- rating (1-5), review, categories

**promo_codes** : Codes promo
- id, code, discount_type, discount_value
- valid_from, valid_until, usage_limit

**notifications** : Notifications
- id, user_id, title, body, type
- data, read

### Sécurité RLS

- ✅ RLS activé sur toutes les tables
- ✅ Politiques restrictives par défaut
- ✅ Users accèdent uniquement à leurs données
- ✅ Drivers voient leurs courses
- ✅ Vérification auth.uid()

## 📊 Statistiques

- **Fichiers créés** : 30+
- **Lignes de code** : 3000+
- **Composants** : 10+
- **Écrans** : 8
- **Tables DB** : 11
- **Politiques RLS** : 30+
- **Types TS** : 20+

## 🎨 Design System

### Couleurs
- **Primaire** : Bleu (#2563eb)
- **Secondaire** : Vert (#10b981)
- **Danger** : Rouge (#ef4444)
- **Warning** : Orange (#f59e0b)
- **Gris** : 50 à 900

### Espacements
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px

### Typographie
- Titre : 28-32px bold
- Sous-titre : 16-18px regular
- Corps : 14-16px
- Caption : 12px

### Composants
- Border radius : 12-16px
- Ombres : légères
- Transitions : 200ms
- Animations : fluides

## 🚀 Prochaines Implémentations

### Priorité Haute
1. Intégration Maps réelle (Mapbox)
2. Calcul itinéraire (OSRM)
3. Création réservation fonctionnelle
4. Notifications push
5. Paiements Stripe

### Priorité Moyenne
6. Interface chauffeur
7. Chat temps réel
8. Tracking GPS
9. Système rating
10. Support client

### Priorité Basse
11. Codes promo
12. Programme fidélité
13. Admin dashboard
14. Analytics
15. Multi-langue

---

**Document maintenu par l'équipe Twalé**
**Dernière mise à jour : 2024**
