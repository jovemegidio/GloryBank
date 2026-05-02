import React from 'react';
import {
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '@/lib/theme';

interface AsaasNoticeProps {
  variant?: 'inline' | 'transaction' | 'compact';
  style?: StyleProp<ViewStyle>;
}

export default function AsaasNotice({ variant = 'inline', style }: AsaasNoticeProps) {
  const compact = variant === 'compact';
  const transaction = variant === 'transaction';

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => Linking.openURL('https://www.asaas.com')}
      style={[styles.container, transaction && styles.transaction, compact && styles.compact, style]}
    >
      <View style={[styles.seal, compact && styles.compactSeal]}>
        <Text style={[styles.sealText, compact && styles.compactSealText]}>Asaas</Text>
      </View>
      {!compact && (
        <View style={styles.copy}>
          <Text style={styles.title}>
            {transaction ? 'Operacao financeira via Asaas' : 'Servicos financeiros por Asaas'}
          </Text>
          <Text style={styles.description}>
            ASAAS GESTAO FINANCEIRA INSTITUICAO DE PAGAMENTO S.A., autorizada pelo Banco Central do Brasil.
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(0,166,80,0.16)',
    backgroundColor: 'rgba(0,166,80,0.05)',
    padding: spacing.md,
  },
  transaction: {
    backgroundColor: '#F7FBF8',
    borderColor: 'rgba(0,166,80,0.22)',
  },
  compact: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.full,
  },
  seal: {
    minWidth: 62,
    minHeight: 24,
    borderRadius: radius.sm,
    backgroundColor: colors.asaas,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  compactSeal: {
    minWidth: 54,
    minHeight: 20,
  },
  sealText: {
    color: '#ffffff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.black,
  },
  compactSealText: {
    fontSize: fontSize.xs,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textTransform: 'uppercase',
  },
  description: {
    marginTop: 2,
    fontSize: fontSize.xs,
    lineHeight: 17,
    color: colors.textSecondary,
  },
});
