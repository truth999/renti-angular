import { Component, OnInit, ViewChild } from '@angular/core';

import { ApartmentRoomComponent } from './apartment-room/apartment-room.component';
import { ApartmentWindowComponent } from './apartment-window/apartment-window.component';
import { ApartmentDataComponent } from './apartment-data/apartment-data.component';

@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.scss']
})
export class ApartmentCreateComponent implements OnInit {
  step = 0;
  disabled: boolean;
  @ViewChild(ApartmentRoomComponent) roomChild: ApartmentRoomComponent;
  @ViewChild(ApartmentWindowComponent) windowChild: ApartmentWindowComponent;
  @ViewChild(ApartmentDataComponent) apartmentChild: ApartmentDataComponent;

  constructor() { }

  ngOnInit() {
  }

  onNextStep() {
    this.step = this.step + 1;

    if (this.step > 5) {
      this.step = 5;
    }

    if (this.roomChild) {
      this.roomChild.submit();
    }

    if (this.windowChild) {
      this.windowChild.submit();
    }

    if (this.apartmentChild) {
      this.apartmentChild.onNextStep();
    }
  }

  onPreviewStep() {
    if (this.step === 5 && this.apartmentChild.step !== 0) {
      if (this.apartmentChild) {
        this.apartmentChild.onPreviewStep();
      }
    } else {
      this.step = this.step - 1;

      if (this.step < 0) {
        this.step = 0;
      }
    }
  }

}
