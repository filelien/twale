import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  MapPin,
  Car,
  Phone,
  MessageCircle,
  Clock,
  User,
  ArrowLeft,
} from 'lucide-react-native';

export default function TrackingScreen() {
  const router = useRouter();
  const { rideId } = useLocalSearchParams();
  const [eta, setEta] = useState(10);
  const [driverLocation, setDriverLocation] = useState({ lat: 18.5475, lng: -72.3392 });

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (eta > 0) {
        setEta((prev) => Math.max(0, prev - 1));
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [eta]);

  const handleCall = () => {
    // In real app, initiate phone call
    console.log('Calling driver...');
  };

  const handleChat = () => {
    router.push({
      pathname: '/chat',
      params: {
        driverId: 'driver_123',
        driverName: 'Jean Baptiste',
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suivi en temps réel</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.mapContainer}>
        {/* In real app, this would be a MapView with real-time tracking */}
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapContent}>
            <View style={styles.pickupMarker}>
              <MapPin size={32} color="#2563eb" fill="#2563eb" />
              <Text style={styles.markerLabel}>Départ</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.carMarker}>
              <Car size={40} color="#10b981" />
            </View>
            <View style={styles.dropoffMarker}>
              <MapPin size={32} color="#ef4444" fill="#ef4444" />
              <Text style={styles.markerLabel}>Arrivée</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.etaContainer}>
          <Clock size={24} color="#2563eb" />
          <View style={styles.etaContent}>
            <Text style={styles.etaLabel}>Temps d'arrivée estimé</Text>
            <Text style={styles.etaValue}>{eta} min</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <User size={24} color="#2563eb" />
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>Jean Baptiste</Text>
            <Text style={styles.driverVehicle}>Toyota Corolla • ABC-1234</Text>
            <View style={styles.driverRating}>
              <Text style={styles.driverRatingText}>★ 4.8</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Phone size={20} color="#2563eb" />
            <Text style={styles.actionText}>Appeler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
            <MessageCircle size={20} color="#2563eb" />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.routeInfo}>
        <View style={styles.routeItem}>
          <View style={styles.routeDot} />
          <View style={styles.routeContent}>
            <Text style={styles.routeLabel}>Point de départ</Text>
            <Text style={styles.routeAddress}>Place du Champ de Mars</Text>
          </View>
        </View>
        <View style={styles.routeLineVertical} />
        <View style={styles.routeItem}>
          <View style={[styles.routeDot, styles.routeDotDestination]} />
          <View style={styles.routeContent}>
            <Text style={styles.routeLabel}>Destination</Text>
            <Text style={styles.routeAddress}>Aéroport International</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#dbeafe',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupMarker: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    alignItems: 'center',
  },
  markerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  routeLine: {
    position: 'absolute',
    width: 2,
    height: '40%',
    backgroundColor: '#2563eb',
    transform: [{ rotate: '45deg' }],
  },
  carMarker: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  dropoffMarker: {
    position: 'absolute',
    bottom: '20%',
    right: '20%',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 16,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  etaContent: {
    flex: 1,
  },
  etaLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  etaValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  driverVehicle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRatingText: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  routeInfo: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563eb',
    marginTop: 6,
  },
  routeDotDestination: {
    backgroundColor: '#ef4444',
    borderRadius: 2,
  },
  routeContent: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  routeAddress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  routeLineVertical: {
    width: 2,
    height: 16,
    backgroundColor: '#d1d5db',
    marginLeft: 5,
    marginVertical: 4,
  },
});

