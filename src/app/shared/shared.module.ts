import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

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
import { HeatmapFlatModalComponent } from './components/modal/heatmap/heatmap-flat-modal/heatmap-flat-modal.component';
import { HeatmapTenantModalComponent } from './components/modal/heatmap/heatmap-tenant-modal/heatmap-tenant-modal.component';
import { FeedbackModalComponent } from './components/modal/feedback-modal/feedback-modal.component';

import { PhotoUploadModalService } from './services/modal/photo-upload-modal.service';
import { PhotoEditModalService } from './services/modal/photo-edit-modal.service';
import { ResponsiveService } from './services/responsive.service';
import { DateSelectService } from './services/date-select.service';
import { HeatmapFlatModalService } from './services/modal/heatmap/heatmap-flat-modal.service';
import { HeatmapTenantModalService } from './services/modal/heatmap/heatmap-tenant-modal.service';
import { FeedbackModalService } from './services/modal/feedback-modal.service';
import { LayoutService } from './services/layout.service';

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
    HeatmapFlatModalComponent,
    HeatmapTenantModalComponent,
    FeedbackModalComponent
  ],
  entryComponents: [
    PhotoUploadModalComponent,
    PhotoEditModalComponent,
    HeatmapFlatModalComponent,
    HeatmapTenantModalComponent,
    FeedbackModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NgbModule,
    NouisliderModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule,
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
    HeatmapFlatModalComponent,
    HeatmapTenantModalComponent,
    FeedbackModalComponent
  ],
  providers: [
    PhotoUploadModalService,
    PhotoEditModalService,
    ResponsiveService,
    DateSelectService,
    HeatmapFlatModalService,
    HeatmapTenantModalService,
    FeedbackModalService,
    LayoutService
  ]
})
export class SharedModule { }
