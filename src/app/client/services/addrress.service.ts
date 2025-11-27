import { Injectable } from '@angular/core';
import {ClientHttpClientService} from '@services/client-http-client.service';
import {CookiesService} from '@services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AddrressService {

  constructor(
    private readonly httpClient: ClientHttpClientService,
    private readonly cookiesService: CookiesService,
  ) { }

  createAddress(addressName: string, address: string) {
    const token = this.cookiesService.getToken('client')

    console.log(token)

    //return this.httpClient.post('/users/addresses/create', { addressName, address });
  }
}
