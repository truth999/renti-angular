import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { CursorWaitService } from './services/cursor-wait.service';
import { ImageUploaderService } from './services/image-uploader.service';
import { LocalStorageService } from './services/local-storage.service';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

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
    LocalStorageService,
    StorageService,
    AuthGuard
  ]
})
export class CoreModule { }
