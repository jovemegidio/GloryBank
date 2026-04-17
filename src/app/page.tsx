import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Clock,
  QrCode,
  ArrowUpDown,
  FileText,
  Lock,
  Smartphone,
  ChevronRight,
  CreditCard,
  Building2,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* ─── TOPBAR ─── */}
      <div className="hidden md:block" style={{ background: "#111", color: "rgba(255,255,255,0.82)", fontSize: "12px" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-5">
            <span>Conta digital</span>
            <span>Cartões</span>
            <span>Segurança</span>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 10px", borderRadius: "999px", background: "rgba(0,166,80,0.18)", color: "#5dda9a", fontSize: "11px", fontWeight: 800 }}>
              BaaS por Asaas
            </span>
          </div>
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-[72px]">
          <Link href="/" className="flex items-center gap-3">
            <img src="/favicon.png" alt="CredBusiness" className="h-10 w-10 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-[20px] font-extrabold tracking-tight text-slate-800">
                Cred<span className="text-red-600">Business</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 mt-1">
                Internet Banking
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-slate-600">
            <a href="#funcionalidades" className="hover:text-slate-900 transition-colors">Funcionalidades</a>
            <a href="#seguranca" className="hover:text-slate-900 transition-colors">Segurança</a>
            <a href="#baas" className="hover:text-slate-900 transition-colors">BaaS</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-slate-700 transition-all hover:bg-slate-50"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #cc0511, #e30613)", boxShadow: "0 4px 16px rgba(227,6,19,0.2)" }}
            >
              Abrir conta
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #d90012 0%, #e30613 46%, #ff2b2b 100%)",
          padding: "clamp(60px, 8vw, 100px) 0 clamp(80px, 10vw, 120px)",
        }}
      >
        <div className="pointer-events-none absolute right-[-120px] top-[70px] w-[420px] h-[420px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 64%)" }} />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-8" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "0 8px", minHeight: "20px", borderRadius: "999px", background: "rgba(0,166,80,0.22)", color: "#7eeab4", fontSize: "10px", fontWeight: 900, letterSpacing: "0.08em" }}>
                  BAAS
                </span>
                <span className="text-[12px] font-extrabold uppercase tracking-wider">
                  Infraestrutura financeira por <strong className="text-green-300">Asaas</strong>
                </span>
              </div>

              <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[0.98] tracking-[-0.04em] mb-6 max-w-[600px]">
                O digital com a solidez de um grande banco.
              </h1>

              <p className="text-[18px] leading-[1.72] text-white/80 mb-8 max-w-[520px]">
                Gerencie suas finanças com PIX instantâneo, transferências, boletos e cartão virtual.
                Tudo em uma plataforma segura, completa e disponível 24 horas.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold text-red-600 bg-white transition-all hover:scale-[1.02]"
                  style={{ boxShadow: "0 16px 36px rgba(0,0,0,0.15)" }}
                >
                  Abrir minha conta
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.26)" }}
                >
                  Acessar conta
                </Link>
              </div>

              <p className="text-[13px] font-semibold text-white/60">
                Sem filas, sem burocracia. Abra sua conta em minutos.
              </p>
            </div>

            {/* Demo card */}
            <div className="hidden lg:block">
              <div
                className="rounded-3xl p-8 backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 32px 64px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <img src="/favicon.png" alt="" className="h-10 w-10 object-contain" aria-hidden="true" />
                  <div>
                    <p className="text-[16px] font-bold text-white">CredBusiness Internet Banking</p>
                    <p className="text-[12px] text-white/50">Conta Corrente Digital</p>
                  </div>
                </div>

                <div className="rounded-2xl p-5 mb-5" style={{ background: "rgba(0,0,0,0.15)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2">Saldo disponível</p>
                  <p className="text-[36px] font-bold text-white tracking-tight leading-none">R$ 13.989,21</p>
                  <p className="text-[12px] text-white/50 mt-2">Saldo + limite: R$ 33.989,21</p>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { icon: QrCode, label: "Pix" },
                    { icon: ArrowUpDown, label: "Transferir" },
                    { icon: FileText, label: "Boleto" },
                    { icon: CreditCard, label: "Cartão" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-red-600" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] text-white/70">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Demo credentials */}
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-300 mb-2">🧪 Demonstração</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="text-[12px] text-white/70">
                        <span className="text-white/40">Login: </span>
                        <span className="font-mono text-white">demo@credbusiness.com</span>
                      </p>
                      <p className="text-[12px] text-white/70">
                        <span className="text-white/40">Senha: </span>
                        <span className="font-mono text-white">Demo@123456</span>
                      </p>
                    </div>
                    <Link
                      href="/login"
                      className="shrink-0 rounded-lg px-4 py-2 text-[12px] font-bold text-red-600 bg-white transition-opacity hover:opacity-80"
                    >
                      Entrar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOBILE DEMO BANNER ─── */}
      <div className="lg:hidden px-6 -mt-6 relative z-10 mb-8">
        <div
          className="rounded-2xl p-5"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-2">🧪 Acesso Demonstração</p>
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-[12px] text-slate-500">
                <span className="font-mono text-slate-700">demo@credbusiness.com</span>
                {" · "}
                <span className="font-mono text-slate-700">Demo@123456</span>
              </p>
            </div>
            <Link
              href="/login"
              className="shrink-0 rounded-lg px-4 py-2 text-[12px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #e30613, #ff4d4d)" }}
            >
              Acessar
            </Link>
          </div>
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="py-14 px-6">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "PIX", label: "Instantâneo", icon: Zap },
            { value: "24/7", label: "Disponível", icon: Clock },
            { value: "2FA", label: "Autenticação", icon: ShieldCheck },
            { value: "AES-256", label: "Criptografia", icon: Lock },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-2xl py-7 px-5"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
            >
              <stat.icon className="h-5 w-5 text-red-500 mx-auto mb-3" />
              <p className="text-2xl font-extrabold text-slate-800 mb-1">{stat.value}</p>
              <p className="text-[12px] font-medium text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 px-6" id="funcionalidades" style={{ background: "#f5f6f8" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="inline-block text-[12px] font-extrabold uppercase tracking-[0.1em] text-red-500 mb-3">
              Funcionalidades
            </span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-slate-800 tracking-tight mb-4">
              Tudo que um banco digital precisa ter.
            </h2>
            <p className="text-[17px] text-slate-500 max-w-xl mx-auto leading-relaxed">
              Funcionalidades completas para gerenciar suas finanças pessoais e empresariais, com infraestrutura Asaas BaaS.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: QrCode, title: "PIX Instantâneo", desc: "Envie e receba pagamentos via PIX em segundos. Transferências 24h, todos os dias, com confirmação imediata.", color: "#e30613", bg: "rgba(227,6,19,0.08)" },
              { icon: ArrowUpDown, title: "Transferências TED/PIX", desc: "Realize transferências entre contas de forma rápida e segura. PIX gratuito para pessoas físicas.", color: "#3b82f6", bg: "rgba(59,130,246,0.08)" },
              { icon: FileText, title: "Boletos Bancários", desc: "Gere boletos registrados com código de barras e QR Code. Acompanhe pagamentos em tempo real.", color: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
              { icon: CreditCard, title: "Cartão Virtual", desc: "Emita seu cartão virtual para compras online com total segurança e controle de limite.", color: "#ec4899", bg: "rgba(236,72,153,0.08)" },
              { icon: TrendingUp, title: "Extrato Completo", desc: "Histórico detalhado de todas as movimentações com filtros por período, tipo e valor.", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
              { icon: Smartphone, title: "100% Responsivo", desc: "Acesse sua conta de qualquer dispositivo. Interface adaptada para desktop, tablet e celular.", color: "#06b6d4", bg: "rgba(6,182,212,0.08)" },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-7 transition-all duration-200 hover:translate-y-[-2px]"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                  style={{ background: f.bg, color: f.color }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[16px] font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECURITY ─── */}
      <section className="py-20 px-6" id="seguranca">
        <div className="mx-auto max-w-5xl">
          <div
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #e30613 0%, #cc0511 100%)" }}
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" }} />
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-[clamp(24px,3.5vw,36px)] font-extrabold text-white mb-4 tracking-tight">
                Segurança de Nível Bancário
              </h2>
              <p className="text-[16px] text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
                Infraestrutura Asaas regulada pelo BACEN, com criptografia de ponta a ponta,
                autenticação 2FA (TOTP), audit logs e as melhores práticas OWASP.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[13px]">
                {["Criptografia AES-256", "2FA TOTP (RFC 6238)", "JWT HttpOnly", "Rate Limiting", "OWASP Top 10", "Audit Log"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-full px-4 py-2 text-white/90 font-semibold" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ASAAS BAAS BANNER ─── */}
      <section
        className="py-10"
        id="baas"
        style={{
          background: "linear-gradient(135deg, #05221a 0%, #0a3327 100%)",
          borderTop: "1px solid rgba(0,166,80,0.2)",
          borderBottom: "1px solid rgba(0,166,80,0.2)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-[22px] font-black text-white flex-shrink-0"
                style={{ background: "#00a650", boxShadow: "0 8px 24px rgba(0,166,80,0.35)" }}
              >
                A
              </div>
              <div>
                <p className="text-[18px] font-extrabold text-white tracking-tight mb-1">
                  Operado por Asaas Pagamentos S.A.
                </p>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-lg">
                  Infraestrutura financeira regulada pelo Banco Central do Brasil.
                  PIX, boletos, TED e cartão virtual no modelo Banking as a Service.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Regulado BACEN", "Instituição de Pagamento", "BaaS Certificado", "PIX + Boleto + TED"].map((attr) => (
                    <span key={attr} className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold" style={{ border: "1px solid rgba(0,166,80,0.25)", color: "#5dda9a" }}>
                      ✓ {attr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a
              href="https://www.asaas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold text-white transition-all hover:translate-y-[-1px] shrink-0"
              style={{ background: "#00a650", boxShadow: "0 8px 24px rgba(0,166,80,0.3)" }}
            >
              <Building2 className="h-4 w-4" />
              Conheça a Asaas
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 text-center" style={{ background: "#f5f6f8" }}>
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold text-slate-800 tracking-tight mb-4">
          Pronto para começar?
        </h2>
        <p className="text-[17px] text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
          Abra sua conta em poucos minutos e comece a usar todas as funcionalidades do seu banco digital.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full px-10 py-4 text-[15px] font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #cc0511, #e30613)", boxShadow: "0 12px 36px rgba(227,6,19,0.25)" }}
          >
            Criar minha conta grátis
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-8 py-4 text-[15px] font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            Já tenho conta
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#111", color: "rgba(255,255,255,0.7)" }}>
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div className="flex items-center gap-3">
              <img src="/favicon.png" alt="CredBusiness" className="h-9 w-9 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-extrabold text-white">
                  Cred<span className="text-red-400">Business</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/40 mt-1">
                  Internet Banking
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-[13px]">
              <Link href="/login" className="hover:text-white transition-colors">Acessar conta</Link>
              <Link href="/register" className="hover:text-white transition-colors">Abrir conta</Link>
              <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
              <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/35 leading-relaxed max-w-xl">
              © {new Date().getFullYear()} CredBusiness. Os serviços financeiros são prestados pela{" "}
              <a href="https://www.asaas.com" target="_blank" rel="noopener noreferrer" className="text-white/50 underline">
                Asaas Pagamentos S.A.
              </a>
              , Instituição de Pagamento autorizada pelo Banco Central do Brasil (BACEN), operando no modelo Banking as a Service (BaaS).
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-black text-white" style={{ background: "#00a650" }}>
                A
              </div>
              <span className="text-[11px] font-bold text-white/40">Powered by Asaas</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
