export const COLORS = {
  primary: '#2563eb',
  primaryLight: '#3b82f6',
  primaryDark: '#1e40af',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  white: '#ffffff',
  black: '#000000',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const VEHICLE_TYPES = [
  { value: 'standard', label: 'Standard', seats: 4 },
  { value: 'premium', label: 'Premium', seats: 4 },
  { value: 'xl', label: 'XL', seats: 6 },
  { value: 'taxi', label: 'Taxi', seats: 4 },
  { value: 'moto', label: 'Moto', seats: 1 },
  { value: 'bike', label: 'Vélo', seats: 1 },
];

export const SERVICE_TYPES = [
  { value: 'vtc', label: 'VTC', description: 'Voiture avec chauffeur' },
  { value: 'taxi', label: 'Taxi', description: 'Taxi compteur' },
  { value: 'shared', label: 'Partagé', description: 'Course partagée' },
  { value: 'delivery', label: 'Livraison', description: 'Colis & documents' },
  { value: 'rental', label: 'Location', description: 'Location de véhicule' },
  { value: 'airport_shuttle', label: 'Navette Aéroport', description: 'Transfert aéroport' },
];

export const PAYMENT_METHODS = [
  { value: 'wallet', label: 'Portefeuille', icon: 'wallet' },
  { value: 'mobile_money', label: 'Mobile Money', icon: 'smartphone' },
  { value: 'card', label: 'Carte bancaire', icon: 'credit-card' },
  { value: 'cash', label: 'Espèces', icon: 'banknote' },
];

export const CURRENCIES = {
  HTG: { code: 'HTG', symbol: 'G', name: 'Gourde Haïtienne' },
  USD: { code: 'USD', symbol: '$', name: 'Dollar Américain' },
};
