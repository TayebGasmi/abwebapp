import {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const subjectForm: FormField[] = [
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
    type: 'textarea',
    placeholder: 'Enter description',
    errors: [
      {type: 'required', message: 'Description is required'}
    ],
    validators: [Validators.required]

  }
];
