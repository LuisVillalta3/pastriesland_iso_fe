import {ActivatedRoute, CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {COOKIE_KEY} from '@services/cookies.service';

export const clientGuard: CanActivateFn = async (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const activatedRoute = inject(ActivatedRoute)

  const token = cookieService.get(COOKIE_KEY)

  if (!token) {
    await router.navigate(['inicio'], {
      relativeTo: activatedRoute,
      queryParams: { login: true }
    });
    return false;
  }

  return true
};
