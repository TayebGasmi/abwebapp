import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {authGuard} from "./core/guard/auth.guard";
import {NgModule} from "@angular/core";
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration:'enabled'
};
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
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then(m => m.routes),

      },
    ],
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
