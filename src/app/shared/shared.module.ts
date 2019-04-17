import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    RouterModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    NgbModule,
    TranslateModule,
    AuthLayoutComponent
  ]
})
export class SharedModule { }
