import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  CreditCard,
  FileText,
  QrCode,
  Receipt,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AsaasBadge } from "@/components/ui/asaas-badge";

const paymentActions = [
  {
    href: "/dashboard/pix",
    icon: QrCode,
    title: "Pagar com PIX",
    description: "Envie PIX por CPF, CNPJ, e-mail, telefone ou chave aleatória.",
    color: "text-emerald-700",
    bg: "#fff1f2",
  },
  {
    href: "/dashboard/boleto",
    icon: FileText,
    title: "Gerar boleto",
    description: "Crie cobranças por boleto com vencimento e dados do pagador.",
    color: "text-emerald-700",
    bg: "#fff1f2",
  },
  {
    href: "/dashboard/cartao/fatura",
    icon: CreditCard,
    title: "Pagar fatura",
    description: "Consulte cartões ativos e confirme pagamento de fatura.",
    color: "text-slate-700",
    bg: "#f1f5f9",
  },
  {
    href: "/dashboard/agendamentos",
    icon: CalendarClock,
    title: "Agendar pagamento",
    description: "Programe transferências PIX futuras e acompanhe o status.",
    color: "text-emerald-600",
    bg: "rgba(0,166,80,0.08)",
  },
];

export default function PagamentosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="rounded-xl p-2 text-slate-500 hover:bg-black/[0.04]">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pagamentos</h1>
          <p className="text-sm text-slate-500">
            Acesse os fluxos disponíveis para pagar, cobrar e agendar.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-emerald-700" />
            O que você quer fazer?
          </CardTitle>
        </CardHeader>

        <div className="grid gap-3 md:grid-cols-2">
          {paymentActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.color}`}
                  style={{ background: action.bg }}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-slate-800 group-hover:text-emerald-800">
                    {action.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <AsaasBadge variant="transaction" className="mt-4" />
      </Card>

      <AsaasBadge variant="footer" />
    </div>
  );
}
