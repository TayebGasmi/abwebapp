import {Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: 'calendar', loadComponent: () => import('./shared/components/calendar/calendar.component').then(m => m.CalendarComponent)
      }
    ]

  },
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes)
  },
  {path: '**', redirectTo: '/notfound'}
];
