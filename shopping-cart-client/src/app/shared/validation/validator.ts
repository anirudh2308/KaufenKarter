import { AbstractControl, FormGroup } from "@angular/forms";

export function phoneValidator(control: AbstractControl) {
  if (control.value.length == 0) return null;
  if (control && (control.value !== null || control.value !== undefined)) {
    const regex = new RegExp("^[0-9]{10}$");
    console.log(!regex.test(control.value));

    if (!regex.test(control.value)) {
      return {
        isError: true
      };
    }
  }

  return null;
}

export function passValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const cnfpassValue = control.value;

    const passControl = control.root.get("password"); // magic is this
    if (passControl) {
      const passValue = passControl.value;
      if (passValue !== cnfpassValue || passValue === "") {
        return {
          isError: true
        };
      }
    }
  }

  return null;
}
