import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupFunnelComponent } from './components/signup-funnel/signup-funnel.component';
import { ApartmentCreateComponent } from './components/apartment-create/apartment-create.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-funnel', component: SignupFunnelComponent },
  { path: 'apartment-create', component: ApartmentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
