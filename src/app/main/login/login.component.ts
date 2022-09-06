import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: [''],
        password: ['']
      }
    );
  }

  back() {
    this.router.navigate([''])
  }

  login() {
    const x = this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
    console.log(x)
  }
}
