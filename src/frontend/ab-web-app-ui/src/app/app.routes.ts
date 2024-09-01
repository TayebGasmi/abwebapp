import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {authGuard} from "./core/guard/auth.guard";
import {NgModule} from "@angular/core";

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.routes)
  },
  {
    path: 'complete',
    loadComponent: () => import('./modules/profile/complete-profile/complete-profile.component').then(m => m.CompleteProfileComponent),
  },
  {
    path: '',
    loadComponent: () => import('./modules/landingpage/landingpage.component').then(m => m.LandingpageComponent),
    data: {roles: ['STUDENT,ADMIN', 'TEACHER']}
  }
  ,
  {
    path: '', component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'calendar',
        loadComponent: () => import('./modules/session/session.component').then(m => m.SessionComponent),
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER']}
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.routes').then(m => m.routes),
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER']}
      }
      , {
        path: 'session-settings',
        loadComponent: () => import('./modules/settings/session/session.component').then(m => m.SessionComponent),
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER']}
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
