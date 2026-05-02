import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FileText, ArrowLeft, Phone, Mail, MessageCircle } from "lucide-react";
import { AsaasSeal } from "@/components/ui/asaas-seal";
import { asaasConfig } from "@/lib/asaas-config";

export const metadata: Metadata = {
  title: "Termos de Uso | CredBusiness",
  description: "Termos de Uso do CredBusiness — condições para utilização dos serviços financeiros prestados pela ASAAS GESTAO FINANCEIRA INSTITUICAO DE PAGAMENTO S.A.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/login" className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
            >
              <Image src="/favicon.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" aria-hidden="true" />
            </div>
            <span className="font-bold text-slate-800">
              Cred<span className="text-[#1E63F0]">Business</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <FileText className="h-8 w-8 text-[#1E63F0]" />
          <h1 className="text-3xl font-bold text-slate-800">Termos de Uso</h1>
        </div>

        <p className="mb-8 text-sm text-slate-500">
          Última atualização: abril de 2026
        </p>

        {/* Aviso regulatório destacado */}
        <div
          className="mb-8 flex items-start gap-3 rounded-xl p-4"
          style={{ background: "rgba(0,166,80,0.06)", border: "1px solid rgba(0,166,80,0.2)" }}
        >
          <AsaasSeal variant="positive" width={90} height={30} clickable className="mt-0.5 shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-slate-700">
              Serviços financeiros prestados por {asaasConfig.legalName}
            </p>
            <p className="mt-0.5 text-[12px] text-slate-500">
              {asaasConfig.regulatoryDescription}.
              CNPJ {asaasConfig.cnpj}.
            </p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-[15px] leading-relaxed text-slate-700">

          {/* Seção 1 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">1. Aceite dos Termos</h2>
            <p>
              Ao criar uma conta ou utilizar os serviços do CredBusiness, você concorda com estes
              Termos de Uso e com nossa{" "}
              <Link href="/privacidade" className="font-medium text-emerald-700 hover:underline">
                Política de Privacidade
              </Link>
              . Caso não concorde, não utilize o serviço.
            </p>
          </section>

          {/* Seção 2 — Cláusula obrigatória do playbook Asaas */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              2. Prestador dos Serviços Financeiros — {asaasConfig.legalName}
            </h2>
            <div
              className="rounded-xl p-4 space-y-3 text-[14px]"
              style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p>
                Os serviços financeiros e de pagamentos disponibilizados por meio da presente plataforma,
                incluindo abertura e manutenção de conta de pagamento, processamento de transações,
                emissão de boletos, transferências, pagamentos e demais movimentações de valores,
                são prestados pelo{" "}
                <a
                  href={asaasConfig.support.homeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#00a650] hover:underline"
                >
                  {asaasConfig.legalName}
                </a>
                , {asaasConfig.regulatoryDescription}.
              </p>
              <p>
                A <strong>CredBusiness</strong> atua exclusivamente como integradora tecnológica e
                distribuidora da experiência do produto, não sendo instituição financeira ou de
                pagamento, nem realizando intermediação financeira em nome próprio.
              </p>
              <p>
                O cliente declara ciência de que o relacionamento financeiro/de pagamentos e a
                responsabilidade regulatória pelos serviços acima descritos são do{" "}
                <strong>{asaasConfig.legalName}</strong>, nos termos da regulamentação vigente.
              </p>
            </div>
          </section>

          {/* Seção 3 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">3. Elegibilidade</h2>
            <ul className="ml-6 list-disc space-y-1">
              <li>Ter 18 anos ou mais</li>
              <li>Possuir CPF ou CNPJ válido e regular na Receita Federal</li>
              <li>Fornecer informações verdadeiras e atualizadas no cadastro</li>
              <li>Não estar impedido por lei de contratar serviços financeiros</li>
            </ul>
          </section>

          {/* Seção 4 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">4. Responsabilidades do Usuário</h2>
            <ul className="ml-6 list-disc space-y-1">
              <li>Manter confidencialidade de senha e credenciais de acesso</li>
              <li>Notificar imediatamente em caso de acesso não autorizado</li>
              <li>Não utilizar os serviços para atividades ilícitas ou fraudulentas</li>
              <li>Cumprir as normas do Banco Central do Brasil relativas ao PIX e pagamentos</li>
            </ul>
          </section>

          {/* Seção 5 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">5. Limitações e Disponibilidade</h2>
            <p>
              A CredBusiness e o {asaasConfig.legalName} podem impor limites de operações diárias,
              suspender ou encerrar contas que violem estes termos ou apresentem indícios de fraude,
              conforme exigido pela regulação vigente do Banco Central do Brasil.
            </p>
          </section>

          {/* Seção 6 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">6. Tarifas</h2>
            <p>
              As tarifas incidentes sobre as operações seguem a tabela pública do Asaas ou as
              condições comerciais aplicáveis à conta raiz no modelo BaaS. Consulte a tabela
              atualizada em{" "}
              <a
                href={asaasConfig.support.feesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 hover:underline"
              >
                asaas.com/precos-e-taxas
              </a>
              .
            </p>
          </section>

          {/* Seção 7 — Suporte ao cliente final */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">7. Suporte ao Cliente</h2>
            <p className="mb-4">
              Para dúvidas sobre a plataforma CredBusiness, entre em contato por{" "}
              <a href="mailto:suporte@credbusiness.com.br" className="font-medium text-emerald-700 hover:underline">
                suporte@credbusiness.com.br
              </a>
              .
            </p>
            <p className="mb-3 text-[14px] font-medium text-slate-600">
              Para suporte direto ao {asaasConfig.legalName} (serviços financeiros):
            </p>
            <div
              className="rounded-xl p-4 space-y-3"
              style={{ background: "rgba(0,166,80,0.04)", border: "1px solid rgba(0,166,80,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#00a650] shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-slate-700">{asaasConfig.support.phonePJ}</p>
                  <p className="text-[11px] text-slate-400">Somente Pessoa Jurídica</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-[#00a650] shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-slate-700">{asaasConfig.support.whatsapp}</p>
                  <p className="text-[11px] text-slate-400">Somente mensagens (WhatsApp)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#00a650] shrink-0" />
                <div>
                  <p className="text-[13px] font-semibold text-slate-700">
                    <a
                      href={`mailto:${asaasConfig.support.email}`}
                      className="hover:underline text-[#00a650]"
                    >
                      {asaasConfig.support.email}
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-400">E-mail de suporte Asaas</p>
                </div>
              </div>
            </div>
          </section>

          {/* Seção 8 */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800">8. Privacidade e LGPD</h2>
            <p>
              O tratamento de dados pessoais segue nossa{" "}
              <Link href="/privacidade" className="font-medium text-emerald-700 hover:underline">
                Política de Privacidade
              </Link>{" "}
              e a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Os dados necessários
              para os serviços financeiros são compartilhados com o {asaasConfig.legalName},
              conforme{" "}
              <a
                href={asaasConfig.support.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 hover:underline"
              >
                Política de Privacidade do Asaas
              </a>
              .
            </p>
          </section>
        </div>

        {/* Footer links */}
        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
          <Link href="/privacidade" className="text-sm text-slate-500 hover:text-slate-700 hover:underline">
            Política de Privacidade
          </Link>
          <Link href="/login" className="text-sm text-slate-500 hover:text-slate-700 hover:underline">
            Voltar ao Login
          </Link>
        </div>
      </main>
    </div>
  );
}
