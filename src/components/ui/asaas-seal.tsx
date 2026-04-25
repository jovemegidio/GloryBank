"use client";

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
  const configuredImageUrl = urls[variant];
  const imageUrl = configuredImageUrl || "/asaas-logo.svg";
  const isFallbackLogo = !configuredImageUrl;
  const isDark = variant === "mono-white";

  const sealContent = (
    <span
      className="inline-flex items-center justify-center rounded-md"
      style={{
        width,
        minHeight: height,
        padding: isFallbackLogo ? "6px 10px" : 0,
        background: isFallbackLogo
          ? "#00a650"
          : "transparent",
        border: isFallbackLogo
          ? isDark
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid rgba(0,166,80,0.2)"
          : "none",
        boxShadow: isFallbackLogo && !isDark ? "0 4px 14px rgba(0,166,80,0.16)" : undefined,
      }}
      aria-label={ariaLabel}
      role="img"
    >
      <img
        src={imageUrl}
        alt={ariaLabel}
        width={width}
        height={height}
        style={{
          display: "block",
          width: isFallbackLogo ? Math.max(58, width - 18) : width,
          height: "auto",
          maxHeight: isFallbackLogo ? Math.max(12, height - 10) : height,
          objectFit: "contain",
        }}
      />
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
