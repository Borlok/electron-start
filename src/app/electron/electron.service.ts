import { Injectable } from '@angular/core';

import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
// TODO Deprecated
export class ElectronService {
  ipcRenderer: typeof ipcRenderer | undefined;

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
}
