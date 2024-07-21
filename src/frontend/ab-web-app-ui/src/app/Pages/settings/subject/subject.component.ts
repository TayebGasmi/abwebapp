import {Component} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {Button, ButtonDirective} from "primeng/button";
import {FormComponent} from "../../../shared/components/form/form.component";
import {registerForm} from "../../../core/forms/register.form";
import {FormSideBarComponent} from "../../../shared/components/form-side-bar/form-side-bar.component";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    SidebarModule,
    Button,
    FormComponent,
    FormSideBarComponent,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  sidebarVisible = true ;
  formTitle = 'Add new Subject';
  protected readonly registerForm = registerForm;
}
