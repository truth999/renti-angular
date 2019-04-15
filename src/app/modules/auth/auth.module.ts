import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatProgressBarModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LockscreenComponent } from './components/lockscreen/lockscreen.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import {AuthRoutes} from './auth.routing';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule.forChild(AuthRoutes)
  ],
  declarations: [ForgotPasswordComponent, LockscreenComponent, SigninComponent, SignupComponent, NotFoundComponent, ErrorComponent]
})
export class AuthModule { }
