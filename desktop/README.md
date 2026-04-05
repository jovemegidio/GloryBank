# GloryBank Desktop

Aplicativo desktop do GloryBank Internet Banking, construído com **Electron**.

## Stack

- **Electron 33** — Runtime desktop multiplataforma
- **electron-builder** — Empacotamento e instaladores (NSIS/DMG/AppImage)
- **electron-updater** — Atualização automática via GitHub Releases

## Desenvolvimento

```bash
cd desktop
npm install

# Inicia o app conectando ao servidor local Next.js
npm run dev
```

> Certifique-se de que o servidor Next.js está rodando em `http://localhost:3000`.

## Build

```bash
# Windows (NSIS installer)
npm run build:win

# macOS (DMG)
npm run build:mac

# Linux (AppImage + deb)
npm run build:linux

# Todas as plataformas
npm run build
```

Os instaladores serão gerados em `desktop/dist/`.

## Configuração

| Variável de ambiente | Descrição | Padrão |
|---|---|---|
| `GLORYBANK_URL` | URL do servidor Next.js | `https://glorybank.vercel.app` |
| `NODE_ENV` | Se `development`, abre DevTools | — |

## Funcionalidades

- **Single Instance** — Apenas uma instância do app pode rodar por vez
- **System Tray** — Ícone na bandeja do sistema com menu rápido
- **Auto-update** — Atualização automática via GitHub Releases
- **Segurança** — Context isolation, sandbox, sem node integration
- **Links externos** — URLs externas abrem no navegador padrão
- **Title Bar personalizada** — Integração com o tema escuro do sidebar
