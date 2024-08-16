import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from "../service/auth.service";
import {inject} from '@angular/core';
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../models/user";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  const user:null | User = authService.getUser();
  const router = inject(Router)
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  if(!user?.isCompleted){
    router.navigate(['/complete'])
  }else{
    router.navigate(['/'])
  }
  return next(req).pipe(
    catchError((error) => {

      return throwError(error);
    })
  );
};
