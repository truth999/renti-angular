import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class ValidateFormFieldsService {

  constructor() { }

  validate(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        control.markAsTouched({ onlySelf: true });
        this.validate(control);
      } else if (control instanceof FormArray) {
        Object.keys(control.controls).forEach(subField => {
          const subcontrol = control.get(subField);

          if (subcontrol instanceof FormControl) {
            subcontrol.markAsTouched({ onlySelf: true });
          } else if (subcontrol instanceof FormGroup) {
            this.validate(subcontrol);
          }
        });
      }
    });
  }
}
