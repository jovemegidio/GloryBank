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
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { colors, fontSize, fontWeight, spacing } from '@/lib/theme';

export default function CobrarScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleCobrar = () => {
    const value = parseFloat(amount.replace(',', '.'));
    if (isNaN(value) || value <= 0) {
      Alert.alert('Atenção', 'Informe um valor válido');
      return;
    }
    Alert.alert(
      'Cobrança Criada',
      `QR Code PIX de ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} gerado! Compartilhe com o pagador.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

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
          <Text style={styles.title}>Cobrar via PIX</Text>
          <Text style={styles.subtitle}>
            Gere um QR Code para receber pagamentos
          </Text>
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
              label="Descrição (opcional)"
              icon="edit-3"
              placeholder="Ex: Serviço prestado"
              value={description}
              onChangeText={setDescription}
            />
            <Button
              title="Gerar Cobrança"
              onPress={handleCobrar}
              size="lg"
              icon={<Feather name="dollar-sign" size={18} color="#fff" />}
            />
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
});
