import { Injectable } from '@angular/core';
import {AdminHttpClientService} from '@services/admin-http-client.service';
@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  constructor(private adminHttpClient: AdminHttpClientService) {}

  create(fd: FormData) {
    return this.adminHttpClient.post('admin/uploads', fd)
  }

  delete(id: number) {
    return this.adminHttpClient.delete(`admin/uploads/${id}`)
  }
}
