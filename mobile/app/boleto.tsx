import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as api from '@/lib/api';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import AsaasNotice from '@/components/AsaasNotice';
import { colors, fontSize, fontWeight, spacing, radius } from '@/lib/theme';
import { formatCurrency } from '@/lib/utils';

export default function BoletoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerCpfCnpj, setCustomerCpfCnpj] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<{
    bankSlipUrl?: string;
    barCode?: string;
    value?: number;
  } | null>(null);

  const handleGenerate = async () => {
    if (!customerName.trim() || !customerCpfCnpj.trim() || !amount.trim() || !dueDate.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    const value = parseFloat(amount.replace(',', '.'));
    if (isNaN(value) || value < 5) {
      Alert.alert('Atenção', 'Valor mínimo de R$ 5,00');
      return;
    }

    setLoading(true);
    try {
      const res = await api.createBoleto({
        customerName: customerName.trim(),
        customerCpfCnpj: customerCpfCnpj.replace(/\D/g, ''),
        amount: value,
        dueDate: dueDate.trim(),
        description: description.trim() || undefined,
      });

      if (res.success && res.data) {
        setResult(res.data as { bankSlipUrl?: string; barCode?: string; value?: number });
      } else {
        Alert.alert('Erro', res.error || 'Falha ao gerar boleto');
      }
    } catch {
      Alert.alert('Erro', 'Erro ao gerar boleto');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <View style={styles.successContainer}>
        <Feather name="file-text" size={64} color={colors.info} />
        <Text style={styles.successTitle}>Boleto Gerado!</Text>
        <Text style={styles.successAmount}>
          {formatCurrency(result.value || 0)}
        </Text>

        {result.barCode && (
          <View style={styles.barcodeBox}>
            <Text style={styles.barcodeLabel}>Código de barras</Text>
            <Text style={styles.barcodeValue} selectable>
              {result.barCode}
            </Text>
          </View>
        )}

        <AsaasNotice variant="transaction" style={{ width: '100%', marginBottom: spacing.xl }} />

        <View style={styles.successActions}>
          {result.bankSlipUrl && (
            <Button
              title="Ver Boleto"
              onPress={() => Linking.openURL(result.bankSlipUrl!)}
              icon={<Feather name="external-link" size={18} color="#fff" />}
            />
          )}
          <Button
            title="Gerar Novo"
            onPress={() => {
              setResult(null);
              setCustomerName('');
              setCustomerCpfCnpj('');
              setAmount('');
              setDueDate('');
              setDescription('');
            }}
            variant="outline"
          />
        </View>
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
          <Text style={styles.title}>Gerar Boleto</Text>
          <Text style={styles.subtitle}>
            Crie um boleto bancário para cobrança
          </Text>

          <View style={{ marginTop: spacing.xl }}>
            <Input
              label="Nome do pagador"
              icon="user"
              placeholder="Nome completo"
              value={customerName}
              onChangeText={setCustomerName}
              autoCapitalize="words"
            />
            <Input
              label="CPF/CNPJ do pagador"
              icon="file-text"
              placeholder="000.000.000-00"
              value={customerCpfCnpj}
              onChangeText={setCustomerCpfCnpj}
              keyboardType="numeric"
            />
            <Input
              label="Valor (R$)"
              icon="dollar-sign"
              placeholder="0,00 (mín. R$ 5,00)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            <Input
              label="Data de vencimento"
              icon="calendar"
              placeholder="AAAA-MM-DD"
              value={dueDate}
              onChangeText={setDueDate}
            />
            <Input
              label="Descrição (opcional)"
              icon="edit-3"
              placeholder="Ex: Mensalidade"
              value={description}
              onChangeText={setDescription}
            />
            <Button
              title="Gerar Boleto"
              onPress={handleGenerate}
              isLoading={loading}
              size="lg"
              icon={<Feather name="file-plus" size={18} color="#fff" />}
            />
            <AsaasNotice variant="transaction" style={{ marginTop: spacing.lg }} />
          </View>
        </Card>
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
    color: colors.info,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  barcodeBox: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    width: '100%',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  barcodeLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  barcodeValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  successActions: {
    gap: spacing.md,
    width: '100%',
  },
});
