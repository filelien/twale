import { View, StyleSheet, Text, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Car } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const carPosition = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const roadAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation de la voiture qui roule
    const carAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(carPosition, {
          toValue: 400,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(carPosition, {
          toValue: -100,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    // Animation de fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation de la route
    const roadAnimation = Animated.loop(
      Animated.timing(roadAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    carAnimation.start();
    roadAnimation.start();

    // Navigation après chargement
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/welcome');
        }
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      carAnimation.stop();
      roadAnimation.stop();
    };
  }, [user, loading]);

  const roadTranslateY = roadAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <LinearGradient
      colors={['#1e3a8a', '#2563eb', '#3b82f6']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Car size={48} color="#ffffff" />
          </View>
          <Text style={styles.logoText}>Twalé</Text>
          <Text style={styles.tagline}>Votre mobilité, simplifiée</Text>
        </View>

        <View style={styles.roadContainer}>
          <Animated.View
            style={[
              styles.road,
              {
                transform: [{ translateY: roadTranslateY }],
              },
            ]}
          >
            <View style={styles.roadLine} />
            <View style={[styles.roadLine, { left: '50%' }]} />
          </Animated.View>

          <Animated.View
            style={[
              styles.car,
              {
                transform: [{ translateX: carPosition }],
              },
            ]}
          >
            <Car size={40} color="#ef4444" fill="#ef4444" />
          </Animated.View>
        </View>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  width: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  roadContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
    marginBottom: 40,
    overflow: 'hidden',
  },
  road: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#1f2937',
    borderTopWidth: 2,
    borderTopColor: '#374151',
  },
  roadLine: {
    position: 'absolute',
    top: '50%',
    width: 60,
    height: 4,
    backgroundColor: '#fbbf24',
    borderRadius: 2,
  },
  car: {
    position: 'absolute',
    bottom: 20,
    left: 0,
  },
  loadingContainer: {
    width: '80%',
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
});
