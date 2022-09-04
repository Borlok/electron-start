import { Component } from '@angular/core';
import {ElectronService} from "./electron/electron.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  path = '';
  title = 'talpabox-app';

  constructor(private electronService: ElectronService) {
  }

  getPath() {
    this.electronService.ipcRenderer?.invoke('getPath').then(x => this.path = x);
  }
}
