import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {catchError, throwError} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../service/auth.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const translateService = inject(TranslateService)
  const authService=inject(AuthService)
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        notificationService.showError('Unauthorized');
      }

      if (error.status === 403) {
        authService.logout()
      }
      if (error?.error?.keyMessage && error.status === 400) {
        notificationService.showError(translateService.instant(error?.error?.keyMessage))
      }
      if (error.status === 500) {
        notificationService.showError('server error please try again later');
      }      return throwError(error);
    })
  );
};
