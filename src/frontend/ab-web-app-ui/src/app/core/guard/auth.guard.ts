import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data["roles"] || [];
  if (!authService.isAuthenticated()) {
    router.navigate(['auth/login']);
    return false
  }
  if (!authService.hasRoles(expectedRoles)) {
    router.navigate(['auth/login']);
    return false
  }
  if (!authService.isProfileComplete()){
    router.navigate(['/complete'])
    return false
  }

  return true
};
