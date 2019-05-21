import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DateSelectService } from '../../../../../../shared/services/date-select.service';
import { ApartmentCreateService } from '../../../../services/apartment-create.service';

export const dateOfMovingInValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  return day && month && year && day.valid === true && month.valid === true && year.valid === true ? null : { required: true } ;
};

@Component({
  selector: 'app-apartment-data-third',
  templateUrl: './apartment-data-third.component.html',
  styleUrls: ['./apartment-data-third.component.scss']
})
export class ApartmentDataThirdComponent implements OnInit {
  apartmentDataThirdForm: FormGroup;

  days: string[];
  months: string[];
  years: string[];

  constructor(
    private dateSelectService: DateSelectService,
    private apartmentCreateService: ApartmentCreateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.days = this.dateSelectService.getDays();
    this.months = this.dateSelectService.getMonths();
    this.years = this.dateSelectService.getYears();

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
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required)
      }, { validators: dateOfMovingInValidator })
    });
  }

  get balcony() {
    return this.apartmentDataThirdForm.get('balcony');
  }

  get sizeOfBalcony() {
    return this.apartmentDataThirdForm.get('sizeOfBalcony')
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

  changeBalcony() {
    this.balcony.value ? this.sizeOfBalcony.setValidators(Validators.required) : this.sizeOfBalcony.setErrors(null);
  }

  changeGarden() {
    this.garden.value ? this.sizeOfGarden.setValidators(Validators.required) : this.sizeOfGarden.setErrors(null);
  }

  changeTerrace() {
    this.terrace.value ? this.sizeOfTerrace.setValidators(Validators.required) : this.sizeOfTerrace.setErrors(null);
  }

  async submit() {
    const apartmentDataThird = { ...this.apartmentDataThirdForm.value };
    const dateOfMovingIn = apartmentDataThird.dateOfMovingIn;
    apartmentDataThird.dateOfMovingIn = dateOfMovingIn.day + '-' + dateOfMovingIn.month + '-' + dateOfMovingIn.year;

    this.apartmentCreateService.createApartmentData(apartmentDataThird);

    try {
      const responses = await this.apartmentCreateService.createRooms();
      console.log(responses);
      const roomIds = responses.rooms.map(room => {
        return room._id;
      });

      this.apartmentCreateService.updateApartmentDataWithRoomIds(roomIds);
      const res = await this.apartmentCreateService.createApartment();
      console.log(res);
      this.router.navigate(['/app/my-properties']);
    } catch (e) {
      console.log('ApartmentDataThirdComponent->submit->error', e);
    }
  }

  private arrayNumber(n: number) {
    return Array(n);
  }

  setDate() {
    let daysInMonth = null;
    const date = new Date();

    if (this.apartmentDataThirdForm.get('dateOfMovingIn').get('year').value) {
      date.setFullYear(+this.apartmentDataThirdForm.get('dateOfMovingIn').get('year').value);
    }

    if (this.apartmentDataThirdForm.get('dateOfMovingIn').get('month').value) {
      date.setMonth(+this.apartmentDataThirdForm.get('dateOfMovingIn').get('month').value, 0);
      daysInMonth = date.getDate();
      this.days = this.dateSelectService.getDays(daysInMonth);

      if (typeof daysInMonth === 'number' && daysInMonth < +this.apartmentDataThirdForm.get('dateOfMovingIn').get('day').value) {
        this.apartmentDataThirdForm.get('dateOfMovingIn').get('day').setErrors(Validators.required);
      }
    }
  }

}
