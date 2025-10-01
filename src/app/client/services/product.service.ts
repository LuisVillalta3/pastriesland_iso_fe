import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import {ProductEntity} from '@entities/product.entity';

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
export class ProductLocaleService {

  private readonly _products: ProductEntity[] = []

  constructor() {
    this._products = Array.from({ length: 10 }, (_, i): ProductEntity => {
      const product = new ProductEntity();

      product.name = faker.food.dish()
      product.basePrice = faker.commerce.price()
      product.active = true
      product.isComplement = Boolean(faker.number.binary())
      product.isOutstanding = Boolean(faker.number.binary())
      product.units = 100
      product.minPortions = 1
      product.maxPortions = 5

      product.images.push({
        id: 1,
        imageableId: '1',
        imageableType: 'products',
        path: 'https://placehold.co/600x400'
      })

      product.categories.push({
        id: '1',
        name: faker.word.words({ count: 1 }),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      product.categoriesIds.push('1')

      product.addons = faker.lorem.lines()
      product.flavors = faker.lorem.words()
      product.design = faker.lorem.words()

      return product;
    })
  }

  getProducts()  {
    return this._products;
  }

}
