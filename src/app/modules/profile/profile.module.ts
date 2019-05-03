import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { TenantComponent } from './components/tenant/tenant.component';
import { LandlordComponent } from './components/landlord/landlord.component';
import { SearchComponent } from './components/search/search.component';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent,
    SearchComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    NouisliderModule,
    NgSelectModule
  ]
})
export class ProfileModule { }
