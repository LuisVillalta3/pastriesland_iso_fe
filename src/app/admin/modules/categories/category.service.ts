import { Injectable } from '@angular/core';
import {AdminHttpClientService} from '@services/admin-http-client.service';
import {CategoryEntity} from '@entities/category.entity';
import {HttpResponse} from '@app/types/http.response';

const URL = 'admin/categories'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private adminHttpClient: AdminHttpClientService) { }

  getAll() {
    return this.adminHttpClient.get<HttpResponse<{ results: CategoryEntity[] }>>(URL);
  }

  create(name: string, isActive: boolean) {
    return this.adminHttpClient.post(URL, {
      name, isActive,
    })
  }

  getById(id: string) {
    return this.adminHttpClient.get<HttpResponse<CategoryEntity>>(`${URL}/${id}`)
  }

  update(id: string, name: string, isActive: boolean) {
    return this.adminHttpClient.put(`${URL}/${id}`, {
      name, isActive
    })
  }

  delete(id: string) {
    return this.adminHttpClient.delete(`${URL}/${id}`)
  }
}
