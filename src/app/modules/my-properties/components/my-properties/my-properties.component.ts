import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Apartment, Page } from '../../../../shared/models';

import { MyPropertiesService } from '../../services/my-properties.service';
import { AuthService } from '../../../../core/services/auth.service';
import { StorageService } from '../../../../core/services/storage.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent implements OnInit {
  apartments: Apartment[];
  page = new Page();
  uploadBase = environment.uploadBase;

  constructor(
    private router: Router,
    private myPropertiesService: MyPropertiesService,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.page.perPage = 10000;
    this.page.pageNumber = 1;

    this.getApartments();
  }

  async getApartments() {
    try {
      const landlordId = this.storageService.get('landlordId');
      const landlordResponse = await this.authService.getLandlord(landlordId);
      const landlord = landlordResponse.landlord;
      const apartmentsResponse = await this.myPropertiesService.getApartments(this.page);
      const apartments = apartmentsResponse.apartments;
      this.apartments = apartments.filter(apartment => {
        return apartment.landlord === landlord._id;
      });
    } catch (e) {
      console.log('MyPropertiesComponent->getApartments', e);
    }
  }

  onAdd() {
    this.router.navigate(['/apartment-create']);
  }

}
