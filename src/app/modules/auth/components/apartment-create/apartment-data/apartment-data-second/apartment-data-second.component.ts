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
      buildingSiting: new FormControl(!!this.apartmentData.buildingSiting ? this.apartmentData.buildingSiting : null),
      typeOfHeating: new FormControl(!!this.apartmentData.typeOfHeating ? this.apartmentData.typeOfHeating : null),
      headroom: new FormControl(!!this.apartmentData.headroom ? this.apartmentData.headroom : null),
      parking: new FormControl(!!this.apartmentData.parking ? this.apartmentData.parking : null),
      childFriendly: new FormControl(!!this.apartmentData.childFriendly ? this.apartmentData.childFriendly : null),
      petFriendly: new FormControl(!!this.apartmentData.petFriendly ? this.apartmentData.petFriendly : null),
      mediaServiceProviders: new FormControl(!!this.apartmentData.mediaServiceProviders ? this.apartmentData.mediaServiceProviders : null),
      handicapAccessible: new FormControl(!!this.apartmentData.handicapAccessible ? this.apartmentData.handicapAccessible : null),
      airConditioner: new FormControl(!!this.apartmentData.airConditioner ? this.apartmentData.airConditioner : null),
      garage: new FormControl(!!this.apartmentData.garage ? this.apartmentData.garage : null)
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
