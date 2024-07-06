import {Component} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PasswordModule,
    CheckboxModule,
    FormsModule,
    RouterLink,
    ButtonDirective,
    Ripple,
    AppConfigComponent,
    InputTextModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  confirmed: boolean = false;

  constructor(private layoutService: LayoutService) {
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
