import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../../core/services/storage.service';
import { AuthService } from '../../../../core/services/auth.service';

import { Apartment, Page } from '../../../../shared/models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Apartment[];
  page = new Page();

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getFavorites();
  }

  async getFavorites() {
    try {
      const tenantId = this.storageService.get('tenantId');
      const tenantResponse = await this.authService.getTenant(tenantId, this.page);
      this.favorites = tenantResponse.tenant.favorites;
      this.page.totalElements = tenantResponse.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
    } catch (e) {
      console.log('FavoritesComponent->getFavorites', e);
    }
  }

  pageChange(event) {
    this.page.pageNumber = event;
    this.getFavorites();
  }

}
