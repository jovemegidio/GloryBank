import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/lib/auth";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { colors, gradients, fontSize, fontWeight, spacing, radius } from "@/lib/theme";

const companyTypeOptions = [
  { label: "MEI", value: "MEI" },
  { label: "LTDA / Empresarial", value: "LIMITED" },
  { label: "Empresario Individual", value: "INDIVIDUAL" },
  { label: "Associacao", value: "ASSOCIATION" },
];

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpfCnpj: "",
    phone: "",
    birthDate: "",
    companyType: "MEI",
    incomeValue: "",
    address: "",
    addressNumber: "",
    province: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const documentLength = form.cpfCnpj.replace(/\D/g, "").length;
  const isCompany = documentLength === 14;
  const isIndividual = documentLength === 11;

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const {
      name,
      email,
      cpfCnpj,
      phone,
      incomeValue,
      address,
      addressNumber,
      province,
      postalCode,
      password,
      confirmPassword,
      birthDate,
      companyType,
    } = form;

    if (
      !name ||
      !email ||
      !cpfCnpj ||
      !phone ||
      !incomeValue ||
      !address ||
      !addressNumber ||
      !province ||
      !postalCode ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Atencao", "Preencha todos os campos obrigatorios");
      return;
    }

    if (isIndividual && !birthDate) {
      Alert.alert("Atencao", "Informe a data de nascimento para cadastro com CPF");
      return;
    }

    if (isCompany && !companyType) {
      Alert.alert("Atencao", "Selecione o tipo de empresa para cadastro com CNPJ");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Atencao", "As senhas nao coincidem");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Atencao", "A senha deve ter pelo menos 8 caracteres");
      return;
    }

    const success = await register({
      ...form,
      incomeValue: form.incomeValue,
      birthDate: isIndividual ? birthDate : undefined,
      companyType: isCompany ? companyType : undefined,
    });

    if (success) {
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={[...gradients.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Feather name="shield" size={28} color={colors.primary} />
            </View>
            <Text style={styles.brand}>Criar Conta</Text>
            <Text style={styles.subtitle}>Conta digital com onboarding Asaas</Text>
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
            onChangeText={(value) => updateField("name", value)}
            autoCapitalize="words"
          />

          <Input
            label="E-mail"
            icon="mail"
            placeholder="seu@email.com"
            value={form.email}
            onChangeText={(value) => updateField("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="CPF ou CNPJ"
            icon="file-text"
            placeholder="000.000.000-00"
            value={form.cpfCnpj}
            onChangeText={(value) => updateField("cpfCnpj", value)}
            keyboardType="numeric"
          />

          <Input
            label="Telefone"
            icon="phone"
            placeholder="(00) 00000-0000"
            value={form.phone}
            onChangeText={(value) => updateField("phone", value)}
            keyboardType="phone-pad"
          />

          {isIndividual && (
            <Input
              label="Data de nascimento"
              icon="calendar"
              placeholder="AAAA-MM-DD"
              value={form.birthDate}
              onChangeText={(value) => updateField("birthDate", value)}
              autoCapitalize="none"
            />
          )}

          {isCompany && (
            <Select
              label="Tipo de empresa"
              value={form.companyType}
              options={companyTypeOptions}
              onSelect={(value) => updateField("companyType", value)}
            />
          )}

          <Input
            label="Renda mensal"
            icon="dollar-sign"
            placeholder="5000"
            value={form.incomeValue}
            onChangeText={(value) => updateField("incomeValue", value)}
            keyboardType="decimal-pad"
          />

          <Input
            label="CEP"
            icon="map-pin"
            placeholder="01310-100"
            value={form.postalCode}
            onChangeText={(value) => updateField("postalCode", value)}
            keyboardType="numeric"
          />

          <Input
            label="Endereco"
            icon="home"
            placeholder="Av. Paulista"
            value={form.address}
            onChangeText={(value) => updateField("address", value)}
          />

          <Input
            label="Numero"
            icon="hash"
            placeholder="1000"
            value={form.addressNumber}
            onChangeText={(value) => updateField("addressNumber", value)}
          />

          <Input
            label="Bairro"
            icon="map-pin"
            placeholder="Bela Vista"
            value={form.province}
            onChangeText={(value) => updateField("province", value)}
          />

          <Input
            label="Senha"
            icon="lock"
            placeholder="Minimo 8 caracteres"
            value={form.password}
            onChangeText={(value) => updateField("password", value)}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "eye-off" : "eye"}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Confirmar senha"
            icon="lock"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChangeText={(value) => updateField("confirmPassword", value)}
            secureTextEntry={!showPassword}
          />

          <Button title="Criar Conta" onPress={handleRegister} isLoading={isLoading} size="lg" />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Ja tem conta? </Text>
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
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  brand: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: "#ffffff",
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: "rgba(255,255,255,0.8)",
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
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "center",
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
