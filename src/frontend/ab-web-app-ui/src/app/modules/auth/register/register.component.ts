import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/service/auth.service";
import {Register} from "../../../core/models/register";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ButtonDirective} from "primeng/button";
import {BackgroundComponent} from "../../../shared/components/background/background.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {CheckboxModule} from "primeng/checkbox";
import {Ripple} from "primeng/ripple";
import {registerForm} from "../../../core/forms/register.form";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ButtonDirective,
    BackgroundComponent,
    FormComponent,
    CheckboxModule,
    Ripple
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  checkUser!: string ;
  role: any[] = ["TEACHER", "STUDENT"];
  form = registerForm;
  dark: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  signupUser(userData: any): void {
    const signup: Register = {
      email: userData.email,
      password: userData.password,
      roles: [userData.role]
    };

    this.authService.signupBack(signup).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 405) {
          this.checkUser = "User " + userData.username + " already exists!";
        }
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.router.navigate(['/auth/verification']).then(() => {
        console.log('User registered successfully');
      });
    });
  }

  protected readonly registerForm = registerForm;
}
