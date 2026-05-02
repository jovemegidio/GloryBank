import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/lib/auth';
import * as api from '@/lib/api';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import AsaasNotice from '@/components/AsaasNotice';
import { colors, fontSize, fontWeight, spacing, radius } from '@/lib/theme';
import { formatCPF, formatPhone, formatDate } from '@/lib/utils';

type FeesData = {
  verifiedAt: string;
  disclaimer: string;
  incoming: {
    pix: {
      standardFormatted: string;
      promotionalFormatted: string;
    };
    boleto: {
      standardFormatted: string;
      promotionalFormatted: string;
    };
  };
  outgoing: {
    pixTransferPf: {
      standardFormatted: string;
    };
    pixTransferPj: {
      monthlyFreeTransactions: number;
      afterFreeFormatted: string;
    };
    ted: {
      standardFormatted: string;
    };
  };
};

export default function ContaScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fees, setFees] = useState<FeesData | null>(null);

  const loadFees = useCallback(async () => {
    try {
      const result = await api.getAsaasFees();
      if (result.success && result.data) {
        setFees(result.data);
      }
    } catch {
      setFees(null);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFees();
    setRefreshing(false);
  }, [loadFees]);

  useFocusEffect(
    useCallback(() => {
      loadFees();
    }, [loadFees])
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.primary}
        />
      }
    >
      {/* Profile Card */}
      <Card style={styles.profileCard}>
        <View style={styles.avatarLarge}>
          <Feather name="user" size={32} color="#ffffff" />
        </View>
        <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
        {user?.isVerified && (
          <Badge label="Conta Verificada" variant="success" />
        )}
        <AsaasNotice variant="compact" />
      </Card>

      {/* Info Card */}
      <Card>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <View style={styles.infoRow}>
          <Feather name="mail" size={18} color={colors.textSecondary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={styles.infoValue}>{user?.email || '—'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Feather name="file-text" size={18} color={colors.textSecondary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>CPF/CNPJ</Text>
            <Text style={styles.infoValue}>
              {user?.cpfCnpj ? formatCPF(user.cpfCnpj) : '—'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Feather name="phone" size={18} color={colors.textSecondary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>
              {user?.phone ? formatPhone(user.phone) : '—'}
            </Text>
          </View>
        </View>

        {user?.createdAt && (
          <View style={styles.infoRow}>
            <Feather name="calendar" size={18} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Membro desde</Text>
              <Text style={styles.infoValue}>{formatDate(user.createdAt)}</Text>
            </View>
          </View>
        )}
      </Card>

      {/* Security */}
      <Card style={styles.securityCard}>
        <Text style={styles.sectionTitle}>Segurança</Text>
        <View style={styles.securityItem}>
          <View style={styles.securityLeft}>
            <View style={[styles.securityIcon, { backgroundColor: colors.successSoft }]}>
              <Feather name="shield" size={18} color={colors.success} />
            </View>
            <View>
              <Text style={styles.securityLabel}>Status da Conta</Text>
              <Text style={styles.securityValue}>
                {user?.accountActive !== false ? 'Ativa' : 'Inativa'}
              </Text>
            </View>
          </View>
          <Badge
            label={user?.accountActive !== false ? 'Ativa' : 'Inativa'}
            variant={user?.accountActive !== false ? 'success' : 'danger'}
          />
        </View>
      </Card>

      {/* PIX Keys */}
      <Card>
        <Text style={styles.sectionTitle}>Chaves PIX</Text>
        <Button
          title="Criar Chave Aleatória (EVP)"
          onPress={async () => {
            setLoading(true);
            try {
              const result = await api.createPixKey('EVP');
              if (result.success) {
                Alert.alert('Sucesso', 'Chave PIX criada com sucesso!');
              } else {
                Alert.alert('Erro', 'Falha ao criar chave');
              }
            } catch {
              Alert.alert('Erro', 'Erro ao criar chave');
            } finally {
              setLoading(false);
            }
          }}
          variant="outline"
          isLoading={loading}
          icon={<Feather name="plus" size={18} color={colors.primary} />}
        />
        <AsaasNotice variant="transaction" style={{ marginTop: spacing.lg }} />
      </Card>

      <Card style={styles.feesCard}>
        <Text style={styles.sectionTitle}>Taxas Asaas</Text>

        {fees ? (
          <View style={styles.feesContent}>
            <View style={styles.feesBlock}>
              <Text style={styles.feesBlockTitle}>Recebimentos</Text>

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>PIX recebido</Text>
                <View style={styles.feeValueWrapper}>
                  <Text style={styles.feeValue}>{fees.incoming.pix.standardFormatted}</Text>
                  <Text style={styles.feePromo}>
                    Promo {fees.incoming.pix.promotionalFormatted}
                  </Text>
                </View>
              </View>

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Boleto recebido</Text>
                <View style={styles.feeValueWrapper}>
                  <Text style={styles.feeValue}>{fees.incoming.boleto.standardFormatted}</Text>
                  <Text style={styles.feePromo}>
                    Promo {fees.incoming.boleto.promotionalFormatted}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.feesBlock}>
              <Text style={styles.feesBlockTitle}>Saídas da conta</Text>

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>PIX PF</Text>
                <Text style={styles.feeValue}>{fees.outgoing.pixTransferPf.standardFormatted}</Text>
              </View>

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>PIX PJ</Text>
                <View style={styles.feeValueWrapper}>
                  <Text style={styles.feeValue}>
                    {fees.outgoing.pixTransferPj.monthlyFreeTransactions} grátis/mês
                  </Text>
                  <Text style={styles.feeSecondary}>
                    Depois {fees.outgoing.pixTransferPj.afterFreeFormatted}
                  </Text>
                </View>
              </View>

              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>TED</Text>
                <Text style={styles.feeValue}>{fees.outgoing.ted.standardFormatted}</Text>
              </View>
            </View>

            <Text style={styles.feesDisclaimer}>
              Referência pública verificada em {fees.verifiedAt}. {fees.disclaimer}
            </Text>
          </View>
        ) : (
          <View style={styles.feesFallback}>
            <Text style={styles.feesFallbackText}>
              Não foi possível carregar as taxas agora.
            </Text>
          </View>
        )}
      </Card>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  userEmail: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
    gap: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  securityCard: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  securityIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  securityValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  feesCard: {
    marginTop: spacing.lg,
  },
  feesContent: {
    gap: spacing.md,
  },
  feesBlock: {
    borderRadius: radius.lg,
    backgroundColor: colors.cardHover,
    padding: spacing.md,
    gap: spacing.sm,
  },
  feesBlockTitle: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  feeLabel: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  feeValueWrapper: {
    alignItems: 'flex-end',
    maxWidth: '52%',
  },
  feeValue: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  feePromo: {
    fontSize: fontSize.xs,
    color: colors.success,
    marginTop: 2,
  },
  feeSecondary: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'right',
  },
  feesDisclaimer: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    lineHeight: 18,
  },
  feesFallback: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  feesFallbackText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  bottomSpacer: {
    height: 40,
  },
});
