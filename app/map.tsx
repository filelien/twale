import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MapPin, Search, X, ArrowLeft, Check } from 'lucide-react-native';

export default function MapScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams(); // 'pickup' or 'dropoff'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  // Mock locations - in real app, use Mapbox/Google Maps
  const mockLocations = [
    { id: '1', address: 'Aéroport International Toussaint Louverture', lat: 18.5802, lng: -72.2925 },
    { id: '2', address: 'Place du Champ de Mars', lat: 18.5475, lng: -72.3392 },
    { id: '3', address: 'Rue du Centre, Port-au-Prince', lat: 18.5392, lng: -72.335 },
    { id: '4', address: 'Pétion-Ville, Port-au-Prince', lat: 18.5125, lng: -72.2858 },
  ];

  const filteredLocations = mockLocations.filter((loc) =>
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: typeof mockLocations[0]) => {
    setSelectedLocation({
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    });
  };

  const handleConfirm = () => {
    if (!selectedLocation) {
      Alert.alert('Erreur', 'Veuillez sélectionner un emplacement');
      return;
    }

    // In real app, pass location back to previous screen
    router.back();
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
        <Text style={styles.headerTitle}>
          {type === 'pickup' ? 'Point de départ' : 'Destination'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une adresse..."
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
      </View>

      <View style={styles.mapContainer}>
        {/* In real app, this would be a MapView component */}
        <View style={styles.mapPlaceholder}>
          <MapPin size={64} color="#2563eb" />
          <Text style={styles.mapPlaceholderText}>Carte interactive</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            {selectedLocation
              ? selectedLocation.address
              : 'Touchez la carte pour sélectionner un emplacement'}
          </Text>
        </View>
      </View>

      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Suggestions</Text>
        {filteredLocations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.suggestionItem,
              selectedLocation?.address === location.address && styles.suggestionItemSelected,
            ]}
            onPress={() => handleLocationSelect(location)}
          >
            <MapPin
              size={20}
              color={
                selectedLocation?.address === location.address ? '#2563eb' : '#6b7280'
              }
            />
            <Text
              style={[
                styles.suggestionText,
                selectedLocation?.address === location.address && styles.suggestionTextSelected,
              ]}
            >
              {location.address}
            </Text>
            {selectedLocation?.address === location.address && (
              <Check size={20} color="#2563eb" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmer l'emplacement</Text>
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
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
  mapContainer: {
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    gap: 12,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  suggestionsContainer: {
    backgroundColor: '#ffffff',
    maxHeight: 200,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionItemSelected: {
    backgroundColor: '#eff6ff',
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  suggestionTextSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  confirmButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

