import {FormField} from "../models/form-field";

export const subjectForm: FormField[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter name',
    errors: [
      {type: 'required', message: 'Name is required'}
    ]

  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    placeholder: 'Enter description',
    errors: [
      {type: 'required', message: 'Description is required'}
    ]

  }
];
