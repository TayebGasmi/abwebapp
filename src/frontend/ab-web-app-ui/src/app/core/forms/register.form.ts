import {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const registerForm: FormField[] = [
  {
    type: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email',
    validators: [Validators.required, Validators.email],
    errors: [
      {
        type: 'required',
        message: 'Email is required'
      },
      {
        type: 'email',
        message: 'Email is invalid'
      },
      {
        type:'user_exist',
        message: 'user already exist'
      }
    ],
    icon: 'pi pi-envelope'
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
    validators: [Validators.required],
    errors: [
      {
        type: 'required',
        message: 'Password is required'
      }
    ],
    icon: 'pi pi-lock'
  },
  {
    type: 'password',
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: 'Confirm your password',
    validators: [Validators.required],
    errors: [
      {
        type: 'required',
        message: 'Password is required'
      }
    ],
    icon: 'pi pi-lock'
  },
  {
    type: 'dropdown',
    label: 'Role',
    name: 'role',
    placeholder: 'Select Role',
    validators: [Validators.required],
    options:[{label:"teacher",value:"TEACHER"},{label:"student",value:"STUDENT"}],
    errors: [
      {
        type: 'required',
        message: 'Password is required'
      }
    ],
    icon: 'pi pi-lock'
  }
];
