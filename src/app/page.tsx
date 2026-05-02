import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpDown,
  BadgeCheck,
  Banknote,
  BellRing,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
  Layers3,
  Lock,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { getAsaasFeesConfig } from "@/lib/asaas-fees";

const features = [
  {
    icon: QrCode,
    title: "Pix, boleto e link de cobrança",
    desc: "Receba com confirmação rápida, acompanhe cobranças e mantenha seus recebíveis organizados em uma única visão.",
    tone: "#00A650",
    bg: "rgba(0,166,80,0.1)",
  },
  {
    icon: BellRing,
    title: "Régua de cobrança",
    desc: "Lembretes por canais digitais, histórico de tentativas e comunicação consistente para reduzir inadimplência.",
    tone: "#2563EB",
    bg: "rgba(37,99,235,0.1)",
  },
  {
    icon: ArrowUpDown,
    title: "Pagamentos e transferências",
    desc: "Pague contas, movimente saldo e envie transferências com camadas de autenticação e registro de auditoria.",
    tone: "#0F766E",
    bg: "rgba(15,118,110,0.1)",
  },
  {
    icon: TrendingUp,
    title: "Gestão financeira",
    desc: "Extratos, saldos, comprovantes e indicadores para sua operação financeira tomar decisões com mais clareza.",
    tone: "#D97706",
    bg: "rgba(217,119,6,0.12)",
  },
];

const platformItems = [
  { icon: ShieldCheck, title: "Autenticação forte", desc: "Sessões seguras, 2FA e cookies HttpOnly." },
  { icon: Lock, title: "Dados protegidos", desc: "Criptografia, rate limit e trilhas de auditoria." },
  { icon: Layers3, title: "Base BaaS", desc: "Infraestrutura financeira conectada ao Asaas." },
];

const appStats = [
  { value: "24/7", label: "acesso ao saldo" },
  { value: "2FA", label: "proteção de sessão" },
  { value: "Pix", label: "operação imediata" },
];

const faqs = [
  {
    q: "A conta pode ser usada por empresas?",
    a: "Sim. A jornada foi desenhada para contas PJ, com cadastro, cobranças, pagamentos, extrato e comprovantes.",
  },
  {
    q: "A operação financeira usa qual infraestrutura?",
    a: "Os serviços financeiros são prestados pela Asaas, instituição autorizada pelo Banco Central do Brasil, com identificação nos fluxos regulados.",
  },
  {
    q: "Existe acesso pelo celular?",
    a: "Sim. O internet banking funciona como PWA responsivo, com navegação otimizada para uso mobile e atalhos no dispositivo.",
  },
];

export default function Home() {
  const fees = getAsaasFeesConfig();

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="hidden bg-[#071F1B] text-white/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <span>Conta digital PJ</span>
            <span>Recebimentos</span>
            <span>Pagamentos</span>
            <span>API e integrações</span>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold text-[#B7F7CF]">
            <Image src="/asaas-logo.svg" alt="Asaas" width={48} height={10} className="h-auto w-12" />
            infraestrutura financeira
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="CredBusiness">
            <Image src="/brand-mark.svg" alt="" width={42} height={42} className="h-10 w-10" aria-hidden="true" />
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-extrabold text-slate-950 sm:text-xl">CredBusiness</span>
              <span className="mt-1 hidden text-[10px] font-bold uppercase text-slate-500 sm:block">Internet Banking</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#solucoes" className="transition-colors hover:text-slate-950">Soluções</a>
            <a href="#internet-banking" className="transition-colors hover:text-slate-950">Internet banking</a>
            <a href="#app-mobile" className="transition-colors hover:text-slate-950">App mobile</a>
            <a href="#seguranca" className="transition-colors hover:text-slate-950">Segurança</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:inline-flex"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#00A650] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-[#008D58] sm:px-5"
            >
              <span className="sm:hidden">Criar</span>
              <span className="hidden sm:inline">Criar conta</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section
          className="relative overflow-hidden bg-[#08231F] text-white"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #08231F 0%, #0F3A33 52%, #123F37 100%), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "auto, 44px 44px, 44px 44px",
          }}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-[#C8FACC]">
                <BadgeCheck className="h-4 w-4" />
                Conta PJ com experiência digital completa
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-[64px]">
                Receba, pague e gerencie sua operação financeira em um só lugar.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
                Uma landing page e um internet banking com visual institucional, linguagem clara e módulos de conta digital
                preparados para empresas que precisam de agilidade sem abrir mão de confiança.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B7F7CF] px-7 py-4 text-sm font-extrabold text-[#07352B] shadow-xl shadow-black/20 transition hover:bg-white"
                >
                  Abrir conta gratuita
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Acessar internet banking
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {appStats.map((stat) => (
                  <div key={stat.label} className="border-l border-white/15 pl-4">
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[28px] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/25 backdrop-blur">
                <div className="rounded-[22px] bg-white p-4 text-slate-900 sm:p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src="/brand-mark.svg" alt="" width={40} height={40} className="h-10 w-10" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-extrabold">CredBusiness</p>
                        <p className="text-xs text-slate-500">Conta corrente digital</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      Online
                    </span>
                  </div>

                  <div className="rounded-2xl bg-[#0B2F29] p-5 text-white">
                    <p className="text-xs text-white/60">Saldo disponível</p>
                    <p className="mt-2 text-3xl font-extrabold">R$ 13.989,21</p>
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[
                        { label: "Pix", icon: QrCode },
                        { label: "Boleto", icon: FileText },
                        { label: "Cartão", icon: CreditCard },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} className="rounded-xl bg-white/10 p-3 text-center">
                            <Icon className="mx-auto h-5 w-5 text-[#B7F7CF]" />
                            <p className="mt-2 text-xs font-semibold text-white/80">{item.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Cobrança recebida", value: "+ R$ 2.450,00", tone: "text-emerald-600" },
                      { label: "Pagamento fornecedor", value: "- R$ 780,00", tone: "text-slate-700" },
                      { label: "Boleto compensado", value: "+ R$ 1.120,90", tone: "text-emerald-600" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                            <ReceiptText className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-semibold text-slate-700">{row.label}</span>
                        </div>
                        <span className={`text-sm font-extrabold ${row.tone}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 right-4 hidden w-[184px] rounded-[26px] border border-slate-900/10 bg-slate-950 p-2 shadow-2xl shadow-black/30 md:block">
                <div className="rounded-[20px] bg-white p-3">
                  <div className="mb-3 h-1.5 w-10 rounded-full bg-slate-200 mx-auto" />
                  <div className="rounded-2xl bg-[#00A650] p-3 text-white">
                    <Smartphone className="h-5 w-5" />
                    <p className="mt-4 text-xs text-white/70">App mobile</p>
                    <p className="text-lg font-extrabold">R$ 8.240</p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <span className="rounded-xl bg-slate-100 p-3 text-center text-[11px] font-bold text-slate-700">Pix</span>
                    <span className="rounded-xl bg-slate-100 p-3 text-center text-[11px] font-bold text-slate-700">Conta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-900/10 bg-white px-5 py-8 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {platformItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-extrabold text-slate-900">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="solucoes" className="px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <span className="text-sm font-extrabold uppercase text-emerald-700">Soluções</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                Tudo que a empresa precisa para operar pagamentos com previsibilidade.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                A estrutura segue uma lógica próxima aos melhores produtos financeiros digitais: foco em tarefa, clareza nos custos
                e telas preparadas para uso recorrente.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: feature.bg, color: feature.tone }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-950">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{feature.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="internet-banking" className="bg-white px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-extrabold uppercase text-emerald-700">Internet banking</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                Um painel mais institucional, direto e confortável para operar todos os dias.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                O dashboard prioriza saldo, ações rápidas, extrato e comprovantes. A navegação foi pensada para parecer sólida,
                com menos ruído visual e mais contraste funcional.
              </p>
              <div className="mt-7 space-y-3">
                {["Menu lateral organizado por grupos financeiros", "Cartão de saldo com hierarquia bancária", "Ações rápidas estáveis no desktop e no mobile"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-900/10 bg-[#F6F8FB] p-4 shadow-xl shadow-slate-900/5">
              <div className="rounded-[22px] bg-white">
                <div className="flex items-center justify-between border-b border-slate-900/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Image src="/brand-mark.svg" alt="" width={34} height={34} aria-hidden="true" />
                    <div>
                      <p className="text-sm font-extrabold">Painel financeiro</p>
                      <p className="text-xs text-slate-500">Visão consolidada</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Seguro</span>
                </div>
                <div className="grid gap-4 p-5 md:grid-cols-[1fr_0.85fr]">
                  <div className="rounded-2xl bg-[#102E2A] p-5 text-white">
                    <WalletCards className="h-6 w-6 text-[#B7F7CF]" />
                    <p className="mt-6 text-sm text-white/60">Saldo disponível</p>
                    <p className="mt-2 text-3xl font-extrabold">R$ 24.890,30</p>
                    <div className="mt-5 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-2/3 rounded-full bg-[#B7F7CF]" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Pix enviados", value: "18", icon: QrCode },
                      { label: "Boletos pagos", value: "07", icon: FileText },
                      { label: "Comprovantes", value: "42", icon: ReceiptText },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-900/10 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-emerald-700" />
                            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                          </div>
                          <span className="text-lg font-extrabold text-slate-950">{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="app-mobile" className="px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div className="order-2 lg:order-1">
              <div className="mx-auto max-w-[310px] rounded-[34px] border border-slate-900/10 bg-slate-950 p-3 shadow-2xl shadow-slate-900/20">
                <div className="rounded-[26px] bg-[#F6F8FB] p-4">
                  <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-slate-300" />
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image src="/brand-mark.svg" alt="" width={34} height={34} aria-hidden="true" />
                      <div>
                        <p className="text-xs font-extrabold text-slate-950">CredBusiness</p>
                        <p className="text-[11px] text-slate-500">Mobile</p>
                      </div>
                    </div>
                    <Lock className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Saldo</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950">R$ 8.240,00</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[QrCode, FileText, Banknote].map((Icon, index) => (
                        <span key={index} className="flex h-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <Icon className="h-5 w-5" />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {["Pix recebido", "Boleto vencendo", "Cartão virtual"].map((item) => (
                      <div key={item} className="rounded-xl bg-white px-3 py-3 text-xs font-semibold text-slate-700 shadow-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-sm font-extrabold uppercase text-emerald-700">App mobile</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                A mesma experiência profissional em telas menores.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                A interface mobile foi ajustada para uso real: botões grandes, grupos previsíveis, menu lateral responsivo e leitura
                rápida das informações financeiras mais importantes.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {appStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-900/10 bg-white p-4">
                    <p className="text-2xl font-extrabold text-slate-950">{item.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="seguranca" className="bg-[#071F1B] px-5 py-[4.5rem] text-white sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-extrabold uppercase text-[#B7F7CF]">Segurança e transparência</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Operação identificada, camadas de proteção e infraestrutura financeira regulada.
              </h2>
              <p className="mt-4 text-base leading-8 text-white/70">
                A plataforma mantém a atribuição dos serviços financeiros do Asaas nos fluxos regulados e reforça confiança com
                linguagem institucional, comprovantes e dados claros para o cliente final.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Asaas como provedor dos serviços financeiros",
                "Banco Central do Brasil como referência regulatória",
                "Autenticação 2FA e sessões seguras",
                "Comprovantes e extratos com trilha de auditoria",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.08] p-5">
                  <ShieldCheck className="h-6 w-6 text-[#B7F7CF]" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-white/86">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-extrabold uppercase text-emerald-700">Taxas</span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                Valores de referência conectados à tabela pública.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                As tarifas podem variar conforme contrato BaaS e configurações da conta raiz, mas a LP apresenta a referência de
                maneira clara para reduzir dúvidas comerciais.
              </p>
              <a
                href={fees.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
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
                <div key={item.label} className="rounded-2xl border border-slate-900/10 bg-[#F6F8FB] p-5">
                  <p className="text-sm font-bold text-slate-600">{item.label}</p>
                  <p className="mt-3 text-2xl font-extrabold text-slate-950">{item.value}</p>
                  <p className="mt-2 text-xs leading-5 text-emerald-700">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-6 text-slate-500">
            Referência verificada em {fees.verifiedAt}. {fees.disclaimer}
          </p>
        </section>

        <section className="px-5 py-[4.5rem] sm:px-6 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <span className="text-sm font-extrabold uppercase text-emerald-700">FAQ</span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">Dúvidas frequentes</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((item) => (
                <details key={item.q} className="group rounded-2xl border border-slate-900/10 bg-white p-5 open:shadow-sm">
                  <summary className="cursor-pointer list-none text-base font-extrabold text-slate-950">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#08231F] px-5 py-16 text-center text-white sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Pronto para operar com uma conta digital mais profissional?</h2>
            <p className="mt-4 text-base leading-8 text-white/70">
              Acesse a demonstração ou crie uma conta para visualizar o fluxo completo de internet banking.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B7F7CF] px-7 py-4 text-sm font-extrabold text-[#07352B] transition hover:bg-white">
                Criar conta grátis
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                Entrar na demonstração
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#061814] px-5 py-10 text-white/70 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/brand-mark.svg" alt="" width={38} height={38} className="h-9 w-9" aria-hidden="true" />
              <div>
                <p className="text-lg font-extrabold text-white">CredBusiness</p>
                <p className="text-xs text-white/45">Internet Banking Digital</p>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-xs leading-6 text-white/45">
              Os serviços financeiros são prestados pela Asaas Pagamentos S.A., instituição autorizada pelo Banco Central do Brasil.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm">
            <Link href="/login" className="hover:text-white">Acessar conta</Link>
            <Link href="/register" className="hover:text-white">Abrir conta</Link>
            <Link href="/privacidade" className="hover:text-white">Privacidade</Link>
            <Link href="/termos" className="hover:text-white">Termos</Link>
            <a href="https://www.asaas.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Asaas
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
