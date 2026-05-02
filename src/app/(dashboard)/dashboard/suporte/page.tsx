"use client";

import { useState } from "react";
import { ArrowLeft, MessageCircle, Phone, Mail, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AsaasBadge } from "@/components/ui/asaas-badge";

const faqs = [
  {
    q: "Como fazer um PIX?",
    a: "Acesse o menu PIX, selecione 'Enviar PIX', informe a chave do destinatário (CPF, CNPJ, e-mail, telefone ou chave aleatória), o valor e confirme. O valor é debitado instantaneamente.",
  },
  {
    q: "Meu PIX foi bloqueado, o que fazer?",
    a: "PIX pode ser bloqueado por suspeita de fraude ou limite excedido. Aguarde alguns minutos e tente novamente. Se o problema persistir, entre em contato com o suporte Asaas pelo 0800 009 0037.",
  },
  {
    q: "Como gerar um boleto?",
    a: "Acesse o menu Boleto, informe os dados do pagador (nome e CPF/CNPJ), o valor e a data de vencimento. O boleto é gerado via Asaas e pode ser pago em qualquer banco.",
  },
  {
    q: "Quanto tempo leva uma transferência?",
    a: "PIX é instantâneo, 24h por dia, 7 dias por semana. TED pode levar até 1 dia útil dependendo do horário de envio (até 17h para compensação no mesmo dia).",
  },
  {
    q: "Como recuperar minha senha?",
    a: "Na tela de login, clique em 'Esqueci minha senha' e siga as instruções enviadas para o seu e-mail cadastrado. Se não receber, verifique a pasta de spam.",
  },
];

export default function SuportePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="rounded-xl p-2 text-slate-500 hover:bg-black/[0.04]">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Suporte</h1>
          <p className="text-sm text-slate-500">Estamos aqui para ajudar</p>
        </div>
      </div>

      {/* Status do sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            Status do Sistema
          </CardTitle>
        </CardHeader>
        <div className="flex items-center justify-between rounded-xl p-3" style={{ background: "rgba(0,0,0,0.03)" }}>
          <p className="text-sm font-medium text-slate-700">Todos os sistemas operacionais</p>
          <Badge variant="success">Normal</Badge>
        </div>
      </Card>

      {/* Canais de contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-400" />
            Fale Conosco
          </CardTitle>
        </CardHeader>
        <div className="space-y-3">
          <a href="https://wa.me/5508000090037" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full justify-start gap-3">
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              WhatsApp — 0800 009 0037
            </Button>
          </a>
          <a href="tel:08000090037">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Phone className="h-4 w-4 text-blue-500" />
              Ligar — 0800 009 0037 (gratuito)
            </Button>
          </a>
          <a href="mailto:contato@asaas.com.br">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Mail className="h-4 w-4 text-slate-500" />
              E-mail — contato@asaas.com.br
            </Button>
          </a>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Atendimento de seg. a sex., das 8h às 20h. O suporte é prestado pela ASAAS GESTAO FINANCEIRA INSTITUICAO DE PAGAMENTO S.A., responsável pelos serviços financeiros desta plataforma.
        </p>
        <AsaasBadge variant="inline" className="mt-3" />
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
              <button
                className="flex w-full items-center justify-between p-4 text-left hover:bg-black/[0.02] transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-sm font-medium text-slate-700">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
                  : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <AsaasBadge variant="footer" />
    </div>
  );
}
