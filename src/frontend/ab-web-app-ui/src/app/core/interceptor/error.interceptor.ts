import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import {catchError, throwError} from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  return next(req).pipe(
    catchError((error) => {
      if(error.status === 401)
        notificationService.showError('Unauthorized');
      if(error?.error?.debugMessage && error.status === 400)
        notificationService.showError(error.error.debugMessage);
      if(error.status === 500)
        notificationService.showError('server error please try again later');
      return throwError(error);
    })
  );
};
