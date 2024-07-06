import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoleComponent} from "./role.component";


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RoleComponent }
  ])],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
