import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { TenantComponent } from './components/profile/tenant/tenant.component';
import { LandlordComponent } from './components/profile/landlord/landlord.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    NouisliderModule,
    NgSelectModule
  ]
})
export class ProfileModule { }
