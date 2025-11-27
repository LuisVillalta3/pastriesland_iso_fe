import { Injectable } from '@angular/core';
import {HttpContext} from '@angular/common/http';
import { IS_Client} from '@/app/interceptors/auth-context';
import {AbstractHttpClientService} from '@/app/services/abstract-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ClientHttpClientService extends AbstractHttpClientService {
  protected withContext(context?: HttpContext): HttpContext {
    return (context ?? new HttpContext()).set(IS_Client, true);
  }
}
