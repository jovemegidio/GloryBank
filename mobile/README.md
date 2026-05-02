# CredBusiness Mobile

App mobile bancário do CredBusiness, construído com **React Native** e **Expo**.

## Stack

| Tecnologia | Uso |
|---|---|
| **Expo SDK 52** | Framework React Native |
| **Expo Router v4** | Navegação file-based |
| **TypeScript** | Tipagem estática |
| **Zustand** | Gerenciamento de estado |
| **React Query** | Cache e sync de dados |
| **Expo SecureStore** | Armazenamento seguro de tokens |
| **Expo Linear Gradient** | Gradientes nativos |
| **Feather Icons** | Iconografia consistente |

## Estrutura

```
mobile/
├── app/
│   ├── _layout.tsx           # Root layout (providers)
│   ├── (auth)/
│   │   ├── _layout.tsx       # Auth guard
│   │   ├── login.tsx         # Login screen
│   │   └── register.tsx      # Cadastro screen
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Tab navigation
│   │   ├── index.tsx         # Dashboard home
│   │   ├── pix.tsx           # PIX (enviar/QR/chaves)
│   │   ├── extrato.tsx       # Extrato com filtros
│   │   ├── cartoes.tsx       # Meus cartões
│   │   └── mais.tsx          # Menu mais opções
│   ├── transferir.tsx        # Transferir via PIX (modal)
│   ├── boleto.tsx            # Gerar boleto (modal)
│   ├── cobrar.tsx            # Cobrar via PIX (modal)
│   ├── notificacoes.tsx      # Notificações (modal)
│   ├── conta.tsx             # Minha conta (modal)
│   └── agendamentos.tsx      # Agendamentos (modal)
├── components/
│   ├── Badge.tsx             # Status badges
│   ├── BalanceCard.tsx       # Cartão de saldo (gradiente)
│   ├── Button.tsx            # Botão multi-variant
│   ├── Card.tsx              # Card container
│   ├── Input.tsx             # Input com ícone
│   ├── QuickActions.tsx      # Grid ações rápidas
│   ├── Select.tsx            # Dropdown select
│   └── TransactionList.tsx   # Lista de transações
├── lib/
│   ├── api.ts                # API client (todas as rotas)
│   ├── auth.ts               # Auth store (Zustand)
│   ├── theme.ts              # Design tokens
│   └── utils.ts              # Formatadores/helpers
├── types/
│   └── index.ts              # Type definitions
└── assets/                   # Icons & splash
```

## Telas

| Tela | Descrição |
|---|---|
| **Login** | Login com email/senha, gradiente institucional |
| **Cadastro** | Registro com CPF, telefone, validação |
| **Dashboard** | Saldo, ações rápidas, transações recentes |
| **PIX** | Enviar PIX, gerar QR Code, gerenciar chaves |
| **Extrato** | Histórico com filtros por data, load more |
| **Cartões** | Lista virtual/físico, solicitar novo |
| **Transferir** | Transfer via chave PIX com confirmação |
| **Boleto** | Gerar boleto (nome, CPF, valor, vencimento) |
| **Cobrar** | QR Code para receber pagamentos |
| **Conta** | Perfil, segurança, chaves PIX |
| **Notificações** | Lista com lidas/não lidas |
| **Agendamentos** | Criar/listar/cancelar transferências agendadas |

## Setup

```bash
cd mobile

# Instalar dependências
npm install

# Iniciar dev server
npx expo start

# Abrir no dispositivo
# - Escaneie o QR code com Expo Go (Android/iOS)
# - Pressione 'a' para Android emulator
# - Pressione 'i' para iOS simulator
```

## Build para produção

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Build Android (APK)
eas build --platform android --profile preview

# Build iOS
eas build --platform ios --profile preview
```

## API

O app se conecta ao backend Next.js em `https://credbusiness.vercel.app/api/`.
Todos os endpoints seguem o padrão `{success: boolean, data?: T, error?: string}`.

## Design

- **Cor primária**: `#00A650` (verde institucional)
- **Gradiente principal**: `#071F1B → #0F3A33 → #00A650`
- **Background**: `#f5f6f8`
- **Texto**: `#1a1a2e`
- **Sucesso**: `#22C55E` | **Erro**: `#EF4444` | **Info**: `#3B82F6`
