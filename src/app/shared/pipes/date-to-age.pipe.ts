import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToAge'
})
export class DateToAgePipe implements PipeTransform {

  transform(input): any {
    const today = new Date();
    const birthDate = input.split('-');
    let age = today.getFullYear() - birthDate[2];
    const month = today.getMonth() - birthDate[1];

    if (month < 0 || (month === 0 && today.getDate() < birthDate[0])) {
      age--;
    }

    return age;
  }

}
