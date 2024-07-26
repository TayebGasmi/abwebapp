import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'subject',
    loadComponent: () => import('./subject/subject.component').then(m => m.SubjectComponent)
  },
  {
    path: 'school',
    loadComponent: () => import('./school/school.component').then(m => m.SchoolComponent)
  }
];
