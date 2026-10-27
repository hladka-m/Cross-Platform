const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("perfumesAPI", {
    loadPerfumes: () => ipcRenderer.invoke("perfumes:load"),
    savePerfumes: (perfumes) => ipcRenderer.invoke("perfumes:save", perfumes),
});