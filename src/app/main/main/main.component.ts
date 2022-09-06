import {Component} from '@angular/core';
import {Router} from "@angular/router";
import { interval, Subscription} from "rxjs";
import {MessageService} from "../../message/message.service";

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
  isStarted = false;
  milliseconds = 3;
  requestingStart: Subscription;
  messages: any [] = [];

  constructor(private router: Router, private messageService: MessageService) {
    this.path = localStorage.getItem('dirPath')
  }

  getPath(): void {
    this.api.getFolderPath().then((x: string) => {
      this.path = x;
      localStorage.setItem('dirPath', x);
    })
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

  start() {
    if (this.isStarted) {
      this.requestingStart.unsubscribe();
      this.isStarted = false;
      return;
    }
    this.isStarted = !this.isStarted;
    this.requestingStart = interval(1000 * (this.milliseconds < 1 ? 1 : this.milliseconds))
      .subscribe(() => {
        this.messages = this.messageService.getMessages();
        console.log(this.messages);
      });
  }

  checkMate(x: any) {
    if (x > 9) {
      this.requestingStart.unsubscribe();
      this.isStarted = false;
    }
    console.log(x);
  }
}
