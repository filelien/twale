import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import {
  Car,
  Package,
  MapPin,
  Users,
  Search,
  Sparkles,
  ArrowRight,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { profile } = useAuth();
  const [selectedService, setSelectedService] = useState<string>('vtc');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const services = [
    { id: 'vtc', name: 'VTC', icon: Car, color: '#2563eb', description: 'Voiture avec chauffeur' },
    { id: 'taxi', name: 'Taxi', icon: Car, color: '#10b981', description: 'Taxi compteur' },
    { id: 'shared', name: 'Partagé', icon: Users, color: '#f59e0b', description: 'Course partagée' },
    { id: 'delivery', name: 'Livraison', icon: Package, color: '#ef4444', description: 'Colis & documents' },
  ];

  const vehicleTypes = [
    {
      type: 'standard',
      name: 'Standard',
      seats: 4,
      price: '150',
      description: 'Berline confortable',
      icon: '🚗',
    },
    {
      type: 'premium',
      name: 'Premium',
      seats: 4,
      price: '250',
      description: 'Véhicule haut de gamme',
      icon: '✨',
    },
    {
      type: 'xl',
      name: 'XL',
      seats: 6,
      price: '200',
      description: 'Van spacieux',
      icon: '🚐',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563eb', '#1e40af', '#1e3a8a']}
        style={styles.headerGradient}
      >
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Bonjour,</Text>
              <Text style={styles.name}>
                {profile?.full_name?.split(' ')[0] || 'Voyageur'}
              </Text>
            </View>
            <View style={styles.sparklesContainer}>
              <Sparkles size={24} color="#fbbf24" />
            </View>
          </View>
          <Text style={styles.subtitle}>Où souhaitez-vous aller ?</Text>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.serviceSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Services disponibles</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.serviceList}
            contentContainerStyle={styles.serviceListContent}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;
              return (
                <TouchableOpacity
                  key={service.id}
                  style={[
                    styles.serviceCard,
                    isSelected && [styles.serviceCardActive, { borderColor: service.color }],
                  ]}
                  onPress={() => setSelectedService(service.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.serviceIconContainer, { backgroundColor: service.color + '20' }]}>
                    <Icon size={28} color={service.color} />
                  </View>
                  <Text style={[styles.serviceName, isSelected && { color: service.color }]}>
                    {service.name}
                  </Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        <Animated.View
          style={[
            styles.locationSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Itinéraire</Text>
          <View style={styles.locationCard}>
            <View style={styles.locationInputContainer}>
              <View style={styles.locationIndicator}>
                <View style={styles.pickupDot} />
                <View style={styles.locationLine} />
                <View style={styles.dropoffDot} />
              </View>

              <View style={styles.locationInputs}>
                <View style={styles.inputWrapper}>
                  <MapPin size={18} color="#2563eb" style={styles.inputIcon} />
                  <TextInput
                    style={styles.locationInput}
                    placeholder="Point de départ"
                    placeholderTextColor="#9ca3af"
                    value={pickupLocation}
                    onChangeText={setPickupLocation}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <MapPin size={18} color="#ef4444" style={styles.inputIcon} />
                  <TextInput
                    style={styles.locationInput}
                    placeholder="Destination"
                    placeholderTextColor="#9ca3af"
                    value={dropoffLocation}
                    onChangeText={setDropoffLocation}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => router.push('/map?type=pickup')}
              activeOpacity={0.7}
            >
              <Search size={18} color="#2563eb" />
              <Text style={styles.mapButtonText}>Rechercher sur la carte</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {selectedService !== 'delivery' && (
          <Animated.View
            style={[
              styles.vehicleSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Type de véhicule</Text>
            {vehicleTypes.map((vehicle, index) => (
              <TouchableOpacity
                key={vehicle.type}
                style={styles.vehicleCard}
                onPress={() => router.push('/search')}
                activeOpacity={0.7}
              >
                <View style={styles.vehicleIconContainer}>
                  <Text style={styles.vehicleEmoji}>{vehicle.icon}</Text>
                </View>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleName}>{vehicle.name}</Text>
                  <Text style={styles.vehicleDescription}>
                    {vehicle.description} • {vehicle.seats} places
                  </Text>
                </View>
                <View style={styles.vehiclePrice}>
                  <Text style={styles.priceText}>{vehicle.price}</Text>
                  <Text style={styles.priceUnit}>HTG</Text>
                </View>
                <ArrowRight size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => {
            if (!pickupLocation || !dropoffLocation) {
              // In real app, show a toast or alert
              return;
            }
            router.push('/search');
          }}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#2563eb', '#1e40af']}
            style={styles.bookButtonGradient}
          >
            <Text style={styles.bookButtonText}>Réserver maintenant</Text>
            <ArrowRight size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  header: {
    gap: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sparklesContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  serviceSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  serviceList: {
    marginHorizontal: -24,
  },
  serviceListContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  serviceCard: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceCardActive: {
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
    transform: [{ scale: 1.05 }],
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  locationSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  locationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  locationInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  locationIndicator: {
    alignItems: 'center',
    paddingTop: 8,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563eb',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  locationLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#d1d5db',
    marginVertical: 4,
  },
  dropoffDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  locationInputs: {
    flex: 1,
    gap: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  locationInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1f2937',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  mapButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  vehicleSection: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  vehicleEmoji: {
    fontSize: 28,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  vehicleDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  vehiclePrice: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  priceUnit: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bookButton: {
    marginHorizontal: 24,
    marginTop: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
