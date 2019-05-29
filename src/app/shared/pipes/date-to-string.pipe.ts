import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString'
})
export class DateToStringPipe implements PipeTransform {

  transform(input): any {
    const day = input.day;
    const month = input.month;
    const year = input.year;

    return year + '-' + month + '-' + day;
  }

}
