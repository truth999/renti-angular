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
import { SuccessComponent } from './components/success/success.component';
import { MenuCloseDirective } from './directives/menu-close.directive';
import { ProfileItemComponent } from './components/profile-item/profile-item.component';
import { PhotoUploadModalService } from './services/modal/photo-upload-modal.service';
import { PhotoEditModalService } from './services/modal/photo-edit-modal.service';
import { PhotoUploadModalComponent } from './components/modal/photo-upload-modal/photo-upload-modal.component';
import { PhotoEditModalComponent } from './components/modal/photo-edit-modal/photo-edit-modal.component';
import { CropEditorComponent } from './components/modal/photo-edit-modal/crop-editor/crop-editor.component';
import { NouisliderModule } from 'ng2-nouislider';
import { ResponsiveService } from './services/responsive.service';
import { DateSelectService } from './services/date-select.service';

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    LayoutComponent,
    AuthLayoutComponent,
    FeedbackComponent,
    ApartmentItemComponent,
    SuccessComponent,
    MenuCloseDirective,
    ProfileItemComponent,
    PhotoUploadModalComponent,
    PhotoEditModalComponent,
    CropEditorComponent
  ],
  entryComponents: [
    PhotoUploadModalComponent,
    PhotoEditModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgbModule,
    NouisliderModule
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
    ApartmentItemComponent,
    SuccessComponent,
    MenuCloseDirective,
    ProfileItemComponent,
    PhotoUploadModalComponent,
    PhotoEditModalComponent,
    CropEditorComponent
  ],
  providers: [
    PhotoUploadModalService,
    PhotoEditModalService,
    ResponsiveService,
    DateSelectService
  ]
})
export class SharedModule { }
