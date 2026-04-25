"use client";

import { AsaasSeal } from "@/components/ui/asaas-seal";
import { asaasConfig } from "@/lib/asaas-config";

interface AsaasBadgeProps {
  variant?: "footer" | "inline" | "compact";
  className?: string;
  dark?: boolean;
}

/**
 * Componente de atribuição Asaas para conformidade com o playbook BaaS.
 * Obrigatório em todas as telas que envolvam serviços financeiros.
 *
 * Para o selo de imagem oficial, use <AsaasSeal /> em paralelo ou no lugar deste.
 */
export function AsaasBadge({ variant = "footer", className = "", dark = false }: AsaasBadgeProps) {
  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${dark ? "text-white/60" : "text-slate-500"} ${className}`}
        style={{
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
          border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        Serviços financeiros por{" "}
        <strong className={dark ? "text-green-400" : "text-[#00a650]"}>
          {asaasConfig.tradeName}
        </strong>
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <p className={`text-[11px] ${dark ? "text-white/50" : "text-slate-400"} ${className}`}>
        Serviços financeiros fornecidos por{" "}
        <a
          href={asaasConfig.support.homeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-semibold hover:underline ${dark ? "text-green-400" : "text-[#00a650]"}`}
        >
          {asaasConfig.legalName}
        </a>{" "}
        — {asaasConfig.regulatoryDescription} (BACEN).
      </p>
    );
  }

  // footer (default)
  return (
    <div
      className={`flex items-start gap-3 rounded-xl p-3 ${className}`}
      style={{
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,166,80,0.04)",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,166,80,0.12)",
      }}
    >
      <AsaasSeal variant={dark ? "mono-white" : "positive"} width={80} height={26} clickable />
      <div className="min-w-0">
        <p className={`text-[11px] font-semibold ${dark ? "text-white/80" : "text-slate-600"}`}>
          Serviços Financeiros por {asaasConfig.tradeName}
        </p>
        <p className={`mt-0.5 text-[10px] leading-relaxed ${dark ? "text-white/40" : "text-slate-400"}`}>
          Os serviços financeiros desta plataforma são prestados pela{" "}
          <a
            href={asaasConfig.support.homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium hover:underline ${dark ? "text-green-400" : "text-[#00a650]"}`}
          >
            {asaasConfig.legalName}
          </a>
          , {asaasConfig.regulatoryDescription}.
        </p>
      </div>
    </div>
  );
}
