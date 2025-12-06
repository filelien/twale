-- Script SQL rapide pour créer la table profiles si elle n'existe pas
-- À exécuter dans l'éditeur SQL de Supabase

-- Créer le type user_type s'il n'existe pas
DO $$ BEGIN
    CREATE TYPE user_type AS ENUM ('passenger', 'driver', 'fleet_manager', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Créer la table profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type user_type NOT NULL DEFAULT 'passenger',
  full_name text NOT NULL,
  phone text UNIQUE,
  avatar_url text,
  language text DEFAULT 'fr',
  country_code text DEFAULT 'HT',
  rating decimal(3,2) DEFAULT 5.0,
  total_trips integer DEFAULT 0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent lire leur propre profil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent créer leur propre profil
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Politique : Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Créer un trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Créer la table wallets si elle n'existe pas
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  balance decimal(10,2) DEFAULT 0 CHECK (balance >= 0),
  currency text DEFAULT 'HTG',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wallet"
  ON wallets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wallet"
  ON wallets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Message de confirmation
DO $$ 
BEGIN
    RAISE NOTICE 'Tables profiles et wallets créées avec succès!';
END $$;

