import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueToKey'
})
export class ValueToKeyPipe implements PipeTransform {

  transform(value: any): any {
    return Object.keys(value[0]).find(key => value[0][key] === value[1]);
  }

}
