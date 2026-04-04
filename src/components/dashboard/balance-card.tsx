"use client";

import { Eye, EyeOff, TrendingUp, TrendingDown, Landmark } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #0D0720 0%, #120E2E 50%, #1A1040 100%)", border: "1px solid rgba(124,58,237,0.2)" }}>
      <div className="absolute right-0 top-0 h-48 w-48 translate-x-12 -translate-y-12 rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
      <div className="absolute -left-8 bottom-0 h-32 w-32 translate-y-8 rounded-full" style={{ background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)" }} />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(124,58,237,0.1)" }}>
            <Landmark className="h-4 w-4 text-violet-400" />
            </div>
            <span className="text-[13px] font-medium text-slate-400">Saldo disponível</span>
          </div>
          <button
            onClick={() => setVisible(!visible)}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300"
          >
            {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>

        <div className="mb-8">
          <p className="text-[32px] font-bold tracking-tight text-white">
            {visible ? formatCurrency(balance) : "R$ ••••••"}
          </p>
        </div>

        <div className="flex gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(124,58,237,0.1)" }}>
              <TrendingUp className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 mb-0.5">Disponível</p>
              <p className="text-sm font-semibold text-slate-200">
                {visible ? formatCurrency(available) : "••••"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(245,158,11,0.1)" }}>
              <TrendingDown className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 mb-0.5">Pendente</p>
              <p className="text-sm font-semibold text-slate-200">
                {visible ? formatCurrency(pending) : "••••"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
