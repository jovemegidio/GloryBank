"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Calendar, Plus, Trash2, Clock } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { PageLoading } from "@/components/ui/loading";
import { AsaasBadge } from "@/components/ui/asaas-badge";
import { formatCurrency } from "@/lib/utils";

interface ScheduledTransfer {
  id: string;
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description: string | null;
  scheduledDate: string;
  recurrence: string | null;
  status: string;
}

interface FormData {
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description: string;
  scheduledDate: string;
  recurrence: string;
}

const pixKeyTypes = [
  { value: "CPF", label: "CPF" },
  { value: "CNPJ", label: "CNPJ" },
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Telefone" },
  { value: "EVP", label: "Chave Aleatoria" },
];

const recurrenceTypes = [{ value: "ONCE", label: "Apenas uma vez" }];

const recurrenceLabels: Record<string, string> = {
  ONCE: "Unica",
  WEEKLY: "Semanal",
  MONTHLY: "Mensal",
};

export default function AgendamentosPage() {
  const [transfers, setTransfers] = useState<ScheduledTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { pixKeyType: "CPF", recurrence: "ONCE" },
  });

  const fetchTransfers = useCallback(async () => {
    try {
      const res = await fetch("/api/asaas/scheduled");
      const result = await res.json();
      if (result.success) {
        setTransfers(result.data?.data || []);
      }
    } catch (error) {
      console.error("Scheduled transfers fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/asaas/scheduled", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          amount: Number(data.amount),
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Agendamento criado com sucesso!");
        setShowForm(false);
        reset({ pixKeyType: "CPF", recurrence: "ONCE" });
        fetchTransfers();
      } else {
        toast.error(result.error || "Erro ao criar agendamento");
      }
    } catch {
      toast.error("Erro de conexao");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelTransfer = async (id: string) => {
    try {
      const res = await fetch(`/api/asaas/scheduled?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Agendamento cancelado");
        fetchTransfers();
      } else {
        toast.error(result.error || "Erro ao cancelar");
      }
    } catch {
      toast.error("Erro ao cancelar");
    }
  };

  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(dateStr));

  if (loading) return <PageLoading />;

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="rounded-xl p-2 text-slate-500 hover:bg-black/[0.04]">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Agendamentos</h1>
              <p className="text-sm text-slate-500">Transferencias PIX programadas no Asaas</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo agendamento
          </Button>
        </div>

        <Card noPadding>
          <CardHeader className="px-4 pt-5 pb-0 sm:px-6">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Transferencias agendadas
            </CardTitle>
          </CardHeader>

          {transfers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-3 rounded-full p-4" style={{ background: "rgba(0,0,0,0.03)" }}>
                <Calendar className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-[13px] font-medium text-slate-500">Nenhum agendamento</p>
              <p className="mt-1 text-[11px] text-slate-400">Crie um agendamento para transferencias futuras</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              {transfers.map((transfer) => {
                const canCancel = ["PENDING", "SCHEDULED"].includes(transfer.status);

                return (
                  <div
                    key={transfer.id}
                    className="flex items-center gap-3 px-4 py-4 sm:px-6 hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
                      <Clock className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-slate-700 truncate">
                        {transfer.description || transfer.pixKey}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {transfer.pixKeyType}: {transfer.pixKey}
                      </p>
                    </div>

                    <div className="hidden sm:block text-right shrink-0">
                      <p className="text-[11px] text-slate-400">{formatDate(transfer.scheduledDate)}</p>
                      <Badge variant={canCancel ? "info" : "success"} size="sm">
                        {recurrenceLabels[transfer.recurrence || "ONCE"] || "Unica"}
                      </Badge>
                    </div>

                    <div className="text-right shrink-0 ml-2 flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-slate-700 tabular-nums">
                        {formatCurrency(transfer.amount)}
                      </p>
                      {canCancel && (
                        <button
                          onClick={() => cancelTransfer(transfer.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Cancelar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Novo Agendamento">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select label="Tipo da chave" options={pixKeyTypes} error={errors.pixKeyType?.message} {...register("pixKeyType")} />
            <Input
              label="Chave PIX"
              placeholder="Digite a chave PIX"
              error={errors.pixKey?.message}
              {...register("pixKey", { required: "Chave PIX e obrigatoria" })}
            />
            <Input
              label="Valor (R$)"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0,00"
              error={errors.amount?.message}
              {...register("amount", {
                required: "Valor e obrigatorio",
                valueAsNumber: true,
              })}
            />
            <Input
              label="Data do agendamento"
              type="date"
              error={errors.scheduledDate?.message}
              icon={<Calendar className="h-4 w-4" />}
              {...register("scheduledDate", {
                required: "Data e obrigatoria",
              })}
            />
            <Select label="Recorrencia" options={recurrenceTypes} error={errors.recurrence?.message} {...register("recurrence")} />
            <Input label="Descricao (opcional)" placeholder="Ex: aluguel" {...register("description")} />
            <div className="flex gap-3 pt-2">
              <Button variant="outline" type="button" onClick={() => setShowForm(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSubmitting} className="flex-1">
                Agendar
              </Button>
            </div>
          </form>
        </Modal>

        {/* Asaas attribution — obrigatório em agendamentos financeiros */}
        <AsaasBadge variant="footer" className="mt-2" />
      </div>
    </>
  );
}
