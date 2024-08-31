import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {BackgroundComponent} from "../../../shared/components/background/background.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    InputTextModule,
    RouterLink,
    AppConfigComponent,
    BackgroundComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor() {
  }

}
