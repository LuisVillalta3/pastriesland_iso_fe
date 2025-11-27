import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '@/environments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {

  const isAbsoluteUrl = req.url.startsWith('http://') || req.url.startsWith('https://');

  const apiReq = isAbsoluteUrl
    ? req
    : req.clone({ url: `${environment.apiUrl}/${req.url}` })

  return next(apiReq);
};
