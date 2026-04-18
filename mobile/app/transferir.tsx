import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as api from '@/lib/api';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Card from '@/components/Card';
import { colors, fontSize, fontWeight, spacing, radius } from '@/lib/theme';
import { formatCurrency } from '@/lib/utils';

const pixKeyTypes = [
  { label: 'CPF', value: 'CPF' },
  { label: 'CNPJ', value: 'CNPJ' },
  { label: 'E-mail', value: 'EMAIL' },
  { label: 'Telefone', value: 'PHONE' },
  { label: 'Chave Aleatória', value: 'EVP' },
];

export default function TransferScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pixKeyType, setPixKeyType] = useState('CPF');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleTransfer = () => {
    if (!pixKey.trim() || !amount.trim()) {
      Alert.alert('Atenção', 'Preencha a chave PIX e o valor');
      return;
    }
    const value = parseFloat(amount.replace(',', '.'));
    if (isNaN(value) || value <= 0) {
      Alert.alert('Atenção', 'Valor inválido');
      return;
    }
    setShowConfirm(true);
  };

  const confirmTransfer = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      const value = parseFloat(amount.replace(',', '.'));
      const result = await api.createTransfer({
        pixKey: pixKey.trim(),
        pixKeyType,
        amount: value,
        description: description.trim() || undefined,
      });

      if (result.success) {
        setSuccess(true);
      } else {
        Alert.alert('Erro', result.error || 'Falha na transferência');
      }
    } catch {
      Alert.alert('Erro', 'Erro ao processar transferência');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.successContainer}>
        <Feather name="check-circle" size={64} color={colors.success} />
        <Text style={styles.successTitle}>Transferência Realizada!</Text>
        <Text style={styles.successAmount}>
          {formatCurrency(parseFloat(amount.replace(',', '.')) || 0)}
        </Text>
        <Button
          title="Voltar"
          onPress={() => router.back()}
          variant="outline"
          style={{ marginTop: 24 }}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card>
          <Text style={styles.title}>Transferir via PIX</Text>
          <Text style={styles.subtitle}>
            Envie uma transferência usando chave PIX
          </Text>

          <View style={{ marginTop: spacing.xl }}>
            <Select
              label="Tipo de chave"
              value={pixKeyType}
              options={pixKeyTypes}
              onSelect={setPixKeyType}
            />
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
              label="Descrição (opcional)"
              icon="edit-3"
              placeholder="Ex: Pagamento de serviço"
              value={description}
              onChangeText={setDescription}
            />
            <Button
              title="Transferir"
              onPress={handleTransfer}
              isLoading={loading}
              size="lg"
            />
          </View>
        </Card>
      </ScrollView>

      {showConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Confirmar Transferência</Text>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Chave:</Text>
              <Text style={styles.modalValue}>{pixKey}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Valor:</Text>
              <Text style={styles.modalValue}>
                {formatCurrency(parseFloat(amount.replace(',', '.')) || 0)}
              </Text>
            </View>
            <View style={styles.modalActions}>
              <Button
                title="Cancelar"
                onPress={() => setShowConfirm(false)}
                variant="outline"
                style={{ flex: 1 }}
              />
              <Button
                title="Confirmar"
                onPress={confirmTransfer}
                isLoading={loading}
                style={{ flex: 1 }}
              />
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.background,
  },
  successTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginTop: spacing.xl,
  },
  successAmount: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.extrabold,
    color: colors.success,
    marginTop: spacing.sm,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    padding: spacing.xxl,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
});
