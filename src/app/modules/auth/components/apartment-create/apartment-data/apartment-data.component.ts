import { AfterViewChecked, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ApartmentDataFirstComponent } from './apartment-data-first/apartment-data-first.component';
import { ApartmentDataSecondComponent } from './apartment-data-second/apartment-data-second.component';
import { ApartmentDataThirdComponent } from './apartment-data-third/apartment-data-third.component';

@Component({
  selector: 'app-apartment-data',
  templateUrl: './apartment-data.component.html',
  styleUrls: ['./apartment-data.component.scss']
})
export class ApartmentDataComponent implements OnInit, AfterViewChecked {
  @ViewChild(ApartmentDataFirstComponent) dataFirst: ApartmentDataFirstComponent;
  @ViewChild(ApartmentDataSecondComponent) dataSecond: ApartmentDataSecondComponent;
  @ViewChild(ApartmentDataThirdComponent) dataThird: ApartmentDataThirdComponent;

  @Output() apartmentDataValid = new EventEmitter<boolean>();
  @Output() apartmentDataStep = new EventEmitter<number>();

  step = 0;
  valid: boolean;

  constructor() { }

  ngOnInit() {
    this.apartmentDataStep.emit(this.step);
  }

  ngAfterViewChecked() {
    if (this.dataFirst) {
      this.valid = this.dataFirst.apartmentDataFirstForm.valid;
      this.apartmentDataValid.emit(this.dataFirst.apartmentDataFirstForm.valid);
    }

    if (this.dataSecond) {
      this.valid = this.dataSecond.apartmentDataSecondForm.valid;
      this.apartmentDataValid.emit(this.dataSecond.apartmentDataSecondForm.valid);
    }

    if (this.dataThird) {
      this.valid = this.dataThird.apartmentDataThirdForm.valid;
      this.apartmentDataValid.emit(this.dataThird.apartmentDataThirdForm.valid);
    }
  }

  onNextStep() {
    if (this.valid) {
      this.step++;

      if (this.step > 2) {
        this.step = 2;
      }
      this.apartmentDataStep.emit(this.step);
    }

    if (this.dataFirst) {
      this.dataFirst.submit();
    }

    if (this.dataSecond) {
      this.dataSecond.submit();
    }

    if (this.dataThird) {
      this.dataThird.submit();
    }
  }

  onPreviewStep() {
    this.step--;

    if (this.step < 0) {
      this.step = 0;
    }
    this.apartmentDataStep.emit(this.step);
  }

}
