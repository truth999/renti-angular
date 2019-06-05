import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApartmentCreateService } from '../../../../services/apartment-create.service';
import { CursorWaitService } from '../../../../../../core/services/cursor-wait.service';
import { ValidateFormFieldsService } from '../../../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-apartment-data-third',
  templateUrl: './apartment-data-third.component.html',
  styleUrls: ['./apartment-data-third.component.scss']
})
export class ApartmentDataThirdComponent implements OnInit {
  apartmentDataThirdForm: FormGroup;

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private router: Router,
    private cursorWaitService: CursorWaitService,
    private validateFormFieldsService: ValidateFormFieldsService,
    private datepickerConfig: NgbDatepickerConfig
  ) {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    datepickerConfig.minDate = { year, month, day };
    datepickerConfig.maxDate = { year: year + 10, month: 12, day: 31 };
  }

  ngOnInit() {
    this.apartmentDataThirdForm = new FormGroup({
      externalIsolation: new FormControl(false),
      balcony: new FormControl(false),
      sizeOfBalcony: new FormControl(null),
      garden: new FormControl(false),
      sizeOfGarden: new FormControl(null),
      terrace: new FormControl(false),
      sizeOfTerrace: new FormControl(null),
      rentalFee: new FormControl(null, [Validators.min(1), Validators.max(2000000)]),
      overhead: new FormControl(null, [Validators.min(1), Validators.max(2000000)]),
      deposit: new FormControl(null, [Validators.min(1), Validators.max(2000000)]),
      minimumRentingTime: new FormControl(null),
      dateOfMovingIn: new FormGroup({
        rightNow: new FormControl(false),
        date: new FormControl(null)
      })
    });
  }

  get balcony() {
    return this.apartmentDataThirdForm.get('balcony');
  }

  get garden() {
    return this.apartmentDataThirdForm.get('garden');
  }

  get terrace() {
    return this.apartmentDataThirdForm.get('terrace');
  }

  get rightNow() {
    return this.apartmentDataThirdForm.get('dateOfMovingIn').get('rightNow');
  }

  get date() {
    return this.apartmentDataThirdForm.get('dateOfMovingIn').get('date');
  }

  async submit() {
    if (this.apartmentDataThirdForm.valid) {
      const apartmentDataThird = { ...this.apartmentDataThirdForm.value };

      this.apartmentCreateService.createApartmentData(apartmentDataThird);

      try {
        const responses = await this.apartmentCreateService.createRooms();
        const roomIds = responses.rooms.map(room => {
          return room._id;
        });

        this.apartmentCreateService.updateApartmentDataWithRoomIds(roomIds);
        await this.apartmentCreateService.createApartment();
        this.cursorWaitService.enable();
        this.router.navigate(['/app/my-properties']);
      } catch (e) {
        console.log('ApartmentDataThirdComponent->submit->error', e);
      } finally {
        this.cursorWaitService.disable();
      }

      this.apartmentCreateService.apartment = null;
      this.apartmentCreateService.rooms = null;
      this.apartmentCreateService.previewRoomPictures = null;
      this.apartmentCreateService.newRoomPictures = null;
    } else {
      this.validateFormFieldsService.validate(this.apartmentDataThirdForm);
    }
  }

  public arrayNumber(n: number) {
    return Array(n);
  }

}
