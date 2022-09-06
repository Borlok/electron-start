import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ]
})
export class MainModule { }
