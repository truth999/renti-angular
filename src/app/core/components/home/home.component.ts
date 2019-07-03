import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeatmapFlatModalService } from '../../../shared/services/modal/heatmap/heatmap-flat-modal.service';
import { HeatmapTenantModalService } from '../../../shared/services/modal/heatmap/heatmap-tenant-modal.service';
import { HomeService } from '../../services/home.service';

import { Page } from '../../../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latitude: number;
  longitude: number;
  apartmentLocations = [];
  tenantLocations = [];
  page = new Page();
  geocoder = new google.maps.Geocoder();
  country = 'Hungary';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heatmapFlatModalService: HeatmapFlatModalService,
    private heatmapTenantModalService: HeatmapTenantModalService,
    private homeService: HomeService
  ) { }

  async ngOnInit() {
    this.page.perPage = 1000000000000;
    this.page.pageNumber = 1;

    this.getCountryLocation();
    try {
      const tenantResponse = await this.homeService.getTenants(this.page);
      const apartmentResponse = await this.homeService.getApartments(this.page);
      tenantResponse.tenants.map(tenant => {
        this.geocoder.geocode({ address: tenant.lookingRent }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.tenantLocations.push(results[0].geometry.location);
          }
        });
      });
      apartmentResponse.apartments.map(apartment => {
        this.geocoder.geocode({ address: apartment.address.city }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.apartmentLocations.push(results[0].geometry.location);
          }
        });
      });
    } catch (e) {
      console.log('HomeComponent->ngOnInit');
    }
  }

  onSignup() {
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }

  onLogin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  onOpenHeatmapFlatModal() {
    const results = {
      locations: this.apartmentLocations,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.heatmapFlatModalService.show(results);
  }

  onOpenHeatmapTenantModal() {
    const results = {
      locations: this.tenantLocations,
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.heatmapTenantModalService.show(results);
  }

  getCountryLocation() {
    this.geocoder.geocode({ address: this.country }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
    });
  }

}
