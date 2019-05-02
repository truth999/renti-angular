import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupEmailComponent } from './components/signup/signup-email/signup-email.component';
import { SignupEducationComponent } from './components/signup/signup-education/signup-education.component';
import { SignupOccupationComponent } from './components/signup/signup-occupation/signup-occupation.component';

import { SignupCompleteComponent } from './components/signup/signup-complete/signup-complete.component';
import { ApartmentCreateComponent } from './components/apartment-create/apartment-create.component';
import { ApartmentFloorComponent } from './components/apartment-create/apartment-floor/apartment-floor.component';
import { ApartmentDrawComponent } from './components/apartment-create/apartment-draw/apartment-draw.component';
import { ApartmentRoomComponent } from './components/apartment-create/apartment-room/apartment-room.component';
import { ApartmentRoomNameComponent } from './components/apartment-create/apartment-room/apartment-room-name/apartment-room-name.component';
import { ApartmentUploadComponent } from './components/apartment-create/apartment-upload/apartment-upload.component';

import { ApartmentDataComponent } from './components/apartment-create/apartment-data/apartment-data.component';
import { SignupTypeUsernameComponent } from './components/signup/signup-type-username/signup-type-username.component';
import { SignupPhonePasswordComponent } from './components/signup/signup-phone-password/signup-phone-password.component';
import { SignupBirthNationalityComponent } from './components/signup/signup-birth-nationality/signup-birth-nationality.component';
import { SignupPersonAgencyComponent } from './components/signup/signup-person-agency/signup-person-agency.component';
import { SignupOtherInstructionComponent } from './components/signup/signup-other-instruction/signup-other-instruction.component';
import { SignupRentalCityComponent } from './components/signup/signup-rental-city/signup-rental-city.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupEmailComponent,
    SignupEducationComponent,
    SignupOccupationComponent,
    SignupCompleteComponent,
    ApartmentCreateComponent,
    ApartmentFloorComponent,
    ApartmentDrawComponent,
    ApartmentRoomComponent,
    ApartmentRoomNameComponent,
    ApartmentUploadComponent,
    ApartmentDataComponent,
    SignupTypeUsernameComponent,
    SignupPhonePasswordComponent,
    SignupBirthNationalityComponent,
    SignupPersonAgencyComponent,
    SignupOtherInstructionComponent,
    SignupRentalCityComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    PasswordStrengthBarModule,
    InternationalPhoneNumberModule,
    NgSelectModule
  ]
})
export class AuthModule { }
