"use client";

import {
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  ArrowUpDown,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: string;
  status: string;
  amount: number;
  description: string | null;
  date: string;
  recipientName: string | null;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const typeConfig: Record<
  string,
  { icon: typeof ArrowUpRight; label: string; color: string; bg: string }
> = {
  PIX_SENT: { icon: ArrowUpRight, label: "PIX Enviado", color: "text-red-400", bg: "rgba(239,68,68,0.1)" },
  PIX_RECEIVED: { icon: ArrowDownLeft, label: "PIX Recebido", color: "text-green-400", bg: "rgba(34,197,94,0.1)" },
  BOLETO_CREATED: { icon: FileText, label: "Boleto Gerado", color: "text-blue-400", bg: "rgba(59,130,246,0.1)" },
  BOLETO_PAID: { icon: FileText, label: "Boleto Pago", color: "text-green-400", bg: "rgba(34,197,94,0.1)" },
  TRANSFER_SENT: { icon: ArrowUpDown, label: "Transferência Enviada", color: "text-red-400", bg: "rgba(239,68,68,0.1)" },
  TRANSFER_RECEIVED: { icon: ArrowUpDown, label: "Transferência Recebida", color: "text-green-400", bg: "rgba(34,197,94,0.1)" },
  DEPOSIT: { icon: ArrowDownLeft, label: "Depósito", color: "text-green-400", bg: "rgba(34,197,94,0.1)" },
  WITHDRAWAL: { icon: ArrowUpRight, label: "Saque", color: "text-red-400", bg: "rgba(239,68,68,0.1)" },
};

const statusConfig: Record<string, { variant: "success" | "warning" | "error" | "info"; label: string }> = {
  PENDING: { variant: "warning", label: "Pendente" },
  CONFIRMED: { variant: "success", label: "Confirmado" },
  CANCELLED: { variant: "error", label: "Cancelado" },
  FAILED: { variant: "error", label: "Falhou" },
  REFUNDED: { variant: "info", label: "Estornado" },
};

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 rounded-full p-4" style={{ background: "rgba(30,35,56,0.5)" }}>
          <FileText className="h-6 w-6 text-slate-500" />
        </div>
        <p className="text-sm text-slate-500">Nenhuma transação encontrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {transactions.map((tx) => {
        const config = typeConfig[tx.type] || typeConfig.DEPOSIT;
        const status = statusConfig[tx.status] || statusConfig.PENDING;
        const Icon = config.icon;
        const isPositive = tx.type.includes("RECEIVED") || tx.type === "DEPOSIT" || tx.type === "BOLETO_PAID";

        return (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${config.color}`}
                style={{ background: config.bg }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-slate-200">
                  {config.label}
                </p>
                <p className="text-[11px] text-slate-500">
                  {tx.recipientName || tx.description || formatDate(tx.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-[13px] font-semibold ${
                  isPositive ? "text-green-400" : "text-red-400"
                }`}
              >
                {isPositive ? "+" : "-"} {formatCurrency(Math.abs(tx.amount))}
              </p>
              <Badge variant={status.variant} size="sm">
                {status.label}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
