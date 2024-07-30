import  {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const configForm: FormField[] = [
  {
    label: 'Name',
    name: 'key',
    type: 'text',
    placeholder: 'Enter name',
    errors: [
      {type: 'required', message: 'Name is required'}
    ]
    ,
    validators: [Validators.required]

  },
  {
    label: 'Type',
    name: 'value',
    type: 'text',
    placeholder: 'Enter type',
    errors: [
      {type: 'required', message: 'value is required'}
    ],
    validators: [Validators.required]

  },
  {
    label: 'Type',
    name: 'description',
    type: 'text',
    placeholder: 'Enter type',
    errors: [
      {type: 'required', message: 'description is required'}
    ],
    validators: [Validators.required]

  }
];
