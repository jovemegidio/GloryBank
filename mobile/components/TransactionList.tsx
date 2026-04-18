import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, fontSize, fontWeight, spacing } from '@/lib/theme';
import { formatCurrency, formatDateShort, getTransactionIcon, getStatusLabel } from '@/lib/utils';
import Badge from './Badge';
import type { TransactionItem as TxItem } from '@/types';

function getTypeLabel(type: string): string {
  const map: Record<string, string> = {
    PIX_SENT: 'PIX Enviado',
    PIX_RECEIVED: 'PIX Recebido',
    BOLETO_CREATED: 'Boleto Gerado',
    BOLETO_PAID: 'Boleto Pago',
    TRANSFER_SENT: 'Transferência Enviada',
    TRANSFER_RECEIVED: 'Transferência Recebida',
    DEPOSIT: 'Depósito',
    WITHDRAWAL: 'Saque',
  };
  return map[type] || type;
}

function isCredit(type: string): boolean {
  return ['PIX_RECEIVED', 'TRANSFER_RECEIVED', 'DEPOSIT', 'BOLETO_PAID'].includes(type);
}

interface TransactionRowProps {
  item: TxItem;
  onPress?: (item: TxItem) => void;
}

function TransactionRow({ item, onPress }: TransactionRowProps) {
  const icon = getTransactionIcon(item.type);
  const status = getStatusLabel(item.status);
  const credit = isCredit(item.type);

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress?.(item)}
      activeOpacity={0.6}
    >
      <View style={[styles.iconCircle, { backgroundColor: `${icon.color}15` }]}>
        <Feather name={icon.name as never} size={18} color={icon.color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.typeLabel} numberOfLines={1}>
          {getTypeLabel(item.type)}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.recipientName || item.description || '—'}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, { color: credit ? colors.success : colors.text }]}>
          {credit ? '+' : '-'} {formatCurrency(item.amount)}
        </Text>
        <Text style={styles.date}>{formatDateShort(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );
}

interface TransactionListProps {
  transactions: TxItem[];
  onPress?: (item: TxItem) => void;
  showHeader?: boolean;
  onViewAll?: () => void;
}

export default function TransactionList({
  transactions,
  onPress,
  showHeader = true,
  onViewAll,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <View style={styles.empty}>
        <Feather name="inbox" size={40} color={colors.textMuted} />
        <Text style={styles.emptyText}>Nenhuma transação encontrada</Text>
      </View>
    );
  }

  return (
    <View>
      {showHeader && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transações recentes</Text>
          {onViewAll && (
            <TouchableOpacity onPress={onViewAll}>
              <Text style={styles.viewAll}>Ver tudo</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {transactions.map((tx) => (
        <TransactionRow key={tx.id} item={tx} onPress={onPress} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  viewAll: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
    marginRight: spacing.sm,
  },
  typeLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  description: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  date: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
