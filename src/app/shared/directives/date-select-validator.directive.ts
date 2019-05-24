import { Directive } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateSelectValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  return day && month && year && day.valid === true && month.valid === true && year.valid === true ? null : { required: true } ;
};

@Directive({
  selector: '[appDateSelectValidator]'
})
export class DateSelectValidatorDirective {

  constructor() { }

}
