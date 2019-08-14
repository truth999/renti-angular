import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { HomeComponent } from './components/home/home.component';
import { MapModalComponent } from './components/modal/map-modal/map-modal.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AuthGuard } from './guards/auth.guard';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { CursorWaitService } from './services/cursor-wait.service';
import { ImageUploaderService } from './services/image-uploader.service';
import { StorageService } from './services/storage.service';
import { ValidateFormFieldsService } from './services/validate-form-fields.service';
import { HomeService } from './services/home.service';
import { MapModalService } from './services/modal/map-modal.service';
import { HeatmapService } from '../modules/heatmap/services/heatmap.service';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  declarations: [
    HomeComponent,
    MapModalComponent
  ],
  imports: [
    SharedModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiService,
    AuthService,
    CursorWaitService,
    ImageUploaderService,
    StorageService,
    AuthGuard,
    ValidateFormFieldsService,
    HomeService,
    MapModalService,
    HeatmapService,
    NotificationsService
  ],
  entryComponents: [
    MapModalComponent
  ]
})
export class CoreModule { }
