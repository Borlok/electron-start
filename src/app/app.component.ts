import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  path = '';
  title = 'talpabox-app';
  // @ts-ignore
  api = window.electronAPI;

  getPath(): void {
    this.api.getFolderPath().then((x: string) => this.path = x)
  }
}
