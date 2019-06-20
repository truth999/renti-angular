import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandlordComponent } from './components/landlord/landlord.component';
import { TenantComponent } from './components/tenant/tenant.component';

const routes: Routes = [
  { path: 'landlord/:id', component: LandlordComponent },
  { path: 'tenant/:id', component: TenantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
