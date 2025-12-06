# Guide de Configuration - Twalé

## Configuration des Variables d'Environnement

### Étape 1 : Créer le fichier .env

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
EXPO_PUBLIC_SUPABASE_URL=https://rgnsjvmibkomfgwpylpo.supabase.co

EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbnNqdm1pYmtvbWZnd3B5bHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTc5ODgsImV4cCI6MjA4MDM5Mzk4OH0.gdCDR42ZNccSnONxjMG26-p6Pf8Nbh92gQF2u5y_z-8

# Cartographie
EXPO_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoibm9saWxpbm8iLCJhIjoiY21pcjhza21uMGIwcDV0c2l2emllaXpleCJ9.Tk-6mzoTa6ggVzBbMThKww

EXPO_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key

EXPO_PUBLIC_OSRM_ENDPOINT=https://router.project-osrm.org

# Trafic / météo pour tarification dynamique
EXPO_PUBLIC_TRAFFIC_API_KEY=a15a5e4138981f6c61e45e15f608e9ed

# Paiements
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SaaupC1qK84HmzO8yW1gSwJkMkn668DLDwDsKHIHhNkR6xg0Ko71xIsdQaqics9078liY18SSv1fPgllDkJ3Vop00x7khx36H

EXPO_PUBLIC_MOBILE_MONEY_PROVIDER=orange_money

# Notifications push
EXPO_PUBLIC_FIREBASE_WEB_PUSH_KEY=your_firebase_web_push_key

# Authentification OTP / SMS
EXPO_PUBLIC_TWILIO_SID=
EXPO_PUBLIC_TWILIO_AUTH_TOKEN=

# OCR / vérification documents
EXPO_PUBLIC_OCR_API_KEY=K84347997388957

# Monitoring
EXPO_PUBLIC_SENTRY_DSN=https://7ccf675f708fa970e6d33252ebfc94c6@o4510476663652352.ingest.us.sentry.io/4510476665290752
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

### Étape 3 : Lancer l'application

```bash
npm run dev
```

## Structure de l'Application

### Pages Principales

1. **Authentification**
   - `/welcome` - Écran d'accueil
   - `/login` - Connexion
   - `/register` - Inscription

2. **Navigation Principale (Tabs)**
   - `/` - Accueil / Réservation
   - `/rides` - Historique des courses
   - `/wallet` - Portefeuille
   - `/profile` - Profil utilisateur

3. **Réservation**
   - `/search` - Recherche de voitures avec filtres
   - `/vehicle-details` - Détails d'un véhicule
   - `/date-selection` - Sélection des dates
   - `/payment` - Paiement
   - `/booking-confirmation` - Confirmation de réservation

4. **Fonctionnalités**
   - `/map` - Carte pour sélectionner emplacements
   - `/tracking` - Suivi de course en temps réel
   - `/chat` - Chat avec le chauffeur
   - `/rating` - Évaluation de la course

## Fonctionnalités Implémentées

✅ Authentification complète (Supabase)
✅ Recherche de véhicules avec filtres
✅ Détails des véhicules
✅ Sélection de dates avec calendrier
✅ Système de paiement (Wallet, Carte, Mobile Money, Espèces)
✅ Confirmation de réservation
✅ Suivi en temps réel
✅ Chat avec le chauffeur
✅ Système d'évaluation
✅ Carte interactive pour sélection d'emplacements
✅ Portefeuille intégré
✅ Historique des courses

## Plateformes Supportées

- ✅ iOS
- ✅ Android
- ✅ Web (Responsive)

## Commandes Disponibles

```bash
# Développement
npm run dev              # Lancer l'application

# Vérifications
npm run typecheck        # Vérifier TypeScript
npm run lint             # Linter le code

# Build
npm run build:web        # Build version web
```

## Notes Importantes

1. Les variables d'environnement doivent être préfixées par `EXPO_PUBLIC_` pour être accessibles dans l'application
2. Le fichier `.env` doit être créé manuellement (copiez depuis `env.example`)
3. L'application utilise Supabase pour l'authentification et la base de données
4. Les cartes sont actuellement en mode placeholder - intégrez Mapbox ou Google Maps pour la fonctionnalité complète

