import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'landlords',
    pathMatch: 'full'
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule',
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'landlords',
        loadChildren: './modules/landlords/landlords.module#LandlordsModule',
        data: { title: 'Landlords', breadcrumb: 'Landlords'}
      },
      {
        path: 'tenants',
        loadChildren: './modules/tenants/tenants.module#TenantsModule',
        data: { title: 'Tenants', breadcrumb: 'Tenants'}
      },
      {
        path: 'offers',
        loadChildren: './modules/offers/offers.module#OffersModule',
        data: { title: 'Offers', breadcrumb: 'Offers'}
      },
      {
        path: 'rentals',
        loadChildren: './modules/rentals/rentals.module#RentalsModule',
        data: { title: 'Rentals', breadcrumb: 'Rentals'}
      },
      {
        path: 'history',
        loadChildren: './modules/history/history.module#HistoryModule',
        data: { title: 'History', breadcrumb: 'History'}
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth/404'
  // }
];

