import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ElectronService} from "../../electron/electron.service";
import {AppMessage} from "../../model/app-message";
import {MessageService} from "../../message/message.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  messages: AppMessage [] = [];

  constructor(private router: Router,
              private electronService: ElectronService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.messages = this.messageService.messages;
    this.messageService.isNewMessage.subscribe(() => this.messages = this.messageService.messages);
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  toTray() {
    this.electronService.hide();
  }

  getTime() {
    return Date.now().toString();
  }
}
