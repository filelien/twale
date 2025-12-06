# Configuration Supabase - Twalé

## ⚠️ Erreur : Table 'profiles' non trouvée

Si vous voyez l'erreur `Could not find the table 'public.profiles'`, cela signifie que les migrations n'ont pas été exécutées dans votre base de données Supabase.

## Solution : Exécuter les migrations

### Méthode 1 : Via l'éditeur SQL de Supabase (Recommandé)

1. **Connectez-vous à Supabase**
   - Allez sur https://supabase.com
   - Connectez-vous à votre projet : `rgnsjvmibkomfgwpylpo`

2. **Ouvrez l'éditeur SQL**
   - Dans le menu de gauche, cliquez sur "SQL Editor"
   - Cliquez sur "New query"

3. **Copiez et exécutez le script SQL**
   - Ouvrez le fichier `supabase/migrations/20251205095929_create_twale_initial_schema.sql`
   - Copiez tout le contenu
   - Collez-le dans l'éditeur SQL
   - Cliquez sur "Run" ou appuyez sur `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

4. **Vérifiez que les tables sont créées**
   - Allez dans "Table Editor" dans le menu de gauche
   - Vous devriez voir toutes les tables : `profiles`, `vehicles`, `bookings`, `rides`, `wallets`, `transactions`, etc.

### Méthode 2 : Via Supabase CLI (Optionnel)

Si vous avez installé Supabase CLI :

```bash
# Installer Supabase CLI (si pas déjà fait)
npm install -g supabase

# Se connecter à votre projet
supabase link --project-ref rgnsjvmibkomfgwpylpo

# Appliquer les migrations
supabase db push
```

## Tables créées

Après l'exécution de la migration, les tables suivantes seront créées :

1. ✅ **profiles** - Profils utilisateurs
2. ✅ **vehicles** - Véhicules des chauffeurs
3. ✅ **bookings** - Réservations
4. ✅ **rides** - Courses actives
5. ✅ **wallets** - Portefeuilles
6. ✅ **transactions** - Transactions
7. ✅ **support_tickets** - Tickets de support
8. ✅ **sos_alerts** - Alertes SOS
9. ✅ **ratings** - Évaluations
10. ✅ **notifications** - Notifications
11. ✅ **promo_codes** - Codes promo

## Vérification

Après avoir exécuté la migration, testez l'application :

```bash
npm run dev
```

L'erreur `Could not find the table 'public.profiles'` devrait disparaître.

## Sécurité (RLS)

Les politiques de sécurité Row Level Security (RLS) sont automatiquement activées par la migration. Assurez-vous que :

- Les utilisateurs authentifiés peuvent lire leur propre profil
- Les utilisateurs peuvent créer leur propre profil lors de l'inscription
- Les politiques sont correctement configurées

## Problèmes courants

### Erreur : "relation already exists"
- Les tables existent déjà. Vous pouvez soit les supprimer, soit ignorer cette erreur.

### Erreur : "permission denied"
- Vérifiez que vous êtes connecté avec un compte ayant les droits d'administration sur le projet Supabase.

### Erreur : "type already exists"
- Les types ENUM existent déjà. C'est normal si vous avez déjà exécuté une partie de la migration.

## Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans l'éditeur SQL de Supabase
2. Consultez la documentation Supabase : https://supabase.com/docs
3. Vérifiez que votre projet Supabase est actif et accessible

