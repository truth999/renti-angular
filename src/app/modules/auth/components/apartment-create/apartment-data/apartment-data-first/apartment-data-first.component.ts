import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { ApartmentCreateService } from '../../../../services/apartment-create.service';
import { DateSelectService } from '../../../../../../shared/services/date-select.service';
import { ValidateFormFieldsService } from '../../../../../../core/services/validate-form-fields.service';

import { Apartment } from '../../../../../../shared/models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-apartment-data-first',
  templateUrl: './apartment-data-first.component.html',
  styleUrls: ['./apartment-data-first.component.scss']
})
export class ApartmentDataFirstComponent implements OnInit, DoCheck {
  apartmentDataFirstForm: FormGroup;
  apartmentData: Apartment;
  years: string[];
  @Output() apartmentDataFirstFormValid = new EventEmitter<boolean>();
  searchTerms = new EventEmitter<string>();

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private dateSelectService: DateSelectService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.years = this.dateSelectService.getYears();
    this.apartmentData = this.apartmentCreateService.apartment;

    this.apartmentDataFirstForm = new FormGroup({
      name: new FormControl(!!this.apartmentData ? this.apartmentData.name : null, Validators.required),
      address: new FormControl(!!this.apartmentData ? this.apartmentData.address : null, Validators.required),
      typeOfBuilding: new FormControl(!!this.apartmentData ? this.apartmentData.typeOfBuilding : null),
      yearOfConstruction: new FormControl(!!this.apartmentData ? this.apartmentData.yearOfConstruction : null),
      stateOfApartment: new FormControl(!!this.apartmentData ? this.apartmentData.stateOfApartment : null),
      energyPerformanceCertificate: new FormControl(!!this.apartmentData ? this.apartmentData.energyPerformanceCertificate : null),
      floorsOfBuilding: new FormControl(
        !!this.apartmentData ? this.apartmentData.floorsOfBuilding : null, [Validators.min(1), Validators.max(100)]
      ),
      floorsOfApartment: new FormControl(
        !!this.apartmentData ? this.apartmentData.floorsOfApartment : null, [Validators.min(1), Validators.max(100)]
      ),
      size: new FormControl(
        !!this.apartmentData ? this.apartmentData.size : null, [Validators.required, Validators.min(1), Validators.max(9999)]
      ),
      elevator: new FormControl(!!this.apartmentData ? this.apartmentData.elevator : null),
      rooftop: new FormControl(!!this.apartmentData ? this.apartmentData.rooftop : null)
    });

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(async term => {
        try {
          const addressResponse = await this.apartmentCreateService.checkAddress(term);
          if (addressResponse && addressResponse.message) {
            this.apartmentDataFirstForm.get('address').setErrors({ checkError: true, errorMsg: addressResponse.message });
          }
        } catch (e) {
          console.log('ApartmentDataFirstComponent->searchTerms', e);
        }
      });
  }

  ngDoCheck() {
    this.apartmentDataFirstFormValid.emit(this.apartmentDataFirstForm.valid);
    if (this.apartmentDataFirstForm.get('floorsOfApartment').value > this.apartmentDataFirstForm.get('floorsOfBuilding').value) {
      this.apartmentDataFirstForm.get('floorsOfApartment').setErrors({ maxError: true });
    }
  }

  handleAddressChange(address: Address) {
    this.apartmentDataFirstForm.get('address').setValue(address.formatted_address);
    this.searchTerms.emit(address.formatted_address);
  }

  search(term: string) {
    this.searchTerms.emit(term);
  }

  submit() {
    if (this.apartmentDataFirstForm.valid) {
      const apartmentData = { ...this.apartmentDataFirstForm.value };
      this.apartmentCreateService.createApartmentData(apartmentData);
    } else  {
      this.validateFormFieldsService.validate(this.apartmentDataFirstForm);
    }
  }

}
