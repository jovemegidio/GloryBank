"use client";

import Image from "next/image";

interface AsaasBadgeProps {
  variant?: "footer" | "inline" | "compact";
  className?: string;
  dark?: boolean;
}

/**
 * Componente obrigatório para conformidade com o modelo BaaS do Asaas.
 * Deve ser exibido em todas as telas que envolvam serviços financeiros:
 * saldo, extrato, PIX, boleto, transferências e cartões.
 */
export function AsaasBadge({ variant = "footer", className = "", dark = false }: AsaasBadgeProps) {
  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-slate-500 ${className}`}
        style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" }}
      >
        Serviços financeiros por{" "}
        <strong className="text-[#00a650]">Asaas</strong>
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-[11px] ${dark ? "text-white/50" : "text-slate-400"} ${className}`}>
        Servi\u00e7os financeiros fornecidos por{" "}
        <a
          href="https://www.asaas.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-semibold hover:underline ${dark ? "text-green-400" : "text-[#00a650]"}`}
        >
          Asaas Pagamentos S.A.
        </a>{" "}
        \u2014 Institui\u00e7\u00e3o de Pagamento autorizada pelo Banco Central do Brasil (BACEN).
      </p>
    );
  }

  // footer (default)
  return (
    <div
      className={`flex items-start gap-3 rounded-xl p-3 ${className}`}
      style={{
        background: "rgba(0,166,80,0.04)",
        border: "1px solid rgba(0,166,80,0.12)",
      }}
    >
      <div
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white"
        style={{ background: "#00a650" }}
        aria-hidden="true"
      >
        A
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-600">
          Serviços Financeiros por Asaas
        </p>
        <p className="mt-0.5 text-[10px] leading-relaxed text-slate-400">
          Os serviços financeiros desta plataforma são prestados pela{" "}
          <a
            href="https://www.asaas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#00a650] hover:underline"
          >
            Asaas Pagamentos S.A.
          </a>
          , Instituição de Pagamento autorizada pelo Banco Central do Brasil.
        </p>
      </div>
    </div>
  );
}
