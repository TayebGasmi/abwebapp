import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'details',
    loadComponent: () => import('./profile.component').then(m => m.ProfileComponent)
  }
];
