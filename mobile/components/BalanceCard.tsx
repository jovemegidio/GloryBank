import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { colors, gradients, radius, fontSize, fontWeight, spacing, shadows } from '@/lib/theme';
import { formatCurrency } from '@/lib/utils';

interface BalanceCardProps {
  balance: number;
  pending: number;
  available: number;
  showBalance: boolean;
  onToggleBalance: () => void;
}

export default function BalanceCard({
  balance,
  pending,
  available,
  showBalance,
  onToggleBalance,
}: BalanceCardProps) {
  const masked = '••••••';

  return (
    <LinearGradient
      colors={[...gradients.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.label}>Saldo disponível</Text>
        <TouchableOpacity onPress={onToggleBalance} hitSlop={12}>
          <Feather
            name={showBalance ? 'eye' : 'eye-off'}
            size={20}
            color="rgba(255,255,255,0.8)"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.balance}>
        {showBalance ? formatCurrency(balance) : `R$ ${masked}`}
      </Text>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Feather name="clock" size={14} color="rgba(255,255,255,0.6)" />
          <Text style={styles.footerLabel}>Pendente</Text>
          <Text style={styles.footerValue}>
            {showBalance ? formatCurrency(pending) : masked}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.footerItem}>
          <Feather name="check-circle" size={14} color="rgba(255,255,255,0.6)" />
          <Text style={styles.footerLabel}>Disponível</Text>
          <Text style={styles.footerValue}>
            {showBalance ? formatCurrency(available) : masked}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  balance: {
    color: '#ffffff',
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: radius.md,
    padding: spacing.md,
  },
  footerItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  footerLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  footerValue: {
    color: '#ffffff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
});
