import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'subject',
    loadComponent: () => import('./subject/subject.component').then(m => m.SubjectComponent)
  },
  {
    path: 'school',
    loadComponent: () => import('./school/schooltype.component').then(m => m.SchooltypeComponent)
  },
  {
    path: 'config',
    loadComponent: () => import('./config/config/config.component').then(m => m.ConfigComponent)
  },
  {
    path: 'school-year',
    loadComponent: () => import('./school-year/school-year.component').then(m => m.SchoolYearComponent)
  },
  {
    path: 'teacher',
    loadComponent: () => import('./teacher/teacher.component').then(m => m.TeacherComponent)
  },
  {
    path: 'session',
    loadComponent: () => import('./session/session-list/session-list.component').then(m => m.SessionListComponent)
  },
];
