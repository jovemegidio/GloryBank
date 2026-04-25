"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AsaasBadge } from "@/components/ui/asaas-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { asaasConfig } from "@/lib/asaas-config";
import { Download, Share2, CheckCircle } from "lucide-react";

interface Transaction {
  id: string;
  type: string;
  status: string;
  amount: number;
  description: string | null;
  date: string;
  recipientName: string | null;
}

interface ReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeLabels: Record<string, string> = {
  PIX_SENT: "PIX Enviado",
  PIX_RECEIVED: "PIX Recebido",
  BOLETO_CREATED: "Boleto Gerado",
  BOLETO_PAID: "Boleto Pago",
  TRANSFER_SENT: "Transferência Enviada",
  TRANSFER_RECEIVED: "Transferência Recebida",
  DEPOSIT: "Depósito",
  WITHDRAWAL: "Saque",
};

const statusLabels: Record<string, string> = {
  CONFIRMED: "Confirmado",
  PENDING: "Pendente",
  CANCELLED: "Cancelado",
  FAILED: "Falhou",
  REFUNDED: "Estornado",
};

export function ReceiptModal({ transaction, isOpen, onClose }: ReceiptModalProps) {
  if (!transaction) return null;

  const isPositive =
    transaction.type.includes("RECEIVED") ||
    transaction.type === "DEPOSIT" ||
    transaction.type === "BOLETO_PAID";

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=460,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Comprovante — CredBusiness</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 28px; color: #1e293b; }
          .header { text-align: center; padding-bottom: 16px; border-bottom: 2px solid #e30613; margin-bottom: 20px; }
          .header h1 { color: #e30613; font-size: 20px; margin-bottom: 2px; font-weight: 700; }
          .header p { color: #64748b; font-size: 11px; }
          .amount { font-size: 26px; font-weight: 700; text-align: center; padding: 18px 0; color: ${isPositive ? "#22c55e" : "#ef4444"}; }
          .section { background: #f8fafc; border-radius: 8px; padding: 12px; margin-bottom: 14px; }
          .row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid #f1f5f9; }
          .row:last-child { border-bottom: none; }
          .label { color: #64748b; font-size: 12px; }
          .value { font-weight: 600; font-size: 12px; text-align: right; max-width: 60%; }
          .auth-code { font-family: 'Courier New', monospace; letter-spacing: 0.5px; font-size: 11px; color: #94a3b8; }
          .footer { margin-top: 20px; padding-top: 14px; border-top: 1px dashed #cbd5e1; }
          .footer-main { text-align: center; color: #94a3b8; font-size: 10px; margin-bottom: 12px; line-height: 1.6; }
          .asaas-block { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 12px; }
          .asaas-label { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
          .asaas-a { background: #00a650; color: white; font-weight: 900; font-size: 9px; width: 16px; height: 16px; border-radius: 3px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .asaas-name { font-weight: 600; font-size: 11px; color: #15803d; }
          .asaas-desc { font-size: 10px; color: #4b5563; line-height: 1.5; }
          @media print { body { padding: 16px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>CredBusiness</h1>
          <p>Comprovante de Transação</p>
        </div>
        <div class="amount">${isPositive ? "+" : "−"} ${formatCurrency(Math.abs(transaction.amount))}</div>
        <div class="section">
          <div class="row">
            <span class="label">Tipo</span>
            <span class="value">${typeLabels[transaction.type] || transaction.type}</span>
          </div>
          <div class="row">
            <span class="label">Status</span>
            <span class="value">${statusLabels[transaction.status] || transaction.status}</span>
          </div>
          <div class="row">
            <span class="label">Data/Hora</span>
            <span class="value">${formatDate(transaction.date)}</span>
          </div>
          ${transaction.recipientName ? `<div class="row"><span class="label">Destinatário</span><span class="value">${transaction.recipientName}</span></div>` : ""}
          ${transaction.description ? `<div class="row"><span class="label">Descrição</span><span class="value">${transaction.description}</span></div>` : ""}
          <div class="row">
            <span class="label">ID Transação</span>
            <span class="value auth-code">${transaction.id}</span>
          </div>
          <div class="row">
            <span class="label">Cód. Autenticação</span>
            <span class="value auth-code">${transaction.id.toUpperCase().slice(-12)}</span>
          </div>
        </div>
        <div class="footer">
          <div class="footer-main">
            <div>Documento emitido eletronicamente em ${new Date().toLocaleDateString("pt-BR", { dateStyle: "long" })}</div>
            <div>Este comprovante tem validade legal conforme Resolução BCB nº 1/2020</div>
          </div>
          <div class="asaas-block">
            <div class="asaas-label">
              <div class="asaas-a">A</div>
              <span class="asaas-name">Serviços financeiros por ${asaasConfig.legalName}</span>
            </div>
            <p class="asaas-desc">
              ${asaasConfig.regulatoryDescription}.
              Os serviços financeiros desta transação são de responsabilidade do ${asaasConfig.legalName}.
              Suporte: ${asaasConfig.support.phonePJ} | ${asaasConfig.support.email}
            </p>
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleShare = async () => {
    const text = [
      "Comprovante CredBusiness",
      `${typeLabels[transaction.type] || transaction.type}`,
      `Valor: ${isPositive ? "+" : "-"}${formatCurrency(Math.abs(transaction.amount))}`,
      `Status: ${statusLabels[transaction.status] || transaction.status}`,
      `Data: ${formatDate(transaction.date)}`,
      transaction.recipientName ? `Destinatário: ${transaction.recipientName}` : "",
      `ID: ${transaction.id}`,
      `Serviços financeiros: ${asaasConfig.legalName}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (navigator.share) {
      await navigator.share({ title: "Comprovante CredBusiness", text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Comprovante copiado para a área de transferência!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Comprovante">
      <div id="receipt-content" className="space-y-4">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "rgba(34,197,94,0.1)" }}
          >
            <CheckCircle className="h-7 w-7 text-green-500" />
          </div>
        </div>

        {/* Amount */}
        <div className="text-center">
          <p className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : "−"} {formatCurrency(Math.abs(transaction.amount))}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {typeLabels[transaction.type] || transaction.type}
          </p>
        </div>

        {/* Details */}
        <div
          className="space-y-2.5 rounded-xl p-4"
          style={{ background: "rgba(0,0,0,0.03)" }}
        >
          <Row label="Status">
            <span
              className={`text-sm font-medium ${
                transaction.status === "CONFIRMED"
                  ? "text-green-600"
                  : transaction.status === "PENDING"
                  ? "text-amber-600"
                  : "text-red-600"
              }`}
            >
              {statusLabels[transaction.status] || transaction.status}
            </span>
          </Row>

          <Row label="Data/Hora">
            <span className="text-sm font-medium text-slate-700">
              {formatDate(transaction.date)}
            </span>
          </Row>

          {transaction.recipientName && (
            <Row label="Destinatário">
              <span className="text-sm font-medium text-slate-700">
                {transaction.recipientName}
              </span>
            </Row>
          )}

          {transaction.description && (
            <Row label="Descrição">
              <span className="text-sm font-medium text-slate-700">
                {transaction.description}
              </span>
            </Row>
          )}

          <Row label="ID Transação">
            <span className="text-xs font-mono text-slate-500">{transaction.id}</span>
          </Row>

          <Row label="Cód. Auth.">
            <span className="text-xs font-mono text-slate-500">
              {transaction.id.toUpperCase().slice(-12)}
            </span>
          </Row>
        </div>

        {/* Asaas attribution — obrigatório em comprovantes */}
        <AsaasBadge variant="footer" />

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handlePrint} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
          <Button variant="outline" onClick={handleShare} className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-slate-500 shrink-0">{label}</span>
      {children}
    </div>
  );
}
