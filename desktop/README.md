# CredBusiness Desktop

Aplicativo desktop do CredBusiness Internet Banking, construído com **Electron 33** + **electron-builder**.

## Stack

| Componente | Tecnologia |
|---|---|
| Runtime | Electron 33 (Chromium + Node.js) |
| Build | electron-builder 25 (NSIS/DMG/AppImage) |
| Updates | electron-updater (GitHub Releases) |
| Ícones | sharp (geração automática do SVG) |
| Segurança | Context Isolation, Sandbox, CSP |

## Desenvolvimento

```bash
cd desktop
npm install
npm run dev
```

> Certifique-se de que o servidor Next.js está rodando em `http://localhost:3000`.

## Build do Instalador

```bash
npm run generate-icons
npm run build:win
npm run build:mac
npm run build:linux
npm run build
```

Os instaladores serão gerados em `desktop/dist/`.

## Configuração

| Variável | Descrição | Padrão |
|---|---|---|
| `CREDBUSINESS_URL` | URL do servidor Next.js | `https://credbusiness.vercel.app` |
| `NODE_ENV` | Se `development`, abre DevTools | — |

## Funcionalidades

- **Splash Screen** — Tela de carregamento animada com marca CredBusiness
- **Offline Detection** — Tela amigável quando sem internet, com botão de retry
- **Single Instance** — Apenas uma instância do app pode rodar
- **System Tray** — Ícone na bandeja com acesso rápido
- **Auto-update** — Atualização automática via GitHub Releases
- **Keyboard Shortcuts** — Ctrl+H (Início), Ctrl+P (PIX), Ctrl+E (Extrato)
- **Segurança** — Context isolation, sandbox, sem node integration
- **Links externos** — URLs externas abrem no navegador padrão
- **Title Bar integrada** — Barra de título no tema institucional
