import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from "../service/auth.service";
import {inject} from '@angular/core';
import {catchError, throwError} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {

      return throwError(error);
    })
  );
};
