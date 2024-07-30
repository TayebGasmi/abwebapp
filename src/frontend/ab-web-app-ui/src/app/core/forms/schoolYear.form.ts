import  {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const schoolYearForm: FormField[] = [
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
