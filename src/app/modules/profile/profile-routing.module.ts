import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenantComponent } from './components/tenant/tenant.component';
import { LandlordComponent } from './components/landlord/landlord.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'tenant', component: TenantComponent },
  { path: 'landlord', component: LandlordComponent },
  { path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
