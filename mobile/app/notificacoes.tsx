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
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import * as api from '@/lib/api';
import Button from '@/components/Button';
import { colors, fontSize, fontWeight, spacing, radius } from '@/lib/theme';
import { getRelativeTime } from '@/lib/utils';
import type { NotificationItem } from '@/types';

export default function NotificacoesScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);

  const fetchNotifications = async () => {
    try {
      const result = await api.getNotifications();
      if (result.success && result.data) {
        setNotifications(result.data.data as NotificationItem[]);
        setUnread(result.data.unreadCount ?? 0);
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
      fetchNotifications();
    }, [])
  );

  const markRead = async (id?: string) => {
    try {
      await api.markNotificationRead(id);
      fetchNotifications();
    } catch {
      // silent
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {unread > 0 && (
        <View style={styles.topBar}>
          <Text style={styles.unreadCount}>{unread} não lida{unread > 1 ? 's' : ''}</Text>
          <Button
            title="Marcar todas como lidas"
            onPress={() => markRead()}
            variant="ghost"
            size="sm"
          />
        </View>
      )}

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); fetchNotifications(); }}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {notifications.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="bell-off" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Nenhuma notificação</Text>
          </View>
        ) : (
          notifications.map((notif) => (
            <TouchableOpacity
              key={notif.id}
              style={[styles.notifItem, !notif.isRead && styles.notifUnread]}
              onPress={() => !notif.isRead && markRead(notif.id)}
              activeOpacity={0.6}
            >
              <View style={[styles.notifDot, !notif.isRead && styles.notifDotActive]} />
              <View style={styles.notifContent}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.notifMessage} numberOfLines={2}>{notif.message}</Text>
                <Text style={styles.notifTime}>{getRelativeTime(notif.createdAt)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  unreadCount: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  notifItem: {
    flexDirection: 'row',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
    backgroundColor: '#ffffff',
  },
  notifUnread: {
    backgroundColor: `${colors.primary}04`,
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    marginTop: 6,
    marginRight: spacing.md,
  },
  notifDotActive: {
    backgroundColor: colors.primary,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: 4,
  },
  notifMessage: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  notifTime: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: spacing.lg,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  bottomSpacer: {
    height: 24,
  },
});
