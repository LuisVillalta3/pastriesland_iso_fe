import { Injectable } from '@angular/core';
import {ClientHttpClientService} from '@services/client-http-client.service';
import {HttpResponse} from '@app/types/http.response';
import {ProductEntity} from '@entities/product.entity';
import {HttpParams} from '@angular/common/http';
import {PaginatedResponse} from '@app/types/paginated.response';

const URI = 'products';

type GetProductDto = {
  onlyOutstandings?: boolean
  paginated?: boolean
  page?: number
  limit?: number
  categories?: string[]
}



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private  httpClient: ClientHttpClientService) { }

  getProducts(props: GetProductDto) {
    const { onlyOutstandings = false } = props

    const queryParams = new HttpParams()
      .set('onlyOutstandings', onlyOutstandings.toString());

    return this.httpClient.get<HttpResponse<ProductEntity[]>>(URI, {params: queryParams})
  }

  getProductsPaginated(props: GetProductDto) {
    const { page = 1, limit = 6, onlyOutstandings = false, paginated = false } = props

    const queryParams = new HttpParams()
      .set('onlyOutstandings', onlyOutstandings.toString())
      .set('paginated', paginated.toString())
      .set('categories', props.categories?.join(',') || '')
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.httpClient.get<HttpResponse<PaginatedResponse<ProductEntity>>>(URI, {params: queryParams})
  }
}
