import { Component, OnInit } from '@angular/core';

import { Page, Tenant } from '../../../../../shared/models';

import { RentalsService } from '../../../services/rentals.service';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-search-tenant',
  templateUrl: './search-tenant.component.html',
  styleUrls: ['./search-tenant.component.scss']
})
export class SearchTenantComponent implements OnInit {
  tenants: Tenant[];
  page = new Page();

  uploadBase = environment.uploadBase;

  toggled = false;
  minPrice = 0;
  maxPrice = 500;

  priceRange = [90, 250];

  constructor(
    private rentalsService: RentalsService
  ) { }

  ngOnInit() {
    this.page.perPage = 10000;
    this.page.pageNumber = 1;

    this.getTenants();
  }

  async getTenants() {
    try {
      const response = await this.rentalsService.getTenants(this.page);
      this.tenants = response.tenants.filter(tenant => {
        return tenant.user.active;
      });
    } catch (e) {
      console.log('SearchTenantComponent->getTenants', e);
    }
  }

}
