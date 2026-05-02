# CredBusiness — Internet Banking Digital

Aplicação Next.js para landing page institucional, internet banking e experiência mobile/PWA de uma conta digital PJ com infraestrutura financeira Asaas.

## Acesso de demonstração

| Campo | Valor |
|---|---|
| Login | `demo@credbusiness.com` |
| Senha | `Demo@123456` |

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2.2 |
| Linguagem | TypeScript 5 |
| UI | Tailwind CSS v4 |
| Formulários | react-hook-form + Zod |
| Autenticação | JWT HttpOnly |
| Dados | Prisma |
| Infraestrutura financeira | Asaas BaaS |

## Rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm start
```

## Deploy em VPS

O domínio `credbusinessbank.com.br` deve apontar para a VPS. No momento do ajuste, o DNS resolvia para:

| Host | IP |
|---|---|
| `credbusinessbank.com.br` | `187.45.255.152` |
| `www.credbusinessbank.com.br` | `187.45.255.152` |

O projeto inclui `Dockerfile`, `docker-compose.yml`, `nginx/nginx.conf` e scripts para deploy via SSH.

### Deploy via PowerShell

```powershell
.\scripts\deploy-vps.ps1 -HostName 187.45.255.152 -User root
```

Na primeira execução, o script cria `/opt/credbusiness/.env` a partir de `.env.example` e para antes de subir a aplicação. Edite esse arquivo na VPS com os valores reais e rode o comando novamente.

Para habilitar HTTPS após o primeiro deploy HTTP:

```powershell
.\scripts\deploy-vps.ps1 -HostName 187.45.255.152 -User root -EnableSsl -LetsEncryptEmail contato@credbusinessbank.com.br
```

Renovação manual do certificado na VPS:

```bash
cd /opt/credbusiness
sh scripts/renew-ssl.sh
```

Variáveis mínimas:

| Variável | Uso |
|---|---|
| `DATABASE_URL` | conexão Prisma/PostgreSQL |
| `DB_PASSWORD` | senha do banco no compose |
| `JWT_SECRET` | assinatura das sessões |
| `COOKIE_SECURE` | cookies seguros em HTTPS |
| `DEMO_MODE` | habilita modo demonstração |
| `NEXT_PUBLIC_APP_URL` | URL pública |
| `ASAAS_API_URL` | endpoint Asaas |
| `ASAAS_API_KEY` | chave da conta raiz |
| `ASAAS_WEBHOOK_TOKEN` | validação de webhooks |
| `ASAAS_WEBHOOK_URL` | endpoint público HTTPS de eventos |
| `ASAAS_AUTO_WEBHOOKS` | cria webhooks em novas subcontas |

## Segurança

- JWT em cookie HttpOnly
- Hash de senha com bcrypt
- Rate limit em rotas críticas
- Validação de entrada com Zod
- Headers de segurança no Next/Vercel
- Atribuição Asaas em fluxos financeiros regulados

## BaaS Asaas

O sistema está tecnicamente preparado para criação de subcontas Asaas, uso de chaves por subconta, Pix, boletos, transferências, saldos, histórico financeiro e webhooks por conta. A operação como BaaS/white label depende de aprovação formal e playbook recebido do Asaas.

Relatório técnico: [`docs/baas-readiness.md`](docs/baas-readiness.md).
