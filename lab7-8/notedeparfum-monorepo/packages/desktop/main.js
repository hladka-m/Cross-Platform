import { app, BrowserWindow, ipcMain } from "electron";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PerfumeService } from "@notedeparfum/core";
import { FileStorageAdapter } from "./fileStorageAdapter.js";
import { createHandlers } from "./ipcHandlers.js";

const currentDir = dirname(fileURLToPath(import.meta.url));

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 750,
        title: "Note de Parfum Desktop",
        webPreferences: {
        preload: join(currentDir, "preload.cjs"),
        contextIsolation: true,
        nodeIntegration: false,
        },
    });

    win.loadFile(join(currentDir, "renderer", "index.html"));
}

app.whenReady().then(() => {
    const adapter = new FileStorageAdapter(join(app.getPath("userData"), "perfumes.json"));
    const handlers = createHandlers(new PerfumeService(adapter));

    ipcMain.handle("perfumes:list", (event, query) => handlers.list(query));
    ipcMain.handle("perfumes:add", (event, data) => handlers.add(data));
    ipcMain.handle("perfumes:remove", (event, id) => handlers.remove(id));

    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});