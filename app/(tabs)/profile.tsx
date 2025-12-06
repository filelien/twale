import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import {
  User,
  Phone,
  Mail,
  Globe,
  Star,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/welcome');
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: Settings,
      label: 'Paramètres',
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      label: 'Aide & Support',
      onPress: () => {},
    },
    {
      icon: Shield,
      label: 'Sécurité',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={40} color="#2563eb" />
          </View>
          {profile?.verified && (
            <View style={styles.verifiedBadge}>
              <Star size={16} color="#ffffff" />
            </View>
          )}
        </View>

        <Text style={styles.name}>{profile?.full_name}</Text>

        <View style={styles.ratingContainer}>
          <Star size={16} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.rating}>{profile?.rating?.toFixed(1) || '5.0'}</Text>
          <Text style={styles.trips}>• {profile?.total_trips || 0} courses</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Phone size={20} color="#6b7280" />
            <Text style={styles.infoLabel}>Téléphone</Text>
            <Text style={styles.infoValue}>{profile?.phone || 'Non renseigné'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Mail size={20} color="#6b7280" />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Globe size={20} color="#6b7280" />
            <Text style={styles.infoLabel}>Pays</Text>
            <Text style={styles.infoValue}>{profile?.country_code || 'HT'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Options</Text>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <View key={index}>
              {index > 0 && <View style={styles.divider} />}
              <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
                <item.icon size={20} color="#6b7280" />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <ChevronRight size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Twalé v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#eff6ff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    backgroundColor: '#10b981',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 24,
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
  trips: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
  },
  menuSection: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 24,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
