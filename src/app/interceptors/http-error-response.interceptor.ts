import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {NotificationService} from '@services/notification.service';
import {inject} from '@angular/core';
import { catchError, throwError } from 'rxjs';

const ErrorMessages: { [key: number]: string } = {
  401: 'No autorizado. Por favor, vuelve a iniciar sesión.',
  404: 'Recurso no encontrado',
  500: 'Ha ocurrido un error',
}

export const httpErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      notification.show(ErrorMessages[error.status] || error.error.message, 'error')

      return throwError(() => error)
    })
  );
};
