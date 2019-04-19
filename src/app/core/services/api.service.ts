import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string): Promise<any> {
    const fullUrl = this.makeFullUrl(url);

    return this.http.get(fullUrl)
      .pipe(catchError(this.processHttpError()))
      .toPromise();
  }

  post(url: string, body = {}): Promise<any> {
    const fullUrl = this.makeFullUrl(url);
    const headers = this.makeHeaders();

    return this.http.post(fullUrl, body, headers)
      .pipe(catchError(this.processHttpError()))
      .toPromise();
  }

  put(url: string, body = {}): Promise<any> {
    const fullUrl = this.makeFullUrl(url);
    const headers = this.makeHeaders();

    return this.http.put(fullUrl, body, headers)
      .pipe(catchError(this.processHttpError()))
      .toPromise();
  }

  delete(url: string): Promise<any> {
    const fullUrl = this.makeFullUrl(url);

    return this.http.delete(fullUrl)
      .pipe(catchError(this.processHttpError()))
      .toPromise();
  }

  private makeFullUrl(url: string): string {
    return environment.apiBase + url;
  }

  makeHeaders() {
    const headers = { 'Content-Type': 'application/json' };

    return { headers: new HttpHeaders(headers) };
  }

  private processHttpError<T>(result?: T) {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      console.log('ApiService->processHttpError->HttpErrorResponse', errorResponse);

      switch (errorResponse.status) {
        case 401:
          break;

        default:
          break;
      }

      return of(result as T);
    };
  }
}
