/**
 * Configuracao centralizada do Asaas BaaS.
 * URLs do selo sao fornecidas pelo Asaas apos aprovacao/homologacao.
 */
export const asaasConfig = {
  legalName: "ASAAS GESTAO FINANCEIRA INSTITUICAO DE PAGAMENTO S.A.",
  tradeName: "Asaas",
  regulatoryDescription: "instituicao de pagamento autorizada a funcionar pelo Banco Central do Brasil",
  cnpj: "19.540.550/0001-21",

  seal: {
    positive: process.env.NEXT_PUBLIC_ASAAS_SEAL_URL_POSITIVE || "",
    monoBlack: process.env.NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_BLACK || "",
    monoWhite: process.env.NEXT_PUBLIC_ASAAS_SEAL_URL_MONO_WHITE || "",
    redirectUrl: process.env.NEXT_PUBLIC_ASAAS_SEAL_REDIRECT_URL || "https://www.asaas.com",
    id: process.env.NEXT_PUBLIC_ASAAS_SEAL_ID || "",
  },

  support: {
    phonePJ: "0800 009 0037",
    whatsapp: "0800 009 0037",
    email: "contato@asaas.com.br",
    privacyUrl: "https://www.asaas.com/politica-privacidade",
    feesUrl: "https://www.asaas.com/precos-e-taxas",
    homeUrl: "https://www.asaas.com",
  },
} as const;

export const asaasInlineText = `Servicos financeiros fornecidos por ${asaasConfig.legalName} - ${asaasConfig.regulatoryDescription}.`;

export function asaasPlaybookClause(tomadoraName: string): string {
  return `Os servicos financeiros e de pagamentos disponibilizados por meio da presente plataforma, incluindo abertura e manutencao de conta de pagamento, processamento de transacoes, emissao de boletos, transferencias, pagamentos e demais movimentacoes de valores, sao prestados pelo ${asaasConfig.legalName}, ${asaasConfig.regulatoryDescription}.\n\nA ${tomadoraName} atua exclusivamente como integradora tecnologica e distribuidora da experiencia do produto, nao sendo instituicao financeira ou de pagamento, nem realizando intermediacao financeira em nome proprio.\n\nO cliente declara ciencia de que o relacionamento financeiro/de pagamentos e a responsabilidade regulatoria pelos servicos acima descritos sao do ${asaasConfig.legalName}, nos termos da regulamentacao vigente.`;
}
