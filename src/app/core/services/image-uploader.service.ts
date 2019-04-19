import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ImageUploaderService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  upload(images) {
    const formData = new FormData();

    for (let index = 0; index < images.length; index++) {
      formData.append(`images`, images[index]);
    }

    formData.append(`images`, images);

    return this.post('images', formData);
  }

  private post(url, formData): Promise<string | string[]> {
    const fullUrl = this.makeFullUrl(url);

    return this.http.post<any>(fullUrl, formData)
      .pipe(catchError(this.processHttpError()))
      .toPromise();
  }

  private makeFullUrl(url: string): string {
    return environment.uploadApiBase + url;
  }

  makeHeaders() {
    const headers = { 'Content-Type': 'multipart/form-data' };

    return { headers: new HttpHeaders(headers) };
  }

  private processHttpError<T>(result?: T) {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      console.log('ApiService->ProcessHttpError->HttpErrorResponse', errorResponse);

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
