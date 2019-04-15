import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {StorageService} from './services/storage.service';
import {CursorWaitService} from './services/cursor-wait.service';
import {AuthGuard} from './guards/auth.guard';
import {ImageUploaderService} from './services/image-uploader.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiService,
    StorageService,
    CursorWaitService,
    AuthGuard,
    ImageUploaderService,
    AuthService
  ]
})
export class CoreModule { }
