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
      if(error?.error?.debugMessage)
        notificationService.showError(error.error.debugMessage);
      else
        notificationService.showError('An error occurred. Please try again later.');
      return throwError(error);
    })
  );
};
