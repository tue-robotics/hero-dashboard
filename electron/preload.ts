import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("args", {
  host: () => ipcRenderer.invoke("host"),
});
