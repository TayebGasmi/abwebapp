import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";

export interface FormField {
  type: formType;
  label: string;
  placeholder?: string;
  name: string;
  validators?: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn[];
  options?: { label: string, value: string }[];
  multiple?: boolean;
  icon?: string;
  errors: { type: string, message: string }[];
  step?: number;
  min?: number;
  max?: number;
}

type formType =
  'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'file'
  | 'dropdown'
  | 'chips'
