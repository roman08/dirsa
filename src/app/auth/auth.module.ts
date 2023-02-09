import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ChangePasswordComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
