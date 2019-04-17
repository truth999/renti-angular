import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    FormsModule,
    NgbModule,
    AuthLayoutComponent
  ]
})
export class SharedModule { }
