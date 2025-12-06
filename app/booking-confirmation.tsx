import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, MapPin, Calendar, Car, ArrowRight } from 'lucide-react-native';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { bookingId, vehicleName, total } = useLocalSearchParams();

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  const handleViewBooking = () => {
    router.push('/(tabs)/rides');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <CheckCircle size={80} color="#10b981" fill="#10b981" />
          </View>
          <Text style={styles.successTitle}>Réservation confirmée !</Text>
          <Text style={styles.successMessage}>
            Votre réservation a été confirmée avec succès. Vous recevrez une notification lorsque
            votre chauffeur sera assigné.
          </Text>
        </View>

        <View style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingId}>N° {bookingId}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmée</Text>
            </View>
          </View>

          <View style={styles.bookingDetails}>
            <View style={styles.detailRow}>
              <Car size={20} color="#6b7280" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Véhicule</Text>
                <Text style={styles.detailValue}>{vehicleName}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MapPin size={20} color="#6b7280" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Point de départ</Text>
                <Text style={styles.detailValue}>Adresse de prise en charge</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <MapPin size={20} color="#ef4444" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Destination</Text>
                <Text style={styles.detailValue}>Adresse de destination</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Calendar size={20} color="#6b7280" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date et heure</Text>
                <Text style={styles.detailValue}>
                  {new Date().toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total payé</Text>
            <Text style={styles.totalValue}>{total} HTG</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Prochaines étapes</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <View style={styles.infoNumber}>
                <Text style={styles.infoNumberText}>1</Text>
              </View>
              <Text style={styles.infoText}>
                Vous recevrez une notification lorsque votre chauffeur sera assigné
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoNumber}>
                <Text style={styles.infoNumberText}>2</Text>
              </View>
              <Text style={styles.infoText}>
                Suivez votre course en temps réel sur la carte
              </Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoNumber}>
                <Text style={styles.infoNumberText}>3</Text>
              </View>
              <Text style={styles.infoText}>
                Contactez votre chauffeur via le chat si nécessaire
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleViewBooking}>
          <Text style={styles.secondaryButtonText}>Voir mes réservations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Retour à l'accueil</Text>
          <ArrowRight size={20} color="#ffffff" />
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
    padding: 24,
    gap: 24,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  bookingId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  statusBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  bookingDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoList: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});

