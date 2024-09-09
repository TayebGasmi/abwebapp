import {Routes} from '@angular/router';

export const routes: Routes = [
   {
    path: 'access-denied',
    loadComponent: () => import('./access-denied/access-denied.component').then(m => m.AccessDeniedComponent)
  },

];
