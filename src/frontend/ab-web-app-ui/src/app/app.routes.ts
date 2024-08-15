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
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER']}
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER']}

      },
      {
        path: 'sessionlist',
        loadComponent: () => import('./modules/session/sessionlist/sessionlist.component').then(m => m.SessionlistComponent),
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER']}
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then(m => m.routes),
        canActivate: [authGuard],
        data: {roles: ['ADMIN']}
      }

    ],
  },
  {
    path: 'completeprofile',
    loadChildren: () => import('./modules/complete-profile/complete.routes').then(m => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes)
  },
  {
    path: '**', redirectTo: '/notfound'
  }
];
