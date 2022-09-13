import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "../../auth/auth.service";
import {MessageService} from "../../message/message.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  seconds = 3;
  subscriptions: Subscription [] = [];

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.seconds = this.messageService.seconds;
    this.authService.getAuthStatusListener().subscribe(isAuth => {
      if (isAuth) {
        this.messageService.startApp();
      } else {
        this.messageService.stopApp();
      }
    })
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ['admin@mail.com'], // TODO Clear data
        password: ['admin']
      }
    );
  }

  onClose() {
    this.router.navigate([''])
  }

  onLogin() {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }

  onLogout() {
    this.authService.logout();
  }

  changeSec() {
    this.messageService.seconds = this.seconds;
  }
}
