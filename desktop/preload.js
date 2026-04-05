const { contextBridge, ipcRenderer } = require("electron");

/**
 * Expose a minimal, safe API to the renderer process.
 * The banking app can detect it's running inside Electron via window.glorybank.
 */
contextBridge.exposeInMainWorld("glorybank", {
  platform: process.platform,
  isDesktop: true,
  version: require("./package.json").version,

  // Auto-update listener
  onUpdateReady: (callback) => {
    ipcRenderer.on("update-ready", () => callback());
  },
});
