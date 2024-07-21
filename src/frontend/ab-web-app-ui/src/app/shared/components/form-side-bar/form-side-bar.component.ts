import {Component, Input} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {registerForm} from "../../../core/forms/register.form";
import {FormComponent} from "../form/form.component";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-form-side-bar',
  standalone: true,
  imports: [
    SidebarModule,
    FormComponent,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './form-side-bar.component.html',
  styleUrl: './form-side-bar.component.scss',
})
export class FormSideBarComponent {

  protected readonly registerForm = registerForm
  @Input()
  title!: string
  @Input()
  sidebarVisible: boolean = false

}
