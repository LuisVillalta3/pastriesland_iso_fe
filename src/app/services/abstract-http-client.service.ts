import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import {IS_ADMIN} from '@/app/interceptors/auth-context';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractHttpClientService {

  protected constructor(private http: HttpClient) {}

  protected abstract withContext(context?: HttpContext): HttpContext;

  get<T>(
    url: string,
    options: { context?: HttpContext; params?: HttpParams; headers?: HttpHeaders } = {}
  ): Observable<T> {
    return this.http.get<T>(url, {
      ...options,
      context: this.withContext(options.context),
    });
  }

  post<T>(
    url: string,
    body: any,
    options: { context?: HttpContext; params?: HttpParams; headers?: HttpHeaders } = {}
  ): Observable<T> {
    return this.http.post<T>(url, body, {
      ...options,
      context: this.withContext(options.context),
    });
  }

  put<T>(
    url: string,
    body: any,
    options: { context?: HttpContext; params?: HttpParams; headers?: HttpHeaders } = {}
  ): Observable<T> {
    return this.http.put<T>(url, body, {
      ...options,
      context: this.withContext(options.context),
    });
  }

  delete<T>(
    url: string,
    options: { context?: HttpContext; params?: HttpParams; headers?: HttpHeaders } = {}
  ): Observable<T> {
    return this.http.delete<T>(url, {
      ...options,
      context: this.withContext(options.context),
    });
  }
}
