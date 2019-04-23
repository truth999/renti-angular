import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    AuthLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgbDropdownModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TranslateModule,
    LanguageSelectorComponent,
    AuthLayoutComponent,
    AdminLayoutComponent
  ]
})
export class SharedModule { }
