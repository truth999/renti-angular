import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthAlertComponent } from './components/auth-alert/auth-alert.component';
import { AuthCompleteComponent } from './components/auth-complete/auth-complete.component';
import { ApartmentCreateComponent } from './components/apartment-create/apartment-create.component';

import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'confirmation', component: AuthAlertComponent },
  { path: 'auth/complete', component: AuthCompleteComponent, canLoad: [AuthGuard] },
  { path: 'apartment-create', component: ApartmentCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
