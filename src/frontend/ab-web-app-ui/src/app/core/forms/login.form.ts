import {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const loginForm: FormField[] = [
  {
    type: 'text',
    label: 'Username',
    name: 'username',
    placeholder: 'Enter your username',
    validators: [Validators.required],
    errorMessage: 'Username is required',
    icon: 'pi pi-user'
  },
  {
    type: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email',
    validators: [Validators.required, Validators.email],
    errorMessage: 'Valid email is required',
    icon: 'pi pi-envelope'
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
    validators: [Validators.required],
    errorMessage: 'Password is required',
    icon: 'pi pi-lock'
  },
  {
    type: 'number',
    label: 'Age',
    name: 'age',
    placeholder: 'Enter your age',
    validators: [Validators.required, Validators.min(0), Validators.max(100)],
    errorMessage: 'Age must be between 0 and 100'
  },
  {
    type: 'date',
    label: 'Birthdate',
    name: 'birthdate',
    placeholder: 'Select your birthdate',
    validators: [Validators.required],
    errorMessage: 'Birthdate is required'
  },
  {
    type: 'select',
    label: 'Favorite Color',
    name: 'favoriteColor',
    placeholder: 'Select your favorite color',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' }
    ],
    validators: [Validators.required],
    errorMessage: 'Favorite color is required'
  },
  {
    type: 'checkbox',
    label: 'Accept Terms',
    name: 'acceptTerms',
    validators: [Validators.requiredTrue],
    errorMessage: 'You must accept the terms'
  },
  {
    type: 'radio',
    label: 'Gender',
    name: 'gender',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ],
    validators: [Validators.required],
    errorMessage: 'Gender is required'
  },
  {
    type: 'textarea',
    label: 'Bio',
    name: 'bio',
    placeholder: 'Tell us about yourself',
    validators: [Validators.required],
    errorMessage: 'Bio is required'
  },
  {
    type: 'dropdown',
    label: 'Country',
    name: 'country',
    placeholder: 'Select your country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' }
    ],
    validators: [Validators.required],
    errorMessage: 'Country is required'
  }
];
