import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupGeneralComponent } from './components/signup/signup-general/signup-general.component';
import { SignupEmailComponent } from './components/signup/signup-email/signup-email.component';
import { SignupInfoComponent } from './components/signup/signup-info/signup-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupEducationComponent } from './components/signup/signup-education/signup-education.component';
import { SignupOccupationComponent } from './components/signup/signup-occupation/signup-occupation.component';
import { SignupAboutComponent } from './components/signup/signup-about/signup-about.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupGeneralComponent,
    SignupEmailComponent,
    SignupInfoComponent,
    SignupEducationComponent,
    SignupOccupationComponent,
    SignupAboutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
