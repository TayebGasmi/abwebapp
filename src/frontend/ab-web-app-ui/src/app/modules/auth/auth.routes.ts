import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'access-denied',
    loadComponent: () => import('./access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  },
  {
    path: 'new-password',
    loadComponent: () => import('./new-password/new-password.component').then(m => m.NewPasswordComponent)
  }
  , {
    path: 'verification/:email'
    , loadComponent: () => import('./verification/verification.component').then(m => m.VerificationComponent)
  }
];
