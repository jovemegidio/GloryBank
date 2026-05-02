# CredBusiness - Relatorio de Adequacao Tecnica BaaS Asaas

Data: 2026-05-02

## Resumo executivo

A plataforma CredBusiness foi ajustada para operar como uma experiencia de internet banking e app mobile tecnicamente aderente ao modelo BaaS do Asaas, sem afirmar autorizacao regulatoria propria da CredBusiness.

O sistema evidencia o Asaas como prestador dos servicos financeiros em pontos de contato com o cliente, telas autenticadas, fluxos transacionais, comprovantes, termos, suporte e mobile. A criacao de contas segue o modelo de subcontas Asaas, armazenando `apiKey` e `walletId` da subconta para que as operacoes usem a conta do cliente.

## O que foi implementado

- Selo/atribuicao Asaas reforcado em LP, login, cadastro, dashboard, sidebar, suporte, conta, pagamentos, Pix, transferencia, boleto, agendamentos, fatura e app mobile.
- Novo componente transacional para destacar que a operacao financeira e processada via Asaas antes da confirmacao.
- Identidade CredBusiness aplicada em favicon, PWA icons, app icon, adaptive icon e splash mobile.
- Tema mobile migrado para padrao institucional azul/navy, mantendo verde apenas para referencia visual Asaas/status.
- Criacao automatica de webhook Asaas para novas subcontas quando `ASAAS_AUTO_WEBHOOKS=true`.
- Endpoint de webhook mantem validacao por `asaas-access-token` usando `ASAAS_WEBHOOK_TOKEN`.
- Nginx passa a redirecionar HTTP para HTTPS, preservando ACME challenge e healthcheck.
- `.env.example` documenta webhook URL, email, automacao e bloqueio opcional por webhook obrigatorio.

## Arquitetura Asaas

- Conta raiz: usa `ASAAS_API_KEY` para criar subcontas em `/v3/accounts`.
- Subconta: cada cliente recebe `apiKey` e `walletId`; chamadas financeiras usam a `apiKey` da subconta.
- Sandbox: `ASAAS_API_URL=https://api-sandbox.asaas.com/v3`.
- Webhooks: novas subcontas tentam registrar `/v3/webhooks` apontando para `https://credbusinessbank.com.br/api/asaas/webhook`.
- Operacoes implementadas: saldo, customers, pagamentos/boletos, Pix QR Code, Pix/transferencias, agendamentos, historico financeiro e webhook.

## Variaveis criticas

```env
ASAAS_API_URL="https://api-sandbox.asaas.com/v3"
ASAAS_API_KEY="$aact_sua_chave"
ASAAS_WEBHOOK_TOKEN="token-seguro-32-255-caracteres"
ASAAS_WEBHOOK_URL="https://credbusinessbank.com.br/api/asaas/webhook"
ASAAS_WEBHOOK_EMAIL="contato@credbusinessbank.com.br"
ASAAS_AUTO_WEBHOOKS=true
ASAAS_REQUIRE_WEBHOOKS=false
NEXT_PUBLIC_APP_URL="https://credbusinessbank.com.br"
COOKIE_SECURE=true
DEMO_MODE=false
```

## Seguranca

- Senhas com bcrypt.
- Sessao por JWT em cookie HttpOnly.
- `COOKIE_SECURE=true` em producao HTTPS.
- Rate limit em autenticacao e rotas transacionais.
- Validacao Zod em entradas criticas.
- Headers Nginx: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
- Webhook Asaas validado por token no header `asaas-access-token`.
- HTTP redirecionado para HTTPS.

## Pendencias externas

- Aprovacao formal do Asaas para operacao BaaS/white label da CredBusiness.
- Envio e aceite do Playbook BaaS especifico da conta pelo Asaas.
- URLs oficiais definitivas do Selo Asaas, se o Playbook exigir assets diferentes do fallback atual.
- Chave de producao Asaas e liberacao de escopos/permissoes.
- Documentacao/onboarding das subcontas exigida pelo Asaas.
- Homologacao regulatoria e operacional do Asaas antes de operar em producao.
- Assinatura, builds e publicacao nas lojas iOS/Android, caso o app mobile seja publicado.

## Observacao de escopo

O contexto mencionado sobre `server.js`, `doacoes.html`, `financeiro.html`, porta `3016` e `/var/www/zyntra-igrejas` nao existe neste repositorio. A adequacao foi aplicada na estrutura atual CredBusiness baseada em Next.js, Docker, Nginx e app Expo.

## Referencias oficiais consultadas

- Asaas BaaS: https://docs.asaas.com/docs/about-baas
- Criacao de subcontas BaaS: https://docs.asaas.com/docs/cria%C3%A7%C3%A3o-de-subcontas-baas
- Criacao de subcontas: https://docs.asaas.com/docs/creating-subaccounts
- Criar webhook via API: https://docs.asaas.com/docs/create-new-webhook-via-api
- Recebimento de eventos: https://docs.asaas.com/docs/receive-asaas-events-at-your-webhook-endpoint
- Eventos de pagamentos: https://docs.asaas.com/docs/webhooks-events
- Eventos de transferencias: https://docs.asaas.com/docs/transfer-events
- Pix QR Code estatico: https://docs.asaas.com/docs/creating-a-static-qr-code
- Criar pagamento: https://docs.asaas.com/reference/create-new-payment
- Criar cliente: https://docs.asaas.com/reference/create-new-customer
