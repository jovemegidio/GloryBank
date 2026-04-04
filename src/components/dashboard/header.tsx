"use client";

import { Bell, Menu } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface HeaderProps {
  userName: string;
  userEmail: string;
  onMenuOpen?: () => void;
}

export function Header({ userName, userEmail, onMenuOpen }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 flex h-[64px] shrink-0 items-center gap-3 px-4 sm:px-6 lg:px-8"
      style={{
        background: "rgba(10,12,22,0.92)",
        backdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: "1px solid rgba(30,35,56,0.5)",
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuOpen}
        className="flex lg:hidden -ml-1 rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page context */}
      <div className="flex-1 min-w-0">
        <h2 className="text-[14px] font-semibold text-white truncate">
          Olá, {userName.split(" ")[0]}!
        </h2>
        <p className="hidden sm:block text-[11px] text-slate-500">
          Internet Banking — GloryBank
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <button
          className="relative rounded-xl p-2.5 text-slate-400 transition-all duration-150 hover:bg-white/[0.05] hover:text-slate-200"
          aria-label="Notificações"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400"
            style={{ boxShadow: "0 0 6px rgba(245,158,11,0.7)" }}
            aria-hidden="true"
          />
        </button>

        {/* User avatar */}
        <div className="ml-1 flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-all duration-150 hover:bg-white/[0.04] cursor-default">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
              boxShadow: "0 2px 8px rgba(124,58,237,0.4)",
            }}
          >
            {getInitials(userName)}
          </div>
          <div className="hidden lg:block min-w-0">
            <p className="text-[13px] font-medium text-slate-200 truncate max-w-[140px]">
              {userName}
            </p>
            <p className="text-[11px] text-slate-500 truncate max-w-[140px]">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

