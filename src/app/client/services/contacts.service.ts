import { Injectable } from '@angular/core';
import {ClientHttpClientService} from '@services/client-http-client.service';

type ContactDto = {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: ClientHttpClientService) { }

  create(contact: ContactDto) {
    const uri = 'contacts';

    return this.http.post(uri, contact);
  }
}
