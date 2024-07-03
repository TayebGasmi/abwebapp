import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
          { path: 'dashboard', data: { breadcrumb: 'Dashboard' }, loadChildren: () => import('./modules/home/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'user',data: { breadcrumb: 'Users' }, loadChildren: () => import('./modules/home/pages/user/user.module').then(m => m.UserModule) },
          { path: 'role',data: { breadcrumb: 'Roles' }, loadChildren: () => import('./modules/home/pages/role/role.module').then(m => m.RoleModule) },
        ]
    },

    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
