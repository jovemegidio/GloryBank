const DEFAULT_ASAAS_API_URL = "https://api-sandbox.asaas.com/v3";
const ASAAS_API_URL = normalizeAsaasApiUrl(process.env.ASAAS_API_URL);
const ASAAS_API_KEY = process.env.ASAAS_API_KEY ?? "";

interface AsaasRequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: Record<string, unknown>;
  query?: Record<string, string | number | boolean | undefined>;
  apiKey?: string;
  allowNoContent?: boolean;
}

type AsaasStatisticsPayload = Record<string, unknown>;

const ASAAS_WEBHOOK_EVENTS = [
  "PAYMENT_CREATED",
  "PAYMENT_AWAITING_RISK_ANALYSIS",
  "PAYMENT_APPROVED_BY_RISK_ANALYSIS",
  "PAYMENT_REPROVED_BY_RISK_ANALYSIS",
  "PAYMENT_AUTHORIZED",
  "PAYMENT_UPDATED",
  "PAYMENT_CONFIRMED",
  "PAYMENT_RECEIVED",
  "PAYMENT_OVERDUE",
  "PAYMENT_DELETED",
  "PAYMENT_RESTORED",
  "PAYMENT_REFUND_IN_PROGRESS",
  "PAYMENT_REFUNDED",
  "TRANSFER_CREATED",
  "TRANSFER_PENDING",
  "TRANSFER_IN_BANK_PROCESSING",
  "TRANSFER_BLOCKED",
  "TRANSFER_DONE",
  "TRANSFER_FAILED",
  "TRANSFER_CANCELLED",
];

function normalizeAsaasApiUrl(url?: string): string {
  const raw = (url ?? DEFAULT_ASAAS_API_URL).trim();
  if (!raw) return DEFAULT_ASAAS_API_URL;

  let normalized = raw.replace(/\/+$/, "");

  if (normalized.endsWith("/api/v3")) {
    normalized = `${normalized.slice(0, -7)}/v3`;
  }

  if (!normalized.endsWith("/v3")) {
    normalized = `${normalized}/v3`;
  }

  return normalized
    .replace("https://sandbox.asaas.com/v3", DEFAULT_ASAAS_API_URL)
    .replace("https://sandbox.asaas.com/api/v3", DEFAULT_ASAAS_API_URL)
    .replace("https://api.asaas.com/api/v3", "https://api.asaas.com/v3");
}

export function isSandboxAsaasApiUrl(url = ASAAS_API_URL): boolean {
  return normalizeAsaasApiUrl(url).includes("api-sandbox.asaas.com");
}

function buildAsaasUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined>
): string {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${ASAAS_API_URL}${pathname}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function extractStatisticsValue(payload: AsaasStatisticsPayload): number {
  const candidateKeys = ["value", "totalValue", "sum", "netValue", "amount", "total"];

  for (const key of candidateKeys) {
    if (key in payload) {
      return toNumber(payload[key]);
    }
  }

  return 0;
}

function extractAsaasErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("errors" in error && Array.isArray(error.errors)) {
      const descriptions = error.errors
        .map((entry) =>
          entry && typeof entry === "object" && "description" in entry
            ? String(entry.description)
            : null
        )
        .filter(Boolean);

      if (descriptions.length > 0) {
        return descriptions.join("; ");
      }
    }

    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return "Erro desconhecido ao comunicar com o Asaas";
}

async function asaasRequest<T>({
  method,
  path,
  body,
  query,
  apiKey,
  allowNoContent,
}: AsaasRequestOptions): Promise<T> {
  const key = apiKey || ASAAS_API_KEY;

  if (!key) {
    throw new Error("Asaas API key not configured");
  }

  const response = await fetch(buildAsaasUrl(path, query), {
    method,
    headers: {
      "Content-Type": "application/json",
      access_token: key,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(async () => ({
      message: await response.text().catch(() => ""),
    }));

    throw new Error(`Asaas API error ${response.status}: ${extractAsaasErrorMessage(error)}`);
  }

  if (allowNoContent || response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }

  return response.json();
}

export interface CreateSubAccountData {
  name: string;
  email: string;
  cpfCnpj: string;
  phone?: string;
  mobilePhone: string;
  incomeValue: number;
  birthDate?: string;
  address: string;
  addressNumber: string;
  province: string;
  postalCode: string;
  companyType?: string;
}

export interface SubAccountResponse {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  apiKey: string;
  walletId: string;
  accountNumber?: {
    agency: string;
    account: string;
    accountDigit: string;
  };
}

export async function createSubAccount(
  data: CreateSubAccountData
): Promise<SubAccountResponse> {
  return asaasRequest<SubAccountResponse>({
    method: "POST",
    path: "/accounts",
    body: data as unknown as Record<string, unknown>,
  });
}

export async function approveSandboxAccount(apiKey: string): Promise<void> {
  await asaasRequest<void>({
    method: "POST",
    path: "/sandbox/myAccount/approve",
    apiKey,
    allowNoContent: true,
  });
}

export interface AsaasWebhookResponse {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  interrupted: boolean;
  authToken?: string;
  events?: string[];
}

export function buildAsaasWebhookUrl(): string | null {
  const explicitUrl = process.env.ASAAS_WEBHOOK_URL?.trim();
  if (explicitUrl) return explicitUrl;

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_BASE_URL ||
    process.env.PUBLIC_APP_URL ||
    ""
  ).trim();

  if (!appUrl) return null;

  try {
    return new URL("/api/asaas/webhook", appUrl).toString();
  } catch {
    return null;
  }
}

export function shouldConfigureAsaasWebhook(): boolean {
  return process.env.ASAAS_AUTO_WEBHOOKS !== "false";
}

export async function configureAsaasWebhook(apiKey: string): Promise<AsaasWebhookResponse | null> {
  if (!shouldConfigureAsaasWebhook()) return null;

  const webhookUrl = buildAsaasWebhookUrl();
  const authToken = process.env.ASAAS_WEBHOOK_TOKEN?.trim();

  if (!webhookUrl || !authToken) return null;

  return asaasRequest<AsaasWebhookResponse>({
    method: "POST",
    path: "/webhooks",
    apiKey,
    body: {
      name: "CredBusiness - Eventos financeiros",
      url: webhookUrl,
      email: process.env.ASAAS_WEBHOOK_EMAIL || "contato@credbusinessbank.com.br",
      enabled: true,
      interrupted: false,
      apiVersion: 3,
      authToken,
      sendType: "SEQUENTIALLY",
      events: ASAAS_WEBHOOK_EVENTS,
    },
  });
}

export interface BalanceResponse {
  balance: number;
  statistics: {
    pending: number;
    overdue: number;
    confirmed: number;
  };
}

export async function getBalance(apiKey: string): Promise<BalanceResponse> {
  const [balance, pendingStatistics, receivedStatistics, overdueStatistics] = await Promise.all([
    asaasRequest<{ balance: number }>({
      method: "GET",
      path: "/finance/balance",
      apiKey,
    }),
    asaasRequest<AsaasStatisticsPayload>({
      method: "GET",
      path: "/finance/payment/statistics",
      query: { status: "PENDING" },
      apiKey,
    }).catch(() => ({})),
    asaasRequest<AsaasStatisticsPayload>({
      method: "GET",
      path: "/finance/payment/statistics",
      query: { status: "RECEIVED" },
      apiKey,
    }).catch(() => ({})),
    asaasRequest<AsaasStatisticsPayload>({
      method: "GET",
      path: "/finance/payment/statistics",
      query: { status: "OVERDUE" },
      apiKey,
    }).catch(() => ({})),
  ]);

  return {
    balance: toNumber(balance.balance),
    statistics: {
      pending: extractStatisticsValue(pendingStatistics),
      confirmed: extractStatisticsValue(receivedStatistics),
      overdue: extractStatisticsValue(overdueStatistics),
    },
  };
}

export interface PixTransferData {
  value: number;
  pixAddressKey: string;
  pixAddressKeyType: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "EVP";
  description?: string;
}

export interface PixTransferResponse {
  id: string;
  value: number;
  status: string;
  pixTransaction?: {
    endToEndIdentifier: string;
  };
}

export async function createPixTransfer(
  data: PixTransferData,
  apiKey: string
): Promise<PixTransferResponse> {
  return asaasRequest<PixTransferResponse>({
    method: "POST",
    path: "/pix/transactions",
    body: data as unknown as Record<string, unknown>,
    apiKey,
  });
}

export interface PixQrCodeData {
  addressKey: string;
  description?: string;
  value?: number;
  format?: "ALL" | "IMAGE" | "PAYLOAD";
  expirationDate?: string;
  expirationSeconds?: number;
  allowsMultiplePayments?: boolean;
}

export interface PixQrCodeResponse {
  id: string;
  encodedImage: string;
  payload: string;
  allowsMultiplePayments: boolean;
  expirationDate: string;
}

export async function createPixQrCode(
  data: PixQrCodeData,
  apiKey: string
): Promise<PixQrCodeResponse> {
  return asaasRequest<PixQrCodeResponse>({
    method: "POST",
    path: "/pix/qrCodes/static",
    body: data as unknown as Record<string, unknown>,
    apiKey,
  });
}

export interface PixKeyResponse {
  id: string;
  key: string;
  type?: string;
  keyType?: string;
  status: string;
}

export async function getPixKeys(apiKey: string): Promise<{ data: PixKeyResponse[] }> {
  return asaasRequest<{ data: PixKeyResponse[] }>({
    method: "GET",
    path: "/pix/addressKeys",
    apiKey,
  });
}

export async function createPixKey(
  type: "EVP",
  apiKey: string
): Promise<PixKeyResponse> {
  return asaasRequest<PixKeyResponse>({
    method: "POST",
    path: "/pix/addressKeys",
    body: { type },
    apiKey,
  });
}

export interface CreatePaymentData {
  customer: string;
  billingType: "BOLETO" | "PIX" | "CREDIT_CARD";
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
}

export interface PaymentResponse {
  id: string;
  customer: string;
  value: number;
  status: string;
  billingType: string;
  bankSlipUrl?: string;
  invoiceUrl?: string;
  nossoNumero?: string;
  barCode?: string;
}

export async function createPayment(
  data: CreatePaymentData,
  apiKey: string
): Promise<PaymentResponse> {
  return asaasRequest<PaymentResponse>({
    method: "POST",
    path: "/payments",
    body: data as unknown as Record<string, unknown>,
    apiKey,
  });
}

export interface TransferData {
  value: number;
  bankAccount?: {
    bank: { code: string };
    accountName: string;
    ownerName: string;
    ownerBirthDate: string;
    cpfCnpj: string;
    agency: string;
    account: string;
    accountDigit: string;
    bankAccountType: "CONTA_CORRENTE" | "CONTA_POUPANCA";
  };
  operationType: "PIX" | "TED" | "INTERNAL";
  pixAddressKey?: string;
  pixAddressKeyType?: string;
  description?: string;
  scheduleDate?: string;
  externalReference?: string;
  recurring?: Record<string, unknown>;
}

export interface TransferResponse {
  id: string;
  value: number;
  status: string;
  transferFee: number;
  operationType: string;
}

export async function createTransfer(
  data: TransferData,
  apiKey: string
): Promise<TransferResponse> {
  return asaasRequest<TransferResponse>({
    method: "POST",
    path: "/transfers",
    body: data as unknown as Record<string, unknown>,
    apiKey,
  });
}

export async function cancelTransfer(
  transferId: string,
  apiKey: string
): Promise<void> {
  await asaasRequest<void>({
    method: "DELETE",
    path: `/transfers/${transferId}/cancel`,
    apiKey,
    allowNoContent: true,
  });
}

export interface FinancialTransaction {
  id: string;
  value: number;
  balance: number;
  type: string;
  date: string;
  description: string;
  transactionType: string;
}

export interface TransactionsResponse {
  data: FinancialTransaction[];
  hasMore: boolean;
  totalCount: number;
}

export async function getTransactions(
  apiKey: string,
  params?: {
    offset?: number;
    limit?: number;
    startDate?: string;
    finishDate?: string;
  }
): Promise<TransactionsResponse> {
  return asaasRequest<TransactionsResponse>({
    method: "GET",
    path: "/financialTransactions",
    query: {
      offset: params?.offset,
      limit: params?.limit,
      startDate: params?.startDate,
      finishDate: params?.finishDate,
    },
    apiKey,
  });
}

export interface CustomerData {
  name: string;
  cpfCnpj: string;
  email?: string;
  phone?: string;
}

export interface CustomerResponse {
  id: string;
  name: string;
  cpfCnpj: string;
  email?: string;
}

export async function createCustomer(
  data: CustomerData,
  apiKey: string
): Promise<CustomerResponse> {
  return asaasRequest<CustomerResponse>({
    method: "POST",
    path: "/customers",
    body: data as unknown as Record<string, unknown>,
    apiKey,
  });
}

export async function getCustomers(
  apiKey: string,
  cpfCnpj?: string
): Promise<{ data: CustomerResponse[] }> {
  return asaasRequest<{ data: CustomerResponse[] }>({
    method: "GET",
    path: "/customers",
    query: { cpfCnpj },
    apiKey,
  });
}

export function normalizePixKey(
  pixKey: string,
  pixKeyType: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "EVP"
): string {
  const trimmed = pixKey.trim();

  if (pixKeyType === "EMAIL") {
    return trimmed.toLowerCase();
  }

  if (pixKeyType === "EVP") {
    return trimmed;
  }

  return trimmed.replace(/\D/g, "");
}
