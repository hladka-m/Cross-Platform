const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
require('electron-reload')(__dirname, {
    ignored: /node_modules|[\/\\]\./
});

function getPerfumesFilePath() {
    return path.join(app.getPath("userData"), "perfumes.json");
}

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        title: "Note de Parfum Desktop",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

ipcMain.handle("perfumes:load", () => {
    const filePath = getPerfumesFilePath();

    if (!fs.existsSync(filePath)) {
        return [];
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
        console.error("Не вдалося прочитати perfumes.json:", error);
        return [];
    }
});

ipcMain.handle("perfumes:save", (event, perfumes) => {
    fs.writeFileSync(getPerfumesFilePath(), JSON.stringify(perfumes, null, 2), "utf-8");
    return true;
});

app.whenReady().then(() => {
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