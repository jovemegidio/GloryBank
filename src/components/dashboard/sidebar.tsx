"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ArrowUpDown,
  QrCode,
  FileText,
  Clock,
  Settings,
  LogOut,
  Landmark,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Início" },
  { href: "/dashboard/pix", icon: QrCode, label: "PIX" },
  { href: "/dashboard/transferir", icon: ArrowUpDown, label: "Transferências" },
  { href: "/dashboard/boleto", icon: FileText, label: "Boletos" },
  { href: "/dashboard/extrato", icon: Clock, label: "Extrato" },
  { href: "/dashboard/conta", icon: Settings, label: "Minha Conta" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
      style={{ background: "#0a0d18", borderRight: "1px solid rgba(30,35,56,0.6)" }}
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center justify-between px-4" style={{ borderBottom: "1px solid rgba(30,35,56,0.6)" }}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <Landmark className="h-5 w-5 text-violet-400" />
          </div>
          {!collapsed && (
            <div>
              <span className="text-lg font-bold text-white tracking-tight">Glory</span>
              <span className="text-lg font-bold text-amber-400 tracking-tight">Bank</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-violet-500/10 text-violet-400"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                  }`}
                >
                  <item.icon className={`h-[18px] w-[18px] flex-shrink-0 ${isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Security Badge */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-xl p-3" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">Ambiente Seguro</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">Conexão criptografada de ponta a ponta</p>
        </div>
      )}

      {/* Logout */}
      <div className="px-3 pb-4" style={{ borderTop: "1px solid rgba(30,35,56,0.6)" }}>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-red-400/80 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
          {!collapsed && <span>Encerrar Sessão</span>}
        </button>
      </div>
    </aside>
  );
}
