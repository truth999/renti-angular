import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgbDropdownModule
  ],
  exports: [
    FormsModule,
    NgbModule,
    TranslateModule,
    AuthLayoutComponent,
    LanguageSelectorComponent,
  ]
})
export class SharedModule { }
