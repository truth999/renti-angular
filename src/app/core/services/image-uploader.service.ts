import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {catchError} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable()
export class ImageUploaderService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  upload(images) {
    const formData = new FormData();
    if (images.length === 1) {
      formData.append('image', images[0]);
      return this.post('image', formData);
    } else {
      for(let index = 0; index < images.length; index++) {
        formData.append('images[]', images[index]);
      }
      return this.post('images', formData);
    }
  }

  private post(url, formData): Promise<string | string[]> {
    const fullUrl = this.makeFullUrl(url);
    const headers = this.makeHeaders();
    return this.http.post<string | string[]>(fullUrl, formData)
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
      console.log('ApiService->processHttpError->HttpErrorResponse', errorResponse);
      switch (errorResponse.status) {
        case 401:
          // ToDo:: Redirect to Login
          break;
        default:
          break;
      }
      return of(result as T);
    };
  }

}
