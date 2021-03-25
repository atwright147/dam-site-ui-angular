import { FormArray, FormGroup } from '@angular/forms';

export const emptyFormGroup = (formGroup: FormGroup): void => {
  Object.keys(formGroup.controls).forEach(control => {
    formGroup.removeControl(control);
  });
};

export const getControls = (group: FormGroup) => {
  if (group instanceof FormArray) {
    return group.controls;
  }

  try {
    return Object.keys(group.controls);
  } catch (err) {
    console.debug(err);
  }
};
