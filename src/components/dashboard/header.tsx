"use client";

import { Bell, Search } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface HeaderProps {
  userName: string;
  userEmail: string;
}

export function Header({ userName, userEmail }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between px-8" style={{ background: "rgba(12,15,26,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(30,35,56,0.6)" }}>
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-white">
            Olá, {userName.split(" ")[0]}!
          </h2>
          <p className="text-[11px] text-slate-500">Bem-vindo ao seu Internet Banking</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-xl p-2.5 text-slate-400 transition-all duration-200 hover:bg-white/[0.05] hover:text-slate-200">
          <Search className="h-[18px] w-[18px]" />
        </button>

        <button className="relative rounded-xl p-2.5 text-slate-400 transition-all duration-200 hover:bg-white/[0.05] hover:text-slate-200">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
        </button>

        <div className="ml-2 flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/[0.04]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
            {getInitials(userName)}
          </div>
          <div className="hidden lg:block">
            <p className="text-[13px] font-medium text-slate-200">{userName}</p>
            <p className="text-[11px] text-slate-500">{userEmail}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
