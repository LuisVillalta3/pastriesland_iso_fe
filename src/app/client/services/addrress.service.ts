import { AddressEntity } from '@/app/entities/address.entity';
import { HttpResponse } from '@/app/types/http.response';
import { Injectable } from '@angular/core';
import {ClientHttpClientService} from '@services/client-http-client.service';
import {CookiesService} from '@services/cookies.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddrressService {

  userID: string | null = null;

  constructor(
    private readonly httpClient: ClientHttpClientService,
    private readonly cookiesService: CookiesService,
  ) {
    this.userID = this.cookiesService.getUserID()
  }

  createAddress(addressName: string, address: string) {
    if (!this.userID) throw new Error('User ID is not defined');
    return this.httpClient.post('users/addresses/create', { addressName, address, userId: this.userID });
  }

  getAddresses(): Observable<HttpResponse<AddressEntity[]>> {
    if (!this.userID) throw new Error('User ID is not defined');
    return this.httpClient.get(`users/my-addresses/${this.userID}`);
  }
}
