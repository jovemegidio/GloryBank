import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, fontSize, fontWeight } from '@/lib/theme';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export default function Badge({
  label,
  variant = 'default',
  size = 'sm',
  style,
}: BadgeProps) {
  const variantColors = {
    success: { bg: colors.successSoft, text: colors.success, border: colors.success },
    warning: { bg: colors.warningSoft, text: colors.warning, border: colors.warning },
    danger: { bg: colors.dangerSoft, text: colors.danger, border: colors.danger },
    info: { bg: colors.infoSoft, text: colors.info, border: colors.info },
    default: { bg: colors.cardHover, text: colors.textSecondary, border: colors.border },
  };

  const c = variantColors[variant];

  return (
    <View
      style={[
        styles.badge,
        size === 'sm' ? styles.sm : styles.md,
        { backgroundColor: c.bg, borderColor: c.border },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'sm' ? styles.textSm : styles.textMd,
          { color: c.text },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    fontWeight: fontWeight.medium,
  },
  textSm: {
    fontSize: fontSize.xs,
  },
  textMd: {
    fontSize: fontSize.sm,
  },
});
