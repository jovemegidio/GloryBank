import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as api from '@/lib/api';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { colors, fontSize, fontWeight, spacing, radius, shadows, gradients } from '@/lib/theme';
import { formatDate } from '@/lib/utils';
import type { CardItem } from '@/types';

export default function CartoesScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [requesting, setRequesting] = useState(false);

  const fetchCards = async () => {
    try {
      const result = await api.getCards();
      if (result.success && result.data) {
        setCards(result.data.data as CardItem[]);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCards();
    }, [])
  );

  const handleRequestCard = async (type: 'VIRTUAL' | 'PHYSICAL') => {
    setRequesting(true);
    try {
      const result = await api.requestCard(type);
      if (result.success) {
        Alert.alert(
          'Sucesso',
          type === 'VIRTUAL'
            ? 'Cartão virtual criado com sucesso!'
            : 'Cartão físico solicitado! Aguarde aprovação.',
        );
        fetchCards();
      } else {
        Alert.alert('Erro', result.error || 'Falha ao solicitar cartão');
      }
    } catch {
      Alert.alert('Erro', 'Erro ao solicitar cartão');
    } finally {
      setRequesting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
      ACTIVE: { label: 'Ativo', variant: 'success' },
      PENDING: { label: 'Pendente', variant: 'warning' },
      BLOCKED: { label: 'Bloqueado', variant: 'danger' },
      CANCELLED: { label: 'Cancelado', variant: 'danger' },
    };
    return map[status] || { label: status, variant: 'warning' as const };
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Cartões</Text>
        <Text style={styles.headerSubtitle}>Gerencie seus cartões</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { setRefreshing(true); fetchCards(); }}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {/* Card List */}
          {cards.map((card) => {
            const status = getStatusBadge(card.status);
            const isVirtual = card.cardType === 'VIRTUAL';
            return (
              <LinearGradient
                key={card.id}
                colors={isVirtual ? [...gradients.card] : [...gradients.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardVisual}
              >
                <View style={styles.cardTop}>
                  <Text style={styles.cardType}>
                    {isVirtual ? 'Cartão Virtual' : 'Cartão Físico'}
                  </Text>
                  <Badge label={status.label} variant={status.variant} size="sm" />
                </View>
                <Text style={styles.cardNumber}>
                  •••• •••• •••• {card.lastFour || '****'}
                </Text>
                <View style={styles.cardBottom}>
                  <View>
                    <Text style={styles.cardLabel}>Nome</Text>
                    <Text style={styles.cardValue}>{card.cardName || 'TITULAR'}</Text>
                  </View>
                  <View>
                    <Text style={styles.cardLabel}>Bandeira</Text>
                    <Text style={styles.cardValue}>{card.brand}</Text>
                  </View>
                </View>
              </LinearGradient>
            );
          })}

          {cards.length === 0 && (
            <View style={styles.emptyState}>
              <Feather name="credit-card" size={48} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Nenhum cartão</Text>
              <Text style={styles.emptyDesc}>
                Solicite seu primeiro cartão CredBusiness
              </Text>
            </View>
          )}

          {/* Request Card */}
          <View style={styles.requestSection}>
            <Text style={styles.sectionTitle}>Solicitar Novo Cartão</Text>
            <View style={styles.requestButtons}>
              <TouchableOpacity
                style={styles.requestCard}
                onPress={() => handleRequestCard('VIRTUAL')}
                disabled={requesting}
              >
                <Feather name="smartphone" size={24} color={colors.primary} />
                <Text style={styles.requestLabel}>Virtual</Text>
                <Text style={styles.requestDesc}>Liberação imediata</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.requestCard}
                onPress={() => handleRequestCard('PHYSICAL')}
                disabled={requesting}
              >
                <Feather name="credit-card" size={24} color={colors.primary} />
                <Text style={styles.requestLabel}>Físico</Text>
                <Text style={styles.requestDesc}>Entrega em até 10 dias</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  cardVisual: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.lg,
    minHeight: 190,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  cardNumber: {
    color: '#ffffff',
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    letterSpacing: 3,
    marginVertical: spacing.lg,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: fontSize.xs,
    marginBottom: 2,
  },
  cardValue: {
    color: '#ffffff',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  emptyDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  requestSection: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  requestButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  requestCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...shadows.sm,
  },
  requestLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  requestDesc: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 24,
  },
});
