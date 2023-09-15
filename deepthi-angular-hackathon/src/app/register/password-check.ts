import { FormGroup } from "@angular/forms";
//checking if password and confirm password are same
export function passwordCheck(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    // Getting both password and confirmPassword fields' value
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName]
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmPasswordValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      // setting error if not equal
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
