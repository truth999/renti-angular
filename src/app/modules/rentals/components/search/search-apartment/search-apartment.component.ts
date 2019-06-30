import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { Apartment, Page } from '../../../../../shared/models';

import { RentalsService } from '../../../services/rentals.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';

@Component({
  selector: 'app-search-apartment',
  templateUrl: './search-apartment.component.html',
  styleUrls: ['./search-apartment.component.scss']
})
export class SearchApartmentComponent implements OnInit {
  apartments: Apartment[] = [];
  page = new Page();

  searchForm: FormGroup;

  toggled = false;
  moreFilters = false;

  years: number[];
  mediaService = [
    'UPC', 'DIGI', 'Telekom', 'Other'
  ];

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
    this.page.perPage = 10000;
    this.page.pageNumber = 1;
    this.years = this.dateSelectService.getYears();

    this.getApartments();
    this.buildSearchForm();
  }

  async getApartments() {
    try {
      const tenantId = this.storageService.get('tenantId');
      const tenantResponse = await this.authService.getTenant(tenantId);
      const lookingToRentIn = tenantResponse.tenant.lookingRent;

      const apartmentResponse = await this.rentalsService.getApartments(this.page);
      const apartments = apartmentResponse.apartments;

      const tenantApartments = apartments.filter(apartment => {
        return apartment.address === lookingToRentIn;
      });
      const diffApartments = apartments.filter(apartment => {
        return apartment.address !== lookingToRentIn;
      });

      this.apartments = tenantApartments.concat(diffApartments);
    } catch (e) {
      console.log('SearchApartmentComponent->getApartments', e);
    }
  }

  buildSearchForm() {
    this.searchForm = new FormGroup({
      address: new FormControl(null),
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
        rightNow: new FormControl(null),
        date: new FormControl(null)
      })
    });
  }

  handleAddressChange(address: Address) {
    this.searchForm.get('address').setValue(address.formatted_address);
  }

  onChangeFurnished(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('furnished').setValue(null);
    } else {
      this.searchForm.get('furnished').setValue(false);
    }
  }

  onChangeRightNow(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('dateOfMovingIn').get('rightNow').setValue(null);
    } else {
      this.searchForm.get('dateOfMovingIn').get('rightNow').setValue(false);
    }
  }

  changeRightNow() {
    if (this.searchForm.get('dateOfMovingIn').get('rightNow')) {
      this.searchForm.get('dateOfMovingIn').get('date').setValue(null);
    }
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

  onChangeElevator(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('elevator').setValue(null);
    } else {
      this.searchForm.get('elevator').setValue(false);
    }
  }

  onChangeRooftop(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('rooftop').setValue(null);
    } else {
      this.searchForm.get('rooftop').setValue(false);
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

  onChangeChildFriendly(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('childFriendly').setValue(null);
    } else {
      this.searchForm.get('childFriendly').setValue(false);
    }
  }

  onChangePetFriendly(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('petFriendly').setValue(null);
    } else {
      this.searchForm.get('petFriendly').setValue(false);
    }
  }

  onChangeMediaServiceProviders(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('mediaServiceProviders').setValue(null);
    }
  }

  onChangeHandicapAccessible(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('handicapAccessible').setValue(null);
    } else {
      this.searchForm.get('handicapAccessible').setValue(false);
    }
  }

  onChangeExternalIsolation(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('externalIsolation').setValue(null);
    } else {
      this.searchForm.get('externalIsolation').setValue(false);
    }
  }

  onChangeBalcony(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('balcony').setValue(null);
      this.searchForm.get('sizeOfBalcony').setValue(null);
    } else {
      this.searchForm.get('balcony').setValue(false);
    }
  }

  changeBalcony() {
    if (!this.searchForm.get('balcony').value) {
      this.searchForm.get('sizeOfBalcony').setValue(null);
    }
  }

  onChangeSizeOfBalcony(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('sizeOfBalcony').setValue(null);
    } else {
      this.searchForm.get('sizeOfBalcony').setValue([0, 100]);
    }
  }

  onChangeGarden(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('garden').setValue(null);
      this.searchForm.get('sizeOfGarden').setValue(null);
    } else {
      this.searchForm.get('garden').setValue(false);
    }
  }

  changeGarden() {
    if (!this.searchForm.get('garden').value) {
      this.searchForm.get('sizeOfGarden').setValue(null);
    }
  }

  onChangeSizeOfGarden(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('sizeOfGarden').setValue(null);
    } else {
      this.searchForm.get('sizeOfGarden').setValue([0, 999999]);
    }
  }

  onChangeTerrace(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('terrace').setValue(null);
      this.searchForm.get('sizeOfTerrace').setValue(null);
    } else {
      this.searchForm.get('terrace').setValue(false);
    }
  }

  changeTerrace() {
    if (!this.searchForm.get('terrace').value) {
      this.searchForm.get('sizeOfTerrace').setValue(null);
    }
  }

  onChangeSizeOfTerrace(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('sizeOfTerrace').setValue(null);
    } else {
      this.searchForm.get('sizeOfTerrace').setValue([1, 100]);
    }
  }

  onChangeAirConditioner(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('airConditioner').setValue(null);
    } else {
      this.searchForm.get('airConditioner').setValue(false);
    }
  }

  onChangeGarage(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('garage').setValue(null);
    } else {
      this.searchForm.get('garage').setValue(false);
    }
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
    }
  }

  onChangeDate(event: Event) {
    if (!(event.target as HTMLInputElement).checked) {
      this.searchForm.get('dateOfMovingIn').get('date').setValue(null);
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

  arrayNumber(n: number) {
    return Array(n);
  }

  async submit() {
    const filters = this.searchForm.value;
    if (filters.dateOfMovingIn.rightNow === null && filters.dateOfMovingIn.date === null) {
      filters.dateOfMovingIn = null;
    }

    try {
      const response = await this.rentalsService.getSearchApartments(this.page, filters);
      this.apartments = response.apartments;
      this.toggled = false;
    } catch (e) {
      console.log('SearchApartmentComponent->submit', e);
    }
  }

}
