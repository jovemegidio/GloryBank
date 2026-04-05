const { app, BrowserWindow, shell, Menu, Tray, nativeImage, session } = require("electron");
const path = require("path");

// ─── Configuration ───
const APP_URL =
  process.env.GLORYBANK_URL || "https://glorybank.vercel.app";
const IS_DEV = process.env.NODE_ENV === "development" || !!process.env.GLORYBANK_URL;

let mainWindow = null;
let tray = null;

// ─── Single Instance Lock ───
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// ─── Create Window ───
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: "GloryBank",
    icon: path.join(__dirname, "icons", "icon.png"),
    backgroundColor: "#f8fafc",
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#1a1a2e",
      symbolColor: "#ffffff",
      height: 36,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
    show: false,
  });

  // Graceful show
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    if (IS_DEV) mainWindow.webContents.openDevTools({ mode: "detach" });
  });

  // Load the app
  mainWindow.loadURL(APP_URL);

  // Open external links in the default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Navigation guard – keep user within the banking app
  mainWindow.webContents.on("will-navigate", (event, url) => {
    const appOrigin = new URL(APP_URL).origin;
    if (!url.startsWith(appOrigin)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// ─── App Menu ───
function buildMenu() {
  const template = [
    {
      label: "GloryBank",
      submenu: [
        { label: "Início", click: () => mainWindow?.loadURL(APP_URL + "/dashboard") },
        { type: "separator" },
        { label: "Recarregar", role: "reload" },
        { label: "Forçar Recarga", role: "forceReload" },
        { type: "separator" },
        { label: "Sair", role: "quit" },
      ],
    },
    {
      label: "Editar",
      submenu: [
        { role: "undo", label: "Desfazer" },
        { role: "redo", label: "Refazer" },
        { type: "separator" },
        { role: "cut", label: "Recortar" },
        { role: "copy", label: "Copiar" },
        { role: "paste", label: "Colar" },
        { role: "selectAll", label: "Selecionar tudo" },
      ],
    },
    {
      label: "Ver",
      submenu: [
        { role: "zoomIn", label: "Aumentar Zoom" },
        { role: "zoomOut", label: "Diminuir Zoom" },
        { role: "resetZoom", label: "Zoom Padrão" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Tela Cheia" },
      ],
    },
  ];

  if (IS_DEV) {
    template.push({
      label: "Dev",
      submenu: [
        { role: "toggleDevTools", label: "DevTools" },
      ],
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ─── System Tray ───
function createTray() {
  const iconPath = path.join(__dirname, "icons", "icon.png");
  try {
    const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
    tray = new Tray(icon);
    tray.setToolTip("GloryBank – Internet Banking");

    const contextMenu = Menu.buildFromTemplate([
      { label: "Abrir GloryBank", click: () => { mainWindow?.show(); mainWindow?.focus(); } },
      { type: "separator" },
      { label: "Sair", click: () => app.quit() },
    ]);

    tray.setContextMenu(contextMenu);
    tray.on("click", () => {
      if (mainWindow) {
        mainWindow.isVisible() ? mainWindow.focus() : mainWindow.show();
      }
    });
  } catch {
    // Icon not found – skip tray
  }
}

// ─── Auto Updater ───
function checkForUpdates() {
  if (IS_DEV) return;
  try {
    const { autoUpdater } = require("electron-updater");
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.on("update-downloaded", () => {
      mainWindow?.webContents.send("update-ready");
    });
  } catch {
    // electron-updater not available
  }
}

// ─── App Lifecycle ───
app.whenReady().then(() => {
  // Set a permissive Content-Security-Policy for the loaded web app
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({ responseHeaders: details.responseHeaders });
  });

  buildMenu();
  createWindow();
  createTray();
  checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
