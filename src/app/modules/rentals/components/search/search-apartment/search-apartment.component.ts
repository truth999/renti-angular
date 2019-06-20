import { Component, OnInit } from '@angular/core';

import { Apartment, Page } from '../../../../../shared/models';

import { RentalsService } from '../../../services/rentals.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { StorageService } from '../../../../../core/services/storage.service';

@Component({
  selector: 'app-search-apartment',
  templateUrl: './search-apartment.component.html',
  styleUrls: ['./search-apartment.component.scss']
})
export class SearchApartmentComponent implements OnInit {
  apartments: Apartment[] = [];
  page = new Page();

  toggled = false;
  minPrice = 0;
  maxPrice = 500;

  priceRange = [90, 250];

  constructor(
    private rentalsService: RentalsService,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    this.page.perPage = 10000;
    this.page.pageNumber = 1;

    try {
      const tenantId = this.storageService.get('tenantId');
      const tenantResponse = await this.authService.getTenant(tenantId);
      const lookingToRentIn = tenantResponse.tenant.lookingRent;

      const apartmentResponse = await this.rentalsService.getApartments(this.page);
      const apartments = apartmentResponse.apartments;

      const tenantApartments = apartments.filter(apartment => {
        return apartment.address === lookingToRentIn;
      });
      tenantApartments.sort((a, b) => {
        return b.rank - a.rank;
      });

      const diffApartments = apartments.filter(apartment => {
        return apartment.address !== lookingToRentIn;
      });
      diffApartments.sort((a, b) => {
        return b.rank - a.rank;
      });
      diffApartments.sort((a, b) => {
        const x = a.address.toLowerCase();
        const y = b.address.toLowerCase();
        if (x < y) {
          return -1;
        }
        if ((x > y)) {
          return 1;
        }
        return 0;
      });

      this.apartments = tenantApartments.concat(diffApartments);
    } catch (e) {
      console.log('SearchApartmentComponent->ngOnInit', e);
    }
  }

}
