import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'session',
    loadComponent: () => import('./session/session/session.component').then(m => m.SessionComponent)
  },
  {
    path: 'sessionlist',
    loadComponent: () => import('./session/sessionlist/sessionlist.component').then(m => m.SessionlistComponent)
  }
];
