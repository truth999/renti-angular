import { Component, OnInit, ViewChild } from '@angular/core';

import { ApartmentRoomComponent } from './apartment-room/apartment-room.component';
import { ApartmentDataComponent } from './apartment-data/apartment-data.component';
import { ApartmentUploadComponent } from './apartment-upload/apartment-upload.component';
import { ApartmentPictureComponent } from './apartment-picture/apartment-picture.component';

@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.scss']
})
export class ApartmentCreateComponent implements OnInit {
  step = 0;
  progress = 0;
  disabled: boolean;
  @ViewChild(ApartmentRoomComponent) roomChild: ApartmentRoomComponent;
  @ViewChild(ApartmentUploadComponent) uploadChild: ApartmentUploadComponent;
  @ViewChild(ApartmentPictureComponent) pictureChild: ApartmentPictureComponent;
  @ViewChild(ApartmentDataComponent) apartmentChild: ApartmentDataComponent;

  constructor() { }

  ngOnInit() {
  }

  onNextStep() {
    if (!this.disabled || this.step === 0) {
      this.step = this.step + 1;
      this.progress++;

      if (this.step > 4) {
        this.step = 4;
      }
      if (this.progress > 6) {
        this.progress = 6;
      }
    }

    if (this.roomChild) {
      this.roomChild.submit();
    }

    if (this.uploadChild) {
      this.uploadChild.submit();
    }

    if (this.pictureChild) {
      this.pictureChild.submit();
    }

    if (this.apartmentChild) {
      this.apartmentChild.onNextStep();
    }
  }

  onPreviewStep() {
    if (this.step === 4 && this.apartmentChild.step !== 0) {
      if (this.apartmentChild) {
        this.apartmentChild.onPreviewStep();
      }
    } else {
      this.step = this.step - 1;
      this.progress--;

      if (this.step < 0) {
        this.step = 0;
      }
      if (this.progress < 0) {
        this.progress = 0;
      }
    }
  }

}
