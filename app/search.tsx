import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Search, Filter, X, Car, SlidersHorizontal } from 'lucide-react-native';
import { VEHICLE_TYPES } from '@/lib/constants';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  seats: number;
  price: number;
  rating: number;
  image?: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Corolla',
    type: 'standard',
    seats: 4,
    price: 150,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Honda Civic',
    type: 'standard',
    seats: 4,
    price: 150,
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Mercedes E-Class',
    type: 'premium',
    seats: 4,
    price: 250,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Toyota Hiace',
    type: 'xl',
    seats: 6,
    price: 200,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'BMW 5 Series',
    type: 'premium',
    seats: 4,
    price: 280,
    rating: 4.9,
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || vehicle.type === selectedType;
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    return matchesSearch && matchesType && matchesPrice;
  });

  const renderVehicle = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity
      style={styles.vehicleCard}
      onPress={() => router.push(`/vehicle-details?id=${item.id}`)}
    >
      <View style={styles.vehicleImage}>
        <Car size={40} color="#2563eb" />
      </View>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleType}>
            {VEHICLE_TYPES.find((v) => v.value === item.type)?.label || item.type}
          </Text>
          <Text style={styles.vehicleSeats}>• {item.seats} places</Text>
        </View>
        <View style={styles.vehicleFooter}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </View>
          <Text style={styles.price}>{item.price} HTG</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => router.push(`/vehicle-details?id=${item.id}`)}
      >
        <Text style={styles.bookButtonText}>Réserver</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <X size={24} color="#1f2937" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une voiture..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={20} color={showFilters ? '#2563eb' : '#6b7280'} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Type de véhicule</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterList}>
            <TouchableOpacity
              style={[styles.filterChip, !selectedType && styles.filterChipActive]}
              onPress={() => setSelectedType(null)}
            >
              <Text style={[styles.filterChipText, !selectedType && styles.filterChipTextActive]}>
                Tous
              </Text>
            </TouchableOpacity>
            {VEHICLE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.filterChip,
                  selectedType === type.value && styles.filterChipActive,
                ]}
                onPress={() => setSelectedType(type.value)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedType === type.value && styles.filterChipTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Fourchette de prix</Text>
          <View style={styles.priceRangeContainer}>
            <Text style={styles.priceRangeText}>
              {priceRange[0]} - {priceRange[1]} HTG
            </Text>
          </View>
        </View>
      )}

      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicle}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Car size={48} color="#9ca3af" />
            <Text style={styles.emptyText}>Aucun véhicule trouvé</Text>
            <Text style={styles.emptySubtext}>Essayez de modifier vos filtres</Text>
          </View>
        }
      />
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterList: {
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  priceRangeContainer: {
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  priceRangeText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  vehicleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  vehicleImage: {
    width: 80,
    height: 80,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  vehicleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  vehicleType: {
    fontSize: 14,
    color: '#6b7280',
  },
  vehicleSeats: {
    fontSize: 14,
    color: '#6b7280',
  },
  vehicleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
});

