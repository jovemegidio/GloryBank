import * as SecureStore from 'expo-secure-store';
import type { ApiResponse } from '@/types';

const API_BASE_URL = 'https://credbusiness.vercel.app/api';
const TOKEN_KEY = 'credbusiness_token';
const USER_KEY = 'credbusiness_user';

let authToken: string | null = null;

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
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = await loadToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Cookie'] = `session=${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) {
    const match = setCookie.match(/session=([^;]+)/);
    if (match?.[1]) {
      await saveToken(match[1]);
    }
  }

  if (!response.ok && response.status === 401) {
    await clearToken();
    throw new Error('UNAUTHORIZED');
  }

  const data = await response.json();
  return data as ApiResponse<T>;
}

// Auth
export async function login(email: string, password: string) {
  return request<{ user: { id: string; name: string; email: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function register(data: {
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) {
  return request<{ user: { id: string; name: string; email: string } }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function logout() {
  const result = await request('/auth/logout', { method: 'POST' });
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
  }>('/auth/session');
}

// Balance
export async function getBalance() {
  return request<{
    balance: number;
    statistics: { pending: number; overdue: number; confirmed: number };
  }>('/asaas/balance');
}

// Transactions
export async function getTransactions(params?: {
  limit?: number;
  offset?: number;
  startDate?: string;
  finishDate?: string;
}) {
  const query = new URLSearchParams();
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.offset) query.set('offset', String(params.offset));
  if (params?.startDate) query.set('startDate', params.startDate);
  if (params?.finishDate) query.set('finishDate', params.finishDate);
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
  }>(`/asaas/transactions${qs ? `?${qs}` : ''}`);
}

// PIX
export async function sendPix(data: {
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description?: string;
}) {
  return request('/asaas/pix', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getPixKeys() {
  return request<{ data: Array<{ id: string; key: string; type: string }> }>(
    '/asaas/pix?action=keys',
  );
}

export async function createPixKey(type: string) {
  return request(`/asaas/pix?action=create-key&type=${type}`);
}

export async function generatePixQrCode(value: number) {
  return request(`/asaas/pix?action=qrcode&value=${value}`);
}

// Boleto
export async function createBoleto(data: {
  customerName: string;
  customerCpfCnpj: string;
  amount: number;
  dueDate: string;
  description?: string;
}) {
  return request('/asaas/boleto', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Transfer
export async function createTransfer(data: {
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description?: string;
}) {
  return request('/asaas/transfer', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Scheduled
export async function getScheduled() {
  return request<{ data: Array<Record<string, unknown>> }>('/asaas/scheduled');
}

export async function createScheduled(data: {
  pixKey: string;
  pixKeyType: string;
  amount: number;
  scheduledDate: string;
  recurrence?: string;
  description?: string;
}) {
  return request('/asaas/scheduled', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function cancelScheduled(id: string) {
  return request(`/asaas/scheduled?id=${id}`, { method: 'DELETE' });
}

// Cards
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
  }>('/card');
}

export async function requestCard(cardType: 'VIRTUAL' | 'PHYSICAL') {
  return request('/card', {
    method: 'POST',
    body: JSON.stringify({ cardType }),
  });
}

// Notifications
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
  }>('/notifications');
}

export async function markNotificationRead(notificationId?: string) {
  return request('/notifications', {
    method: 'PATCH',
    body: JSON.stringify(notificationId ? { notificationId } : { markAllRead: true }),
  });
}
