import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const profileCompletedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated()) {
    return true
  }
  if (authService.isProfileComplete()){
    router.navigate(['/profile/details'])
    return false
  }
  return true;
};
