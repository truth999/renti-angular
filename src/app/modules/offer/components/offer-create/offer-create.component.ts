import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { DateSelectService } from '../../../../shared/services/date-select.service';
import { OfferService } from '../../services/offer.service';
import { StorageService } from '../../../../core/services/storage.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

export const dateOfMovingInValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const day = control.get('day');
  const month = control.get('month');
  const year = control.get('year');

  return day && month && year && day.valid === true && month.valid === true && year.valid === true ? null : { required: true } ;
};

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent implements OnInit {
  offerForm: FormGroup;
  apartmentId: string;

  days: string[];
  months: string[];
  years: string[];

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private dateSelectService: DateSelectService,
    private offerService: OfferService,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private cursorWaitService: CursorWaitService
  ) { }

  ngOnInit() {
    this.apartmentId = this.route.snapshot.paramMap.get('id');

    this.days = this.dateSelectService.getDays();
    this.months = this.dateSelectService.getMonths();
    this.years = this.dateSelectService.getYears();

    this.buildOfferForm();
  }

  buildOfferForm() {
    this.offerForm = new FormGroup({
      rentalFee: new FormControl('', [Validators.required, Validators.min(1), Validators.max(2000)]),
      overhead: new FormControl('', [Validators.required, Validators.min(1), Validators.max(2000)]),
      minRentingTime: new FormControl('', Validators.required),
      dateOfMovingIn: new FormGroup({
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required)
      }, { validators: dateOfMovingInValidator }),
      movingWith: new FormControl('', Validators.required),
      movingWithPets: new FormControl(false, Validators.required),
      pets: new FormControl(''),
      whyChooseMe: new FormControl('')
    });
  }

  get movingWithPets() {
    return this.offerForm.get('movingWithPets');
  }

  get pets() {
    return this.offerForm.get('pets');
  }

  setDate() {
    let daysInMonth = null;
    const date = new Date();

    if (this.offerForm.get('dateOfMovingIn').get('year').value) {
      date.setFullYear(+this.offerForm.get('dateOfMovingIn').get('year').value);
    }

    if (this.offerForm.get('dateOfMovingIn').get('month').value) {
      date.setMonth(+this.offerForm.get('dateOfMovingIn').get('month').value, 0);
      daysInMonth = date.getDate();
      this.days = this.dateSelectService.getDays(daysInMonth);

      if (typeof daysInMonth === 'number' && daysInMonth < +this.offerForm.get('dateOfMovingIn').get('day').value) {
        this.offerForm.get('dateOfMovingIn').get('day').setErrors(Validators.required);
      }
    }
  }

  changePets() {
    this.movingWithPets.value ? this.pets.setValidators(Validators.required) : this.pets.setErrors(null);
  }

  onBack() {
    this.location.back();
  }

  async submit() {
    const userId = this.storageService.get('userId');
    const offerData = {
      ...this.offerForm.value,
      userId,
      apartmentId: this.apartmentId
    };
    offerData.dateOfMovingIn = offerData.dateOfMovingIn.day + '-' + offerData.dateOfMovingIn.month + '-' + offerData.dateOfMovingIn.year;

    try {
      this.cursorWaitService.enable();

      await this.offerService.createOffer(offerData);
      this.router.navigate(['/app/offers/create-success']);
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('OfferCreateComponent->submit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
