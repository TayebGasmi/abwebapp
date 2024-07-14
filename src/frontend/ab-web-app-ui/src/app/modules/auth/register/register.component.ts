import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../core/service/auth.service";
import {Register} from "../../../core/models/register";
import {ButtonDirective} from "primeng/button";
import {BackgroundComponent} from "../../../shared/components/background/background.component";
import {FormComponent} from "../../../shared/components/form/form.component";
import {CheckboxModule} from "primeng/checkbox";
import {Ripple} from "primeng/ripple";
import {registerForm} from "../../../core/forms/register.form";
import {FormGroup} from "@angular/forms";
import {catchError, throwError} from "rxjs";
import {formatIsoMonthStr} from "@fullcalendar/core/internal";

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

  role: any[] = ["TEACHER", "STUDENT"];
  form = registerForm;
  dark: boolean = false;


  constructor(private authService: AuthService, private router: Router) {
  }

  signupUser(form: FormGroup): void {
    console.log(form.value);
    console.log(form.valid);
    console.log(form);

    const userData = form.value;
    console.log(userData.role)
    const signup: Register = {
      firstName:' TEST',
      lastName:' TEST',
      email: userData.email,
      password: userData.password,
      roles: [{
        roleName:userData.role
      }]
    };

     this.authService.signupBack(signup).pipe(
       catchError((error) => {
         if(error.error.keyMessage=="error.entity.exist"){
           const mail=form.get("email")
           mail?.setErrors({ user_exist: true })
           console.log(mail)
         }
         return throwError(error)
       })
     ).subscribe(() => {
       this.router.navigate(['/auth/verification']).then(() => {
         console.log('User registered successfully');
       });
     });
  }
}
