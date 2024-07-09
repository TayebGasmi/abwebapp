import {Component, inject} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {RouterLink} from "@angular/router";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    CheckboxModule,
    RouterLink,
    AppConfigComponent,
    ButtonDirective,
    Ripple,
    GoogleSigninButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  rememberMe: boolean = false;

  constructor(private layoutService: LayoutService) {
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  private authService = inject(SocialAuthService);

  signInWithGoogle() {
    this.authService.authState.subscribe((user) => {
        console.log(user);
      }
    );

  }
}
