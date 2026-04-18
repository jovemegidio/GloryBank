import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, fontSize, fontWeight, spacing } from '@/lib/theme';

interface PickerOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: PickerOption[];
  onSelect: (value: string) => void;
  error?: string;
  placeholder?: string;
  style?: ViewStyle;
}

export default function Select({
  label,
  value,
  options,
  onSelect,
  error,
  placeholder = 'Selecionar',
  style,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.trigger, error && styles.errorBorder]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text style={[styles.triggerText, !selectedOption && styles.placeholder]}>
          {selectedOption?.label || placeholder}
        </Text>
        <Feather
          name={open ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.textMuted}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                option.value === value && styles.optionSelected,
              ]}
              onPress={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  option.value === value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
              {option.value === value && (
                <Feather name="check" size={16} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    zIndex: 10,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
  },
  errorBorder: {
    borderColor: colors.danger,
  },
  triggerText: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  placeholder: {
    color: colors.textMuted,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
    zIndex: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  optionSelected: {
    backgroundColor: `${colors.primary}08`,
  },
  optionText: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: fontWeight.semibold,
  },
  error: {
    fontSize: fontSize.xs,
    color: colors.danger,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
