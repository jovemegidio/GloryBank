"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Calendar, Filter } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLoading } from "@/components/ui/loading";
import { Toaster } from "react-hot-toast";

interface TransactionData {
  id: string;
  type: string;
  status: string;
  amount: number;
  description: string | null;
  date: string;
  recipientName: string | null;
}

export default function ExtratoPage() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchTransactions = useCallback(
    async (reset = false) => {
      try {
        const currentOffset = reset ? 0 : offset;
        const params = new URLSearchParams({
          limit: "20",
          offset: String(currentOffset),
        });
        if (startDate) params.set("startDate", startDate);
        if (finishDate) params.set("finishDate", finishDate);

        const res = await fetch(`/api/asaas/transactions?${params}`);
        const result = await res.json();

        if (result.success) {
          if (reset) {
            setTransactions(result.data.data || []);
          } else {
            setTransactions((prev) => [
              ...prev,
              ...(result.data.data || []),
            ]);
          }
          setHasMore(result.data.hasMore || false);
          setOffset(currentOffset + 20);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    },
    [offset, startDate, finishDate]
  );

  useEffect(() => {
    fetchTransactions(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = () => {
    setLoading(true);
    setOffset(0);
    fetchTransactions(true);
  };

  if (loading && transactions.length === 0) return <PageLoading />;

  return (
    <>
      <Toaster position="top-right" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-xl p-2 text-slate-500 hover:bg-black/[0.04]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Extrato
              </h1>
              <p className="text-sm text-slate-500">
                Histórico completo de transações
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Input
                label="Data início"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                icon={<Calendar className="h-4 w-4" />}
              />
              <Input
                label="Data fim"
                type="date"
                value={finishDate}
                onChange={(e) => setFinishDate(e.target.value)}
                icon={<Calendar className="h-4 w-4" />}
              />
              <Button onClick={applyFilters} className="sm:mb-0">
                Aplicar
              </Button>
            </div>
          </Card>
        )}

        {/* Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transações</CardTitle>
            <span className="text-sm text-slate-500">
              {transactions.length} transações
            </span>
          </CardHeader>
          <TransactionList transactions={transactions} />

          {hasMore && (
            <div className="mt-4 flex justify-center">
              <Button
                variant="ghost"
                onClick={() => fetchTransactions(false)}
                isLoading={loading}
              >
                Carregar mais
              </Button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
