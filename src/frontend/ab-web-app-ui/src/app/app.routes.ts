import {Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {authGuard} from "./core/guard/auth.guard";

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'calendar',
        loadComponent: () => import('./shared/components/calendar/calendar.component').then(m => m.CalendarComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'session',
        loadComponent: () => import('./modules/session/session/session.component').then(m => m.SessionComponent),
        canActivate: [authGuard]
      },
      {
        path: 'sessionlist',
        loadComponent: () => import('./modules/session/sessionlist/sessionlist.component').then(m => m.SessionlistComponent),
        canActivate: [authGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then(m => m.routes),
        canActivate: [authGuard]
      }
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes)
  },
  {
    path: '**', redirectTo: '/notfound'
  }
];
