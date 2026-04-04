"use client";

import Link from "next/link";
import { QrCode, ArrowUpDown, FileText, Plus } from "lucide-react";

const actions = [
  {
    href: "/dashboard/pix",
    icon: QrCode,
    label: "PIX",
    sublabel: "Instantâneo",
    color: "text-violet-400",
    bg: "rgba(124,58,237,0.12)",
    borderColor: "rgba(124,58,237,0.15)",
  },
  {
    href: "/dashboard/transferir",
    icon: ArrowUpDown,
    label: "Transferir",
    sublabel: "TED / DOC",
    color: "text-blue-400",
    bg: "rgba(59,130,246,0.1)",
    borderColor: "rgba(59,130,246,0.12)",
  },
  {
    href: "/dashboard/boleto",
    icon: FileText,
    label: "Boleto",
    sublabel: "Gerar cobrança",
    color: "text-purple-400",
    bg: "rgba(168,85,247,0.1)",
    borderColor: "rgba(168,85,247,0.12)",
  },
  {
    href: "/dashboard/pix#cobrar",
    icon: Plus,
    label: "Cobrar",
    sublabel: "QR Code",
    color: "text-amber-400",
    bg: "rgba(245,158,11,0.1)",
    borderColor: "rgba(245,158,11,0.12)",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="group flex flex-col items-center gap-2.5 rounded-2xl p-4 sm:p-4 transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            background: "#111628",
            border: `1px solid ${action.borderColor}`,
          }}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.color} transition-transform duration-150 group-hover:scale-110`}
            style={{ background: action.bg }}
          >
            <action.icon className="h-5 w-5" />
          </div>
          <div className="text-center">
            <p className="text-[13px] font-semibold text-slate-200 group-hover:text-white transition-colors">
              {action.label}
            </p>
            <p className="text-[10px] text-slate-600 mt-0.5">{action.sublabel}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

