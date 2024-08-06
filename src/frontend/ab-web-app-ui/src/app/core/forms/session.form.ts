import { FormField } from "../models/form-field";
import { Validators } from "@angular/forms";

export const sessionForm: FormField[] = [

  {
    label: 'Title',
    name: 'title',
    type: 'text',
    placeholder: 'Enter title',
    errors: [
      { type: 'required', message: 'Title is required' }
    ],
    validators: [Validators.required]
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    placeholder: 'Enter description',
    errors: [
      { type: 'required', message: 'Description is required' }
    ],
    validators: [Validators.required]
  },
  {
    label: 'Start Time',
    name: 'startTime',
    type: 'date',
    placeholder: 'Select start time',
    errors: [
      { type: 'required', message: 'Start time is required' }
    ],
    validators: [Validators.required]
  },
  {
    label: 'Session Link',
    name: 'meetingLink',
    type: 'text',
    placeholder: 'Enter session link',
    errors: [
      { type: 'required', message: 'Session link is required' }
    ],
    validators: [Validators.required, Validators.pattern('https?://.+')]
  },
  {
    label: 'Status',
    name: 'status',
    type: 'dropdown',
    placeholder: 'Enter status',
    options:[ {label:"Pending",value:"PENDING"},
              {label:"Accepted",value:"ACCEPTED"},
              {label:"Rejected",value:"REJECTED"},
              {label:"Cancelled",value:"CANCELLED"}],
    errors: [
      { type: 'required', message: 'Status is required' }
    ],
    validators: [Validators.required]
  },
  {
    label: 'Price',
    name: 'price',
    type: 'number',
    placeholder: 'Enter price',
    errors: [
      { type: 'required', message: 'Price is required' }
    ],
    validators: [Validators.required]
  },
  {
    label: 'Duration',
    name: 'duration',
    type: 'number',
    placeholder: 'Enter duration',
    errors: [
      { type: 'required', message: 'Duration is required' }
    ],
    validators: [Validators.required]
  }
];
