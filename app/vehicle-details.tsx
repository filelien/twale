import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Car,
  Users,
  Star,
  ArrowLeft,
  Calendar,
  MapPin,
  ChevronRight,
} from 'lucide-react-native';
import { VEHICLE_TYPES } from '@/lib/constants';

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock data - in real app, fetch from API
  const vehicle = {
    id: id || '1',
    name: 'Toyota Corolla',
    type: 'standard',
    seats: 4,
    price: 150,
    rating: 4.8,
    reviews: 124,
    description: 'Berline confortable et spacieuse, parfaite pour vos déplacements en ville.',
    features: ['Climatisation', 'Wi-Fi', 'Sièges en cuir', 'GPS'],
  };

  const vehicleType = VEHICLE_TYPES.find((v) => v.value === vehicle.type);

  const handleBook = () => {
    router.push({
      pathname: '/date-selection',
      params: {
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        vehicleType: vehicle.type,
        price: vehicle.price.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Car size={80} color="#2563eb" />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={18} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.rating}>{vehicle.rating}</Text>
              <Text style={styles.reviews}>({vehicle.reviews} avis)</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Car size={20} color="#6b7280" />
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>{vehicleType?.label || vehicle.type}</Text>
              </View>
              <View style={styles.infoItem}>
                <Users size={20} color="#6b7280" />
                <Text style={styles.infoLabel}>Places</Text>
                <Text style={styles.infoValue}>{vehicle.seats}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.priceLabel}>Prix/jour</Text>
                <Text style={styles.priceValue}>{vehicle.price} HTG</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{vehicle.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            <View style={styles.featuresList}>
              {vehicle.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureDot} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avis récents</Text>
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>JD</Text>
                </View>
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewName}>Jean Dupont</Text>
                  <View style={styles.reviewRating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        color="#fbbf24"
                        fill={star <= 5 ? '#fbbf24' : 'none'}
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewText}>
                Excellent service, voiture très propre et confortable. Je recommande !
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceFooter}>
          <Text style={styles.priceFooterLabel}>Prix total</Text>
          <Text style={styles.priceFooterValue}>{vehicle.price} HTG/jour</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookButtonText}>Réserver maintenant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  titleSection: {
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  reviews: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  priceFooter: {
    flex: 1,
  },
  priceFooterLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceFooterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

