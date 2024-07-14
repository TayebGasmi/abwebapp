import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {Router, RouterLink} from '@angular/router';
import {AppConfigComponent} from '../../../layout/config/app.config.component';
import {LayoutService} from '../../../layout/service/app.layout.service';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {GoogleSigninButtonModule, MicrosoftLoginProvider, SocialAuthService} from '@abacritt/angularx-social-login';
import {DividerModule} from 'primeng/divider';
import {AuthService} from '../../../core/service/auth.service';
import {Login} from '../../../core/models/login';
import {BackgroundComponent} from "../../../shared/components/background/background.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    RouterLink,
    AppConfigComponent,
    ButtonDirective,
    Ripple,
    GoogleSigninButtonModule,
    DividerModule,
    BackgroundComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  router = inject(Router);
  private socialAuthService = inject(SocialAuthService);

  constructor(
    private fb: FormBuilder,
    private layoutService: LayoutService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false]
    });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.login(user);
      console.log(user.idToken);
    });
  }

  loginUser(): void {
    const login: Login = this.loginForm.value;
    this.authService.signBack(login).subscribe({
      next: response => {
        console.log('Login successful', response);
        localStorage.clear();
        this.router.navigate(['']);
      },
      error: error => {
        this.router.navigate(['auth/register']);
        console.error('Login failed', error);
      }
    });
  }

  signInWithOutlook(): void {
    this.socialAuthService.signIn(MicrosoftLoginProvider.PROVIDER_ID).then(r => console.log(r))
  }
}
