import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NouisliderModule } from 'ng2-nouislider';

import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ApartmentItemComponent } from './components/apartment-item/apartment-item.component';
import { PhotoUploadModalComponent } from './components/modal/photo-upload-modal/photo-upload-modal.component';
import { ProfileItemComponent } from './components/profile-item/profile-item.component';
import { PhotoEditModalComponent } from './components/modal/photo-edit-modal/photo-edit-modal.component';
import { CropEditorComponent } from './components/modal/photo-edit-modal/crop-editor/crop-editor.component';
import { FeedbackModalComponent } from './components/modal/feedback-modal/feedback-modal.component';
import { FloorPlanModalComponent } from './components/modal/floor-plan-modal/floor-plan-modal.component';
import { ConfirmModalComponent } from './components/modal/confirm-modal/confirm-modal.component';

import { PhotoUploadModalService } from './services/modal/photo-upload-modal.service';
import { PhotoEditModalService } from './services/modal/photo-edit-modal.service';
import { ResponsiveService } from './services/responsive.service';
import { DateSelectService } from './services/date-select.service';
import { FeedbackModalService } from './services/modal/feedback-modal.service';
import { LayoutService } from './services/layout.service';
import { FloorPlanModalService } from './services/modal/floor-plan-modal.service';
import { ConfirmModalService } from './services/modal/confirm-modal.service';

import { MenuCloseDirective } from './directives/menu-close.directive';

import { DateToAgePipe } from './pipes/date-to-age.pipe';
import { DateToStringPipe } from './pipes/date-to-string.pipe';

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    LayoutComponent,
    AuthLayoutComponent,
    FeedbackComponent,
    ApartmentItemComponent,
    MenuCloseDirective,
    ProfileItemComponent,
    PhotoUploadModalComponent,
    PhotoEditModalComponent,
    CropEditorComponent,
    DateToAgePipe,
    DateToStringPipe,
    FeedbackModalComponent,
    FloorPlanModalComponent,
    ConfirmModalComponent
  ],
  entryComponents: [
    PhotoUploadModalComponent,
    PhotoEditModalComponent,
    FeedbackModalComponent,
    FloorPlanModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgbModule,
    NouisliderModule,
    ReactiveFormsModule
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
    MenuCloseDirective,
    ProfileItemComponent,
    PhotoUploadModalComponent,
    PhotoEditModalComponent,
    CropEditorComponent,
    DateToAgePipe,
    DateToStringPipe,
    FeedbackModalComponent,
    FloorPlanModalComponent
  ],
  providers: [
    PhotoUploadModalService,
    PhotoEditModalService,
    ResponsiveService,
    DateSelectService,
    FeedbackModalService,
    LayoutService,
    FloorPlanModalService,
    ConfirmModalService
  ]
})
export class SharedModule { }
