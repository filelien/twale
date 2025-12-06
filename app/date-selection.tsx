import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Calendar, Clock, ArrowLeft, ChevronRight } from 'lucide-react-native';

export default function DateSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { vehicleId, vehicleName, vehicleType, price } = params;

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<string>('');
  const [returnTime, setReturnTime] = useState<string>('');

  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const generateCalendarDays = () => {
    const days: Date[] = [];
    const startDate = new Date(today);
    const endDate = new Date(nextMonth);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const isDateSelected = (date: Date) => {
    if (!pickupDate && !returnDate) return false;
    if (pickupDate && date.getTime() === pickupDate.getTime()) return true;
    if (returnDate && date.getTime() === returnDate.getTime()) return true;
    if (pickupDate && returnDate) {
      return date >= pickupDate && date <= returnDate;
    }
    return false;
  };

  const isDateDisabled = (date: Date) => {
    return date < today;
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!pickupDate || (pickupDate && returnDate)) {
      setPickupDate(date);
      setReturnDate(null);
    } else if (pickupDate && !returnDate) {
      if (date < pickupDate) {
        setPickupDate(date);
        setReturnDate(null);
      } else {
        setReturnDate(date);
      }
    }
  };

  const calculateDays = () => {
    if (pickupDate && returnDate) {
      const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 1;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const priceValue = Array.isArray(price) ? price[0] : price;
    return days * parseInt(priceValue || '0', 10);
  };

  const handleContinue = () => {
    if (!pickupDate || !returnDate) {
      Alert.alert('Erreur', 'Veuillez sélectionner les dates de prise en charge et de retour');
      return;
    }
    if (!pickupTime || !returnTime) {
      Alert.alert('Erreur', 'Veuillez sélectionner les heures');
      return;
    }

    router.push({
      pathname: '/payment',
      params: {
        vehicleId: vehicleId as string,
        vehicleName: vehicleName as string,
        vehicleType: vehicleType as string,
        price: price as string,
        pickupDate: pickupDate.toISOString(),
        returnDate: returnDate.toISOString(),
        pickupTime,
        returnTime,
        days: calculateDays().toString(),
        total: calculateTotal().toString(),
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
        <Text style={styles.headerTitle}>Sélection des dates</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleName}>{vehicleName}</Text>
          <Text style={styles.vehicleType}>{vehicleType}</Text>
        </View>

        <View style={styles.dateCards}>
          <TouchableOpacity
            style={styles.dateCard}
            onPress={() => {
              // In real app, open time picker
              setPickupTime('09:00');
            }}
          >
            <View style={styles.dateCardHeader}>
              <Calendar size={20} color="#2563eb" />
              <Text style={styles.dateCardTitle}>Date de prise en charge</Text>
            </View>
            {pickupDate ? (
              <Text style={styles.dateCardValue}>{formatDate(pickupDate)}</Text>
            ) : (
              <Text style={styles.dateCardPlaceholder}>Sélectionner une date</Text>
            )}
            {pickupTime && (
              <View style={styles.timeContainer}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.timeText}>{pickupTime}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateCard}
            onPress={() => {
              // In real app, open time picker
              setReturnTime('18:00');
            }}
          >
            <View style={styles.dateCardHeader}>
              <Calendar size={20} color="#ef4444" />
              <Text style={styles.dateCardTitle}>Date de retour</Text>
            </View>
            {returnDate ? (
              <Text style={styles.dateCardValue}>{formatDate(returnDate)}</Text>
            ) : (
              <Text style={styles.dateCardPlaceholder}>Sélectionner une date</Text>
            )}
            {returnTime && (
              <View style={styles.timeContainer}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.timeText}>{returnTime}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Calendrier</Text>
          <View style={styles.calendar}>
            <View style={styles.calendarHeader}>
              {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
                <Text key={day} style={styles.calendarDayHeader}>
                  {day}
                </Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {calendarDays.map((date, index) => {
                const isSelected = isDateSelected(date);
                const isDisabled = isDateDisabled(date);
                const isStart = pickupDate && date.getTime() === pickupDate.getTime();
                const isEnd = returnDate && date.getTime() === returnDate.getTime();

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDay,
                      isSelected && styles.calendarDaySelected,
                      isStart && styles.calendarDayStart,
                      isEnd && styles.calendarDayEnd,
                      isDisabled && styles.calendarDayDisabled,
                    ]}
                    onPress={() => handleDateSelect(date)}
                    disabled={isDisabled}
                  >
                    <Text
                      style={[
                        styles.calendarDayText,
                        isSelected && styles.calendarDayTextSelected,
                        isDisabled && styles.calendarDayTextDisabled,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Prix par jour</Text>
            <Text style={styles.summaryValue}>{price} HTG</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Nombre de jours</Text>
            <Text style={styles.summaryValue}>{calculateDays()} jour(s)</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>{calculateTotal()} HTG</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuer</Text>
          <ChevronRight size={20} color="#ffffff" />
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
  vehicleInfo: {
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 16,
    color: '#6b7280',
  },
  dateCards: {
    gap: 16,
  },
  dateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dateCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  dateCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  dateCardPlaceholder: {
    fontSize: 16,
    color: '#9ca3af',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  calendarSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  calendar: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  calendarDayHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  calendarDaySelected: {
    backgroundColor: '#eff6ff',
  },
  calendarDayStart: {
    backgroundColor: '#2563eb',
  },
  calendarDayEnd: {
    backgroundColor: '#2563eb',
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#1f2937',
  },
  calendarDayTextSelected: {
    color: '#2563eb',
    fontWeight: '600',
  },
  calendarDayTextDisabled: {
    color: '#9ca3af',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
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
    fontSize: 16,
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
  footer: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  continueButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

