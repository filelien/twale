-- Script pour créer le compte admin dans Supabase
-- À exécuter dans l'éditeur SQL de Supabase

-- Créer l'utilisateur admin dans auth.users (via l'interface Supabase Auth ou API)
-- Puis exécuter ce script pour créer le profil admin

-- Insérer le profil admin (remplacer 'USER_ID_FROM_AUTH' par l'ID de l'utilisateur créé)
-- Pour obtenir l'ID, allez dans Authentication > Users dans Supabase

INSERT INTO profiles (
  id,
  user_type,
  full_name,
  phone,
  email,
  verified,
  rating,
  total_trips
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'ynovafrica@gmail.com'),
  'admin',
  'Admin Ynov Africa',
  '+50900000000',
  'ynovafrica@gmail.com',
  true,
  5.0,
  0
)
ON CONFLICT (id) DO UPDATE SET
  user_type = 'admin',
  verified = true;

-- Créer le portefeuille admin
INSERT INTO wallets (
  user_id,
  balance,
  currency
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'ynovafrica@gmail.com'),
  1000000.00,
  'HTG'
)
ON CONFLICT (user_id) DO UPDATE SET
  balance = 1000000.00;

-- Message de confirmation
DO $$ 
BEGIN
    RAISE NOTICE 'Compte admin créé avec succès!';
    RAISE NOTICE 'Email: ynovafrica@gmail.com';
    RAISE NOTICE 'Password: asymptote';
END $$;

