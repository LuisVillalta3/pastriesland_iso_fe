import { Injectable } from '@angular/core';
import {AbstractHttpClientService} from '@/app/services/abstract-http-client.service';
import {HttpContext} from '@angular/common/http';
import {IS_ADMIN} from '@/app/interceptors/auth-context';

@Injectable({
  providedIn: 'root'
})
export class AdminHttpClientService extends AbstractHttpClientService {
  protected withContext(context?: HttpContext): HttpContext {
    return (context ?? new HttpContext()).set(IS_ADMIN, true);
  }
}
