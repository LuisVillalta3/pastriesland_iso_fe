import { ProductEntity } from '@/app/entities/product.entity';
import { ClientHttpClientService } from '@/app/services/client-http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly httpClient: ClientHttpClientService) { }

  createOrder(total: string, products: ProductEntity[]) {

  }
}
