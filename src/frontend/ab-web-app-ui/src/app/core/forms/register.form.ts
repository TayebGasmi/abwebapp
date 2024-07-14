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
  }
];
