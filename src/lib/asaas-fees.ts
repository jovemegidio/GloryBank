const ASAAS_PRICING_SOURCE_URL = "https://www.asaas.com/precos-e-taxas";
const ASAAS_PRICING_VERIFIED_AT = "2026-04-22";

function parseCurrencyEnv(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) return fallback;

  const normalized = Number(value.replace(",", "."));
  return Number.isFinite(normalized) ? normalized : fallback;
}

function parseIntegerEnv(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) return fallback;

  const normalized = Number.parseInt(value, 10);
  return Number.isFinite(normalized) ? normalized : fallback;
}

function formatCurrency(value: number): string {
  if (value === 0) return "Grátis";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getAsaasFeesConfig() {
  const pixIncoming = parseCurrencyEnv("ASAAS_FEE_PIX_INCOMING", 1.99);
  const pixIncomingPromo = parseCurrencyEnv("ASAAS_FEE_PIX_INCOMING_PROMO", 0.99);
  const boletoIncoming = parseCurrencyEnv("ASAAS_FEE_BOLETO_INCOMING", 1.99);
  const boletoIncomingPromo = parseCurrencyEnv("ASAAS_FEE_BOLETO_INCOMING_PROMO", 0.99);
  const tedOutgoing = parseCurrencyEnv("ASAAS_FEE_TED_OUTGOING", 5);
  const pixOutgoingPjAfterFree = parseCurrencyEnv("ASAAS_FEE_PIX_OUTGOING_PJ_AFTER_FREE", 2);
  const pixOutgoingPjFreeMonthly = parseIntegerEnv("ASAAS_FEE_PIX_OUTGOING_PJ_FREE_MONTHLY", 30);

  return {
    sourceUrl: ASAAS_PRICING_SOURCE_URL,
    verifiedAt: ASAAS_PRICING_VERIFIED_AT,
    disclaimer:
      "Taxas publicas de referencia do Asaas. Em contas BaaS e contratos negociados, os valores efetivos podem variar e devem ser validados no menu Taxas da conta raiz.",
    incoming: {
      pix: {
        standard: pixIncoming,
        promotional: pixIncomingPromo,
        standardFormatted: formatCurrency(pixIncoming),
        promotionalFormatted: formatCurrency(pixIncomingPromo),
        unit: "por transacao recebida",
        promotionalPeriodMonths: 3,
      },
      boleto: {
        standard: boletoIncoming,
        promotional: boletoIncomingPromo,
        standardFormatted: formatCurrency(boletoIncoming),
        promotionalFormatted: formatCurrency(boletoIncomingPromo),
        unit: "por transacao recebida",
        promotionalPeriodMonths: 3,
      },
    },
    outgoing: {
      pixTransferPf: {
        standard: 0,
        standardFormatted: "Grátis",
        rule: "Transferencias e pagamentos Pix gratuitos para pessoa fisica.",
      },
      pixTransferPj: {
        monthlyFreeTransactions: pixOutgoingPjFreeMonthly,
        afterFree: pixOutgoingPjAfterFree,
        afterFreeFormatted: formatCurrency(pixOutgoingPjAfterFree),
        rule: `${pixOutgoingPjFreeMonthly} transferencias gratis por mes e depois ${formatCurrency(
          pixOutgoingPjAfterFree
        )} por transacao.`,
      },
      pixDynamicQrPayment: {
        standard: 0,
        standardFormatted: "Grátis",
        rule: "Pagamentos por QR Code dinamico sao gratuitos.",
      },
      ted: {
        standard: tedOutgoing,
        standardFormatted: formatCurrency(tedOutgoing),
        unit: "por transferencia",
      },
    },
    notes: [
      "As tarifas publicas foram verificadas na pagina oficial de precos do Asaas em 22 de abril de 2026.",
      "Subcontas podem herdar ou usar condicoes comerciais diferentes da conta raiz no modelo BaaS.",
      "Use variaveis de ambiente ASAAS_FEE_* para sobrescrever os valores e refletir seu contrato.",
    ],
  };
}
