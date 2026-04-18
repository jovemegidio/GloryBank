export interface User {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: string;
  accountActive?: boolean;
  isVerified?: boolean;
  createdAt?: string;
}

export interface BalanceData {
  balance: number;
  pending: number;
  available: number;
}

export interface TransactionItem {
  id: string;
  type: 'PIX_SENT' | 'PIX_RECEIVED' | 'BOLETO_CREATED' | 'BOLETO_PAID' |
        'TRANSFER_SENT' | 'TRANSFER_RECEIVED' | 'DEPOSIT' | 'WITHDRAWAL';
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'FAILED' | 'REFUNDED';
  amount: number;
  description?: string;
  date: string;
  recipientName?: string;
}

export interface DashboardData {
  balance: BalanceData;
  recentTransactions: TransactionItem[];
  user: { name: string; email: string };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ScheduledTransferItem {
  id: string;
  pixKey: string;
  pixKeyType: PixKeyType;
  amount: number;
  description?: string;
  scheduledDate: string;
  recurrence?: 'once' | 'weekly' | 'monthly';
  status: string;
}

export interface CardItem {
  id: string;
  cardType: 'VIRTUAL' | 'PHYSICAL';
  status: 'ACTIVE' | 'PENDING' | 'BLOCKED' | 'CANCELLED';
  lastFour?: string;
  brand: string;
  cardName?: string;
  requestedAt: string;
  approvedAt?: string;
}

export type PixKeyType = 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'EVP';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}
