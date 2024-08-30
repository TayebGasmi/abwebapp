import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterLink } from '@angular/router';
import { AppConfigComponent } from '../../../layout/config/app.config.component';
import { LayoutService } from '../../../layout/service/app.layout.service';
import { ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../../core/service/auth.service';
import { Login } from '../../../core/models/login';
import { BackgroundComponent } from "../../../shared/components/background/background.component";
import { map, switchMap, Subscription } from "rxjs";
import { SessionBookLandingService } from "../../../core/service/session-book-landing.service";
import { SessionDto } from "../../../core/models/session";

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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  router = inject(Router);
  private socialAuthService = inject(SocialAuthService);
  sessionDto!: SessionDto;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private layoutService: LayoutService,
    private authService: AuthService,
    private session: SessionBookLandingService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  ngOnInit(): void {
    const sessionSubscription = this.session.currentMessage.subscribe(session => this.sessionDto = session);
    console.log(this.sessionDto);

    const authSubscription = this.socialAuthService.authState.pipe(
      map((user) => ({
          oauthProvider: user.provider,
          idToken: user.idToken,
        })
      ),
      switchMap(user => this.authService.socialLogin(user))
    ).subscribe({
      next: response => {
        this.authService.addToken(response.accessToken);
        this.authService.addUser(response.user);
        this.router.navigate(['/profile/details']);
        this.authService.addRoles(response.roles);
      }
    });

    this.subscriptions.push(sessionSubscription, authSubscription);
  }

  loginUser(): void {
    const login: Login = this.loginForm.value;
    const loginSubscription = this.authService.signIn(login).subscribe({
      next: response => {
        this.authService.addToken(response.accessToken);
        this.authService.addRoles(response.roles);
        this.authService.addUser(response.user);
        this.router.navigate(['']);
      }
    });

    this.subscriptions.push(loginSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected readonly Object = Object;
}
