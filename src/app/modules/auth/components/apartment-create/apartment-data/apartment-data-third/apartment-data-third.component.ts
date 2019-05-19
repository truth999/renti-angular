import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DateSelectService } from '../../../../../../shared/services/date-select.service';
import { ApartmentCreateService } from '../../../../services/apartment-create.service';

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
      sizeOfBalcony: new FormControl('', Validators.required),
      garden: new FormControl(false, Validators.required),
      sizeOfGarden: new FormControl('', Validators.required),
      terrace: new FormControl(false, Validators.required),
      sizeOfTerrace: new FormControl('', Validators.required),
      rentalFee: new FormControl('', Validators.required),
      overhead: new FormControl('', Validators.required),
      deposit: new FormControl('', Validators.required),
      minimumRentingTime: new FormControl('', Validators.required),
      dateOfMovingIn: new FormGroup({
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required)
      })
    });
  }

  async submit() {
    const apartmentDataThird = { ...this.apartmentDataThirdForm.value };
    const dateOfMovingIn = apartmentDataThird.dateOfMovingIn;
    apartmentDataThird.dateOfMovingIn = dateOfMovingIn.day + '-' + dateOfMovingIn.month + '-' + dateOfMovingIn.year;

    this.apartmentCreateService.createApartmentData(apartmentDataThird);

    try {
      const responses = await this.apartmentCreateService.createRooms();
      const roomIds = responses.rooms.map(room => {
        return room._id;
      });

      this.apartmentCreateService.updateApartmentDataWithRoomIds(roomIds);
      await this.apartmentCreateService.createApartment();
      this.router.navigate(['/app/my-properties']);
    } finally {
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