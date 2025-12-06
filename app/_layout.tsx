import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search" />
        <Stack.Screen name="vehicle-details" />
        <Stack.Screen name="date-selection" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="booking-confirmation" />
        <Stack.Screen name="map" />
        <Stack.Screen name="tracking" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="rating" />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
