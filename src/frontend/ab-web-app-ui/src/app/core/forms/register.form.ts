import { FormField } from "../models/form-field";
import { Validators } from "@angular/forms";

export const registerForm: FormField[] = [
  // Email Field
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
        type: 'user_exist',
        message: 'User already exists'
      }
    ],
    icon: 'pi pi-envelope'
  },
  // Password Field
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
  // Confirm Password Field
  {
    type: 'password',
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: 'Confirm your password',
    validators: [Validators.required],
    errors: [
      {
        type: 'required',
        message: 'Confirm Password is required'
      }
    ],
    icon: 'pi pi-lock'
  },
  // Dropdown Field
  {
    type: 'dropdown',
    label: 'Role',
    name: 'role',
    placeholder: 'Select Role',
    validators: [Validators.required],
    options: [
      { label: 'Teacher', value: 'TEACHER' },
      { label: 'Student', value: 'STUDENT' }
    ],
    errors: [
      {
        type: 'required',
        message: 'Role is required'
      }
    ],
    icon: 'pi pi-user'
  },
  // Text Field
  {
    type: 'text',
    label: 'Full Name',
    name: 'fullName',
    placeholder: 'Enter your full name',
    validators: [Validators.required],
    errors: [
      {
        type: 'required',
        message: 'Full Name is required'
      }
    ],
    icon: 'pi pi-user'
  },
  // Number Field
  {
    type: 'number',
    label: 'Age',
    name: 'age',
    placeholder: 'Enter your age',
    validators: [Validators.required, Validators.min(0)],
    errors: [
      {
        type: 'required',
        message: 'Age is required'
      },
      {
        type: 'min',
        message: 'Age must be greater than or equal to 0'
      }
    ],
    icon: 'pi pi-calendar'
  },
  // Date Field
  {
    type: 'date',
    label: 'Date of Birth',
    name: 'dateOfBirth',
    placeholder: 'Select your date of birth',
    validators: [Validators.required],
    errors: [
      {
        type: 'required',
        message: 'Date of Birth is required'
      }
    ],
    icon: 'pi pi-calendar'
  },
  // Textarea Field
  {
    type: 'textarea',
    label: 'Bio',
    name: 'bio',
    placeholder: 'Tell us about yourself',
    validators: [Validators.required],
    errors: [
      {
        type: 'required',
        message: 'Bio is required'
      }
    ],
    icon: 'pi pi-pencil'
  },
  // Checkbox Field
  {
    type: 'checkbox',
    label: 'Agree to Terms',
    name: 'agreeToTerms',
    placeholder: '',
    validators: [Validators.requiredTrue],
    errors: [
      {
        type: 'required',
        message: 'You must agree to the terms'
      }
    ],
    icon: 'pi pi-check'
  },
  // Radio Field
  {
    type: 'radio',
    label: 'Gender',
    name: 'gender',
    options: [
      { label: 'Male', value: 'MALE' },
      { label: 'Female', value: 'FEMALE' }
    ],
    validators: [Validators.required],
    errors: [
      {
        type: 'required',
        message: 'Gender is required'
      }
    ],
    icon: 'pi pi-gender'
  },
  // File Upload Field
  {
    type: 'file',
    label: 'Profile Picture',
    name: 'profilePicture',
    placeholder: 'Upload your profile picture',
    validators: [],
    errors: [],
    icon: 'pi pi-upload'
  },

];
