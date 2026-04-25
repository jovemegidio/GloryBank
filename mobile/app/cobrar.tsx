import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as api from "@/lib/api";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { colors, fontSize, fontWeight, spacing, radius } from "@/lib/theme";

export default function CobrarScreen() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<{ encodedImage: string; payload: string } | null>(
    null
  );

  const handleCobrar = async () => {
    const value = parseFloat(amount.replace(",", "."));
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
        Alert.alert("Erro", result.error || "Falha ao gerar cobranca");
      }
    } catch {
      Alert.alert("Erro", "Nao foi possivel gerar a cobranca PIX");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Card>
          <Text style={styles.title}>Cobrar via PIX</Text>
          <Text style={styles.subtitle}>Gere um QR Code real para receber pagamentos</Text>
          <View style={{ marginTop: spacing.xl }}>
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
              placeholder="Ex: Servico prestado"
              value={description}
              onChangeText={setDescription}
            />
            <Button
              title="Gerar Cobranca"
              onPress={handleCobrar}
              isLoading={loading}
              size="lg"
              icon={<Feather name="dollar-sign" size={18} color="#fff" />}
            />
          </View>
        </Card>

        {qrCodeData && (
          <Card>
            <Text style={styles.resultTitle}>QR Code gerado</Text>
            <View style={styles.qrCodeWrapper}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                source={{ uri: `data:image/png;base64,${qrCodeData.encodedImage}` }}
                style={styles.qrCodeImage}
              />
            </View>
            <Text style={styles.copyLabel}>Codigo copia e cola</Text>
            <Text style={styles.copyPayload}>{qrCodeData.payload}</Text>
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },
  resultTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  qrCodeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.separator,
    borderRadius: radius.xl,
    backgroundColor: "#ffffff",
  },
  qrCodeImage: {
    width: 220,
    height: 220,
  },
  copyLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  copyPayload: {
    fontSize: fontSize.xs,
    color: colors.text,
  },
});
