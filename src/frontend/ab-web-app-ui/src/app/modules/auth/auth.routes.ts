import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'access-denied',
    loadComponent: () => import('./access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  },

];
