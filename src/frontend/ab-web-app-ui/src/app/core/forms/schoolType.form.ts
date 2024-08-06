import  {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const schoolTypeForm: FormField[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter name',
    errors: [
      {type: 'required', message: 'Name is required'}
    ]
    ,
    validators: [Validators.required]

  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    placeholder: 'Enter Description',
    errors: [
      {type: 'required', message: 'description is required'}
    ],
    validators: [Validators.required]

  }
];
