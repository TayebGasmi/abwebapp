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
    label: 'End Time',
    name: 'endTime',
    type: 'date',
    placeholder: 'Select end time',
    errors: [
      { type: 'required', message: 'End time is required' }
    ],
    validators: [Validators.required]
  },
  {
    label: 'Session Link',
    name: 'sessionLink',
    type: 'text',
    placeholder: 'Enter session link',
    errors: [
      { type: 'required', message: 'Session link is required' }
    ],
    validators: [Validators.required, Validators.pattern('https?://.+')]
  },
  {
    label: 'Capacity',
    name: 'capacity',
    type: 'number',
    placeholder: 'Enter capacity',
    errors: [
      { type: 'required', message: 'Capacity is required' }
    ],
    validators: [Validators.required, Validators.min(1)]
  },
  {
    label: 'Status',
    name: 'status',
    type: 'text',
    placeholder: 'Enter status',
    errors: [
      { type: 'required', message: 'Status is required' }
    ],
    validators: [Validators.required]
  },
  {
    label: 'Tags',
    name: 'tags',
    type: 'chips',
    placeholder: 'Enter tags (comma separated)',
    errors: [],
    validators: []
  }
];
