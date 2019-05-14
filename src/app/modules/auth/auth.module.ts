import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { SignupFunnelComponent } from './components/signup-funnel/signup-funnel.component';
import { SignupFunnelEmailComponent } from './components/signup-funnel/signup-funnel-email/signup-funnel-email.component';
import { SignupFunnelEducationComponent } from './components/signup-funnel/signup-funnel-education/signup-funnel-education.component';
import { SignupFunnelOccupationComponent } from './components/signup-funnel/signup-funnel-occupation/signup-funnel-occupation.component';

import { SignupFunnelCompleteComponent } from './components/signup-funnel/signup-funnel-complete/signup-funnel-complete.component';
import { ApartmentCreateComponent } from './components/apartment-create/apartment-create.component';
import { ApartmentFloorComponent } from './components/apartment-create/apartment-floor/apartment-floor.component';
import { ApartmentDrawComponent } from './components/apartment-create/apartment-draw/apartment-draw.component';
import { ApartmentRoomComponent } from './components/apartment-create/apartment-room/apartment-room.component';
import { ApartmentRoomNameComponent } from './components/apartment-create/apartment-room/apartment-room-name/apartment-room-name.component';
import { ApartmentUploadComponent } from './components/apartment-create/apartment-upload/apartment-upload.component';

import { ApartmentDataComponent } from './components/apartment-create/apartment-data/apartment-data.component';
import {
  SignupFunnelTypeUsernameComponent
} from './components/signup-funnel/signup-funnel-type-username/signup-funnel-type-username.component';
import {
  SignupFunnelPhonePasswordComponent
} from './components/signup-funnel/signup-funnel-phone-password/signup-funnel-phone-password.component';
import {
  SignupFunnelBirthNationalityComponent
} from './components/signup-funnel/signup-funnel-birth-nationality/signup-funnel-birth-nationality.component';
import {
  SignupFunnelPersonAgencyComponent
} from './components/signup-funnel/signup-funnel-person-agency/signup-funnel-person-agency.component';
import {
  SignupFunnelOtherInstructionComponent
} from './components/signup-funnel/signup-funnel-other-instruction/signup-funnel-other-instruction.component';
import { SignupFunnelRentalCityComponent } from './components/signup-funnel/signup-funnel-rental-city/signup-funnel-rental-city.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AuthCompleteComponent } from './components/auth-complete/auth-complete.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupFunnelComponent,
    SignupFunnelEmailComponent,
    SignupFunnelEducationComponent,
    SignupFunnelOccupationComponent,
    SignupFunnelCompleteComponent,
    ApartmentCreateComponent,
    ApartmentFloorComponent,
    ApartmentDrawComponent,
    ApartmentRoomComponent,
    ApartmentRoomNameComponent,
    ApartmentUploadComponent,
    ApartmentDataComponent,
    SignupFunnelTypeUsernameComponent,
    SignupFunnelPhonePasswordComponent,
    SignupFunnelBirthNationalityComponent,
    SignupFunnelPersonAgencyComponent,
    SignupFunnelOtherInstructionComponent,
    SignupFunnelRentalCityComponent,
    SignupComponent,
    AuthCompleteComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    PasswordStrengthBarModule,
    InternationalPhoneNumberModule,
    NgSelectModule,
    RouterModule,
  ]
})
export class AuthModule { }
