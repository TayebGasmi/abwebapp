import { Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { authGuard } from "./core/guard/auth.guard";

export const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'calendar',
        loadComponent: () => import('./shared/components/calendar/calendar.component').then(m => m.CalendarComponent),
        canActivate: [authGuard] // Apply authGuard here as well
      },
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
