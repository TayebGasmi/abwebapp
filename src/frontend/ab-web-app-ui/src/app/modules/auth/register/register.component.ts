import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/service/auth.service";
import {Register} from "../../../shared/DTO/register";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {MessageModule} from "primeng/message";
import {FormComponent} from "../../../shared/components/form/form.component";
import {loginForm} from "../../../core/forms/login.form";
import {BackgroundComponent} from "../../../shared/components/background/background.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PasswordModule,
    CheckboxModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonDirective,
    Ripple,
    AppConfigComponent,
    InputTextModule,
    DropdownModule,
    MessageModule,
    FormComponent,
    BackgroundComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  checkUser: string = '';
  role: any[] = ["TEACHER", "STUDENT"];
  router = inject(Router);

  constructor(private fb: FormBuilder, private layoutService: LayoutService, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      selectedRole: ['', Validators.required],
      confirmed: [false, Validators.requiredTrue]
    }, {
      validator: this.passwordMatchValidator
    });
  }


  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : {passwordMismatch: true};
  }

  signupUser(): void {
    if (this.registerForm.valid) {
      const signup: Register = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        roles: [this.registerForm.value.selectedRole]
      };

      this.authService.signupBack(signup).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 405) {
            this.checkUser = "user " + this.registerForm.value.username + " already exists!";
          }
          return throwError(() => error);
        })
      ).subscribe(() => {
        this.router.navigate(['/auth/login']).then(() => {
          console.log('User registered successfully');
        }
      );
      });
    }
  }

  protected readonly loginForm = loginForm;
}
