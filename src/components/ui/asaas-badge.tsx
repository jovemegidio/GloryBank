"use client";

import { AsaasSeal } from "@/components/ui/asaas-seal";
import { asaasConfig } from "@/lib/asaas-config";

interface AsaasBadgeProps {
  variant?: "footer" | "inline" | "compact" | "transaction";
  className?: string;
  dark?: boolean;
}

const sealVariant = (dark: boolean) => (dark ? "mono-white" : "positive");

export function AsaasBadge({ variant = "footer", className = "", dark = false }: AsaasBadgeProps) {
  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-semibold ${dark ? "text-white/70" : "text-slate-600"} ${className}`}
        style={{
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,166,80,0.06)",
          border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,166,80,0.14)",
        }}
      >
        <AsaasSeal variant={sealVariant(dark)} width={54} height={18} clickable className="shrink-0" />
        <span className="hidden sm:inline">Servicos financeiros por {asaasConfig.tradeName}</span>
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <div
        className={`flex items-start gap-2 rounded-lg p-2.5 ${className}`}
        style={{
          background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,166,80,0.05)",
          border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,166,80,0.14)",
        }}
      >
        <AsaasSeal variant={sealVariant(dark)} width={66} height={22} clickable className="shrink-0" />
        <p className={`text-[11px] leading-relaxed ${dark ? "text-white/58" : "text-slate-500"}`}>
          Servicos financeiros fornecidos por{" "}
          <a
            href={asaasConfig.support.homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold hover:underline ${dark ? "text-green-300" : "text-[#008D58]"}`}
          >
            {asaasConfig.legalName}
          </a>
          , {asaasConfig.regulatoryDescription}.
        </p>
      </div>
    );
  }

  if (variant === "transaction") {
    return (
      <div
        className={`flex items-start gap-3 rounded-xl p-3 ${className}`}
        style={{
          background: dark ? "rgba(255,255,255,0.07)" : "linear-gradient(135deg, rgba(0,166,80,0.07), rgba(30,99,240,0.04))",
          border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,166,80,0.16)",
        }}
      >
        <AsaasSeal variant={sealVariant(dark)} width={78} height={26} clickable className="shrink-0" />
        <div className="min-w-0">
          <p className={`text-[11px] font-semibold ${dark ? "text-white/82" : "text-slate-700"}`}>
            Operacao financeira processada via Asaas
          </p>
          <p className={`mt-0.5 text-[10px] leading-relaxed ${dark ? "text-white/48" : "text-slate-500"}`}>
            {asaasConfig.legalName}, {asaasConfig.regulatoryDescription}. Confira os dados antes de confirmar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-xl p-3 ${className}`}
      style={{
        background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,166,80,0.04)",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,166,80,0.12)",
      }}
    >
      <AsaasSeal variant={sealVariant(dark)} width={80} height={26} clickable />
      <div className="min-w-0">
        <p className={`text-[11px] font-semibold ${dark ? "text-white/80" : "text-slate-600"}`}>
          Servicos financeiros por {asaasConfig.tradeName}
        </p>
        <p className={`mt-0.5 text-[10px] leading-relaxed ${dark ? "text-white/42" : "text-slate-500"}`}>
          Esta plataforma usa infraestrutura financeira do{" "}
          <a
            href={asaasConfig.support.homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium hover:underline ${dark ? "text-green-300" : "text-[#008D58]"}`}
          >
            {asaasConfig.legalName}
          </a>
          , {asaasConfig.regulatoryDescription}.
        </p>
      </div>
    </div>
  );
}
