import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject} from 'rxjs';

export const ADMIN_COOKIE_KEY = 'adminAccessToken'
export const COOKIE_KEY = 'accessToken'

type KeyType = 'admin' | 'client'

@Injectable({
  providedIn: 'root'
})
export class CookiesService {


  private clientTokenSubject = new BehaviorSubject<string|null>(null)
  clientToken$ = this.clientTokenSubject.asObservable()

  constructor(private cookieService: CookieService) {
    this.clientTokenSubject.next(this.getToken('client'))
  }

  /**
   *
   * @param token
   * @param key
   * @param duration - In Minutes
   */
  saveToken(token: string, key: KeyType, duration: number = 60) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + duration)

    this.cookieService.set(
      this.getTokenKey(key),
      token,
      date,
    )

    this.clientTokenSubject.next(token)
  }

  saveUserID(userID: string, duration: number = 60) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + duration)
    this.cookieService.set(
      'CLIENT_USER_ID',
      userID,
      date,
    )
  }

  getUserID() {
    return this.cookieService.get('CLIENT_USER_ID')
  }

  deleteToken(key: KeyType) {
    this.cookieService.delete(this.getTokenKey(key))
    this.clientTokenSubject.next(null)
  }

  deleteAllTokens() {
    this.cookieService.deleteAll()
    this.clientTokenSubject.next(null)
  }

  getToken(key: KeyType) {
    return this.renewSessionIfExists(key)
  }

  private renewSessionIfExists(key: KeyType) {
    const session = this.cookieService.get(this.getTokenKey(key))

    if (session) {
      this.saveToken(session, key)
    }

    return session
  }

  private getTokenKey(key: KeyType) {
    return key == 'client' ? COOKIE_KEY : ADMIN_COOKIE_KEY
  }
}
