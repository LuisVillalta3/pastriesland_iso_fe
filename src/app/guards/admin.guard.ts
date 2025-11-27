import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ADMIN_COOKIE_KEY} from '@/app/services/cookies.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get(ADMIN_COOKIE_KEY)

  if (!token) {
    await router.navigate(['admin/login']);
    return false;
  }

  return true
};
