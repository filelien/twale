# Guide de Test - Twalé

## Comptes de Test

### Passager
```
Email: passenger@twale.ht
Mot de passe: test1234
Type: Passager
```

### Chauffeur
```
Email: driver@twale.ht
Mot de passe: test1234
Type: Chauffeur
```

## Données de Test

### Création de Profils de Test

Pour créer des profils de test, utilisez la console Supabase ou exécutez :

```sql
-- Créer un utilisateur passager
INSERT INTO auth.users (email) VALUES ('passenger@twale.ht');

-- Créer le profil
INSERT INTO profiles (id, full_name, phone, user_type, verified) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'passenger@twale.ht'),
  'Jean Passager',
  '+509 1234 5678',
  'passenger',
  true
);

-- Créer le portefeuille
INSERT INTO wallets (user_id, balance, currency)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'passenger@twale.ht'),
  1000.00,
  'HTG'
);
```

### Réservations de Test

```sql
-- Créer une réservation test
INSERT INTO bookings (
  user_id,
  service_type,
  vehicle_type,
  pickup_location,
  dropoff_location,
  passengers,
  status,
  estimated_price,
  payment_method
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'passenger@twale.ht'),
  'vtc',
  'standard',
  '{"lat": 18.5944, "lng": -72.3074, "address": "Champ de Mars, Port-au-Prince"}'::jsonb,
  '{"lat": 18.5333, "lng": -72.3333, "address": "Aéroport International Toussaint Louverture"}'::jsonb,
  2,
  'completed',
  250.00,
  'wallet'
);
```

### Transactions de Test

```sql
-- Ajouter une transaction
INSERT INTO transactions (
  user_id,
  type,
  amount,
  currency,
  status,
  reference,
  description
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'passenger@twale.ht'),
  'credit',
  1000.00,
  'HTG',
  'completed',
  'TEST-' || gen_random_uuid(),
  'Recharge de test'
);
```

## Scénarios de Test

### 1. Inscription & Connexion

**Test : Inscription d'un nouvel utilisateur**
1. Ouvrir l'application
2. Cliquer sur "Créer un compte"
3. Remplir :
   - Nom : Jean Dupont
   - Téléphone : +509 9999 9999
   - Email : test@example.com
   - Mot de passe : test123456
4. Confirmer le mot de passe
5. Cliquer sur "S'inscrire"

**Résultat attendu** :
- Profil créé dans `profiles`
- Portefeuille créé dans `wallets` avec solde 0
- Redirection vers l'écran d'accueil

**Test : Connexion**
1. Cliquer sur "Se connecter"
2. Entrer email et mot de passe
3. Cliquer sur "Se connecter"

**Résultat attendu** :
- Session créée
- Redirection vers l'écran d'accueil
- Profil chargé

### 2. Réservation de Course

**Test : Réservation VTC Standard**
1. Sur l'écran d'accueil
2. Sélectionner "VTC"
3. Entrer point de départ
4. Entrer destination
5. Sélectionner véhicule "Standard"
6. Cliquer sur "Réserver maintenant"

**Résultat attendu** :
- Calcul du prix estimé
- Création de la réservation
- Recherche de chauffeurs disponibles

### 3. Historique & Filtres

**Test : Consultation historique**
1. Aller sur l'onglet "Courses"
2. Vérifier l'affichage des courses
3. Tester les filtres :
   - Toutes
   - Terminées
   - Annulées

**Résultat attendu** :
- Courses affichées par ordre chronologique
- Filtres fonctionnels
- Détails visibles pour chaque course

### 4. Portefeuille

**Test : Recharge portefeuille**
1. Aller sur l'onglet "Portefeuille"
2. Cliquer sur "Recharger"
3. Entrer un montant
4. Sélectionner méthode de paiement
5. Confirmer

**Résultat attendu** :
- Modal de paiement affiché
- Montant ajouté au solde
- Transaction enregistrée

**Test : Consultation transactions**
1. Sur l'écran Portefeuille
2. Scroller dans l'historique
3. Vérifier les détails de chaque transaction

**Résultat attendu** :
- Transactions triées par date
- Icônes crédit/débit correctes
- Montants et dates affichés

### 5. Profil

**Test : Consultation profil**
1. Aller sur l'onglet "Profil"
2. Vérifier les informations affichées
3. Vérifier le rating et nombre de courses

**Test : Déconnexion**
1. Sur l'écran Profil
2. Cliquer sur "Déconnexion"
3. Confirmer

**Résultat attendu** :
- Session terminée
- Redirection vers écran de bienvenue

## Tests de Sécurité

### Row Level Security (RLS)

**Test : Accès aux données**
1. Créer 2 utilisateurs différents
2. Utilisateur A crée une réservation
3. Se connecter avec utilisateur B
4. Tenter d'accéder à la réservation de A

**Résultat attendu** :
- Utilisateur B ne peut pas voir la réservation de A
- Erreur de permission si tentative d'accès direct

**Test : Modification de profil**
1. Se connecter avec utilisateur A
2. Tenter de modifier le profil de B via API

**Résultat attendu** :
- Erreur de permission
- Seul son propre profil est modifiable

## Tests de Performance

### Chargement

**Test : Temps de chargement initial**
- Mesurer le temps entre lancement et écran d'accueil
- Objectif : < 2 secondes

**Test : Chargement historique**
- Mesurer le temps de chargement avec 100 courses
- Objectif : < 1 seconde

### Défilement

**Test : Scroll performance**
- Créer 1000 transactions
- Tester le défilement dans la liste
- Objectif : 60 FPS

## Tests d'Erreurs

### Connexion Réseau

**Test : Pas de connexion**
1. Désactiver le réseau
2. Tenter de se connecter
3. Vérifier le message d'erreur

**Test : Connexion lente**
1. Simuler connexion 3G
2. Naviguer dans l'app
3. Vérifier les états de chargement

### Erreurs de Saisie

**Test : Champs obligatoires**
1. Formulaire d'inscription
2. Laisser des champs vides
3. Tenter de soumettre

**Résultat attendu** :
- Message d'erreur clair
- Focus sur champ en erreur

**Test : Validation email**
1. Entrer email invalide
2. Tenter de s'inscrire

**Résultat attendu** :
- Message "Email invalide"

## Checklist Pré-Production

- [ ] Tous les tests de sécurité passent
- [ ] Performance acceptable sur 3G
- [ ] Pas de crash sur 100 sessions
- [ ] RLS vérifié sur toutes les tables
- [ ] Variables d'environnement configurées
- [ ] Logs d'erreur activés
- [ ] Backup database configuré
- [ ] Monitoring actif
- [ ] Documentation à jour
