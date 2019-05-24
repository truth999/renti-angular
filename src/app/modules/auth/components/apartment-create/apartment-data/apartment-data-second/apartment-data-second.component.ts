import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApartmentCreateService } from '../../../../services/apartment-create.service';
import { ValidateFormFieldsService } from '../../../../../../core/services/validate-form-fields.service';

import { Apartment } from '../../../../../../shared/models';

@Component({
  selector: 'app-apartment-data-second',
  templateUrl: './apartment-data-second.component.html',
  styleUrls: ['./apartment-data-second.component.scss']
})
export class ApartmentDataSecondComponent implements OnInit, DoCheck {
  apartmentDataSecondForm: FormGroup;
  apartmentData: Apartment;
  mediaService = [
    'UPC', 'DIGI', 'Telekom', 'Other'
  ];
  @Output() apartmentDataSecondFormValid = new EventEmitter<boolean>();

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.apartmentData = this.apartmentCreateService.apartment;

    this.apartmentDataSecondForm = new FormGroup({
      buildingSiting: new FormControl(this.apartmentData.buildingSiting, Validators.required),
      typeOfHeating: new FormControl(this.apartmentData.typeOfHeating, Validators.required),
      headroom: new FormControl(this.apartmentData.headroom, Validators.required),
      parking: new FormControl(this.apartmentData.parking, Validators.required),
      childFriendly: new FormControl(!!this.apartmentData.childFriendly ? this.apartmentData.childFriendly : false, Validators.required),
      petFriendly: new FormControl(!!this.apartmentData.petFriendly ? this.apartmentData.petFriendly : false, Validators.required),
      mediaServiceProviders: new FormControl(
        this.apartmentData.mediaServiceProviders,
        Validators.required
      ),
      handicapAccessible: new FormControl(
        !!this.apartmentData.handicapAccessible ? this.apartmentData.handicapAccessible : false,
        Validators.required
      ),
      airConditioner: new FormControl(!!this.apartmentData.airConditioner ? this.apartmentData.airConditioner : false, Validators.required),
      garage: new FormControl(!!this.apartmentData.garage ? this.apartmentData.garage : false, Validators.required)
    });
  }

  ngDoCheck() {
    this.apartmentDataSecondFormValid.emit(this.apartmentDataSecondForm.valid);
  }

  submit() {
    if (this.apartmentDataSecondForm.valid) {
      const apartmentData = { ...this.apartmentDataSecondForm.value };
      this.apartmentCreateService.createApartmentData(apartmentData);
    } else {
      this.validateFormFieldsService.validate(this.apartmentDataSecondForm);
    }
  }

}
