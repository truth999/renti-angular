import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthAlertComponent } from './components/auth-alert/auth-alert.component';
import { AuthCompleteComponent } from './components/auth-complete/auth-complete.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ApartmentCreateComponent } from './components/apartment-create/apartment-create.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'confirmation', component: AuthAlertComponent },
  { path: 'auth/complete', component: AuthCompleteComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'apartment-create', component: ApartmentCreateComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
