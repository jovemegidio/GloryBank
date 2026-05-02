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

O projeto inclui `Dockerfile`, `docker-compose.yml` e `nginx/nginx.conf`.

```bash
docker compose up -d --build
```

Variáveis mínimas:

| Variável | Uso |
|---|---|
| `DATABASE_URL` | conexão Prisma/PostgreSQL |
| `DB_PASSWORD` | senha do banco no compose |
| `JWT_SECRET` | assinatura das sessões |
| `DEMO_MODE` | habilita modo demonstração |
| `NEXT_PUBLIC_APP_URL` | URL pública |
| `ASAAS_API_URL` | endpoint Asaas |
| `ASAAS_API_KEY` | chave da conta raiz |
| `ASAAS_WEBHOOK_TOKEN` | validação de webhooks |

## Segurança

- JWT em cookie HttpOnly
- Hash de senha com bcrypt
- Rate limit em rotas críticas
- Validação de entrada com Zod
- Headers de segurança no Next/Vercel
- Atribuição Asaas em fluxos financeiros regulados
