"use client";

import Link from "next/link";
import { QrCode, ArrowUpDown, FileText, Plus } from "lucide-react";

const actions = [
  {
    href: "/dashboard/pix",
    icon: QrCode,
    label: "PIX",
    color: "text-violet-400",
    bg: "rgba(124,58,237,0.1)",
  },
  {
    href: "/dashboard/transferir",
    icon: ArrowUpDown,
    label: "Transferir",
    color: "text-blue-400",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    href: "/dashboard/boleto",
    icon: FileText,
    label: "Boleto",
    color: "text-purple-400",
    bg: "rgba(168,85,247,0.1)",
  },
  {
    href: "/dashboard/pix",
    icon: Plus,
    label: "Cobrar",
    color: "text-amber-400",
    bg: "rgba(245,158,11,0.1)",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="group flex flex-col items-center gap-2.5 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02]"
          style={{ background: "#141828", border: "1px solid rgba(30,35,56,0.8)" }}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.color} transition-transform duration-200 group-hover:scale-110`}
            style={{ background: action.bg }}
          >
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-[12px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
            {action.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
