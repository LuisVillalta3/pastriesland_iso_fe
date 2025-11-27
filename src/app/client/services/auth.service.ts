import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

type UserDto = {
  email: string;
  name: string;
  lastName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const uri = 'auth/login'

    return this.http.post(uri, { email, password })
  }

  register(user: UserDto): Observable<any> {
    const uri = 'users'

    return this.http.post(uri, user)
  }
}
