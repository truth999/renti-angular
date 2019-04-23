import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantsComponent } from './components/tenants/tenants.component';
import { LandlordsComponent } from './components/landlords/landlords.component';

const routes: Routes = [
  { path: 'tenants', component: TenantsComponent },
  { path: 'landlords', component: LandlordsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
