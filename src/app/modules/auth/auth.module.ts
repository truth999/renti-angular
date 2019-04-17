import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupGeneralComponent } from './components/signup/signup-general/signup-general.component';
import { SignupEmailComponent } from './components/signup/signup-email/signup-email.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupGeneralComponent,
    SignupEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
