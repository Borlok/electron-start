import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  path = '';
  fileName = '';
  content = '';
  title = 'talpabox-app';
  // @ts-ignore
  api = window.electronAPI;

  getPath(): void {
    this.api.getFolderPath().then((x: string) => this.path = x)
  }

  addFile() {
    this.api.addFileWithName([this.fileName, this.content])
  }

  removeFile() {
    this.api.removeFileWithName([this.fileName, this.content])
  }
}
