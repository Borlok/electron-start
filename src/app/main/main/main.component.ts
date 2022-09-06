import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  path = '';
  fileName = '';
  content = '';
  title = 'talpabox-app';
  // @ts-ignore
  api = window.electronAPI;

  constructor(private router: Router) {
  }

  getPath(): void {
    this.api.getFolderPath().then((x: string) => this.path = x)
  }

  addFile() {
    this.api.addFileWithName([this.fileName, this.content])
  }

  removeFile() {
    this.api.removeFileWithName([this.fileName, this.content])
  }

  execute() {
    this.api.executeFile([this.fileName, this.content])
  }

  onLogin() {
    this.router.navigate(['login'])
  }

  main() {
    this.router.navigate([''])

  }
}
