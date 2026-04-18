import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function AuthGate({ children }: { children: React.ReactNode }) {
  const checkSession = useAuth((s) => s.checkSession);

  useEffect(() => {
    checkSession();
  }, []);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGate>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="transferir"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Transferir',
              headerTintColor: '#e30613',
            }}
          />
          <Stack.Screen
            name="boleto"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Gerar Boleto',
              headerTintColor: '#e30613',
            }}
          />
          <Stack.Screen
            name="cobrar"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Cobrar',
              headerTintColor: '#e30613',
            }}
          />
          <Stack.Screen
            name="notificacoes"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Notificações',
              headerTintColor: '#e30613',
            }}
          />
          <Stack.Screen
            name="conta"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Minha Conta',
              headerTintColor: '#e30613',
            }}
          />
          <Stack.Screen
            name="agendamentos"
            options={{
              presentation: 'modal',
              headerShown: true,
              headerTitle: 'Agendamentos',
              headerTintColor: '#e30613',
            }}
          />
        </Stack>
      </AuthGate>
    </QueryClientProvider>
  );
}
