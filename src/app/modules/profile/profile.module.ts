import { NgModule } from '@angular/core';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { TenantComponent } from './components/tenant/tenant.component';
import { LandlordComponent } from './components/landlord/landlord.component';
import { LandlordService } from './services/landlord.service';
import { TenantService } from './services/tenant.service';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent
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
