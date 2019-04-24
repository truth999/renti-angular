import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { TenantComponent } from './components/tenant/tenant.component';
import { LandlordComponent } from './components/landlord/landlord.component';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent
  ],
  imports: [
    SharedModule,
    MyProfileRoutingModule
  ]
})
export class MyProfileModule { }
