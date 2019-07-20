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
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getApartments();
  }

  async getApartments() {
    try {
      const landlordId = this.storageService.get('landlordId');
      const apartmentsResponse = await this.myPropertiesService.getApartments(this.page, landlordId);
      this.apartments = apartmentsResponse.apartments;
      this.page.totalElements = apartmentsResponse.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
    } catch (e) {
      console.log('MyPropertiesComponent->getApartments', e);
    }
  }

  pageChange(event) {
    this.page.pageNumber = event;
    this.getApartments();
  }

  onAdd() {
    this.router.navigate(['/apartment-create']);
  }

}
