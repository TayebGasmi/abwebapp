import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {map, of} from "rxjs";
import {catchError} from "rxjs/operators";

export const authGuard: CanActivateFn = (route,   state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return of(false);
  }

  return of(true);
};
