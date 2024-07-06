import { Component } from '@angular/core';
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
  selector: 'app-new-passowrd',
  standalone: true,
  imports: [
    AppConfigComponent,
    ButtonDirective,
    RouterLink,
    Ripple,
    PasswordModule
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
