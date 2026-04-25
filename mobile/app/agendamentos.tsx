import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import * as api from "@/lib/api";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { colors, fontSize, fontWeight, spacing } from "@/lib/theme";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ScheduledItem {
  id: string;
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description?: string;
  scheduledDate: string;
  recurrence?: string;
  status: string;
}

const pixKeyTypes = [
  { label: "CPF", value: "CPF" },
  { label: "CNPJ", value: "CNPJ" },
  { label: "E-mail", value: "EMAIL" },
  { label: "Telefone", value: "PHONE" },
  { label: "Chave Aleatoria", value: "EVP" },
];

const recurrenceOptions = [{ label: "Unica vez", value: "ONCE" }];

export default function AgendamentosScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<ScheduledItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [pixKeyType, setPixKeyType] = useState("CPF");
  const [amount, setAmount] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [recurrence, setRecurrence] = useState("ONCE");
  const [description, setDescription] = useState("");

  const fetchScheduled = async () => {
    try {
      const result = await api.getScheduled();
      if (result.success && result.data) {
        setItems(result.data.data as ScheduledItem[]);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchScheduled();
    }, [])
  );

  const handleCreate = async () => {
    if (!pixKey.trim() || !amount.trim() || !scheduledDate.trim()) {
      Alert.alert("Atencao", "Preencha todos os campos obrigatorios");
      return;
    }

    const value = parseFloat(amount.replace(",", "."));
    if (isNaN(value) || value <= 0) {
      Alert.alert("Atencao", "Valor invalido");
      return;
    }

    setCreating(true);
    try {
      const result = await api.createScheduled({
        pixKey: pixKey.trim(),
        pixKeyType,
        amount: value,
        scheduledDate: scheduledDate.trim(),
        recurrence,
        description: description.trim() || undefined,
      });

      if (result.success) {
        Alert.alert("Sucesso", "Agendamento criado!");
        setShowForm(false);
        setPixKey("");
        setAmount("");
        setScheduledDate("");
        setDescription("");
        setRecurrence("ONCE");
        fetchScheduled();
      } else {
        Alert.alert("Erro", result.error || "Falha ao criar agendamento");
      }
    } catch {
      Alert.alert("Erro", "Erro ao criar agendamento");
    } finally {
      setCreating(false);
    }
  };

  const handleCancel = async (id: string) => {
    Alert.alert("Cancelar", "Deseja cancelar este agendamento?", [
      { text: "Nao", style: "cancel" },
      {
        text: "Sim, cancelar",
        style: "destructive",
        onPress: async () => {
          try {
            await api.cancelScheduled(id);
            fetchScheduled();
          } catch {
            Alert.alert("Erro", "Falha ao cancelar");
          }
        },
      },
    ]);
  };

  const getRecurrenceLabel = (value?: string) => {
    const map: Record<string, string> = {
      WEEKLY: "Semanal",
      MONTHLY: "Mensal",
      ONCE: "Unica",
    };
    return value ? map[value] || "Unica" : "Unica";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchScheduled();
          }}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      <View style={styles.content}>
        <Button
          title={showForm ? "Cancelar" : "Novo Agendamento"}
          onPress={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "primary"}
          icon={<Feather name={showForm ? "x" : "plus"} size={18} color={showForm ? colors.primary : "#fff"} />}
        />

        {showForm && (
          <Card style={styles.formCard}>
            <Select label="Tipo de chave" value={pixKeyType} options={pixKeyTypes} onSelect={setPixKeyType} />
            <Input
              label="Chave PIX"
              icon="key"
              placeholder="Chave do destinatario"
              value={pixKey}
              onChangeText={setPixKey}
              autoCapitalize="none"
            />
            <Input
              label="Valor (R$)"
              icon="dollar-sign"
              placeholder="0,00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            <Input
              label="Data"
              icon="calendar"
              placeholder="AAAA-MM-DD"
              value={scheduledDate}
              onChangeText={setScheduledDate}
            />
            <Select label="Recorrencia" value={recurrence} options={recurrenceOptions} onSelect={setRecurrence} />
            <Input
              label="Descricao (opcional)"
              icon="edit-3"
              placeholder="Ex: aluguel"
              value={description}
              onChangeText={setDescription}
            />
            <Button title="Agendar" onPress={handleCreate} isLoading={creating} size="lg" />
          </Card>
        )}

        {items.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="calendar" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Nenhum agendamento</Text>
          </View>
        ) : (
          items.map((item) => (
            <Card key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemKey} numberOfLines={1}>
                    {item.pixKey}
                  </Text>
                  <Text style={styles.itemType}>{item.pixKeyType}</Text>
                </View>
                <Text style={styles.itemAmount}>{formatCurrency(item.amount)}</Text>
              </View>
              <View style={styles.itemFooter}>
                <View style={styles.itemTags}>
                  <Badge label={formatDate(item.scheduledDate)} variant="info" size="sm" />
                  <Badge label={getRecurrenceLabel(item.recurrence)} variant="default" size="sm" />
                </View>
                {["PENDING", "SCHEDULED"].includes(item.status) && (
                  <TouchableOpacity onPress={() => handleCancel(item.id)}>
                    <Feather name="trash-2" size={18} color={colors.danger} />
                  </TouchableOpacity>
                )}
              </View>
            </Card>
          ))
        )}
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  formCard: {
    marginTop: spacing.sm,
  },
  itemCard: {
    marginBottom: 0,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  itemKey: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.text,
    maxWidth: 200,
  },
  itemType: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  itemAmount: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTags: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
    gap: spacing.lg,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  bottomSpacer: {
    height: 40,
  },
});
