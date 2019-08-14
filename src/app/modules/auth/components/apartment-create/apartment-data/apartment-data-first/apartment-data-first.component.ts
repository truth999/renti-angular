import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { ApartmentCreateService } from '../../../../services/apartment-create.service';
import { DateSelectService } from '../../../../../../shared/services/date-select.service';
import { ValidateFormFieldsService } from '../../../../../../core/services/validate-form-fields.service';

import { Apartment } from '../../../../../../shared/models';
import { config } from '../../../../../../../config';

const addressFormGroupValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const city = control.get('city');
  const building = control.get('building');
  const floor = control.get('floor');
  const door = control.get('door');

  return city && building && floor && door && city.valid && building.valid && floor.valid && door.valid ? null : { required: true };
};

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
  searchTerms = new EventEmitter<Apartment['address']>();
  apartmentConfig = config.apartment;
  Object = Object;
  placeOptions = config.googleplaceOptions;

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
      address: new FormGroup({
        city: new FormControl(!!this.apartmentData.address ? this.apartmentData.address.city : null, Validators.required),
        building: new FormControl(!!this.apartmentData.address ? this.apartmentData.address.building : null),
        floor: new FormControl(!!this.apartmentData.address ? this.apartmentData.address.floor : null),
        door: new FormControl(!!this.apartmentData.address ? this.apartmentData.address.door : null),
        location: new FormControl(!!this.apartmentData.address ? this.apartmentData.address.location : null),
        addressTypes: new FormControl(!!this.apartmentData.address ? this.apartmentData.address.addressTypes : null)
      }, { validators: addressFormGroupValidator }),
      typeOfBuilding: new FormControl(!!this.apartmentData ? this.apartmentData.typeOfBuilding : null),
      yearOfConstruction: new FormControl(!!this.apartmentData ? this.apartmentData.yearOfConstruction : null),
      stateOfApartment: new FormControl(!!this.apartmentData ? this.apartmentData.stateOfApartment : null),
      energyPerformanceCertificate: new FormControl(!!this.apartmentData ? this.apartmentData.energyPerformanceCertificate : null),
      floorsOfBuilding: new FormControl(
        !!this.apartmentData ? this.apartmentData.floorsOfBuilding : null, [Validators.min(0), Validators.max(100)]
      ),
      floorsOfApartment: new FormControl(
        !!this.apartmentData ? this.apartmentData.floorsOfApartment : null, [Validators.min(0), Validators.max(100)]
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
      .subscribe(async (term: Apartment['address']) => {
        try {
          const params = new URLSearchParams();
          for (const key in term) {
            if (term.hasOwnProperty(key)) {
              params.set(key, term[key]);

              if (key === 'location' || key === 'addressTypes') {
                params.set(key, JSON.stringify(term[key]));
              }
            }
          }
          const addressResponse = await this.apartmentCreateService.checkAddress(params.toString());
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
    const addressTypes = {};

    address.address_components.map(addressComponent => {
      addressTypes[addressComponent.types[0]] = addressComponent.short_name;
    });

    this.apartmentDataFirstForm.get('address').get('city').setValue(address.formatted_address);
    this.apartmentDataFirstForm.get('address').get('location').setValue({
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    });
    this.apartmentDataFirstForm.get('address').get('addressTypes').setValue(addressTypes);
    this.searchTerms.emit(this.apartmentDataFirstForm.get('address').value);
  }

  search(term: Apartment['address']) {
    this.searchTerms.emit(term);
  }

  arrayNumber(n: number) {
    return Array(n);
  }

  arrayChar() {
    const charArray = [];

    for (let i = 65; i <= 90; i++) {
      charArray.push(String.fromCharCode(i));
    }

    return charArray;
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
