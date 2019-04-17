import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GeneralsComponent } from './components/signup/generals/generals.component';
import { GeneralComponent } from './components/signup/generals/general/general.component';
import { EmailComponent } from './components/signup/generals/email/email.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    GeneralsComponent,
    GeneralComponent,
    EmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
