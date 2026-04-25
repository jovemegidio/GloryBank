"use client";

import Image from "next/image";
import { asaasConfig } from "@/lib/asaas-config";

export interface AsaasSealProps {
  /**
   * variant:
   * - "positive"    → selo colorido (para fundos claros) — usa NEXT_PUBLIC_ASAAS_SEAL_URL_POSITIVE
   * - "mono-black"  → monocromático preto (fundos claros) — usa NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_BLACK
   * - "mono-white"  → monocromático branco (fundos escuros) — usa NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_WHITE
   */
  variant?: "positive" | "mono-black" | "mono-white";
  /** Largura do selo em px (padrão: 120) */
  width?: number;
  /** Altura do selo em px (padrão: 40) */
  height?: number;
  /** Se true, o selo é um link clicável que abre o site do Asaas */
  clickable?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Componente oficial do Selo Asaas.
 *
 * Exibe o selo de imagem quando a variável de ambiente correspondente estiver configurada.
 * Enquanto as URLs não forem recebidas do Asaas, exibe um placeholder textual conforme as
 * mesmas regras visuais (cores, proporções, acessibilidade).
 *
 * Configure via .env:
 *   NEXT_PUBLIC_ASAAS_SEAL_URL_POSITIVE=
 *   NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_BLACK=
 *   NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_WHITE=
 *   NEXT_PUBLIC_ASAAS_SEAL_REDIRECT_URL=https://www.asaas.com
 *   NEXT_PUBLIC_ASAAS_SEAL_ID=
 */
export function AsaasSeal({
  variant = "positive",
  width = 120,
  height = 40,
  clickable = true,
  className = "",
  ariaLabel = "Serviços financeiros Asaas",
}: AsaasSealProps) {
  const urls: Record<string, string> = {
    positive: asaasConfig.seal.positive,
    "mono-black": asaasConfig.seal.monoBlack,
    "mono-white": asaasConfig.seal.monoWhite,
  };
  const imageUrl = urls[variant];
  const isDark = variant === "mono-white";

  const sealContent = imageUrl ? (
    <Image
      src={imageUrl}
      alt={ariaLabel}
      width={width}
      height={height}
      style={{ width, height, objectFit: "contain" }}
      priority={false}
    />
  ) : (
    /* Placeholder textual — substituir pelas imagens oficiais do Asaas após homologação */
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1"
      style={{
        background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,166,80,0.08)",
        border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,166,80,0.2)",
      }}
      aria-label={ariaLabel}
      role="img"
    >
      <span
        className="flex items-center justify-center rounded text-[9px] font-black text-white"
        style={{
          background: "#00a650",
          width: 16,
          height: 16,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        A
      </span>
      <span
        className="text-[10px] font-semibold leading-none"
        style={{ color: isDark ? "rgba(255,255,255,0.75)" : "#00a650" }}
      >
        Serviços financeiros{" "}
        <strong style={{ color: isDark ? "white" : "#007a3d" }}>Asaas</strong>
      </span>
    </span>
  );

  if (clickable) {
    return (
      <a
        href={asaasConfig.seal.redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex ${className}`}
        aria-label={`${ariaLabel} — abre em nova aba`}
        title="Serviços financeiros prestados por ASAAS GESTÃO FINANCEIRA S.A."
      >
        {sealContent}
      </a>
    );
  }

  return (
    <span className={`inline-flex ${className}`}>
      {sealContent}
    </span>
  );
}
