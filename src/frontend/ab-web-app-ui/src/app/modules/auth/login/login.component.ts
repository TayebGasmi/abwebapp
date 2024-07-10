import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {RouterLink} from "@angular/router";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {LayoutService} from "../../../layout/service/app.layout.service";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {GoogleSigninButtonModule, MicrosoftLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {DividerModule} from "primeng/divider";
import {AuthService} from "../../../core/service/auth.service";

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
    GoogleSigninButtonModule,
    DividerModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.login(user);
    }
    )

  }

  rememberMe: boolean = false;
  private socialAuthService = inject(SocialAuthService);

  constructor(private layoutService: LayoutService, private authService: AuthService) {
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }


  signInWithOutlook(): void {
    this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID).then(r =>
      console.log(r));
  }
}
