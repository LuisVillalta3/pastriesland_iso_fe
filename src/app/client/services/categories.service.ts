import { Injectable } from '@angular/core';
import {ClientHttpClientService} from '@services/client-http-client.service';
import {CategoryEntity} from '@entities/category.entity';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: ClientHttpClientService) { }

  getCategories() {
    return this.httpClient.get<{ results: CategoryEntity[] }>('categories');
  }
}
