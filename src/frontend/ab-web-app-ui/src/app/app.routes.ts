import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {authGuard} from "./core/guard/auth.guard";
import {NgModule} from "@angular/core";
import {profileCompletedGuard} from "./core/guard/profile-completed.guard";

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
    canActivate: [profileCompletedGuard],
    loadComponent: () => import('./modules/profile/complete-profile/complete-profile.component').then(m => m.CompleteProfileComponent),
  },
  {
    path: '',
    loadComponent: () => import('./modules/landingpage/landingpage.component').then(m => m.LandingpageComponent),
    data: {roles: ['STUDENT,ADMIN', 'TEACHER']}
  }
  ,
  {
    path: 'teachers-overview',
    loadComponent: () => import('./modules/landing-teacher/landing-teacher.component').then(m => m.LandingTeacherComponent),
    data: {roles: ['STUDENT,ADMIN', 'TEACHER']}
  },
  {
    path: '', component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'calendar',
        loadComponent: () => import('./modules/session/session-calender.component').then(m => m.SessionCalenderComponent),
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER']}
      },
      {
        path: 'dashboard-teacher',
        loadComponent: () => import('./modules/dashboards/teacher-dashboard/teacher-dashboard.component').then(m => m.TeacherDashboardComponent),
        canActivate: [authGuard],
        data: {roles: ['TEACHER']}
      },
      {
        path: 'dashboard-student',
        loadComponent: () => import('./modules/dashboards/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
        canActivate: [authGuard],
        data: {roles: ['STUDENT']}
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.routes').then(m => m.routes),
        canActivate: [authGuard],
        data: {roles: ['STUDENT', 'TEACHER', 'ADMIN']}
      }
      , {
        path: 'session-settings',
        loadComponent: () => import('./modules/session/session-list/session-list.component').then(m => m.SessionListComponent),
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
