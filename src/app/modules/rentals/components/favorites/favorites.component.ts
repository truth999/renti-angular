import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../../core/services/storage.service';
import { AuthService } from '../../../../core/services/auth.service';

import { Apartment } from '../../../../shared/models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Apartment[];

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getFavorites();
  }

  async getFavorites() {
    try {
      const tenantId = this.storageService.get('tenantId');
      const tenantResponse = await this.authService.getTenant(tenantId);
      this.favorites = tenantResponse.tenant.favorites;
    } catch (e) {
      console.log('FavoritesComponent->getFavorites', e);
    }
  }

}
