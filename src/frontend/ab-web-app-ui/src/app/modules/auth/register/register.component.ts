import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/service/auth.service";
import {Register} from "../../../core/models/register";
import {ButtonDirective} from "primeng/button";
import {BackgroundComponent} from "../../../shared/components/background/background.component";
import {CheckboxModule} from "primeng/checkbox";
import {Ripple} from "primeng/ripple";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {catchError, throwError} from "rxjs";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ButtonDirective,
    BackgroundComponent,
    CheckboxModule,
    Ripple,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form!: FormGroup;
  dark: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator,
      updateOn: 'blur'
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  signupUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const registerRequest: Register = {
      email: formValue.email,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName
    };
    this.authService.signUp(registerRequest).pipe(
      catchError((error) => {
        if (error.error.keyMessage === "error.entity.exist") {
          const emailControl = this.form.get("email");
          emailControl?.setErrors({user_exist: true});
        }
        return throwError(error);
      })
    ).subscribe(() => {
      this.router.navigate(['/auth/verification/' + registerRequest.email]).then(() => {
      });
    });
  }

  fieldHasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  getFieldErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.errors) {
      if (control.errors["required"]) {
        if (fieldName === 'terms') {
          return `You must accept the terms and conditions`;
        }
        if (fieldName === 'confirmPassword') {
          return `Confirm password is required`;
        }
        return `${fieldName} is required`;
      } else if (control.errors["minlength"]) {
        return `${fieldName} must be at least ${control.errors["minlength"].requiredLength} characters`;
      } else if (control.errors["user_exist"]) {
        return `This ${fieldName} already exists`;
      } else if (control.errors["email"]) {
        return `Please enter a valid email address`;
      } else if (control.errors["pattern"]) {
        return `${fieldName} must contain at least one uppercase letter, one lowercase letter, and one number`;
      } else if (control.errors["mismatch"]) {
        return `Passwords do not match`;
      }
    }
    return '';
  }
}
