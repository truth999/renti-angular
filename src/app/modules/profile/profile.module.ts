import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { TenantComponent } from './components/profile/tenant/tenant.component';
import { LandlordComponent } from './components/profile/landlord/landlord.component';
import { SearchComponent } from './components/search/search.component';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileComponent } from './components/profile/profile.component';
import { LandlordService } from '../my-profile/services/landlord.service';
import { TenantService } from '../my-profile/services/tenant.service';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent,
    SearchComponent,
    ProfileComponent
  ],
  providers: [
    LandlordService,
    TenantService
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    NouisliderModule,
    NgSelectModule
  ]
})
export class ProfileModule { }
