# GloryBank — Internet Banking Digital

Plataforma de internet banking completa construída com Next.js 16, integração Asaas (sub-contas), autenticação JWT segura e Prisma ORM.

**[Ver Demo](https://jovemegidio.github.io/GloryBank)**

---

## Funcionalidades

- **PIX** — envio, recebimento, geração de QR Code e gerenciamento de chaves
- **Boletos** — geração com código de barras e acompanhamento de status
- **Transferências** — entre contas via PIX
- **Extrato** — histórico paginado com filtros por data e tipo
- **Minha Conta** — dados pessoais e chaves PIX cadastradas
- **Autenticação** — login/registro com JWT HttpOnly, bcrypt 12 rounds
- **Rate Limiting** — proteção contra abuso nas rotas de auth e transações

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2.2 (App Router, Turbopack) |
| Linguagem | TypeScript 5 |
| Banco de dados | PostgreSQL via Prisma 6 |
| Autenticação | `jose` JWT + bcryptjs |
| Pagamentos | Asaas API (sub-contas) |
| Formulários | react-hook-form 7 + Zod |
| Estilos | Tailwind CSS v4 |

---

## Pre-requisitos

- Node.js 20+
- Uma conta Asaas sandbox gratuita
- PostgreSQL (local, Neon, Railway, etc.) ou Prisma Postgres

---

## Instalacao e configuracao

### 1. Clone o repositório

```bash
git clone https://github.com/jovemegidio/GloryBank.git
cd GloryBank
```

### 2. Instale as dependências

```bash
npm install
```

> **Nota:** Se estiver em pasta sincronizada com Google Drive ou OneDrive,
> instale em um caminho local (ex: `C:\Temp\GloryBank`) para evitar erros
> de escrita durante a extração dos pacotes.

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env`:

```env
# Banco de dados
DATABASE_URL="postgresql://user:senha@localhost:5432/glorybank"

# Segredo JWT — gere um valor forte:
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET="seu-segredo-jwt-aqui"

# Chave API Asaas (sandbox)
ASAAS_API_KEY="$aact_..."
ASAAS_API_URL="https://sandbox.asaas.com/api/v3"
```

### 4. Crie as tabelas no banco

```bash
npx prisma db push
```

### 5. Inicie o servidor

```bash
npm run dev
```

Acesse http://localhost:3000

---

## Como obter a chave Asaas (sandbox)

1. Acesse https://sandbox.asaas.com e crie uma conta gratuita
2. Vá em **Configurações → Integrações**
3. Copie a **Chave de API** (começa com `$aact_`)
4. Cole em `ASAAS_API_KEY` no seu `.env`

---

## Como testar

### Criar conta
1. Acesse `/register`
2. Preencha nome, e-mail, CPF/CNPJ, telefone e senha
3. Uma sub-conta Asaas é criada automaticamente

### PIX
1. Acesse **PIX** no menu
2. Enviar: insira chave PIX e valor
3. Receber: clique em "Gerar QR Code"
4. Gerenciar chaves: crie chave EVP ou cadastre CPF/e-mail/telefone

### Boleto
1. Acesse **Boleto**
2. Preencha valor, vencimento e descrição
3. Código de barras e link são exibidos após a criação

---

## Build producao

```bash
npm run build
npm start
```

---

## Estrutura

```
src/
├── app/
│   ├── (auth)/          # Login e registro
│   ├── (dashboard)/     # Painel autenticado
│   ├── api/             # API routes (auth + asaas)
│   └── globals.css
├── components/
│   ├── dashboard/       # Sidebar, Header, BalanceCard...
│   └── ui/              # Button, Input, Card, Badge...
├── lib/                 # auth, asaas, validations, rate-limit
└── types/
```

---

## Segurança

| Medida | Descrição |
|---|---|
| JWT HttpOnly | Cookie não acessível via JavaScript |
| bcrypt 12 rounds | Hash seguro de senhas |
| Rate Limiting | 5 req/15min auth, 20 req/min transações |
| Security Headers | X-Frame-Options, X-Content-Type-Options, CSP |
| Middleware | Verificação de sessão em todas as rotas protegidas |
| Zod | Validação de entrada em todas as rotas de API |
| OWASP Top 10 | Práticas seguidas no desenvolvimento |

---

## GitHub Pages

A demo estática está em `docs/index.html` e é publicada automaticamente
via GitHub Actions ao fazer push na branch `main`.

Configure em: **Settings → Pages → Source → branch `main` → `/docs`**

---

## Licença

MIT
