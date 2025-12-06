import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Star, ArrowLeft, CheckCircle } from 'lucide-react-native';

export default function RatingScreen() {
  const router = useRouter();
  const { rideId, driverName, vehicleName } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingPress = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Erreur', 'Veuillez donner une note');
      return;
    }

    // In real app, submit to API
    setSubmitted(true);

    setTimeout(() => {
      router.back();
    }, 2000);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <CheckCircle size={80} color="#10b981" fill="#10b981" />
          <Text style={styles.successTitle}>Merci pour votre avis !</Text>
          <Text style={styles.successMessage}>
            Votre évaluation a été enregistrée avec succès.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Évaluer la course</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.rideInfo}>
          <Text style={styles.rideInfoLabel}>Course terminée</Text>
          <Text style={styles.rideInfoValue}>{driverName || 'Chauffeur'}</Text>
          <Text style={styles.rideInfoSubtext}>{vehicleName || 'Véhicule'}</Text>
        </View>

        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>Comment évaluez-vous cette course ?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((value) => {
              const isFilled = value <= (hoveredRating || rating);
              return (
                <TouchableOpacity
                  key={value}
                  style={styles.starButton}
                  onPress={() => handleRatingPress(value)}
                  onPressIn={() => setHoveredRating(value)}
                  onPressOut={() => setHoveredRating(0)}
                >
                  <Star
                    size={48}
                    color="#fbbf24"
                    fill={isFilled ? '#fbbf24' : 'none'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 5
                ? 'Excellent !'
                : rating === 4
                ? 'Très bien'
                : rating === 3
                ? 'Bien'
                : rating === 2
                ? 'Moyen'
                : 'À améliorer'}
            </Text>
          )}
        </View>

        <View style={styles.commentSection}>
          <Text style={styles.sectionTitle}>Ajouter un commentaire (optionnel)</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Partagez votre expérience..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Conseils pour un bon avis</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Soyez honnête et précis</Text>
            <Text style={styles.tipItem}>• Mentionnez les points positifs</Text>
            <Text style={styles.tipItem}>• Aidez les autres utilisateurs</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={rating === 0}
        >
          <Text style={styles.submitButtonText}>Soumettre l'avis</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 32,
  },
  rideInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  rideInfoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  rideInfoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  rideInfoSubtext: {
    fontSize: 16,
    color: '#6b7280',
  },
  ratingSection: {
    alignItems: 'center',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563eb',
  },
  commentSection: {
    gap: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    minHeight: 120,
  },
  tipsSection: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 24,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

