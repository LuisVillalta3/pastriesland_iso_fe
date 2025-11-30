import { Injectable } from '@angular/core';
import {AdminHttpClientService} from '@services/admin-http-client.service';
import {HttpResponse} from '@app/types/http.response';
import {ProductEntity} from '@entities/product.entity';
import {CategoryEntity} from '@entities/category.entity';

const URL = 'admin/products'

type ProductDto = {
  name: string,
  basePrice: string,
  active: boolean,
  categoriesIds: string[],
  isComplement: boolean,
  maxPortions: number,
  minPortions: number,
  units: number,
  addons: string,
  flavors: string,
  design: string,
  isOutstanding: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private adminHttpClient: AdminHttpClientService) { }

  create(
    {
      name,
      active,
      basePrice,
      categoriesIds,
      isComplement,
      maxPortions,
      minPortions,
      units,
      isOutstanding,
      addons,
      flavors,
      design
    }: ProductDto
  ) {
    return this.adminHttpClient.post<HttpResponse<ProductEntity>>(URL, {
      name,
      active,
      basePrice,
      categoriesIDs: categoriesIds,
      isComplement,
      maxPortions,
      minPortions,
      isOutstanding,
      units,
      addons,
      flavors,
      design
    })
  }

  update(
    id: string,
    {
      name,
      active,
      basePrice,
      categoriesIds,
      isComplement,
      maxPortions,
      minPortions,
      units,
      isOutstanding,
      addons,
      flavors,
      design
    }: ProductDto
  ) {
    return this.adminHttpClient.put<HttpResponse<ProductEntity>>(`${URL}/${id}`, {
      name,
      active,
      isOutstanding,
      basePrice,
      categoriesIDs: categoriesIds,
      isComplement,
      maxPortions,
      minPortions,
      units,
      addons,
      flavors,
      design
    })
  }

  getAll() {
    return this.adminHttpClient.get<HttpResponse<{ results: CategoryEntity[] }>>(URL)
  }

  getById(id: string) {
    return this.adminHttpClient.get<HttpResponse<ProductEntity>>(`${URL}/${id}`)
  }
}
