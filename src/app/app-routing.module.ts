import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
