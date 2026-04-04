"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { PageLoading } from "@/components/ui/loading";
import { Toaster } from "react-hot-toast";

interface DashboardClientProps {
  userId: string;
  userName: string;
  userEmail: string;
}

interface BalanceData {
  balance: number;
  statistics: {
    pending: number;
    confirmed: number;
  };
}

interface TransactionData {
  id: string;
  type: string;
  status: string;
  amount: number;
  description: string | null;
  date: string;
  recipientName: string | null;
}

export function DashboardClient({
  userName,
}: DashboardClientProps) {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [balanceRes, txRes] = await Promise.all([
        fetch("/api/asaas/balance"),
        fetch("/api/asaas/transactions?limit=10"),
      ]);

      const balanceData = await balanceRes.json();
      const txData = await txRes.json();

      if (balanceData.success) setBalance(balanceData.data);
      if (txData.success) setTransactions(txData.data.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return <PageLoading />;

  return (
    <>
      <Toaster position="top-right" />
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Bem-vindo, {userName.split(" ")[0]}!
          </h1>
          <p className="text-sm text-slate-500">
            Acompanhe suas finanças e realize transações
          </p>
        </div>

        {/* Balance Card */}
        <BalanceCard
          balance={balance?.balance || 0}
          pending={balance?.statistics?.pending || 0}
          available={balance?.statistics?.confirmed || balance?.balance || 0}
        />

        {/* Quick Actions */}
        <div>
          <h2 className="mb-3 text-[15px] font-semibold text-slate-200">
            Ações Rápidas
          </h2>
          <QuickActions />
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <TransactionList transactions={transactions} />
        </Card>
      </div>
    </>
  );
}
