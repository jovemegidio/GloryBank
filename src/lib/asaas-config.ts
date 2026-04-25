/**
 * Configuração centralizada do Asaas BaaS.
 * URLs do selo serão fornecidas pelo Asaas após aprovação da homologação.
 * Preencha as variáveis de ambiente NEXT_PUBLIC_ASAAS_SEAL_* no .env de produção.
 */
export const asaasConfig = {
  /** Nome legal completo conforme regulação BACEN */
  legalName: "ASAAS GESTÃO FINANCEIRA S.A.",
  /** Nome comercial */
  tradeName: "Asaas",
  /** Descrição regulatória */
  regulatoryDescription: "Instituição de Pagamento autorizada a funcionar pelo Banco Central do Brasil",
  /** CNPJ público */
  cnpj: "19.540.550/0001-21",

  /** URLs do selo Asaas (fornecidas pelo Asaas após homologação) */
  seal: {
    positive: process.env.NEXT_PUBLIC_ASAAS_SEAL_URL_POSITIVE || "",
    monoBlack: process.env.NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_BLACK || "",
    monoWhite: process.env.NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_WHITE || "",
    redirectUrl: process.env.NEXT_PUBLIC_ASAAS_SEAL_REDIRECT_URL || "https://www.asaas.com",
    id: process.env.NEXT_PUBLIC_ASAAS_SEAL_ID || "",
  },

  /** Canais de suporte ao cliente final */
  support: {
    phonePJ: "0800 009 0037",
    whatsapp: "0800 009 0037",
    email: "contato@asaas.com.br",
    privacyUrl: "https://www.asaas.com/politica-privacidade",
    feesUrl: "https://www.asaas.com/precos-e-taxas",
    homeUrl: "https://www.asaas.com",
  },
} as const;

/** Texto da atribuição curta (inline) */
export const asaasInlineText = `Serviços financeiros fornecidos por ${asaasConfig.legalName} — ${asaasConfig.regulatoryDescription}.`;

/** Cláusula regulatória completa do playbook Asaas (obrigatória em contratos e termos) */
export function asaasPlaybookClause(tomadoraName: string): string {
  return `Os serviços financeiros e de pagamentos disponibilizados por meio da presente plataforma, incluindo abertura e manutenção de conta de pagamento, processamento de transações, emissão de boletos, transferências, pagamentos e demais movimentações de valores, são prestados pelo ${asaasConfig.legalName}, ${asaasConfig.regulatoryDescription}.\n\nA ${tomadoraName} atua exclusivamente como integradora tecnológica e distribuidora da experiência do produto, não sendo instituição financeira ou de pagamento, nem realizando intermediação financeira em nome próprio.\n\nO cliente declara ciência de que o relacionamento financeiro/de pagamentos e a responsabilidade regulatória pelos serviços acima descritos são do ${asaasConfig.legalName}, nos termos da regulamentação vigente.`;
}
