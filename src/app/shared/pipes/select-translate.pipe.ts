import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

@Pipe({
  name: 'selectTranslate'
})
export class SelectTranslatePipe implements PipeTransform, OnDestroy {
  subscription: Subscription;

  constructor(
    private translateService: TranslateService
  ) { }

  transform(value: any): any {
    return Observable.create(observer => {
      this.translateService.get(value).subscribe(result => {
        observer.next(result);
      });

      this.subscription = this.translateService.onLangChange.subscribe(() => {
        this.translateService.get(value).subscribe(result => {
          observer.next(result);
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
