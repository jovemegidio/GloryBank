export interface User {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  phone: string;
  asaasCustomerId: string | null;
  asaasAccountId: string | null;
  asaasWalletId: string | null;
  asaasApiKey: string | null;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
}

export interface BalanceData {
  balance: number;
  pending: number;
  available: number;
}

export interface TransactionItem {
  id: string;
  type: string;
  status: string;
  amount: number;
  description: string | null;
  date: string;
  recipientName: string | null;
}

export interface DashboardData {
  balance: BalanceData;
  recentTransactions: TransactionItem[];
  user: {
    name: string;
    email: string;
  };
}
