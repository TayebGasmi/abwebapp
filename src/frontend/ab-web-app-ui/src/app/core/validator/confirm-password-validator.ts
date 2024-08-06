import {ValidationErrors, ValidatorFn} from '@angular/forms';

export function confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);
    console.log(passwordControl);
    console.log(confirmPasswordControl);
    if (!passwordControl || !confirmPasswordControl) {
      return null; // Controls not found, validation cannot proceed
    }

    const passwordsMatch = passwordControl.value === confirmPasswordControl.value;
    if (!passwordsMatch) {
      confirmPasswordControl.setErrors({confirmPassword: true});
      return {confirmPassword: true};
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}
