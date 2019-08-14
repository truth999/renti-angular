import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { Apartment, Page } from '../../../../../shared/models';

import { RentalsService } from '../../../services/rentals.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';
import { config } from '../../../../../../config';

@Component({
  selector: 'app-search-apartment',
  templateUrl: './search-apartment.component.html',
  styleUrls: ['./search-apartment.component.scss']
})
export class SearchApartmentComponent implements OnInit {
  apartments: Apartment[] = [];
  page = new Page();
  apartmentConfig = config.apartment;

  searchForm: FormGroup;

  toggled = false;
  moreFilters = false;

  years: number[];

  searched = false;
  Object = Object;

  placeOptions = config.googleplaceOptions;

  keepOrder = (a, b) => {
    return a;
  }

  constructor(
    private rentalsService: RentalsService,
    private authService: AuthService,
    private storageService: StorageService,
    private dateSelectService: DateSelectService,
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
    this.page.perPage = 10;
    this.page.pageNumber = 1;
    this.years = this.dateSelectService.getYears();

    this.getApartments();
    this.buildSearchForm();
  }

  async getApartments() {
    try {
      const tenantId = this.storageService.get('tenantId');
      const tenantResponse = await this.authService.getTenant(tenantId);
      const lookingToRentIn = (tenantResponse.tenant.lookingRent ? tenantResponse.tenant.lookingRent.addressTypes : '');

      const apartmentResponse = await this.rentalsService.getApartments(this.page, JSON.stringify(lookingToRentIn));
      this.apartments = apartmentResponse.apartments;
      this.page.totalElements = apartmentResponse.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
    } catch (e) {
      console.log('SearchApartmentComponent->getApartments', e);
    }
  }

  buildSearchForm() {
    this.searchForm = new FormGroup({
      address: new FormControl(null),
      addressTypes: new FormControl(null),
      rentalFee: new FormControl([0, 2000000]),
      furnished: new FormControl(null),
      typeOfBuilding: new FormControl(null),
      yearOfConstruction: new FormControl(null),
      stateOfApartment: new FormControl(null),
      energyPerformanceCertificate: new FormControl(null),
      floorsOfBuilding: new FormControl(null),
      floorsOfApartment: new FormControl(null),
      size: new FormControl(null),
      elevator: new FormControl(null),
      rooftop: new FormControl(null),
      buildingSiting: new FormControl(null),
      typeOfHeating: new FormControl(null),
      headroom: new FormControl(null),
      parking: new FormControl(null),
      windowType: new FormControl(null),
      childFriendly: new FormControl(null),
      petFriendly: new FormControl(null),
      mediaServiceProviders: new FormControl(null),
      handicapAccessible: new FormControl(null),
      airConditioner: new FormControl(null),
      garage: new FormControl(null),
      externalIsolation: new FormControl(null),
      balcony: new FormControl(null),
      sizeOfBalcony: new FormControl(null),
      garden: new FormControl(null),
      sizeOfGarden: new FormControl(null),
      terrace: new FormControl(null),
      sizeOfTerrace: new FormControl(null),
      overhead: new FormControl(null),
      deposit: new FormControl(null),
      minimumRentingTime: new FormControl(null),
      dateOfMovingIn: new FormGroup({
        rightNow: new FormControl(null)
      })
    });
  }

  handleAddressChange(address: Address) {
    const addressTypes = {};

    address.address_components.map(addressComponent => {
      addressTypes[addressComponent.types[0]] = addressComponent.short_name;
    });

    this.searchForm.get('address').setValue(address.formatted_address);
    this.searchForm.get('addressTypes').setValue(addressTypes);
  }

  onChangeTypeOfBuilding(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('typeOfBuilding').setValue(null);
    }
  }

  onChangeYearOfConstruction(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('yearOfConstruction').setValue(null);
    }
  }

  onChangeStateOfApartment(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('stateOfApartment').setValue(null);
    }
  }

  onChangeEnergyPerformanceCertificate(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('energyPerformanceCertificate').setValue(null);
    }
  }

  onChangeFloorsOfBuilding(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('floorsOfBuilding').setValue(null);
    } else {
      this.searchForm.get('floorsOfBuilding').setValue([1, 100]);
    }
  }

  onChangeFloorsOfApartment(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('floorsOfApartment').setValue(null);
    } else {
      this.searchForm.get('floorsOfApartment').setValue([1, 100]);
    }
  }

  onChangeSize(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('size').setValue(null);
    } else {
      this.searchForm.get('size').setValue([1, 9999]);
    }
  }

  onChangeBuildingSiting(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('buildingSiting').setValue(null);
    }
  }

  onChangeTypeOfHeating(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('typeOfHeating').setValue(null);
    }
  }

  onChangeHeadroom(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('headroom').setValue(null);
    }
  }

  onChangeParking(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('parking').setValue(null);
    }
  }

  onChangeWindowType(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('windowType').setValue(null);
    }
  }

  onChangeMediaServiceProviders(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('mediaServiceProviders').setValue(null);
    }
  }

  onChangeBalcony() {
    this.searchForm.get('balcony').value
      ? this.searchForm.get('sizeOfBalcony').setValue([0, 100])
      : this.searchForm.get('sizeOfBalcony').setValue(null);
  }

  onChangeGarden() {
    this.searchForm.get('garden').value
      ? this.searchForm.get('sizeOfGarden').setValue([0, 5000])
      : this.searchForm.get('sizeOfGarden').setValue(null);
  }

  onChangeTerrace() {
    if (!this.searchForm.get('terrace').value) {
      this.searchForm.get('sizeOfTerrace').setValue(null);
    }
    this.searchForm.get('terrace').value
      ? this.searchForm.get('sizeOfTerrace').setValue([1, 100])
      : this.searchForm.get('sizeOfTerrace').setValue(null);
  }

  onChangeOverhead(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('overhead').setValue(null);
    } else {
      this.searchForm.get('overhead').setValue([0, 1000000]);
    }
  }

  onChangeDeposit(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('deposit').setValue(null);
    } else {
      this.searchForm.get('deposit').setValue([0, 2000000]);
    }
  }

  onChangeMinimumRentingTime(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('minimumRentingTime').setValue(null);
    } else {
      this.searchForm.get('minimumRentingTime').setValue([0, 120]);
    }
  }

  clearAllFilters() {
    const checkboxes = document.querySelectorAll('.search-checkbox');
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = false;
    });
    this.searchForm.reset();
    this.searchForm.get('rentalFee').setValue([0, 2000000]);
  }

  async getSearchApartments() {
    try {
      const response = await this.rentalsService.getSearchApartments(this.page, this.searchForm.value);
      this.apartments = response.apartments;
      this.page.totalElements = response.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
      this.toggled = false;
    } catch (e) {
      console.log('SearchApartmentComponent->getSearchApartments', e);
    }
  }

  pageChange(event) {
    this.page.pageNumber = event;
    if (this.searched) {
      this.getSearchApartments();
    } else {
      this.getApartments();
    }
  }

  arrayNumber(n: number) {
    return Array(n);
  }

  submit() {
    if (this.searchForm.get('address').value === '') {
      this.searchForm.get('addressTypes').setValue(null);
    }

    this.searched = true;
    this.getSearchApartments();
  }

}
