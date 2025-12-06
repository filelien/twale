# Configuration du Compte Admin

## Compte Administrateur

**Email:** ynovafrica@gmail.com  
**Password:** asymptote

## Étapes pour créer le compte admin

### Option 1 : Via l'interface Supabase (Recommandé)

1. **Créer l'utilisateur dans Authentication**
   - Allez sur https://supabase.com/dashboard/project/rgnsjvmibkomfgwpylpo
   - Cliquez sur "Authentication" dans le menu de gauche
   - Cliquez sur "Users"
   - Cliquez sur "Add user" → "Create new user"
   - Email: `ynovafrica@gmail.com`
   - Password: `asymptote`
   - Cliquez sur "Create user"
   - **Copiez l'ID de l'utilisateur** (UUID)

2. **Créer le profil admin**
   - Allez dans "SQL Editor"
   - Exécutez le script `CREATE_ADMIN.sql`
   - Ou exécutez cette requête (remplacez USER_ID par l'ID copié) :

```sql
INSERT INTO profiles (
  id,
  user_type,
  full_name,
  phone,
  verified
) VALUES (
  'USER_ID_ICI',
  'admin',
  'Admin Ynov Africa',
  '+50900000000',
  true
)
ON CONFLICT (id) DO UPDATE SET
  user_type = 'admin',
  verified = true;
```

### Option 2 : Via l'API (Programmatique)

Vous pouvez aussi créer le compte via l'API Supabase dans votre application.

## Vérification

Après création, connectez-vous avec :
- Email: `ynovafrica@gmail.com`
- Password: `asymptote`

Vous devriez avoir accès à toutes les fonctionnalités admin.

## Permissions Admin

Le compte admin a le type `user_type = 'admin'` qui permet :
- Accès à toutes les données
- Gestion des utilisateurs
- Gestion des véhicules
- Gestion des réservations
- Accès au tableau de bord admin

