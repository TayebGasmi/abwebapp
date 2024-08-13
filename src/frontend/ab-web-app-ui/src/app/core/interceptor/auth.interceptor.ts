import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from "../service/auth.service";
import {inject} from '@angular/core';
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../models/User";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  const user:null | User =authService.getUser();
  const router = inject(Router);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  if(!user?.isCompleted){
    router.navigate(['/completeprofile/profilecomplete'])
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403) {
        router.navigate(['/auth/login']);
        localStorage.clear()
      }
      return throwError(error);
    })
  );
};
