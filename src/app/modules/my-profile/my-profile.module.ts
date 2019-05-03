import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { TenantComponent } from './components/tenant/tenant.component';
import { LandlordComponent } from './components/landlord/landlord.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    TenantComponent,
    LandlordComponent
  ],
  imports: [
    SharedModule,
    MyProfileRoutingModule,
    NgSelectModule
  ]
})
export class MyProfileModule { }
