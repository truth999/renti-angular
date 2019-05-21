import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Page } from '../../../../shared/models';

import { MyPropertiesService } from '../../services/my-properties.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent implements OnInit {
  apartments = [];
  page = new Page();
  uploadBase = environment.uploadBase;

  constructor(
    private router: Router,
    private myPropertiesService: MyPropertiesService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getApartments();
  }

  async getApartments() {
    try {
      const response = await this.myPropertiesService.getApartments(this.page);
      this.apartments = !response ? [] : response.apartments;
      this.apartments.map(apartment => {
        apartment.roomsData = [];
        apartment.rooms.map(async roomId => {
          try {
            const roomResponse = await this.myPropertiesService.getRoom(roomId);
            !roomResponse ? apartment.roomsData.push(null) : apartment.roomsData.push(roomResponse.room);
          } catch (e) {
            console.log('MyPropertiesComponent->getApartments->roomResponse', e);
          }
        });
      });
      this.page.totalPages = !response ? 0 : response.totalPages;
    } catch (e) {
      console.log('MyPropertiesComponent->getApartments', e);
    }
  }

  onAdd() {
    this.router.navigate(['/apartment-create']);
  }

}
