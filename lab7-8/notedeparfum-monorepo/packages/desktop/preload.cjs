const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("perfumesAPI", {
    list: (query) => ipcRenderer.invoke("perfumes:list", query),
    add: (data) => ipcRenderer.invoke("perfumes:add", data),
    remove: (id) => ipcRenderer.invoke("perfumes:remove", id),
});