import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ApartmentItemComponent } from './components/apartment-item/apartment-item.component';

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    LayoutComponent,
    AuthLayoutComponent,
    FeedbackComponent,
    ApartmentItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    TranslateModule,
    LanguageSelectorComponent,
    LayoutComponent,
    AuthLayoutComponent,
    FeedbackComponent,
    ApartmentItemComponent
  ]
})
export class SharedModule { }
