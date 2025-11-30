import { Injectable } from '@angular/core';
import {AdminHttpClientService} from '@services/admin-http-client.service';
import {HttpResponse} from '@app/types/http.response';
import {ContactEntity} from '@entities/contact.entity';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private adminHttp: AdminHttpClientService) { }

  getAll() {
    return this.adminHttp.get<HttpResponse<{ results: ContactEntity[] }>>('contacts')
  }
}
