import { ProductEntity } from '@/app/entities/product.entity';
import { ClientHttpClientService } from '@/app/services/client-http-client.service';
import { CookiesService } from '@/app/services/cookies.service';
import { Injectable } from '@angular/core';

type CreateOrderParams = {
  total: number | string,
  items: ProductEntity[],
  address: string,
  paymentMethod: 'card' | 'cash',
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private readonly httpClient: ClientHttpClientService,
    private readonly cookieService: CookiesService,
  ) { }

  createOrder(orderParams: CreateOrderParams) {
    const userId = this.cookieService.getUserID()

    if (!userId) return;

    return this.httpClient.post('orders', {
      ...orderParams,
      userId,
    })
  }

  getUserOrders() {
    return this.httpClient.get(`orders/my-orders/${this.cookieService.getUserID()}`)
  }

  getOrderById(orderId: string) {
    return this.httpClient.get(`orders/${orderId}`)
  }
}
