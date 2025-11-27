import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {NotificationService} from '@services/notification.service';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const httpErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        notification.show('No autorizado. Por favor, vuelve a iniciar sesión.', 'error')
      } else if (error.status === 404) {
        notification.show('Recurso no encontrado', 'error')
      } else if (error.status === 500) {
        notification.show('Ha ocurrido un error', 'error')
      } else {
        notification.show(error.error.message, 'error')
      }

      return throwError(() => error)
    })
  );
};
