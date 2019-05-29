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
      balcony: new FormControl(false, Validators.required),
      sizeOfBalcony: new FormControl(''),
      garden: new FormControl(false, Validators.required),
      sizeOfGarden: new FormControl(''),
      terrace: new FormControl(false, Validators.required),
      sizeOfTerrace: new FormControl(''),
      rentalFee: new FormControl('', Validators.required),
      overhead: new FormControl('', Validators.required),
      deposit: new FormControl('', Validators.required),
      minimumRentingTime: new FormControl('', Validators.required),
      dateOfMovingIn: new FormGroup({
        rightNow: new FormControl(false, Validators.required),
        date: new FormControl(null)
      })
    });
  }

  get balcony() {
    return this.apartmentDataThirdForm.get('balcony');
  }

  get sizeOfBalcony() {
    return this.apartmentDataThirdForm.get('sizeOfBalcony');
  }

  get garden() {
    return this.apartmentDataThirdForm.get('garden');
  }

  get sizeOfGarden() {
    return this.apartmentDataThirdForm.get('sizeOfGarden');
  }

  get terrace() {
    return this.apartmentDataThirdForm.get('terrace');
  }

  get sizeOfTerrace() {
    return this.apartmentDataThirdForm.get('sizeOfTerrace');
  }

  get rightNow() {
    return this.apartmentDataThirdForm.get('dateOfMovingIn').get('rightNow');
  }

  get date() {
    return this.apartmentDataThirdForm.get('dateOfMovingIn').get('date');
  }

  changeBalcony() {
    this.balcony.value ? this.sizeOfBalcony.setValidators(Validators.required) : this.sizeOfBalcony.setErrors(null);
  }

  changeGarden() {
    this.garden.value ? this.sizeOfGarden.setValidators(Validators.required) : this.sizeOfGarden.setErrors(null);
  }

  changeTerrace() {
    this.terrace.value ? this.sizeOfTerrace.setValidators(Validators.required) : this.sizeOfTerrace.setErrors(null);
  }

  changeRightNow() {
    this.rightNow.value ? this.date.setErrors(null) : this.date.setValidators(Validators.required);
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
