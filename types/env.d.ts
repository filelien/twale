declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_SUPABASE_URL: string;
      EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
      EXPO_PUBLIC_MAPBOX_TOKEN: string;
      EXPO_PUBLIC_GOOGLE_MAPS_KEY: string;
      EXPO_PUBLIC_OSRM_ENDPOINT: string;
      EXPO_PUBLIC_TRAFFIC_API_KEY: string;
      EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      EXPO_PUBLIC_MOBILE_MONEY_PROVIDER: string;
      EXPO_PUBLIC_FIREBASE_WEB_PUSH_KEY: string;
      EXPO_PUBLIC_TWILIO_SID: string;
      EXPO_PUBLIC_TWILIO_AUTH_TOKEN: string;
      EXPO_PUBLIC_OCR_API_KEY: string;
      EXPO_PUBLIC_SENTRY_DSN: string;
    }
  }
}

export {};
