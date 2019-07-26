import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'selectTranslate'
})
export class SelectTranslatePipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) { }

  transform(value: any): any {
    return Observable.create(observer => {
      this.translateService.get(value).subscribe(result => {
        observer.next(result);
      });

      this.translateService.onLangChange.subscribe(() => {
        this.translateService.get(value).subscribe(result => {
          observer.next(result);
        });
      });
    });
  }

}
