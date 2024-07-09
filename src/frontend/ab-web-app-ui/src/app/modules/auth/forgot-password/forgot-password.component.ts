import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    InputTextModule,
    RouterLink,
    AppConfigComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
