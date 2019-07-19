import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../../shared/shared.module';
import { MyProfileRoutingModule } from './my-profile-routing.module';

import { TenantComponent } from './components/my-profile/tenant/tenant.component';
import { LandlordComponent } from './components/my-profile/landlord/landlord.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/my-profile/change-password/change-password.component';
import { DeleteAccountComponent } from './components/my-profile/delete-account/delete-account.component';
import { DeleteAccountModalComponent } from './components/modal/delete-account-modal/delete-account-modal.component';

import { MyProfileService } from './services/my-profile.service';
import { DeleteAccountModalService } from './services/modal/delete-account-modal.service';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    DeleteAccountModalComponent
  ],
  providers: [
    MyProfileService,
    DeleteAccountModalService
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MyProfileRoutingModule,
    NgSelectModule,
    InternationalPhoneNumberModule,
    GooglePlaceModule,
    ToastrModule,
  ],
  entryComponents: [
    DeleteAccountModalComponent
  ]
})
export class MyProfileModule { }
