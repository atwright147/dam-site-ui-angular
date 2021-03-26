import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export type Controls = string[] | ({ [key: string]: AbstractControl } & AbstractControl[]);

export const emptyFormGroup = (formGroup: FormGroup): void => {
  Object.keys(formGroup.controls).forEach(control => {
    formGroup.removeControl(control);
  });
};

export const getControls = (group: FormGroup): Controls => {
  if (group instanceof FormArray) {
    return group.controls;
  }

  try {
    return Object.keys(group.controls);
  } catch (err) {
    console.debug(err); // eslint-disable-line no-console
  }
};
