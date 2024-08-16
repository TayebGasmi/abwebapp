import {Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {authGuard} from "./core/guard/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes)
  },
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
        loadChildren: () => import('./modules/profile/profile.routes').then(m => m.routes),
        canActivate: [authGuard],


      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then(m => m.routes),
        canActivate: [authGuard],
        data: {roles: ['ADMIN']}
      }

    ],
  },

];
