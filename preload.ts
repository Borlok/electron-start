import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getFolderPath: () => ipcRenderer.invoke('getPath'),
  addFileWithName: (args: any) => ipcRenderer.invoke('addFile', args),
  removeFileWithName: (args: any) => ipcRenderer.invoke('removeFile', args),
  executeFile: (args: any) => ipcRenderer.invoke('execute', args),
  openWindow: () => ipcRenderer.invoke('openWindow'),
  hide: () => ipcRenderer.invoke('hide')
})
