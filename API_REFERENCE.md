# Référence API - Twalé

## 🔐 Authentification Supabase

### Base URL
```
https://rgnsjvmibkomfgwpylpo.supabase.co
```

### Endpoints Auth

#### Inscription
```http
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Connexion
```http
POST /auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Déconnexion
```http
POST /auth/v1/logout
Authorization: Bearer {access_token}
```

#### Refresh Token
```http
POST /auth/v1/token?grant_type=refresh_token
Content-Type: application/json

{
  "refresh_token": "{refresh_token}"
}
```

## 📊 Database API (PostgREST)

### Headers Requis
```http
apikey: {SUPABASE_ANON_KEY}
Authorization: Bearer {access_token}
Content-Type: application/json
Prefer: return=representation
```

### Profiles

#### Obtenir son profil
```http
GET /rest/v1/profiles?id=eq.{user_id}&select=*
```

#### Créer un profil
```http
POST /rest/v1/profiles
Content-Type: application/json

{
  "id": "{user_id}",
  "full_name": "Jean Dupont",
  "phone": "+509 1234 5678",
  "user_type": "passenger"
}
```

#### Mettre à jour son profil
```http
PATCH /rest/v1/profiles?id=eq.{user_id}
Content-Type: application/json

{
  "full_name": "Jean Dupont",
  "phone": "+509 9999 9999"
}
```

### Bookings

#### Créer une réservation
```http
POST /rest/v1/bookings
Content-Type: application/json

{
  "user_id": "{user_id}",
  "service_type": "vtc",
  "vehicle_type": "standard",
  "pickup_location": {
    "lat": 18.5944,
    "lng": -72.3074,
    "address": "Champ de Mars, Port-au-Prince"
  },
  "dropoff_location": {
    "lat": 18.5333,
    "lng": -72.3333,
    "address": "Aéroport Toussaint Louverture"
  },
  "passengers": 2,
  "estimated_price": 250.00,
  "payment_method": "wallet"
}
```

#### Obtenir ses réservations
```http
GET /rest/v1/bookings?user_id=eq.{user_id}&select=*&order=created_at.desc
```

#### Filtrer par statut
```http
GET /rest/v1/bookings?user_id=eq.{user_id}&status=eq.completed&select=*
```

### Wallets

#### Obtenir son portefeuille
```http
GET /rest/v1/wallets?user_id=eq.{user_id}&select=*
```

#### Créer un portefeuille
```http
POST /rest/v1/wallets
Content-Type: application/json

{
  "user_id": "{user_id}",
  "balance": 0,
  "currency": "HTG"
}
```

### Transactions

#### Créer une transaction
```http
POST /rest/v1/transactions
Content-Type: application/json

{
  "user_id": "{user_id}",
  "type": "credit",
  "amount": 1000.00,
  "currency": "HTG",
  "status": "completed",
  "payment_method": "mobile_money",
  "reference": "TXN-{uuid}",
  "description": "Recharge portefeuille"
}
```

#### Historique transactions
```http
GET /rest/v1/transactions?user_id=eq.{user_id}&select=*&order=created_at.desc&limit=20
```

### Notifications

#### Obtenir ses notifications
```http
GET /rest/v1/notifications?user_id=eq.{user_id}&select=*&order=created_at.desc
```

#### Marquer comme lue
```http
PATCH /rest/v1/notifications?id=eq.{notification_id}
Content-Type: application/json

{
  "read": true
}
```

## 🗺️ Mapbox API

### Geocoding (Adresse → Coordonnées)

```http
GET https://api.mapbox.com/geocoding/v5/mapbox.places/{address}.json
  ?access_token={MAPBOX_TOKEN}
  &country=HT
  &language=fr
```

**Exemple** :
```
https://api.mapbox.com/geocoding/v5/mapbox.places/Port-au-Prince.json?access_token=pk.eyJ1...
```

### Reverse Geocoding (Coordonnées → Adresse)

```http
GET https://api.mapbox.com/geocoding/v5/mapbox.places/{lng},{lat}.json
  ?access_token={MAPBOX_TOKEN}
  &language=fr
```

### Directions (Itinéraire)

```http
GET https://api.mapbox.com/directions/v5/mapbox/driving/{lng1},{lat1};{lng2},{lat2}
  ?access_token={MAPBOX_TOKEN}
  &geometries=geojson
  &steps=true
  &language=fr
```

**Réponse** :
```json
{
  "routes": [{
    "distance": 12500,
    "duration": 1200,
    "geometry": {...}
  }]
}
```

## 🚗 OSRM (Routing Open Source)

### Calcul d'itinéraire

```http
GET http://router.project-osrm.org/route/v1/driving/{lng1},{lat1};{lng2},{lat2}
  ?overview=full
  &geometries=geojson
  &steps=true
```

**Exemple** :
```javascript
const response = await fetch(
  `${process.env.EXPO_PUBLIC_OSRM_ENDPOINT}/route/v1/driving/-72.3074,18.5944;-72.3333,18.5333?overview=full&geometries=geojson`
);
const data = await response.json();
console.log(data.routes[0].distance); // en mètres
console.log(data.routes[0].duration); // en secondes
```

## 💳 Stripe API

### Créer un Payment Intent

```http
POST https://api.stripe.com/v1/payment_intents
Authorization: Bearer {STRIPE_SECRET_KEY}
Content-Type: application/x-www-form-urlencoded

amount=25000&currency=htg&automatic_payment_methods[enabled]=true
```

### Utilisation dans l'App

```typescript
import { useStripe } from '@stripe/stripe-react-native';

const { initPaymentSheet, presentPaymentSheet } = useStripe();

const handlePayment = async () => {
  // 1. Créer Payment Intent côté serveur
  const { paymentIntent } = await fetch('/api/create-payment-intent', {
    method: 'POST',
    body: JSON.stringify({ amount: 25000 }),
  }).then(r => r.json());

  // 2. Initialiser Stripe
  await initPaymentSheet({
    paymentIntentClientSecret: paymentIntent,
  });

  // 3. Afficher la feuille de paiement
  const { error } = await presentPaymentSheet();
};
```

## 🌦️ Traffic & Weather API

### OpenWeather API

```http
GET https://api.openweathermap.org/data/2.5/weather
  ?lat={lat}
  &lon={lng}
  &appid={TRAFFIC_API_KEY}
  &units=metric
```

**Utilisation pour tarification dynamique** :
```javascript
const getWeatherMultiplier = (weather) => {
  if (weather.rain || weather.snow) return 1.3; // +30%
  if (weather.main === 'Thunderstorm') return 1.5; // +50%
  return 1.0;
};
```

## 📱 Firebase Cloud Messaging

### Send Notification

```http
POST https://fcm.googleapis.com/fcm/send
Authorization: key={SERVER_KEY}
Content-Type: application/json

{
  "to": "{device_token}",
  "notification": {
    "title": "Nouvelle course !",
    "body": "Un chauffeur a accepté votre course"
  },
  "data": {
    "booking_id": "uuid",
    "type": "booking_accepted"
  }
}
```

## 📞 Twilio SMS

### Send OTP

```http
POST https://api.twilio.com/2010-04-01/Accounts/{ACCOUNT_SID}/Messages.json
Authorization: Basic {BASE64(ACCOUNT_SID:AUTH_TOKEN)}
Content-Type: application/x-www-form-urlencoded

To=+50912345678&From=+1234567890&Body=Votre code: 123456
```

## 📊 Sentry (Error Tracking)

### Capture Error

```typescript
import * as Sentry from '@sentry/react-native';

try {
  // code...
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'booking' },
    extra: { bookingId: '123' }
  });
}
```

### Capture Message

```typescript
Sentry.captureMessage('User completed booking', {
  level: 'info',
  extra: { userId: '123', bookingId: '456' }
});
```

## 🔄 Realtime (Supabase)

### S'abonner aux changements

```typescript
import { supabase } from '@/lib/supabase';

const subscription = supabase
  .channel('bookings')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'bookings',
      filter: `user_id=eq.${userId}`
    },
    (payload) => {
      console.log('Booking updated:', payload.new);
    }
  )
  .subscribe();

// Cleanup
return () => subscription.unsubscribe();
```

## 📋 Exemples d'Utilisation

### Créer une réservation complète

```typescript
const createBooking = async (bookingData) => {
  // 1. Créer la réservation
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      ...bookingData,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;

  // 2. Créer la notification
  await supabase
    .from('notifications')
    .insert({
      user_id: user.id,
      title: 'Réservation créée',
      body: 'Recherche d\'un chauffeur...',
      type: 'ride',
      data: { booking_id: booking.id }
    });

  return booking;
};
```

### Calculer le prix d'une course

```typescript
const calculatePrice = async (pickup, dropoff) => {
  // 1. Calculer distance
  const route = await fetch(
    `${OSRM_ENDPOINT}/route/v1/driving/${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}`
  ).then(r => r.json());

  const distanceKm = route.routes[0].distance / 1000;
  
  // 2. Prix de base
  let price = 50; // Prix de base
  price += distanceKm * 15; // 15 HTG/km

  // 3. Facteurs dynamiques
  const hour = new Date().getHours();
  if (hour >= 22 || hour <= 6) price *= 1.2; // +20% nuit

  // 4. Météo
  const weather = await getWeather(pickup.lat, pickup.lng);
  if (weather.rain) price *= 1.3; // +30% pluie

  return Math.round(price);
};
```

### Traiter un paiement

```typescript
const processPayment = async (bookingId, amount) => {
  // 1. Vérifier solde
  const { data: wallet } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', user.id)
    .single();

  if (wallet.balance < amount) {
    throw new Error('Solde insuffisant');
  }

  // 2. Créer transaction
  const { data: transaction } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      type: 'debit',
      amount,
      status: 'completed',
      booking_id: bookingId,
      reference: `PAY-${Date.now()}`,
      description: 'Paiement course'
    })
    .select()
    .single();

  // 3. Mettre à jour solde
  await supabase
    .from('wallets')
    .update({ balance: wallet.balance - amount })
    .eq('user_id', user.id);

  // 4. Mettre à jour booking
  await supabase
    .from('bookings')
    .update({ 
      final_price: amount,
      status: 'completed'
    })
    .eq('id', bookingId);

  return transaction;
};
```

## 🔒 Sécurité

### Headers requis pour toutes les requêtes Supabase

```typescript
const headers = {
  'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${session.access_token}`,
  'Content-Type': 'application/json'
};
```

### Validation JWT

Supabase valide automatiquement le JWT. Pour vérifier manuellement :

```typescript
const { data: { user } } = await supabase.auth.getUser(token);
```

## 📚 Documentation Complète

- **Supabase** : https://supabase.com/docs
- **Mapbox** : https://docs.mapbox.com
- **OSRM** : http://project-osrm.org/docs
- **Stripe** : https://stripe.com/docs/api
- **Firebase** : https://firebase.google.com/docs
- **Twilio** : https://www.twilio.com/docs
- **Sentry** : https://docs.sentry.io

---

**Twalé API Reference v1.0**
