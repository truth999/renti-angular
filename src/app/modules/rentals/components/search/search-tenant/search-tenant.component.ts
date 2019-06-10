import { Component, OnInit } from '@angular/core';

import { Page, Tenant } from '../../../../../shared/models';

import { RentalsService } from '../../../services/rentals.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';

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
    private rentalsService: RentalsService,
    private cursorWaitService: CursorWaitService
  ) { }

  ngOnInit() {
    this.page.perPage = 10000;
    this.page.pageNumber = 1;

    this.getTenants();
  }

  async getTenants() {
    try {
      this.cursorWaitService.enable();

      const response = await this.rentalsService.getTenants(this.page);
      this.tenants = response.tenants;
    } catch (e) {
      console.log('SearchTenantComponent->getTenants', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

}
