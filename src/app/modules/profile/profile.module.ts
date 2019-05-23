import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { TenantComponent } from './components/profile/tenant/tenant.component';
import { LandlordComponent } from './components/profile/landlord/landlord.component';
import { ProfileComponent } from './components/profile/profile.component';

import { LandlordService } from '../my-profile/services/landlord.service';
import { TenantService } from '../my-profile/services/tenant.service';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent,
    ProfileComponent
  ],
  providers: [
    LandlordService,
    TenantService,
    ProfileService
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    NouisliderModule,
    NgSelectModule
  ]
})
export class ProfileModule { }
