import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, fontSize, fontWeight, spacing, shadows } from '@/lib/theme';

const actions = [
  { label: 'PIX', icon: 'zap' as const, route: '/(tabs)/pix', color: colors.primary },
  { label: 'Transferir', icon: 'send' as const, route: '/transferir', color: '#7C3AED' },
  { label: 'Boleto', icon: 'file-text' as const, route: '/boleto', color: colors.info },
  { label: 'Cobrar', icon: 'dollar-sign' as const, route: '/cobrar', color: colors.success },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.label}
          style={styles.item}
          onPress={() => router.push(action.route as never)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: `${action.color}10` }]}>
            <Feather name={action.icon} size={22} color={action.color} />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
});
