import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ImageUploaderService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  b64toBlob(photo, sliceSize = 512) {
    const block = photo.split(';');
    const contentType = block[0].split(':')[1];
    const b64Data = block[1].split(',')[1];
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  upload(images) {
    const formData = new FormData();

    for (let index = 0; index < images.length; index++) {
      formData.append('images', images[index]);
    }

    formData.append('images', images);

    return this.post('images', formData);
  }

  private post(url, formData): Promise<string | string[]> {
    const fullUrl = this.makeFullUrl(url);

    return this.http.post<any>(fullUrl, formData)
      .pipe(catchError(this.formatErrors))
      .toPromise();
  }

  private makeFullUrl(url: string): string {
    return environment.uploadApiBase + url;
  }

  makeHeaders() {
    const headers = { 'Content-Type': 'multipart/form-data' };

    return { headers: new HttpHeaders(headers) };
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  private processHttpError<T>(result?: T) {
    return (errorResponse: HttpErrorResponse): Observable<T> => {
      console.log('ImageUploaderService->ProcessHttpError->HttpErrorResponse', errorResponse);

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
