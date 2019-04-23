import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', loadChildren: './modules/auth/auth.module#AuthModule' }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
