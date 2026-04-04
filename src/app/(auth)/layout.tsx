import { Landmark, ShieldCheck, Zap, Clock } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "#0c0f1a" }}>
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #07080F 0%, #120E2E 50%, #1A1040 100%)" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
              <Landmark className="h-8 w-8 text-violet-400" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-white tracking-tight">
            Glory<span className="text-amber-400">Bank</span>
          </h1>
          <p className="text-[15px] text-slate-400 leading-relaxed mb-10">
            Sua conta digital completa. Envie e receba PIX, gere boletos e
            gerencie suas finanças com total segurança.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-4" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <Zap className="h-5 w-5 text-violet-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">PIX</p>
              <p className="text-[11px] text-slate-500">Instantâneo</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <Clock className="h-5 w-5 text-violet-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">24/7</p>
              <p className="text-[11px] text-slate-500">Disponível</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <ShieldCheck className="h-5 w-5 text-violet-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-white">Seguro</p>
              <p className="text-[11px] text-slate-500">Criptografia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6" style={{ background: "#0e1220" }}>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
