import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

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
    path: 'app',
    component: LayoutComponent,
    canLoad: [AuthGuard],
    children: [
      { path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule' },
      { path: 'my-profile', loadChildren: './modules/my-profile/my-profile.module#MyProfileModule' },
      { path: 'rentals', loadChildren: './modules/rentals/rentals.module#RentalsModule' },
      { path: 'offers', loadChildren: './modules/offer/offer.module#OfferModule' },
      { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
      { path: 'my-properties', loadChildren: './modules/my-properties/my-properties.module#MyPropertiesModule' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
