export type UserType = 'passenger' | 'driver' | 'fleet_manager' | 'admin';
export type VehicleType = 'standard' | 'premium' | 'xl' | 'taxi' | 'moto' | 'bike';
export type ServiceType = 'vtc' | 'taxi' | 'shared' | 'delivery' | 'rental' | 'airport_shuttle';
export type BookingStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentMethod = 'wallet' | 'mobile_money' | 'card' | 'cash';
export type RideStatus = 'started' | 'in_progress' | 'completed' | 'cancelled';

export interface Profile {
  id: string;
  user_type: UserType;
  full_name: string;
  phone: string;
  avatar_url?: string;
  language: string;
  country_code: string;
  rating: number;
  total_trips: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  driver_id: string;
  vehicle_type: VehicleType;
  brand: string;
  model: string;
  year: number;
  license_plate: string;
  color: string;
  seats: number;
  verified: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_type: ServiceType;
  vehicle_type: string;
  pickup_location: Location;
  dropoff_location: Location;
  stops?: Location[];
  scheduled_time?: string;
  passengers: number;
  status: BookingStatus;
  estimated_price: number;
  final_price?: number;
  payment_method: PaymentMethod;
  driver_id?: string;
  vehicle_id?: string;
  special_requests?: string;
  promo_code?: string;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'credit' | 'debit' | 'refund' | 'withdrawal' | 'bonus';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method?: string;
  reference: string;
  booking_id?: string;
  description?: string;
  metadata?: any;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  category: 'ride_issue' | 'payment' | 'account' | 'safety' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  booking_id?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: 'ride' | 'payment' | 'promo' | 'alert' | 'system';
  data?: any;
  read: boolean;
  created_at: string;
}
