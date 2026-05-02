import Image from "next/image";
import { ShieldCheck, Zap, Clock } from "lucide-react";
import { AsaasBadge } from "@/components/ui/asaas-badge";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "#f5f6f8" }}>
      {/* Left side — branding panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #071F1B 0%, #0F3A33 56%, #00A650 130%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "42px 42px" }}
        />

        <div className="relative max-w-sm text-center">
          {/* Logo oficial CredBusiness */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="CredBusiness"
              width={392}
              height={110}
              priority
              className="h-14 w-auto object-contain brightness-0 invert"
            />
          </div>

          <p className="mb-2 text-[13px] font-semibold uppercase tracking-widest text-white/70">
            Internet Banking Digital
          </p>
          <p className="mb-10 text-[15px] leading-relaxed text-white/70">
            Sua conta digital completa. PIX, boletos e transferências com
            segurança de nível bancário.
          </p>

          {/* Stat pills */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: Zap, label: "PIX", sub: "Instantâneo" },
              { Icon: Clock, label: "24/7", sub: "Disponível" },
              { Icon: ShieldCheck, label: "Seguro", sub: "AES-256" },
            ].map(({ Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Icon className="h-5 w-5 text-white mx-auto mb-2" />
                <p className="text-[13px] font-semibold text-white">{label}</p>
                <p className="text-[10px] text-white/50">{sub}</p>
              </div>
            ))}
          </div>

          {/* Asaas BaaS attribution — required by Asaas BaaS agreement */}
          <div className="mt-8">
            <AsaasBadge variant="inline" dark />
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div
        className="flex w-full lg:w-[55%] xl:w-1/2 items-start lg:items-center justify-center p-5 sm:p-8 pt-10 sm:pt-8"
        style={{ background: "#f9fafb" }}
      >
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}

