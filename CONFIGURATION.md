# Configuration Rapide - Twalé

## ⚡ Démarrage Rapide

### 1. Créer le fichier .env

**IMPORTANT** : Créez manuellement un fichier `.env` à la racine du projet avec ce contenu :

```env
EXPO_PUBLIC_SUPABASE_URL=https://rgnsjvmibkomfgwpylpo.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbnNqdm1pYmtvbWZnd3B5bHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTc5ODgsImV4cCI6MjA4MDM5Mzk4OH0.gdCDR42ZNccSnONxjMG26-p6Pf8Nbh92gQF2u5y_z-8
EXPO_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoibm9saWxpbm8iLCJhIjoiY21pcjhza21uMGIwcDV0c2l2emllaXpleCJ9.Tk-6mzoTa6ggVzBbMThKww
EXPO_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
EXPO_PUBLIC_OSRM_ENDPOINT=https://router.project-osrm.org
EXPO_PUBLIC_TRAFFIC_API_KEY=a15a5e4138981f6c61e45e15f608e9ed
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SaaupC1qK84HmzO8yW1gSwJkMkn668DLDwDsKHIHhNkR6xg0Ko71xIsdQaqics9078liY18SSv1fPgllDkJ3Vop00x7khx36H
EXPO_PUBLIC_MOBILE_MONEY_PROVIDER=orange_money
EXPO_PUBLIC_FIREBASE_WEB_PUSH_KEY=your_firebase_web_push_key
EXPO_PUBLIC_TWILIO_SID=
EXPO_PUBLIC_TWILIO_AUTH_TOKEN=
EXPO_PUBLIC_OCR_API_KEY=K84347997388957
EXPO_PUBLIC_SENTRY_DSN=https://7ccf675f708fa970e6d33252ebfc94c6@o4510476663652352.ingest.us.sentry.io/4510476665290752
```

**Méthode rapide** : Copiez le fichier `env.example` et renommez-le en `.env`

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application

```bash
npm run dev
```

## 📱 Pages Disponibles

### Authentification
- `/welcome` - Écran d'accueil
- `/login` - Connexion
- `/register` - Inscription

### Navigation Principale
- `/` - Accueil / Réservation
- `/rides` - Historique des courses
- `/wallet` - Portefeuille
- `/profile` - Profil

### Réservation
- `/search` - Recherche de véhicules
- `/vehicle-details` - Détails du véhicule
- `/date-selection` - Sélection des dates
- `/payment` - Paiement
- `/booking-confirmation` - Confirmation

### Fonctionnalités
- `/map` - Carte pour emplacements
- `/tracking` - Suivi en temps réel
- `/chat` - Chat avec chauffeur
- `/rating` - Évaluation

## ✅ Fonctionnalités Complètes

- ✅ Authentification Supabase
- ✅ Recherche et filtres de véhicules
- ✅ Réservation complète avec calendrier
- ✅ Système de paiement (4 méthodes)
- ✅ Suivi GPS en temps réel
- ✅ Chat en temps réel
- ✅ Système d'évaluation
- ✅ Portefeuille intégré
- ✅ Historique des courses
- ✅ Interface responsive (iOS/Android/Web)

## 🎨 Design

- Design moderne et épuré
- Palette de couleurs cohérente
- Interface intuitive
- Animations fluides

## 🔧 Technologies

- React Native 0.81
- Expo 54
- TypeScript
- Expo Router 6
- Supabase
- Lucide Icons

## 📝 Notes

- Toutes les pages sont fonctionnelles
- Navigation complète entre les pages
- Code propre sans erreurs
- Prêt pour le développement et les tests

