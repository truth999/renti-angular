import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headersConfig: any = {};

    const token = this.tokenService.get();

    if (token) {
      headersConfig = {...headersConfig, Authorization: token};
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
