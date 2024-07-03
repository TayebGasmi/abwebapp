import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ButtonDemoComponent} from "../../demo/components/uikit/button/buttondemo.component";
import {HomeComponent} from "./home.component";

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: HomeComponent }
  ])],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
