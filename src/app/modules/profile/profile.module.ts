import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { TenantsComponent } from './components/tenants/tenants.component';
import { LandlordsComponent } from './components/landlords/landlords.component';

@NgModule({
  declarations: [
    TenantsComponent,
    LandlordsComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
