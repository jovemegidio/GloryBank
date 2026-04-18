import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/lib/auth';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { colors, gradients, fontSize, fontWeight, spacing, radius } from '@/lib/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpfCnpj: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { name, email, cpfCnpj, phone, password, confirmPassword } = form;

    if (!name || !email || !cpfCnpj || !phone || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 8 caracteres');
      return;
    }

    const success = await register(form);
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={[...gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Feather name="shield" size={28} color={colors.primary} />
            </View>
            <Text style={styles.brand}>Criar Conta</Text>
            <Text style={styles.subtitle}>Abra sua conta digital grátis</Text>
          </View>
        </LinearGradient>

        <View style={styles.form}>
          {error && (
            <View style={styles.errorBanner}>
              <Feather name="alert-circle" size={16} color={colors.danger} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={clearError}>
                <Feather name="x" size={16} color={colors.danger} />
              </TouchableOpacity>
            </View>
          )}

          <Input
            label="Nome completo"
            icon="user"
            placeholder="Seu nome"
            value={form.name}
            onChangeText={(v) => updateField('name', v)}
            autoCapitalize="words"
          />

          <Input
            label="E-mail"
            icon="mail"
            placeholder="seu@email.com"
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="CPF ou CNPJ"
            icon="file-text"
            placeholder="000.000.000-00"
            value={form.cpfCnpj}
            onChangeText={(v) => updateField('cpfCnpj', v)}
            keyboardType="numeric"
          />

          <Input
            label="Telefone"
            icon="phone"
            placeholder="(00) 00000-0000"
            value={form.phone}
            onChangeText={(v) => updateField('phone', v)}
            keyboardType="phone-pad"
          />

          <Input
            label="Senha"
            icon="lock"
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChangeText={(v) => updateField('password', v)}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? 'eye-off' : 'eye'}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Confirmar senha"
            icon="lock"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChangeText={(v) => updateField('confirmPassword', v)}
            secureTextEntry={!showPassword}
          />

          <Button
            title="Criar Conta"
            onPress={handleRegister}
            isLoading={isLoading}
            size="lg"
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 32,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brand: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: '#ffffff',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  form: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    marginTop: -20,
    padding: spacing.xxl,
    paddingTop: spacing.xxl,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  errorText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.danger,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  loginText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
});
