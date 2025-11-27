import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {CookiesService} from '@/app/services/cookies.service';
import {IS_ADMIN, IS_Client} from '@/app/interceptors/auth-context';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookiesService = inject(CookiesService)

  const isAdmin = req.context.get(IS_ADMIN);
  const isClient = req.context.get(IS_Client);

  let token = ''

  if (isAdmin) {
    token = cookiesService.getToken('admin');
  } else if (isClient) {
    token = cookiesService.getToken('client');
  }

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    },
  })

  return next(authReq);
};
