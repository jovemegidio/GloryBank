import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#00A650',
  primaryDark: '#008D58',
  primaryLight: '#B7F7CF',

  dark: '#071F1B',
  darkSecondary: '#0F3A33',

  background: '#f5f6f8',
  card: '#ffffff',
  cardBorder: 'rgba(0,0,0,0.06)',
  cardHover: '#eef0f4',

  text: '#0f172a',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#ffffff',

  success: '#22C55E',
  successSoft: 'rgba(34,197,94,0.1)',
  danger: '#EF4444',
  dangerSoft: 'rgba(239,68,68,0.1)',
  warning: '#F59E0B',
  warningSoft: 'rgba(245,158,11,0.1)',
  info: '#3B82F6',
  infoSoft: 'rgba(59,130,246,0.1)',

  gold: '#D97706',
  goldLight: '#F59E0B',

  border: '#e2e8f0',
  separator: 'rgba(0,0,0,0.05)',
  overlay: 'rgba(0,0,0,0.5)',

  tabInactive: '#94A3B8',
} as const;

export const gradients = {
  primary: ['#071F1B', '#0F3A33', '#00A650'] as const,
  sidebar: ['#ffffff', '#f7f8fa'] as const,
  card: ['#071F1B', '#0F3A33', '#00A650'] as const,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 18,
  xxl: 22,
  full: 999,
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 40,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 5,
  },
} as const;

export const screen = { width, height };
