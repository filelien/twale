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
import {
  CreditCard,
  Wallet,
  Smartphone,
  Banknote,
  ArrowLeft,
  Check,
  Lock,
} from 'lucide-react-native';
import { PAYMENT_METHODS } from '@/lib/constants';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    vehicleId,
    vehicleName,
    vehicleType,
    price,
    pickupDate,
    returnDate,
    pickupTime,
    returnTime,
    days,
    total,
  } = params;

  const [selectedMethod, setSelectedMethod] = useState<string>('wallet');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs de la carte');
        return;
      }
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/booking-confirmation',
        params: {
          bookingId: `booking_${Date.now()}`,
          vehicleName: vehicleName as string,
          total: total as string,
        },
      });
    }, 2000);
  };

  const renderPaymentMethod = (method: typeof PAYMENT_METHODS[0]) => {
    const isSelected = selectedMethod === method.value;
    let Icon;

    switch (method.value) {
      case 'wallet':
        Icon = Wallet;
        break;
      case 'card':
        Icon = CreditCard;
        break;
      case 'mobile_money':
        Icon = Smartphone;
        break;
      case 'cash':
        Icon = Banknote;
        break;
      default:
        Icon = CreditCard;
    }

    return (
      <TouchableOpacity
        key={method.value}
        style={[styles.paymentMethodCard, isSelected && styles.paymentMethodCardSelected]}
        onPress={() => setSelectedMethod(method.value)}
      >
        <View style={styles.paymentMethodContent}>
          <View
            style={[
              styles.paymentMethodIcon,
              isSelected && styles.paymentMethodIconSelected,
            ]}
          >
            <Icon size={24} color={isSelected ? '#2563eb' : '#6b7280'} />
          </View>
          <Text style={[styles.paymentMethodLabel, isSelected && styles.paymentMethodLabelSelected]}>
            {method.label}
          </Text>
        </View>
        {isSelected && (
          <View style={styles.checkIcon}>
            <Check size={20} color="#2563eb" />
          </View>
        )}
      </TouchableOpacity>
    );
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
        <Text style={styles.headerTitle}>Paiement</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Résumé de la réservation</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Véhicule</Text>
            <Text style={styles.summaryValue}>{vehicleName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Type</Text>
            <Text style={styles.summaryValue}>{vehicleType}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Durée</Text>
            <Text style={styles.summaryValue}>{days} jour(s)</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>{total} HTG</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de paiement</Text>
          <View style={styles.paymentMethods}>
            {PAYMENT_METHODS.map(renderPaymentMethod)}
          </View>
        </View>

        {selectedMethod === 'card' && (
          <View style={styles.cardForm}>
            <Text style={styles.sectionTitle}>Informations de la carte</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Numéro de carte</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom sur la carte</Text>
              <TextInput
                style={styles.input}
                placeholder="Jean Dupont"
                value={cardName}
                onChangeText={setCardName}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.cardRow}>
              <View style={[styles.inputGroup, styles.cardRowItem]}>
                <Text style={styles.inputLabel}>Date d'expiration</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/AA"
                  value={cardExpiry}
                  onChangeText={setCardExpiry}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputGroup, styles.cardRowItem]}>
                <Text style={styles.inputLabel}>CVC</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  value={cardCVC}
                  onChangeText={setCardCVC}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
        )}

        {selectedMethod === 'mobile_money' && (
          <View style={styles.mobileMoneyInfo}>
            <Text style={styles.infoText}>
              Vous serez redirigé vers votre application Mobile Money pour confirmer le paiement.
            </Text>
          </View>
        )}

        {selectedMethod === 'cash' && (
          <View style={styles.cashInfo}>
            <Text style={styles.infoText}>
              Le paiement se fera directement au chauffeur lors de la prise en charge.
            </Text>
          </View>
        )}

        <View style={styles.securityNote}>
          <Lock size={16} color="#6b7280" />
          <Text style={styles.securityText}>
            Vos informations de paiement sont sécurisées et cryptées
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total à payer</Text>
          <Text style={styles.footerTotalValue}>{total} HTG</Text>
        </View>
        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Traitement...' : 'Payer maintenant'}
          </Text>
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
    gap: 24,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  summaryTotal: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  summaryTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  paymentMethodCardSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodIconSelected: {
    backgroundColor: '#dbeafe',
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  paymentMethodLabelSelected: {
    color: '#2563eb',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardForm: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardRowItem: {
    flex: 1,
  },
  mobileMoneyInfo: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
  },
  cashInfo: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  securityText: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 16,
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerTotalLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  footerTotalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  payButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

