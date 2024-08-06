import {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const userForm: FormField[] = [
  {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter name',
    errors: [
      {type: 'required', message: 'Name is required'}
    ]
    ,
    validators: [Validators.required]

  },
  {
    label: 'Last Name',
    name: 'lastName',
    type: 'textarea',
    placeholder: 'Enter description',
    errors: [
      {type: 'required', message: 'Description is required'}
    ],
    validators: [Validators.required]

  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter description',
    errors: [
      {type: 'required', message: 'Description is required'}
    ],
    validators: [Validators.required]

  },
  {
    label: 'Role',
    name: 'roles',
    type: 'dropdown',
    placeholder: 'Enter Role',
    options:[ {label:"Teacher",value:"TEACHER"},
      {label:"Student",value:"STUDENT"},
     ],
    errors: [
      {type: 'required', message: 'Role is required'}
    ],
    validators: [Validators.required]
  }
];
