import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AuthGuard } from './guards/auth.guard';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { CursorWaitService } from './services/cursor-wait.service';
import { ImageUploaderService } from './services/image-uploader.service';
import { StorageService } from './services/storage.service';
import { ValidateFormFieldsService } from './services/validate-form-fields.service';
import { HomeService } from './services/home.service';

import { HomeComponent } from './components/home/home.component';
import { HeatmapService } from '../modules/heatmap/services/heatmap.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
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
    HeatmapService
  ]
})
export class CoreModule { }
