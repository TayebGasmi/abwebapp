import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {BackgroundComponent} from "../../../shared/components/background/background.component";

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    ButtonDirective,
    RouterLink,
    Ripple,
    PasswordModule,
    BackgroundComponent
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  constructor() {
  }


}
