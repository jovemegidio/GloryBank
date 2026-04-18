import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as api from '@/lib/api';
import TransactionList from '@/components/TransactionList';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { colors, fontSize, fontWeight, spacing, radius } from '@/lib/theme';
import type { TransactionItem } from '@/types';

export default function ExtratoScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const limit = 20;

  const fetchTransactions = async (reset = false) => {
    try {
      const newOffset = reset ? 0 : offset;
      const result = await api.getTransactions({
        limit,
        offset: newOffset,
        startDate: startDate || undefined,
        finishDate: endDate || undefined,
      });

      if (result.success && result.data) {
        const data = result.data.data as TransactionItem[];
        if (reset) {
          setTransactions(data);
        } else {
          setTransactions((prev) => [...prev, ...data]);
        }
        setHasMore(result.data.hasMore);
        setOffset(newOffset + limit);
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
      setLoading(true);
      fetchTransactions(true);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchTransactions(true);
  };

  const applyFilters = () => {
    setLoading(true);
    setOffset(0);
    fetchTransactions(true);
    setShowFilters(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Extrato</Text>
          <Text style={styles.headerSubtitle}>Histórico de transações</Text>
        </View>
        <TouchableOpacity
          style={[styles.filterBtn, showFilters && styles.filterBtnActive]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Feather
            name="filter"
            size={18}
            color={showFilters ? colors.primary : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersPanel}>
          <Input
            label="Data início"
            icon="calendar"
            placeholder="AAAA-MM-DD"
            value={startDate}
            onChangeText={setStartDate}
          />
          <Input
            label="Data fim"
            icon="calendar"
            placeholder="AAAA-MM-DD"
            value={endDate}
            onChangeText={setEndDate}
          />
          <Button title="Filtrar" onPress={applyFilters} size="sm" />
        </View>
      )}

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
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          <TransactionList
            transactions={transactions}
            showHeader={false}
          />
          {hasMore && (
            <Button
              title="Carregar mais"
              onPress={() => fetchTransactions()}
              variant="ghost"
              style={{ marginTop: spacing.lg }}
            />
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBtnActive: {
    backgroundColor: `${colors.primary}10`,
  },
  filtersPanel: {
    padding: spacing.xl,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 24,
  },
});
