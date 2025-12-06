# Guide de Déploiement - Twalé

## Pré-requis

- Node.js 18+
- npm ou yarn
- Compte Expo
- Compte Supabase configuré
- Clés API configurées

## Configuration Environnement

### 1. Variables d'Environnement

Toutes les variables sont déjà configurées dans `.env` :

```env
EXPO_PUBLIC_SUPABASE_URL=https://rgnsjvmibkomfgwpylpo.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
EXPO_PUBLIC_MAPBOX_TOKEN=...
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
```

### 2. Base de Données

La base de données est déjà configurée avec :
- ✅ Schéma complet
- ✅ RLS activé
- ✅ Politiques de sécurité
- ✅ Triggers et fonctions

## Déploiement Web

### Build Production

```bash
npm run build:web
```

Le build génère un dossier `dist` avec les fichiers statiques.

### Hébergement

#### Option 1 : Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Option 2 : Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Option 3 : EAS (Expo Application Services)
```bash
npx eas-cli@latest build --platform web
```

## Déploiement Mobile

### iOS (via EAS)

1. **Configuration**
```bash
npx eas-cli@latest build:configure
```

2. **Build**
```bash
npx eas-cli@latest build --platform ios
```

3. **Submit to App Store**
```bash
npx eas-cli@latest submit --platform ios
```

### Android (via EAS)

1. **Build**
```bash
npx eas-cli@latest build --platform android
```

2. **Submit to Play Store**
```bash
npx eas-cli@latest submit --platform android
```

## Configuration des Services Tiers

### Supabase

1. **Database**
   - Déjà configurée avec migrations
   - Vérifier les backups automatiques
   - Configurer les alertes

2. **Auth**
   - Email confirmations (optionnel)
   - Configure email templates
   - Rate limiting

3. **Storage** (si besoin)
   - Créer buckets pour avatars
   - Configurer RLS sur storage

### Mapbox

1. Créer un compte sur mapbox.com
2. Générer un token
3. Configurer les restrictions de domaine

### Stripe

1. **Mode Test**
   - Utiliser les clés de test actuelles
   - Tester les paiements

2. **Mode Production**
   - Générer nouvelles clés production
   - Configurer webhooks
   - Activer 3D Secure

### Firebase (Notifications)

1. Créer projet Firebase
2. Ajouter app Android/iOS
3. Télécharger `google-services.json` / `GoogleService-Info.plist`
4. Configurer FCM

### Sentry (Monitoring)

1. Créer projet sur sentry.io
2. Installer SDK
```bash
npm install @sentry/react-native
```

3. Configurer dans `app/_layout.tsx`
```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: __DEV__ ? 'development' : 'production',
});
```

## Checklist Déploiement

### Pré-Production
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Vérification TypeScript sans erreurs
- [ ] Lint sans warnings
- [ ] Performance testée
- [ ] Sécurité vérifiée (RLS)

### Configuration
- [ ] Variables d'environnement production
- [ ] Clés API production configurées
- [ ] Base de données backup activé
- [ ] Monitoring configuré
- [ ] Logs centralisés
- [ ] Rate limiting activé

### Post-Déploiement
- [ ] Test smoke sur production
- [ ] Vérifier authentification
- [ ] Vérifier paiements
- [ ] Vérifier notifications
- [ ] Monitoring actif
- [ ] Alertes configurées

## Mises à Jour

### Updates OTA (Over The Air)

Pour les mises à jour sans passer par stores :

```bash
npx eas-cli@latest update --branch production --message "Fix: bug correction"
```

### Updates avec Stores

1. Incrémenter version dans `app.json`
2. Build nouvelle version
3. Submit aux stores
4. Attendre validation

## Monitoring Production

### Métriques à Surveiller

1. **Performance**
   - Temps de chargement
   - FPS (Frame Per Second)
   - Taille des bundles

2. **Erreurs**
   - Crash rate
   - Erreurs JavaScript
   - Erreurs réseau

3. **Usage**
   - Utilisateurs actifs
   - Sessions
   - Durée sessions

4. **Business**
   - Réservations créées
   - Taux de conversion
   - Revenus

### Alertes

Configurer alertes pour :
- Crash rate > 1%
- Erreurs > 100/heure
- API errors > 5%
- Database errors
- Storage > 80%

## Rollback

En cas de problème :

### Web
```bash
# Revenir à version précédente
vercel rollback
```

### Mobile (OTA)
```bash
# Republier ancienne version
npx eas-cli@latest update --branch production --message "Rollback"
```

### Base de Données
```bash
# Restaurer depuis backup
# Via interface Supabase
```

## Support & Maintenance

### Logs

Accès aux logs :
- **Application** : Sentry
- **Database** : Supabase Dashboard
- **API** : Supabase Logs

### Backup

- **Database** : Quotidien automatique
- **Storage** : Réplication activée
- **Code** : Git repository

### Mises à Jour Sécurité

Vérifier régulièrement :
```bash
npm audit
npm audit fix
```

## Documentation API

### Endpoints Supabase

Base URL : `https://rgnsjvmibkomfgwpylpo.supabase.co`

#### Auth
- POST `/auth/v1/signup` - Inscription
- POST `/auth/v1/token?grant_type=password` - Connexion
- POST `/auth/v1/logout` - Déconnexion

#### Database (via PostgREST)
- GET `/rest/v1/profiles` - Profils
- GET `/rest/v1/bookings` - Réservations
- GET `/rest/v1/wallets` - Portefeuilles
- GET `/rest/v1/transactions` - Transactions

## Contact & Support

Pour assistance technique :
- Email : dev@twale.ht
- Documentation : https://docs.twale.ht
- Status : https://status.twale.ht
