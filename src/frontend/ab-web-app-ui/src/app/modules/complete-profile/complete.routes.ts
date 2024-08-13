import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'profilecomplete',
    loadComponent: () => import('./complete-profile.component').then(m => m.CompleteProfileComponent)
  }
];
