import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [step]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''));
  };

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, text: '', color: '#9ca3af' };
    if (pwd.length < 6) return { strength: 1, text: 'Faible', color: '#ef4444' };
    if (pwd.length < 8) return { strength: 2, text: 'Moyen', color: '#f59e0b' };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { strength: 2, text: 'Moyen', color: '#f59e0b' };
    return { strength: 3, text: 'Fort', color: '#10b981' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleNext = () => {
    if (step === 1) {
      if (!fullName.trim()) {
        setError('Veuillez entrer votre nom complet');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!phone.trim()) {
        setError('Veuillez entrer votre numéro de téléphone');
        return;
      }
      if (!validatePhone(phone)) {
        setError('Numéro de téléphone invalide');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!email.trim()) {
        setError('Veuillez entrer votre email');
        return;
      }
      if (!validateEmail(email)) {
        setError('Email invalide');
        return;
      }
      setStep(4);
    }
    setError('');
  };

  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      setError('Veuillez remplir les champs de mot de passe');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    setError('');

    const { error } = await signUp(email, password, fullName, phone);

    if (error) {
      setError(error.message || 'Erreur lors de l\'inscription');
      setLoading(false);
    } else {
      Alert.alert(
        'Succès !',
        'Votre compte a été créé avec succès. Bienvenue sur Twalé !',
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    }
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={styles.stepContainer}>
            <View
              style={[
                styles.stepCircle,
                step >= s && styles.stepCircleActive,
              ]}
            >
              {step > s ? (
                <CheckCircle size={16} color="#ffffff" />
              ) : (
                <Text style={[styles.stepNumber, step >= s && styles.stepNumberActive]}>
                  {s}
                </Text>
              )}
            </View>
            {s < 4 && (
              <View
                style={[
                  styles.stepLine,
                  step > s && styles.stepLineActive,
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#ffffff', '#f0f9ff']}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>
              Étape {step} sur 4
            </Text>

            {renderStepIndicator()}

            {error ? (
              <View style={styles.errorContainer}>
                <XCircle size={20} color="#ef4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Animated.View style={{ opacity: fadeAnim }}>
              {step === 1 && (
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nom complet</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Jean Dupont"
                      value={fullName}
                      onChangeText={(text) => {
                        setFullName(text);
                        setError('');
                      }}
                      autoCapitalize="words"
                      autoFocus
                    />
                  </View>
                </View>
              )}

              {step === 2 && (
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Numéro de téléphone</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="+509 1234 5678"
                      value={phone}
                      onChangeText={(text) => {
                        setPhone(text);
                        setError('');
                      }}
                      keyboardType="phone-pad"
                      autoFocus
                    />
                    <Text style={styles.hint}>
                      Format international requis (ex: +509...)
                    </Text>
                  </View>
                </View>
              )}

              {step === 3 && (
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Adresse email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="votre@email.com"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setError('');
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoFocus
                    />
                  </View>
                </View>
              )}

              {step === 4 && (
                <View style={styles.form}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="••••••••"
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          setError('');
                        }}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoFocus
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                      >
                        {showPassword ? (
                          <EyeOff size={20} color="#6b7280" />
                        ) : (
                          <Eye size={20} color="#6b7280" />
                        )}
                      </TouchableOpacity>
                    </View>
                    {password.length > 0 && (
                      <View style={styles.strengthContainer}>
                        <View style={styles.strengthBar}>
                          <View
                            style={[
                              styles.strengthFill,
                              {
                                width: `${(passwordStrength.strength / 3) * 100}%`,
                                backgroundColor: passwordStrength.color,
                              },
                            ]}
                          />
                        </View>
                        <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                          {passwordStrength.text}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Confirmer le mot de passe</Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={(text) => {
                          setConfirmPassword(text);
                          setError('');
                        }}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.eyeButton}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} color="#6b7280" />
                        ) : (
                          <Eye size={20} color="#6b7280" />
                        )}
                      </TouchableOpacity>
                    </View>
                    {confirmPassword.length > 0 && password === confirmPassword && (
                      <View style={styles.matchContainer}>
                        <CheckCircle size={16} color="#10b981" />
                        <Text style={styles.matchText}>Les mots de passe correspondent</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </Animated.View>

            <View style={styles.buttonContainer}>
              {step < 4 ? (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNext}
                  activeOpacity={0.8}
                >
                  <Text style={styles.nextButtonText}>Suivant</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                  onPress={handleRegister}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.registerButtonText}>
                    {loading ? 'Création du compte...' : 'Créer mon compte'}
                  </Text>
                </TouchableOpacity>
              )}

              {step > 1 && (
                <TouchableOpacity
                  style={styles.backStepButton}
                  onPress={() => {
                    setStep(step - 1);
                    setError('');
                  }}
                >
                  <Text style={styles.backStepText}>Retour</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => router.push('/(auth)/login')}
              >
                <Text style={styles.linkText}>
                  Déjà un compte ? <Text style={styles.linkTextBold}>Se connecter</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#2563eb',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#2563eb',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    flex: 1,
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    gap: 20,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  eyeButton: {
    padding: 16,
  },
  strengthContainer: {
    marginTop: 8,
    gap: 4,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  matchText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  hint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 'auto',
  },
  nextButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  registerButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  backStepButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backStepText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#6b7280',
  },
  linkTextBold: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
