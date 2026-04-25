import * as SecureStore from "expo-secure-store";
import type { ApiResponse } from "@/types";

const DEFAULT_API_BASE_URL = "http://187.45.255.152/api";
const TOKEN_KEY = "glorybank_session_token";
const USER_KEY = "glorybank_user";

let authToken: string | null = null;

function normalizeApiBaseUrl(url?: string): string {
  const trimmed = (url ?? DEFAULT_API_BASE_URL).trim().replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(process.env.EXPO_PUBLIC_API_BASE_URL);

export async function loadToken(): Promise<string | null> {
  if (authToken) return authToken;
  authToken = await SecureStore.getItemAsync(TOKEN_KEY);
  return authToken;
}

export async function saveToken(token: string): Promise<void> {
  authToken = token;
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  authToken = null;
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}

export async function saveUserData(user: object): Promise<void> {
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
}

export async function loadUserData(): Promise<object | null> {
  const data = await SecureStore.getItemAsync(USER_KEY);
  return data ? JSON.parse(data) : null;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = await loadToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-GloryBank-Client": "mobile",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const data = contentType.includes("application/json")
    ? ((await response.json()) as ApiResponse<T>)
    : ({ success: response.ok, error: response.ok ? undefined : "Resposta invalida do servidor" } as ApiResponse<T>);

  if (!response.ok && response.status === 401) {
    await clearToken();
    throw new Error("UNAUTHORIZED");
  }

  return data;
}

export async function login(email: string, password: string) {
  return request<{ user: { id: string; name: string; email: string }; sessionToken?: string }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );
}

export async function register(data: {
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
  birthDate?: string;
  companyType?: string;
  incomeValue: number | string;
  address: string;
  addressNumber: string;
  province: string;
  postalCode: string;
  password: string;
  confirmPassword: string;
}) {
  return request<{ user: { id: string; name: string; email: string }; sessionToken?: string }>(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function logout() {
  const result = await request("/auth/logout", { method: "POST" });
  await clearToken();
  return result;
}

export async function getSession() {
  return request<{
    user: {
      id: string;
      name: string;
      email: string;
      cpfCnpj?: string;
      phone?: string;
      accountActive?: boolean;
      isVerified?: boolean;
      createdAt?: string;
    };
  }>("/auth/session");
}

export async function getBalance() {
  return request<{
    balance: number;
    statistics: { pending: number; overdue: number; confirmed: number };
  }>("/asaas/balance");
}

export async function getAsaasFees() {
  return request<{
    sourceUrl: string;
    verifiedAt: string;
    disclaimer: string;
    incoming: {
      pix: {
        standardFormatted: string;
        promotionalFormatted: string;
      };
      boleto: {
        standardFormatted: string;
        promotionalFormatted: string;
      };
    };
    outgoing: {
      pixTransferPf: {
        standardFormatted: string;
      };
      pixTransferPj: {
        monthlyFreeTransactions: number;
        afterFreeFormatted: string;
      };
      ted: {
        standardFormatted: string;
      };
    };
  }>("/asaas/fees");
}

export async function getTransactions(params?: {
  limit?: number;
  offset?: number;
  startDate?: string;
  finishDate?: string;
}) {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  if (params?.startDate) query.set("startDate", params.startDate);
  if (params?.finishDate) query.set("finishDate", params.finishDate);

  const qs = query.toString();
  return request<{
    data: Array<{
      id: string;
      type: string;
      status: string;
      amount: number;
      description?: string;
      date: string;
      recipientName?: string;
    }>;
    total: number;
    hasMore: boolean;
  }>(`/asaas/transactions${qs ? `?${qs}` : ""}`);
}

export async function sendPix(data: {
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description?: string;
}) {
  return request<{ id: string; value: number; status: string }>("/asaas/pix", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getPixKeys() {
  return request<{ data: Array<{ id: string; key: string; type: string; status: string }> }>(
    "/asaas/pix?action=keys"
  );
}

export async function createPixKey(type: "EVP") {
  return request<{ id: string; key: string; type: string; status: string }>(
    `/asaas/pix?action=create-key&type=${type}`
  );
}

export async function generatePixQrCode(value: number, description?: string) {
  const query = new URLSearchParams({ value: String(value) });
  if (description) query.set("description", description);

  return request<{
    id: string;
    encodedImage: string;
    payload: string;
    expirationDate?: string;
  }>(`/asaas/pix?action=qrcode&${query.toString()}`);
}

export async function createBoleto(data: {
  customerName: string;
  customerCpfCnpj: string;
  amount: number;
  dueDate: string;
  description?: string;
}) {
  return request("/asaas/boleto", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createTransfer(data: {
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description?: string;
}) {
  return request("/asaas/transfer", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getScheduled() {
  return request<{ data: Array<Record<string, unknown>> }>("/asaas/scheduled");
}

export async function createScheduled(data: {
  pixKey: string;
  pixKeyType: string;
  amount: number;
  scheduledDate: string;
  recurrence?: string;
  description?: string;
}) {
  return request("/asaas/scheduled", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function cancelScheduled(id: string) {
  return request(`/asaas/scheduled?id=${id}`, { method: "DELETE" });
}

export async function getCards() {
  return request<{
    data: Array<{
      id: string;
      cardType: string;
      status: string;
      lastFour?: string;
      brand: string;
      cardName?: string;
      requestedAt: string;
      approvedAt?: string;
    }>;
  }>("/card");
}

export async function requestCard(cardType: "VIRTUAL" | "PHYSICAL") {
  return request("/card", {
    method: "POST",
    body: JSON.stringify({ cardType }),
  });
}

export async function getNotifications() {
  return request<{
    data: Array<{
      id: string;
      title: string;
      message: string;
      isRead: boolean;
      createdAt: string;
    }>;
    unreadCount: number;
  }>("/notifications");
}

export async function markNotificationRead(notificationId?: string) {
  return request("/notifications", {
    method: "PATCH",
    body: JSON.stringify(notificationId ? { notificationId } : { markAllRead: true }),
  });
}
