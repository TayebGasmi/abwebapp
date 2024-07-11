import {Component, inject, SimpleChanges} from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {AppConfigComponent} from "../../../layout/config/app.config.component";
import {InputTextModule} from "primeng/inputtext";
import {Role} from "../../../shared/DTO/Role";
import {DropdownModule} from "primeng/dropdown";
import {AuthService} from "../../../core/service/auth.service";
import {Register} from "../../../shared/DTO/register";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

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
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  checkUser:string='';
  username:string='';
  password:string='';
  email:string='';
  role:any[] = ["TEACHER","STUDENT"]
  selectedRole:string='';
  confirmed: boolean = false;
  router=inject(Router);
  constructor(private layoutService: LayoutService,private authservice:AuthService) {
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
  ngOnChanges() {
    console.log(this.selectedRole)
  }
  singupUser(){
    console.log(this.getSelectedRoles())
    const signup:Register={
      username:this.username,
      email:this.email,
      password:this.password,
      roles: this.getSelectedRoles()
    }
    this.authservice.signupBack(signup).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status==405){
          this.checkUser="user "+this.email+" already exists "
        }
        // Handle the error here
        else{
          this.checkUser='An error occurred: ' + error.name;
        }
        // Optionally, re-throw the error or return a default value

        return throwError('Something went wrong');
      })
    ).subscribe({
      next: response => {
        console.log('Signup successful', response);
        this.router.navigate([''])
      },
      error: error => {
        this.router.navigate(['auth/register'])
        console.error('signup failed', error);
      }
    })
  }
  getSelectedRoles(){
    const roles:Role[]=[]
    if(this.selectedRole=="TEACHER"){
      const roleUser:Role={
        id:2,
        roleName:this.selectedRole
      }
      roles.push(roleUser)
    }else{
      const roleUser:Role={
        id:3,
        roleName:this.selectedRole
      }
      roles.push(roleUser)
    }
    return roles;
  }
}
