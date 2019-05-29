import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToAge'
})
export class DateToAgePipe implements PipeTransform {

  transform(input): any {
    const today = new Date();
    const birthDay = input.day;
    const birthYear = input.year;
    const birthMonth = input.month;
    let age = today.getFullYear() - birthYear;
    const month = today.getMonth() - birthMonth;

    if (month < 0 || (month === 0 && today.getDate() < birthDay)) {
      age--;
    }

    return age;
  }

}
