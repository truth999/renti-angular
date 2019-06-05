import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { OfferService } from '../../services/offer.service';
import { StorageService } from '../../../../core/services/storage.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent implements OnInit {
  offerForm: FormGroup;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private cursorWaitService: CursorWaitService,
    private validateFormFields: ValidateFormFieldsService,
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
    this.buildOfferForm();
  }

  buildOfferForm() {
    this.offerForm = new FormGroup({
      rentalFee: new FormControl('', [Validators.required, Validators.min(1), Validators.max(2000000)]),
      overhead: new FormControl('', [Validators.required, Validators.min(1), Validators.max(2000000)]),
      minRentingTime: new FormControl('', Validators.required),
      dateOfMovingIn: new FormControl(null, Validators.required),
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

  changePets() {
    this.movingWithPets.value ? this.pets.setValidators(Validators.required) : this.pets.setErrors(null);
  }

  onBack() {
    this.location.back();
  }

  async submit() {
    if (this.offerForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      const userId = this.storageService.get('userId');
      const offerData = {
        ...this.offerForm.value,
        userId,
        apartmentId: id
      };

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
    } else {
      this.validateFormFields.validate(this.offerForm);
    }
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
