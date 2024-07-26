import  {FormField} from "../models/form-field";
import {Validators} from "@angular/forms";

export const schoolForm: FormField[] = [
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
    name: 'type',
    type: 'dropdown',
    placeholder: 'Enter type',
    options:[ {label: "EU" ,value: "EU" },{label: "Normal" ,value: "Normal" }],
    errors: [
      {type: 'required', message: 'type is required'}
    ],
    validators: [Validators.required]

  }
];
