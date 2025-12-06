/*
  # Twalé Initial Database Schema
  
  ## Overview
  Complete database schema for Twalé mobility and delivery platform with VTC services.
  
  ## New Tables
  
  ### 1. profiles
  User profiles for passengers, drivers, and fleet managers
  - `id` (uuid, FK to auth.users)
  - `user_type` (enum: passenger, driver, fleet_manager, admin)
  - `full_name` (text)
  - `phone` (text, unique)
  - `avatar_url` (text)
  - `language` (text, default 'fr')
  - `country_code` (text, default 'HT')
  - `rating` (decimal)
  - `total_trips` (integer)
  - `verified` (boolean)
  - `created_at`, `updated_at` (timestamptz)
  
  ### 2. vehicles
  Driver vehicles information
  - `id` (uuid, PK)
  - `driver_id` (uuid, FK to profiles)
  - `vehicle_type` (enum: standard, premium, xl, taxi, moto, bike)
  - `brand`, `model`, `year` (text/integer)
  - `license_plate` (text, unique)
  - `color` (text)
  - `seats` (integer)
  - `verified` (boolean)
  - `active` (boolean)
  - `created_at`, `updated_at` (timestamptz)
  
  ### 3. bookings
  Ride and delivery bookings
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles)
  - `service_type` (enum: vtc, taxi, shared, delivery, rental, airport_shuttle)
  - `vehicle_type` (text)
  - `pickup_location` (jsonb with lat, lng, address)
  - `dropoff_location` (jsonb)
  - `stops` (jsonb array, for multi-stop rides)
  - `scheduled_time` (timestamptz, nullable for immediate bookings)
  - `passengers` (integer)
  - `status` (enum: pending, accepted, in_progress, completed, cancelled)
  - `estimated_price` (decimal)
  - `final_price` (decimal)
  - `payment_method` (enum: wallet, mobile_money, card, cash)
  - `driver_id` (uuid, FK to profiles, nullable)
  - `vehicle_id` (uuid, FK to vehicles, nullable)
  - `special_requests` (text)
  - `promo_code` (text)
  - `created_at`, `updated_at` (timestamptz)
  
  ### 4. rides
  Active and completed rides tracking
  - `id` (uuid, PK)
  - `booking_id` (uuid, FK to bookings)
  - `driver_id` (uuid, FK to profiles)
  - `passenger_id` (uuid, FK to profiles)
  - `start_time` (timestamptz)
  - `end_time` (timestamptz, nullable)
  - `start_location` (jsonb)
  - `end_location` (jsonb)
  - `route` (jsonb, array of coordinates)
  - `distance_km` (decimal)
  - `duration_minutes` (integer)
  - `status` (enum: started, in_progress, completed, cancelled)
  - `current_location` (jsonb, for real-time tracking)
  - `created_at`, `updated_at` (timestamptz)
  
  ### 5. wallets
  User wallet balances
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles, unique)
  - `balance` (decimal, default 0)
  - `currency` (text, default 'HTG')
  - `created_at`, `updated_at` (timestamptz)
  
  ### 6. transactions
  Financial transactions history
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles)
  - `type` (enum: credit, debit, refund, withdrawal, bonus)
  - `amount` (decimal)
  - `currency` (text)
  - `status` (enum: pending, completed, failed, refunded)
  - `payment_method` (text)
  - `reference` (text, unique)
  - `booking_id` (uuid, FK to bookings, nullable)
  - `description` (text)
  - `metadata` (jsonb)
  - `created_at` (timestamptz)
  
  ### 7. support_tickets
  Customer support tickets
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles)
  - `subject` (text)
  - `description` (text)
  - `category` (enum: ride_issue, payment, account, safety, other)
  - `status` (enum: open, in_progress, resolved, closed)
  - `priority` (enum: low, medium, high, urgent)
  - `booking_id` (uuid, FK to bookings, nullable)
  - `assigned_to` (uuid, FK to profiles, nullable)
  - `created_at`, `updated_at` (timestamptz)
  
  ### 8. sos_alerts
  Emergency SOS alerts
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles)
  - `ride_id` (uuid, FK to rides, nullable)
  - `location` (jsonb)
  - `type` (enum: accident, threat, medical, other)
  - `status` (enum: active, responded, resolved)
  - `emergency_contacts_notified` (boolean)
  - `created_at`, `resolved_at` (timestamptz)
  
  ### 9. ratings
  User ratings and reviews
  - `id` (uuid, PK)
  - `booking_id` (uuid, FK to bookings)
  - `from_user_id` (uuid, FK to profiles)
  - `to_user_id` (uuid, FK to profiles)
  - `rating` (integer, 1-5)
  - `review` (text)
  - `categories` (jsonb, e.g., cleanliness, punctuality, safety)
  - `created_at` (timestamptz)
  
  ### 10. promo_codes
  Promotional codes
  - `id` (uuid, PK)
  - `code` (text, unique)
  - `discount_type` (enum: percentage, fixed)
  - `discount_value` (decimal)
  - `max_discount` (decimal)
  - `min_order` (decimal)
  - `valid_from`, `valid_until` (timestamptz)
  - `usage_limit` (integer)
  - `used_count` (integer, default 0)
  - `active` (boolean, default true)
  - `created_at` (timestamptz)
  
  ### 11. notifications
  User notifications
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles)
  - `title` (text)
  - `body` (text)
  - `type` (enum: ride, payment, promo, alert, system)
  - `data` (jsonb)
  - `read` (boolean, default false)
  - `created_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Policies for authenticated users to access their own data
  - Special policies for drivers and admins
  - Audit trails for sensitive operations
*/

-- Create custom types
CREATE TYPE user_type AS ENUM ('passenger', 'driver', 'fleet_manager', 'admin');
CREATE TYPE vehicle_type AS ENUM ('standard', 'premium', 'xl', 'taxi', 'moto', 'bike');
CREATE TYPE service_type AS ENUM ('vtc', 'taxi', 'shared', 'delivery', 'rental', 'airport_shuttle');
CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('wallet', 'mobile_money', 'card', 'cash');
CREATE TYPE ride_status AS ENUM ('started', 'in_progress', 'completed', 'cancelled');
CREATE TYPE transaction_type AS ENUM ('credit', 'debit', 'refund', 'withdrawal', 'bonus');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE ticket_category AS ENUM ('ride_issue', 'payment', 'account', 'safety', 'other');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE sos_type AS ENUM ('accident', 'threat', 'medical', 'other');
CREATE TYPE sos_status AS ENUM ('active', 'responded', 'resolved');
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');
CREATE TYPE notification_type AS ENUM ('ride', 'payment', 'promo', 'alert', 'system');

-- 1. Profiles table
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

-- 2. Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vehicle_type vehicle_type NOT NULL DEFAULT 'standard',
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  license_plate text UNIQUE NOT NULL,
  color text NOT NULL,
  seats integer DEFAULT 4,
  verified boolean DEFAULT false,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  service_type service_type NOT NULL DEFAULT 'vtc',
  vehicle_type text NOT NULL,
  pickup_location jsonb NOT NULL,
  dropoff_location jsonb NOT NULL,
  stops jsonb DEFAULT '[]'::jsonb,
  scheduled_time timestamptz,
  passengers integer DEFAULT 1,
  status booking_status NOT NULL DEFAULT 'pending',
  estimated_price decimal(10,2) NOT NULL,
  final_price decimal(10,2),
  payment_method payment_method NOT NULL DEFAULT 'wallet',
  driver_id uuid REFERENCES profiles(id),
  vehicle_id uuid REFERENCES vehicles(id),
  special_requests text,
  promo_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Rides table
CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  driver_id uuid NOT NULL REFERENCES profiles(id),
  passenger_id uuid NOT NULL REFERENCES profiles(id),
  start_time timestamptz NOT NULL DEFAULT now(),
  end_time timestamptz,
  start_location jsonb NOT NULL,
  end_location jsonb,
  route jsonb DEFAULT '[]'::jsonb,
  distance_km decimal(10,2),
  duration_minutes integer,
  status ride_status NOT NULL DEFAULT 'started',
  current_location jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  balance decimal(10,2) DEFAULT 0 CHECK (balance >= 0),
  currency text DEFAULT 'HTG',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'HTG',
  status transaction_status NOT NULL DEFAULT 'pending',
  payment_method text,
  reference text UNIQUE NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- 7. Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  description text NOT NULL,
  category ticket_category NOT NULL DEFAULT 'other',
  status ticket_status NOT NULL DEFAULT 'open',
  priority priority_level NOT NULL DEFAULT 'medium',
  booking_id uuid REFERENCES bookings(id),
  assigned_to uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 8. SOS alerts table
CREATE TABLE IF NOT EXISTS sos_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ride_id uuid REFERENCES rides(id),
  location jsonb NOT NULL,
  type sos_type NOT NULL DEFAULT 'other',
  status sos_status NOT NULL DEFAULT 'active',
  emergency_contacts_notified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- 9. Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  from_user_id uuid NOT NULL REFERENCES profiles(id),
  to_user_id uuid NOT NULL REFERENCES profiles(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text,
  categories jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(booking_id, from_user_id)
);

-- 10. Promo codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type discount_type NOT NULL,
  discount_value decimal(10,2) NOT NULL,
  max_discount decimal(10,2),
  min_order decimal(10,2) DEFAULT 0,
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz NOT NULL,
  usage_limit integer,
  used_count integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 11. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  type notification_type NOT NULL DEFAULT 'system',
  data jsonb DEFAULT '{}'::jsonb,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_vehicles_driver_id ON vehicles(driver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_driver_id ON bookings(driver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_rides_booking_id ON rides(booking_id);
CREATE INDEX IF NOT EXISTS idx_rides_status ON rides(status);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_booking_id ON transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_sos_alerts_user_id ON sos_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for vehicles
CREATE POLICY "Drivers can view own vehicles"
  ON vehicles FOR SELECT
  TO authenticated
  USING (driver_id = auth.uid());

CREATE POLICY "Drivers can insert own vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (driver_id = auth.uid());

CREATE POLICY "Drivers can update own vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (driver_id = auth.uid())
  WITH CHECK (driver_id = auth.uid());

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR driver_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users and drivers can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR driver_id = auth.uid())
  WITH CHECK (user_id = auth.uid() OR driver_id = auth.uid());

-- RLS Policies for rides
CREATE POLICY "Users can view rides they're part of"
  ON rides FOR SELECT
  TO authenticated
  USING (passenger_id = auth.uid() OR driver_id = auth.uid());

CREATE POLICY "Drivers can create rides"
  ON rides FOR INSERT
  TO authenticated
  WITH CHECK (driver_id = auth.uid());

CREATE POLICY "Drivers can update own rides"
  ON rides FOR UPDATE
  TO authenticated
  USING (driver_id = auth.uid())
  WITH CHECK (driver_id = auth.uid());

-- RLS Policies for wallets
CREATE POLICY "Users can view own wallet"
  ON wallets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own wallet"
  ON wallets FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for support tickets
CREATE POLICY "Users can view own tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create tickets"
  ON support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own tickets"
  ON support_tickets FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for SOS alerts
CREATE POLICY "Users can view own SOS alerts"
  ON sos_alerts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create SOS alerts"
  ON sos_alerts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for ratings
CREATE POLICY "Users can view ratings for their bookings"
  ON ratings FOR SELECT
  TO authenticated
  USING (from_user_id = auth.uid() OR to_user_id = auth.uid());

CREATE POLICY "Users can create ratings"
  ON ratings FOR INSERT
  TO authenticated
  WITH CHECK (from_user_id = auth.uid());

-- RLS Policies for promo codes (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view active promo codes"
  ON promo_codes FOR SELECT
  TO authenticated
  USING (active = true);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Functions and triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON rides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
