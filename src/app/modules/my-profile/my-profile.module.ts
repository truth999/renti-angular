import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { SharedModule } from '../../shared/shared.module';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { TenantComponent } from './components/my-profile/tenant/tenant.component';
import { LandlordComponent } from './components/my-profile/landlord/landlord.component';
import { LandlordService } from './services/landlord.service';
import { TenantService } from './services/tenant.service';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent,
    MyProfileComponent
  ],
  providers: [
    LandlordService,
    TenantService
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MyProfileRoutingModule,
    NgSelectModule,
    InternationalPhoneNumberModule
  ]
})
export class MyProfileModule { }
