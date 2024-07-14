import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {FormField} from "../../../core/models/form-field";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {MessageModule} from "primeng/message";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    InputNumberModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    PasswordModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MessageModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input()
  fields: FormField[] = [];
  form: FormGroup = new FormGroup({}, {updateOn: 'blur'});
  @Input() formData: any = {};

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.fields.forEach(field => {
      let fieldValue = this.formData.hasOwnProperty(field.name) ? this.formData[field.name] : '';
      if (field.type == "dropdown") {
        fieldValue = fieldValue[0];
      }

      const formControl = new FormControl(fieldValue, field.validators || null, field.asyncValidators || null);
      this.form.addControl(field.name, formControl);
    });
  }

  fieldHasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  getFieldErrorMessage(fieldName: string): string | undefined {
    const control = this.form.get(fieldName);
    if (control?.invalid && (control?.dirty || control?.touched)) {
      const field = this.fields.find(f => f.name === fieldName);
      if (field?.errors) {
        for (const error of field.errors) {
          if (control.hasError(error.type)) {
            return error.message;
          }
        }
      }
    }
    return undefined;
  }
}
