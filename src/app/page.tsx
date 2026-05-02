import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpDown,
  BadgeCheck,
  Banknote,
  BarChart3,
  BellRing,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Database,
  FileText,
  Layers3,
  Lock,
  PiggyBank,
  PlugZap,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
  Workflow,
  Zap,
} from "lucide-react";
import { getAsaasFeesConfig } from "@/lib/asaas-fees";

const heroBadges = [
  { Icon: ShieldCheck, label: "Regulado pelo BACEN" },
  { Icon: Zap, label: "Pix instantâneo" },
  { Icon: Lock, label: "Criptografia ponta a ponta" },
];

const productModules = [
  {
    icon: QrCode,
    title: "Conta digital PJ",
    desc: "Conta corrente completa, com Pix, TED, boletos e cartões para o dia a dia da empresa.",
  },
  {
    icon: ReceiptText,
    title: "Cobrança automatizada",
    desc: "Régua inteligente de cobrança via Pix, boleto e link de pagamento com confirmação automática.",
  },
  {
    icon: CreditCard,
    title: "Cartões empresariais",
    desc: "Emissão de cartões físicos e virtuais com controle de limites por colaborador e centro de custo.",
  },
  {
    icon: BarChart3,
    title: "Gestão financeira",
    desc: "Dashboards de fluxo de caixa, conciliação bancária e relatórios prontos para a contabilidade.",
  },
  {
    icon: PlugZap,
    title: "API de pagamentos",
    desc: "Integração via REST e webhooks para receber, pagar e conciliar dentro do seu sistema.",
  },
  {
    icon: Users,
    title: "Multiusuários",
    desc: "Permissões granulares por perfil, aprovação em duas etapas e trilhas de auditoria.",
  },
];

const trustItems = [
  { Icon: ShieldCheck, title: "Autenticação forte", desc: "2FA, biometria, sessões seguras e cookies HttpOnly." },
  { Icon: Lock, title: "Dados protegidos", desc: "Criptografia AES-256, rate limit e trilhas de auditoria." },
  { Icon: Layers3, title: "Infraestrutura BaaS", desc: "Operação financeira regulada via Asaas Pagamentos S.A." },
];

const bankingFeatures = [
  "Painel financeiro consolidado com saldo, recebíveis e a vencer",
  "Pix com chave, copia e cola, QR Code estático e dinâmico",
  "Boletos com confirmação automática e conciliação bancária",
  "Transferências TED, agendamentos e pagamentos programados",
  "Comprovantes digitais, extrato detalhado e exportação",
];

const mobileFeatures = [
  { Icon: Smartphone, title: "App nativo", desc: "iOS e Android com login biométrico e notificações em tempo real." },
  { Icon: BellRing, title: "Alertas inteligentes", desc: "Avisos de Pix recebido, boleto pago e saldo em movimento." },
  { Icon: Sparkles, title: "Atalhos rápidos", desc: "Ações de Pix, boleto, transferência e cobrança em um toque." },
];

const integrations = [
  { Icon: Database, label: "ERPs" },
  { Icon: Workflow, label: "Webhooks" },
  { Icon: PlugZap, label: "API REST" },
  { Icon: Building2, label: "Contabilidade" },
  { Icon: PiggyBank, label: "Conciliação" },
  { Icon: CircleDollarSign, label: "Marketplaces" },
];

const stats = [
  { value: "99,9%", label: "Disponibilidade da plataforma" },
  { value: "<1s", label: "Confirmação de Pix" },
  { value: "24/7", label: "Operação financeira" },
  { value: "BACEN", label: "Regulação do provedor" },
];

const faqs = [
  {
    q: "A conta CredBusiness é uma conta PJ?",
    a: "Sim. A jornada é desenhada para empresas, com cadastro PJ, cobranças, pagamentos, extrato, comprovantes e gestão de usuários.",
  },
  {
    q: "Qual a infraestrutura financeira utilizada?",
    a: "Os serviços financeiros são prestados pela Asaas Pagamentos S.A., instituição autorizada pelo Banco Central do Brasil, com identificação nos fluxos regulados.",
  },
  {
    q: "Existe acesso pelo celular?",
    a: "Sim. Há internet banking responsivo (PWA) e aplicativo mobile com biometria, notificações e atalhos das principais operações.",
  },
  {
    q: "Posso integrar com meu sistema?",
    a: "Sim. A plataforma oferece API REST, webhooks e endpoints para conciliação, cobrança automática e emissão de cartões.",
  },
];

export default function Home() {
  const fees = getAsaasFeesConfig();

  return (
    <div className="min-h-screen bg-white text-[#0A1F44]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top utility bar */}
      <div className="hidden border-b border-[#E2E8F5] bg-[#06143A] text-white/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#9DC3FF]" /> Ambiente seguro</span>
            <span>Conta digital PJ</span>
            <span>API e integrações</span>
            <span>Suporte especializado</span>
          </div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-white/70">
            Infraestrutura financeira por Asaas Pagamentos S.A.
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#E2E8F5] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="CredBusiness">
            <Image src="/brand-mark.svg" alt="" width={42} height={42} className="h-10 w-10" aria-hidden="true" />
            <div className="flex flex-col leading-none">
              <span className="text-[18px] font-extrabold tracking-tight text-[#0A1F44] sm:text-[20px]">CredBusiness</span>
              <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[#1E63F0] sm:block">Banco Digital PJ</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#3B4863] lg:flex">
            <a href="#solucoes" className="transition-colors hover:text-[#1E63F0]">Soluções</a>
            <a href="#internet-banking" className="transition-colors hover:text-[#1E63F0]">Internet banking</a>
            <a href="#app-mobile" className="transition-colors hover:text-[#1E63F0]">App mobile</a>
            <a href="#integracoes" className="transition-colors hover:text-[#1E63F0]">Integrações</a>
            <a href="#tarifas" className="transition-colors hover:text-[#1E63F0]">Tarifas</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-[#CBD5EE] px-4 py-2.5 text-sm font-semibold text-[#0A1F44] transition hover:border-[#1E63F0] hover:text-[#1E63F0] sm:inline-flex"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#1E63F0] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#1E63F0]/25 transition hover:bg-[#1746C2] sm:px-5"
            >
              <span className="sm:hidden">Abrir conta</span>
              <span className="hidden sm:inline">Abrir conta grátis</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section
          className="relative overflow-hidden bg-[#06143A] text-white"
          style={{
            backgroundImage:
              "radial-gradient(1100px 460px at 80% -10%, rgba(30,99,240,0.55), transparent 60%), radial-gradient(900px 360px at 0% 110%, rgba(157,195,255,0.18), transparent 65%), linear-gradient(180deg, #06143A 0%, #0A1F44 100%)",
          }}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-[#9DC3FF]">
                <BadgeCheck className="h-4 w-4" />
                Conta PJ digital com plataforma financeira completa
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[60px]">
                A plataforma financeira da sua empresa, do recebimento à conciliação.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                CredBusiness reúne conta digital PJ, cobrança automatizada, cartões empresariais, internet banking e
                aplicativo em uma única plataforma — com infraestrutura regulada e API robusta para sua operação.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#0A1F44] shadow-xl shadow-black/20 transition hover:bg-[#E6EEFE]"
                >
                  Abrir conta grátis
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Acessar internet banking
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-white/65">
                {heroBadges.map(({ Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#9DC3FF]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero mockup */}
            <div className="relative">
              <div className="absolute -left-8 -top-8 hidden h-44 w-44 rounded-full bg-[#1E63F0]/30 blur-3xl md:block" aria-hidden="true" />
              <div className="absolute -bottom-10 -right-10 hidden h-52 w-52 rounded-full bg-[#9DC3FF]/20 blur-3xl md:block" aria-hidden="true" />

              <div className="relative rounded-[28px] border border-white/15 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="rounded-[22px] bg-white p-4 text-[#0A1F44] sm:p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src="/brand-mark.svg" alt="" width={40} height={40} className="h-10 w-10" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-extrabold">CredBusiness</p>
                        <p className="text-xs text-[#5B6B85]">Conta corrente digital</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#E6EEFE] px-3 py-1 text-xs font-bold text-[#1746C2]">
                      Online
                    </span>
                  </div>

                  <div
                    className="rounded-2xl p-5 text-white"
                    style={{ background: "linear-gradient(135deg, #1E63F0 0%, #1746C2 55%, #06143A 100%)" }}
                  >
                    <p className="text-xs text-white/65">Saldo disponível</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight">R$ 13.989,21</p>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[
                        { label: "Pix", icon: QrCode },
                        { label: "Boleto", icon: FileText },
                        { label: "Cartão", icon: CreditCard },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="rounded-xl bg-white/12 p-3 text-center">
                            <Icon className="mx-auto h-5 w-5 text-[#9DC3FF]" />
                            <p className="mt-2 text-xs font-semibold text-white/85">{item.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Cobrança recebida", value: "+ R$ 2.450,00", positive: true },
                      { label: "Pagamento fornecedor", value: "- R$ 780,00", positive: false },
                      { label: "Boleto compensado", value: "+ R$ 1.120,90", positive: true },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between rounded-xl border border-[#E2E8F5] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6EEFE] text-[#1746C2]">
                            <ReceiptText className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-semibold text-[#3B4863]">{row.label}</span>
                        </div>
                        <span className={`text-sm font-extrabold ${row.positive ? "text-[#16A34A]" : "text-[#0A1F44]"}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating mobile mockup */}
              <div className="absolute -bottom-10 right-2 hidden w-[188px] rounded-[28px] border border-[#0A1F44]/30 bg-[#06143A] p-2 shadow-2xl shadow-black/40 md:block">
                <div className="rounded-[22px] bg-white p-3">
                  <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#CBD5EE]" />
                  <div
                    className="rounded-2xl p-3 text-white"
                    style={{ background: "linear-gradient(135deg, #1E63F0 0%, #1746C2 100%)" }}
                  >
                    <Smartphone className="h-5 w-5" />
                    <p className="mt-3 text-[10px] uppercase tracking-widest text-white/65">App mobile</p>
                    <p className="text-lg font-extrabold">R$ 8.240</p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <span className="rounded-xl bg-[#E6EEFE] p-2.5 text-center text-[11px] font-bold text-[#1746C2]">Pix</span>
                    <span className="rounded-xl bg-[#E6EEFE] p-2.5 text-center text-[11px] font-bold text-[#1746C2]">Conta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST RIBBON */}
        <section className="border-b border-[#E2E8F5] bg-white px-5 py-10 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {trustItems.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E6EEFE] text-[#1746C2]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-extrabold text-[#0A1F44]">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-[#5B6B85]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT MODULES */}
        <section id="solucoes" className="bg-[#F4F7FC] px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#1E63F0]">Soluções</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0A1F44] sm:text-4xl">
                Tudo o que sua empresa precisa para receber, pagar e crescer.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#3B4863]">
                Uma plataforma única, com módulos integrados de conta digital, cobrança, cartões, gestão financeira e
                APIs para conectar a sua operação ao mercado.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {productModules.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="rounded-2xl border border-[#E2E8F5] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1E63F0]/30 hover:shadow-md"
                  >
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6EEFE] text-[#1746C2]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-extrabold tracking-tight text-[#0A1F44]">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5B6B85]">{feature.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#1E63F0]">
                      Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTERNET BANKING */}
        <section id="internet-banking" className="bg-white px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#1E63F0]">Internet banking</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0A1F44] sm:text-4xl">
                Um painel financeiro institucional, claro e construído para o uso diário.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#3B4863]">
                Visual sóbrio, hierarquia bancária e foco nas tarefas que mais importam: saldo, recebíveis, pagamentos e
                comprovantes — tudo em uma navegação consistente entre desktop e mobile.
              </p>
              <div className="mt-7 space-y-3">
                {bankingFeatures.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-semibold text-[#3B4863]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1E63F0]" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0A1F44] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#06143A]"
              >
                Acessar demonstração
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div
              className="rounded-[28px] border border-[#E2E8F5] p-4 shadow-xl shadow-[#0A1F44]/10"
              style={{ background: "linear-gradient(180deg, #F4F7FC 0%, #E6EEFE 100%)" }}
            >
              <div className="rounded-[22px] bg-white">
                <div className="flex items-center justify-between border-b border-[#E2E8F5] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Image src="/brand-mark.svg" alt="" width={34} height={34} aria-hidden="true" />
                    <div>
                      <p className="text-sm font-extrabold text-[#0A1F44]">Painel financeiro</p>
                      <p className="text-xs text-[#5B6B85]">Visão consolidada</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#E6EEFE] px-3 py-1 text-xs font-bold text-[#1746C2]">Seguro</span>
                </div>
                <div className="grid gap-4 p-5 md:grid-cols-[1fr_0.85fr]">
                  <div
                    className="rounded-2xl p-5 text-white"
                    style={{ background: "linear-gradient(135deg, #06143A 0%, #1746C2 70%, #1E63F0 130%)" }}
                  >
                    <WalletCards className="h-6 w-6 text-[#9DC3FF]" />
                    <p className="mt-6 text-sm text-white/65">Saldo disponível</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight">R$ 24.890,30</p>
                    <div className="mt-5 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-2/3 rounded-full bg-[#9DC3FF]" />
                    </div>
                    <p className="mt-3 text-[11px] text-white/60">Limite Pix usado: 66%</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Pix enviados", value: "18", icon: QrCode },
                      { label: "Boletos pagos", value: "07", icon: FileText },
                      { label: "Comprovantes", value: "42", icon: ReceiptText },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center justify-between rounded-2xl border border-[#E2E8F5] px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-[#1746C2]" />
                            <span className="text-sm font-semibold text-[#3B4863]">{item.label}</span>
                          </div>
                          <span className="text-lg font-extrabold text-[#0A1F44]">{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APP MOBILE */}
        <section id="app-mobile" className="bg-[#F4F7FC] px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
            <div className="order-2 lg:order-1">
              <div className="mx-auto max-w-[320px] rounded-[36px] border border-[#0A1F44]/15 bg-[#06143A] p-3 shadow-2xl shadow-[#0A1F44]/25">
                <div className="rounded-[28px] bg-white p-4">
                  <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#CBD5EE]" />
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image src="/brand-mark.svg" alt="" width={34} height={34} aria-hidden="true" />
                      <div>
                        <p className="text-xs font-extrabold text-[#0A1F44]">CredBusiness</p>
                        <p className="text-[11px] text-[#5B6B85]">Mobile</p>
                      </div>
                    </div>
                    <Lock className="h-4 w-4 text-[#1746C2]" />
                  </div>
                  <div
                    className="rounded-2xl p-4 text-white"
                    style={{ background: "linear-gradient(135deg, #1E63F0 0%, #1746C2 100%)" }}
                  >
                    <p className="text-[11px] uppercase tracking-widest text-white/65">Saldo</p>
                    <p className="mt-1 text-2xl font-extrabold tracking-tight">R$ 8.240,00</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[QrCode, FileText, Banknote].map((Icon, index) => (
                        <span
                          key={index}
                          className="flex h-11 items-center justify-center rounded-xl bg-white/15 text-white"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      { label: "Pix recebido", value: "+ R$ 1.200,00" },
                      { label: "Boleto vencendo", value: "Hoje" },
                      { label: "Cartão virtual", value: "Disponível" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-xl bg-[#F4F7FC] px-3 py-3 text-xs font-semibold text-[#0A1F44]"
                      >
                        <span>{item.label}</span>
                        <span className="text-[#1E63F0]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#1E63F0]">App mobile</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0A1F44] sm:text-4xl">
                A mesma experiência institucional, agora no bolso da sua equipe.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#3B4863]">
                Aplicativo móvel responsivo e nativo, com biometria, notificações em tempo real e operação completa de
                Pix, boleto, transferência e cartões. Construído para uso recorrente e leitura rápida.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {mobileFeatures.map(({ Icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-[#E2E8F5] bg-white p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6EEFE] text-[#1746C2]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-sm font-extrabold text-[#0A1F44]">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#5B6B85]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section id="integracoes" className="bg-white px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="text-sm font-extrabold uppercase tracking-widest text-[#1E63F0]">Integrações</span>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0A1F44] sm:text-4xl">
                  Conecte o financeiro da empresa ao resto da operação.
                </h2>
                <p className="mt-4 text-base leading-8 text-[#3B4863]">
                  API REST, webhooks e endpoints prontos para conciliação, cobrança automática e integração com ERPs,
                  sistemas contábeis, marketplaces e times de produto.
                </p>
                <Link
                  href="#"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#CBD5EE] px-5 py-3 text-sm font-bold text-[#0A1F44] transition hover:border-[#1E63F0] hover:text-[#1E63F0]"
                >
                  Ver documentação técnica
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {integrations.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F5] bg-[#F4F7FC] py-7"
                  >
                    <Icon className="h-7 w-7 text-[#1746C2]" />
                    <span className="mt-3 text-xs font-bold uppercase tracking-widest text-[#0A1F44]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STATS / SECURITY DARK BAND */}
        <section id="seguranca" className="bg-[#06143A] px-5 py-[4.5rem] text-white sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="text-sm font-extrabold uppercase tracking-widest text-[#9DC3FF]">Confiança e segurança</span>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  Operação identificada, infraestrutura regulada e camadas de proteção ponta a ponta.
                </h2>
                <p className="mt-4 text-base leading-8 text-white/70">
                  CredBusiness mantém atribuição clara dos serviços financeiros prestados pela Asaas Pagamentos S.A.,
                  com 2FA, biometria, criptografia, comprovantes auditáveis e trilhas de log para sua tranquilidade.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                    <p className="text-3xl font-extrabold tracking-tight text-white">{s.value}</p>
                    <p className="mt-2 text-xs leading-5 text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Provedor regulado pelo BACEN (Asaas Pagamentos S.A.)",
                "Autenticação 2FA e biometria no app mobile",
                "Criptografia AES-256 e TLS 1.3 nas comunicações",
                "Comprovantes auditáveis e trilhas de log",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <ShieldCheck className="h-6 w-6 text-[#9DC3FF]" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-white/85">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TARIFAS */}
        <section id="tarifas" className="bg-white px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#1E63F0]">Tarifas</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0A1F44] sm:text-4xl">
                Valores transparentes, conectados à tabela pública do provedor.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#3B4863]">
                As tarifas podem variar conforme contrato BaaS e configurações da conta raiz. A LP apresenta a
                referência oficial de forma clara para reduzir dúvidas comerciais.
              </p>
              <a
                href={fees.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1E63F0] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1746C2]"
              >
                Ver tabela oficial
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Pix recebido", value: fees.incoming.pix.standardFormatted, sub: `Promo ${fees.incoming.pix.promotionalFormatted}` },
                { label: "Boleto recebido", value: fees.incoming.boleto.standardFormatted, sub: `Promo ${fees.incoming.boleto.promotionalFormatted}` },
                { label: "Pix PJ", value: `${fees.outgoing.pixTransferPj.monthlyFreeTransactions} grátis`, sub: `${fees.outgoing.pixTransferPj.afterFreeFormatted} após franquia` },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#E2E8F5] bg-[#F4F7FC] p-5">
                  <p className="text-sm font-bold text-[#5B6B85]">{item.label}</p>
                  <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#0A1F44]">{item.value}</p>
                  <p className="mt-2 text-xs leading-5 text-[#1E63F0]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-4xl text-center text-xs leading-6 text-[#5B6B85]">
            Referência verificada em {fees.verifiedAt}. {fees.disclaimer}
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-[#F4F7FC] px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#1E63F0]">FAQ</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0A1F44] sm:text-4xl">Dúvidas frequentes</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-[#E2E8F5] bg-white p-5 open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-base font-extrabold text-[#0A1F44]">
                    {item.q}
                    <ChevronRight className="h-5 w-5 text-[#1E63F0] transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#3B4863]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="px-5 py-16 text-center text-white sm:px-6"
          style={{
            background:
              "radial-gradient(700px 280px at 50% 0%, rgba(30,99,240,0.45), transparent 60%), linear-gradient(180deg, #06143A 0%, #0A1F44 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#9DC3FF]">
              <Sparkles className="h-3.5 w-3.5" /> Comece agora
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sua empresa pronta para uma plataforma financeira profissional.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/72">
              Crie sua conta em poucos minutos ou acesse a demonstração para conhecer o internet banking, o app e a
              experiência de gestão completa.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#0A1F44] transition hover:bg-[#E6EEFE]"
              >
                Abrir conta grátis
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Entrar na demonstração
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#06143A] px-5 py-12 text-white/70 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/brand-mark.svg" alt="" width={40} height={40} className="h-10 w-10" aria-hidden="true" />
              <div>
                <p className="text-lg font-extrabold tracking-tight text-white">CredBusiness</p>
                <p className="text-xs uppercase tracking-widest text-white/50">Banco Digital PJ</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-xs leading-6 text-white/50">
              Os serviços financeiros são prestados pela Asaas Pagamentos S.A., instituição autorizada pelo Banco
              Central do Brasil. CredBusiness é a camada de software que conecta sua empresa à infraestrutura financeira.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Produto</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#solucoes" className="hover:text-white">Soluções</a></li>
              <li><a href="#internet-banking" className="hover:text-white">Internet banking</a></li>
              <li><a href="#app-mobile" className="hover:text-white">App mobile</a></li>
              <li><a href="#tarifas" className="hover:text-white">Tarifas</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Plataforma</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white">Acessar conta</Link></li>
              <li><Link href="/register" className="hover:text-white">Abrir conta</Link></li>
              <li><a href="#integracoes" className="hover:text-white">Integrações</a></li>
              <li><a href="#seguranca" className="hover:text-white">Segurança</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/privacidade" className="hover:text-white">Privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-white">Termos</Link></li>
              <li><a href="https://www.asaas.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Asaas Pagamentos</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} CredBusiness. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
