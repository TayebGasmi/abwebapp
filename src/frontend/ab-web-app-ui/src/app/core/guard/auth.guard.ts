import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {TeacherService} from "../service/teacher.service";

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const teacherService:TeacherService=inject(TeacherService)
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
  if(!teacherService.isConfirmedByAdmin().subscribe(teacher=>teacher.confirmedByAdmin)){
    router.navigate(['/auth/login'])
    return false
  }

  return true
};
