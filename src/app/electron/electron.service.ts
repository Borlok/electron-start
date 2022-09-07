import { Injectable } from '@angular/core';
import {AppMessage} from "../model/app-message";

@Injectable({
  providedIn: 'root'
})
// TODO Deprecated
export class ElectronService {
  // @ts-ignore
  api = window.electronAPI;
  path = '';

  constructor() {
  }

  getPath(): void {
    this.api.getFolderPath().then((x: string) => {
      this.path = x;
      localStorage.setItem('dirPath', x);
    })
  }

  addFile(data: AppMessage) {
    this.api.addFileWithName([data.url, data.args[0]])
  }

  removeFile(data: AppMessage) {
    this.api.removeFileWithName([data.url])
  }

  execute(data: AppMessage) {
    this.api.executeFile([data.url])
  }

  hide() {
    this.api.hide();
  }
}
