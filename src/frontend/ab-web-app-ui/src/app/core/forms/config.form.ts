import  {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const configForm: FormField[] = [
  {
    label: 'Key',
    name: 'key',
    type: 'text',
    placeholder: 'Enter Key',
    errors: [
      {type: 'required', message: 'key is required'}
    ]
    ,
    validators: [Validators.required]

  },
  {
    label: 'Value',
    name: 'value',
    type: 'text',
    placeholder: 'Enter value',
    errors: [
      {type: 'required', message: 'value is required'}
    ],
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
