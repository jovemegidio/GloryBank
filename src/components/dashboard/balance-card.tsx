"use client";

import { Eye, EyeOff, ArrowDownLeft, ArrowUpRight, Landmark } from "lucide-react";
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
        background: "linear-gradient(135deg, #0D0720 0%, #130F30 50%, #1B1248 100%)",
        border: "1px solid rgba(124,58,237,0.25)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Background glows */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-20 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 translate-y-10 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative p-5 sm:p-6">
        {/* Header row: bank label + eye toggle */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
                boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
              }}
            >
              <Landmark className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-400/80">
                GloryBank
              </p>
              <p className="text-[10px] text-slate-600">Conta Corrente Digital</p>
            </div>
          </div>

          <button
            onClick={() => setVisible(!visible)}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300"
            aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>

        {/* Main balance */}
        <div className="mb-6">
          <p className="mb-1 text-[11px] font-medium text-slate-500">Saldo disponível</p>
          <p className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-white">
            {visible ? formatCurrency(balance) : (
              <span className="tracking-[0.2em] text-slate-400">•••••••</span>
            )}
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-5 h-px"
          style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.2), transparent)" }}
          aria-hidden="true"
        />

        {/* Sub-fields */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "rgba(34,197,94,0.1)" }}
            >
              <ArrowDownLeft className="h-3.5 w-3.5 text-green-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-600">Disponível para uso</p>
              <p className="text-[13px] font-semibold text-slate-200">
                {visible ? formatCurrency(available) : <span className="tracking-[0.15em] text-slate-500">•••••</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "rgba(245,158,11,0.1)" }}
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-600">Aguardando confirmação</p>
              <p className="text-[13px] font-semibold text-slate-200">
                {visible ? formatCurrency(pending) : <span className="tracking-[0.15em] text-slate-500">•••••</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

