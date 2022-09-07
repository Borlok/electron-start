import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ElectronService} from "../../electron/electron.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private router: Router, private electronService: ElectronService) {
  }

  onLogin() {
    this.router.navigate(['login'])
  }

  toTray() {
    this.electronService.hide();
  }
}
