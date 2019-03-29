import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { TenantsComponent } from './components/tenants/tenants.component';
import {TenantDetailComponent} from "./components/tenant-detail/tenant-detail.component";
import {TenantService} from "./services/tenant.service";

const tenantsRoutes: Routes = [
  {
    path: '',
    component: TenantsComponent
  },
  {
    path: 'new',
    component: TenantDetailComponent,
    data: { title: 'New', breadcrumb: 'New' }
  },
  {
    path: ':id',
    component: TenantDetailComponent,
    data: { title: 'Detail', breadcrumb: 'Details' }
  }
];

@NgModule({
  declarations: [
    TenantsComponent,
    TenantDetailComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(tenantsRoutes),
  ],
  providers: [
    TenantService,
  ]
})
export class TenantsModule { }
