import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/lib/auth';
import { colors, fontSize, fontWeight, spacing, radius } from '@/lib/theme';
import { getInitials } from '@/lib/utils';

interface MenuItem {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  route?: string;
  color?: string;
  onPress?: () => void;
}

export default function MaisScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'Conta',
      items: [
        { label: 'Minha Conta', icon: 'user', route: '/conta' },
        { label: 'Notificações', icon: 'bell', route: '/notificacoes' },
        { label: 'Agendamentos', icon: 'calendar', route: '/agendamentos' },
      ],
    },
    {
      title: 'Pagamentos',
      items: [
        { label: 'Transferir', icon: 'send', route: '/transferir' },
        { label: 'Gerar Boleto', icon: 'file-text', route: '/boleto' },
        { label: 'Cobrar via PIX', icon: 'dollar-sign', route: '/cobrar' },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          label: 'WhatsApp (0800 009 0037)',
          icon: 'message-circle',
          onPress: () => Linking.openURL('https://wa.me/5508000090037').catch(() =>
            Alert.alert('Erro', 'Não foi possível abrir o WhatsApp')),
        },
        {
          label: 'Ligar para suporte',
          icon: 'phone',
          onPress: () => Linking.openURL('tel:08000090037'),
        },
        {
          label: 'Enviar e-mail',
          icon: 'mail',
          onPress: () => Linking.openURL('mailto:contato@asaas.com.br'),
        },
      ],
    },
    {
      title: 'Configurações',
      items: [
        {
          label: 'Sair da Conta',
          icon: 'log-out',
          color: colors.danger,
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(user?.name || 'U')}
          </Text>
        </View>
        <View>
          <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {menuSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    index < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={() => {
                    if (item.onPress) {
                      item.onPress();
                    } else if (item.route) {
                      router.push(item.route as never);
                    }
                  }}
                  activeOpacity={0.6}
                >
                  <View style={[styles.menuIcon, item.color ? { backgroundColor: `${item.color}10` } : null]}>
                    <Feather
                      name={item.icon}
                      size={20}
                      color={item.color || colors.primary}
                    />
                  </View>
                  <Text style={[styles.menuLabel, item.color ? { color: item.color } : null]}>
                    {item.label}
                  </Text>
                  <Feather name="chevron-right" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.version}>CredBusiness v1.0.0</Text>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    gap: spacing.lg,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  userName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  userEmail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: `${colors.primary}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  version: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
  bottomSpacer: {
    height: 24,
  },
});
