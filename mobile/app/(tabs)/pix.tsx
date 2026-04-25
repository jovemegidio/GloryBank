import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as api from "@/lib/api";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Card from "@/components/Card";
import { colors, fontSize, fontWeight, spacing, radius } from "@/lib/theme";
import { formatCurrency } from "@/lib/utils";

const pixKeyTypes = [
  { label: "CPF", value: "CPF" },
  { label: "CNPJ", value: "CNPJ" },
  { label: "E-mail", value: "EMAIL" },
  { label: "Telefone", value: "PHONE" },
  { label: "Chave Aleatoria", value: "EVP" },
];

type Tab = "send" | "qrcode" | "keys";

export default function PixScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>("send");
  const [loading, setLoading] = useState(false);
  const [pixKeyType, setPixKeyType] = useState("CPF");
  const [pixKey, setPixKey] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [qrAmount, setQrAmount] = useState("");
  const [success, setSuccess] = useState<{ value?: number } | null>(null);
  const [qrCodeData, setQrCodeData] = useState<{ encodedImage: string; payload: string } | null>(
    null
  );

  const handleSendPix = async () => {
    if (!pixKey.trim() || !amount.trim()) {
      Alert.alert("Atencao", "Preencha a chave PIX e o valor");
      return;
    }

    const value = parseFloat(amount.replace(",", "."));
    if (isNaN(value) || value <= 0) {
      Alert.alert("Atencao", "Valor invalido");
      return;
    }

    setShowConfirm(true);
  };

  const confirmSend = async () => {
    setShowConfirm(false);
    setLoading(true);

    try {
      const value = parseFloat(amount.replace(",", "."));
      const result = await api.sendPix({
        pixKey: pixKey.trim(),
        pixKeyType,
        amount: value,
        description: description.trim() || undefined,
      });

      if (result.success) {
        setSuccess({ value: value });
        setPixKey("");
        setAmount("");
        setDescription("");
      } else {
        Alert.alert("Erro", result.error || "Falha ao enviar PIX");
      }
    } catch {
      Alert.alert("Erro", "Erro ao processar transacao");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async () => {
    setLoading(true);
    try {
      const result = await api.createPixKey("EVP");
      if (result.success) {
        Alert.alert("Sucesso", "Chave PIX aleatoria criada com sucesso!");
      } else {
        Alert.alert("Erro", result.error || "Falha ao criar chave");
      }
    } catch {
      Alert.alert("Erro", "Erro ao criar chave");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQrCode = async () => {
    const value = parseFloat(qrAmount.replace(",", "."));
    if (isNaN(value) || value <= 0) {
      Alert.alert("Atencao", "Informe um valor valido");
      return;
    }

    setLoading(true);
    try {
      const result = await api.generatePixQrCode(value, description.trim() || undefined);
      if (result.success && result.data) {
        setQrCodeData({
          encodedImage: result.data.encodedImage,
          payload: result.data.payload,
        });
      } else {
        Alert.alert("Erro", result.error || "Falha ao gerar QR Code");
      }
    } catch {
      Alert.alert("Erro", "Erro ao gerar QR Code PIX");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Feather name="check-circle" size={64} color={colors.success} />
          </View>
          <Text style={styles.successTitle}>PIX Enviado!</Text>
          <Text style={styles.successAmount}>{formatCurrency(Number(success.value ?? 0))}</Text>
          <Text style={styles.successDesc}>Transacao realizada com sucesso</Text>
          <Button title="Novo PIX" onPress={() => setSuccess(null)} variant="outline" style={{ marginTop: 24 }} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PIX</Text>
        <Text style={styles.headerSubtitle}>Envie, receba e gerencie suas chaves</Text>
      </View>

      <View style={styles.tabs}>
        {(["send", "qrcode", "keys"] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Feather
              name={tab === "send" ? "send" : tab === "qrcode" ? "maximize" : "key"}
              size={16}
              color={activeTab === tab ? colors.primary : colors.textMuted}
            />
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === "send" ? "Enviar" : tab === "qrcode" ? "QR Code" : "Chaves"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {activeTab === "send" && (
          <Card>
            <Select label="Tipo de chave" value={pixKeyType} options={pixKeyTypes} onSelect={setPixKeyType} />
            <Input
              label="Chave PIX"
              icon="key"
              placeholder="Digite a chave PIX"
              value={pixKey}
              onChangeText={setPixKey}
              autoCapitalize="none"
            />
            <Input
              label="Valor (R$)"
              icon="dollar-sign"
              placeholder="0,00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            <Input
              label="Descricao (opcional)"
              icon="edit-3"
              placeholder="Ex: Pagamento"
              value={description}
              onChangeText={setDescription}
            />
            <Button title="Enviar PIX" onPress={handleSendPix} isLoading={loading} size="lg" />
          </Card>
        )}

        {activeTab === "qrcode" && (
          <Card>
            <Text style={styles.sectionTitle}>Gerar QR Code PIX</Text>
            <Text style={styles.sectionDesc}>Gere um QR Code real para receber pagamentos via PIX.</Text>
            <Input
              label="Valor (R$)"
              icon="dollar-sign"
              placeholder="0,00"
              value={qrAmount}
              onChangeText={setQrAmount}
              keyboardType="decimal-pad"
            />
            <Button title="Gerar QR Code" onPress={handleGenerateQrCode} isLoading={loading} size="lg" />
            {qrCodeData && (
            <View style={styles.qrCodeCard}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                source={{ uri: `data:image/png;base64,${qrCodeData.encodedImage}` }}
                style={styles.qrCodeImage}
              />
                <Text style={styles.qrCodeLabel}>Copia e cola</Text>
                <Text style={styles.qrCodePayload}>{qrCodeData.payload}</Text>
              </View>
            )}
          </Card>
        )}

        {activeTab === "keys" && (
          <Card>
            <Text style={styles.sectionTitle}>Minhas Chaves PIX</Text>
            <Text style={styles.sectionDesc}>Crie uma chave aleatoria (EVP) na sua conta Asaas.</Text>
            <View style={{ marginTop: 16 }}>
              <Button
                title="Criar Chave Aleatoria (EVP)"
                onPress={handleCreateKey}
                isLoading={loading}
                variant="outline"
                icon={<Feather name="plus" size={18} color={colors.primary} />}
              />
            </View>
          </Card>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {showConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Confirmar PIX</Text>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Chave:</Text>
              <Text style={styles.modalValue}>{pixKey}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Valor:</Text>
              <Text style={styles.modalValue}>{formatCurrency(parseFloat(amount.replace(",", ".")) || 0)}</Text>
            </View>
            {description ? (
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Descricao:</Text>
                <Text style={styles.modalValue}>{description}</Text>
              </View>
            ) : null}
            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={() => setShowConfirm(false)} variant="outline" style={{ flex: 1 }} />
              <Button title="Confirmar" onPress={confirmSend} isLoading={loading} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    gap: 6,
    backgroundColor: colors.background,
  },
  activeTab: {
    backgroundColor: `${colors.primary}10`,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
  },
  activeTabText: {
    color: colors.primary,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  bottomSpacer: {
    height: 24,
  },
  qrCodeCard: {
    marginTop: spacing.xl,
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.separator,
    borderRadius: radius.xl,
    padding: spacing.lg,
    backgroundColor: "#ffffff",
  },
  qrCodeImage: {
    width: 220,
    height: 220,
  },
  qrCodeLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  qrCodePayload: {
    fontSize: fontSize.xs,
    color: colors.text,
    textAlign: "center",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxl,
  },
  successIcon: {
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  successAmount: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.success,
    marginBottom: spacing.sm,
  },
  successDesc: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxl,
  },
  modal: {
    backgroundColor: "#ffffff",
    borderRadius: radius.xl,
    padding: spacing.xxl,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  modalLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  modalValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  modalActions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
});
