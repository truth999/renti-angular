import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Apartment, Page } from '../../../../shared/models';

import { MyPropertiesService } from '../../services/my-properties.service';
import { StorageService } from '../../../../core/services/storage.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';

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
    private storageService: StorageService,
    private cursorWaitService: CursorWaitService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getApartments();
  }

  async getApartments() {
    const userId = this.storageService.get('userId');

    try {
      this.cursorWaitService.enable();

      const response = await this.myPropertiesService.getApartments(this.page, userId);
      this.apartments = response.apartments;
    } catch (e) {
      console.log('MyPropertiesComponent->getApartments', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  onAdd() {
    this.router.navigate(['/apartment-create']);
  }

}
