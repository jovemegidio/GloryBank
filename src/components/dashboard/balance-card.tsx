"use client";

import { Eye, EyeOff, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface BalanceCardProps {
  balance: number;
  pending: number;
  available: number;
}

export function BalanceCard({ balance, pending, available }: BalanceCardProps) {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="relative overflow-hidden rounded-2xl fade-in-up"
      style={{
        background: "linear-gradient(135deg, #071F1B 0%, #0F3A33 56%, #00A650 140%)",
        border: "none",
        boxShadow: "0 16px 42px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      {/* Subtle institutional texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "34px 34px" }}
        aria-hidden="true"
      />

      <div className="relative p-5 sm:p-6">
        {/* Header row: bank label + eye toggle */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.14)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <img src="/favicon.png" alt="CredBusiness" className="h-6 w-6 object-contain" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase text-white/80">
                CredBusiness
              </p>
              <p className="text-[10px] text-white/50">Conta Corrente Digital</p>
            </div>
          </div>

          <button
            onClick={() => setVisible(!visible)}
            className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>

        {/* Main balance */}
        <div className="mb-6">
          <p className="mb-1 text-[11px] font-medium text-white/60">Saldo disponível</p>
          <p className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-white">
            {visible ? formatCurrency(balance) : (
              <span className="tracking-[0.2em] text-white/40">•••••••</span>
            )}
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-5 h-px"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.15), transparent)" }}
          aria-hidden="true"
        />

        {/* Sub-fields */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <ArrowDownLeft className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/50">Disponível para uso</p>
              <p className="text-[13px] font-semibold text-white">
                {visible ? formatCurrency(available) : <span className="tracking-[0.15em] text-white/40">•••••</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] text-white/50">Aguardando confirmação</p>
              <p className="text-[13px] font-semibold text-white">
                {visible ? formatCurrency(pending) : <span className="tracking-[0.15em] text-white/40">•••••</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Asaas attribution */}
        <div
          className="mt-5 pt-4 flex items-center gap-1.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <span
            className="flex items-center justify-center rounded-md text-[10px] font-black text-white"
            style={{ background: "rgba(183,247,207,0.18)", color: "#B7F7CF", width: 18, height: 18, flexShrink: 0 }}
            aria-hidden="true"
          >
            A
          </span>
          <p className="text-[10px] text-white/45 leading-tight">
            Serviços financeiros por{" "}
            <span className="font-bold text-white/60">Asaas Pagamentos S.A.</span>
            {" "}— Instituição de Pagamento autorizada pelo BACEN
          </p>
        </div>
      </div>
    </div>
  );
}

