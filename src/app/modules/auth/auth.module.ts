import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupGeneralComponent } from './components/signup/signup-general/signup-general.component';
import { SignupEmailComponent } from './components/signup/signup-email/signup-email.component';
import { SignupInfoComponent } from './components/signup/signup-info/signup-info.component';
import { SignupEducationComponent } from './components/signup/signup-education/signup-education.component';
import { SignupOccupationComponent } from './components/signup/signup-occupation/signup-occupation.component';
import { SignupAboutComponent } from './components/signup/signup-about/signup-about.component';
import { SignupCompleteComponent } from './components/signup/signup-complete/signup-complete.component';
import { ApartmentComponent } from './components/apartment/apartment.component';
import { ApartmentFloorComponent } from './components/apartment/apartment-floor/apartment-floor.component';
import { ApartmentDrawComponent } from './components/apartment/apartment-draw/apartment-draw.component';
import { ApartmentRoomComponent } from './components/apartment/apartment-room/apartment-room.component';
import { ApartmentRoomNameComponent } from './components/apartment/apartment-room/apartment-room-name/apartment-room-name.component';
import { ApartmentUploadComponent } from './components/apartment/apartment-upload/apartment-upload.component';
import { ApartmentDataComponent } from './components/apartment/apartment-data/apartment-data.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupGeneralComponent,
    SignupEmailComponent,
    SignupInfoComponent,
    SignupEducationComponent,
    SignupOccupationComponent,
    SignupAboutComponent,
    SignupCompleteComponent,
    ApartmentComponent,
    ApartmentFloorComponent,
    ApartmentDrawComponent,
    ApartmentRoomComponent,
    ApartmentRoomNameComponent,
    ApartmentUploadComponent,
    ApartmentDataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    PasswordStrengthBarModule
  ]
})
export class AuthModule { }
