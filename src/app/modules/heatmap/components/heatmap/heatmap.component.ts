import { Component, OnInit } from '@angular/core';

import { CONFIG_CONST } from '../../../../../config/config-const';

import { AuthService } from '../../../../core/services/auth.service';
import { HeatmapService } from '../../services/heatmap.service';

import { Page } from '../../../../shared/models';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  AccountTypes = CONFIG_CONST.accountType;
  accountType: string;
  page = new Page();
  latitude: number;
  longitude: number;
  country = 'Hungary';
  apartmentLocations = [];
  tenantLocations = [];
  geocoder = new google.maps.Geocoder();

  constructor(
    private authService: AuthService,
    private heatmapService: HeatmapService
  ) { }

  async ngOnInit() {
    this.getCountryLocation();
    this.page.perPage = 1000000000000;
    this.page.pageNumber = 1;
    try {
      const apartmentResponse = await this.heatmapService.getApartments(this.page);
      const tenantResponse = await this.heatmapService.getTenants(this.page);
      apartmentResponse.apartments.map(apartment => {
        this.geocoder.geocode({ address: apartment.address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.apartmentLocations.push(results[0].geometry.location);
          }
        });
      });
      tenantResponse.tenants.map(tenant => {
        this.geocoder.geocode({ address: tenant.lookingRent }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.tenantLocations.push(results[0].geometry.location);
          }
        });
      });
    } catch (e) {
      console.log('HeatmapComponent->ngOnInit', e);
    }
    this.getAccountType();
  }

  getCountryLocation() {
    this.geocoder.geocode({ address: this.country }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
    });
  }

  async getAccountType() {
    try {
      const userResponse = await this.authService.getAuthUser();
      this.accountType = userResponse.user.accountType;
    } catch (e) {
      console.log('HeatmapComponent->getAccountType', e);
    }
  }

}
