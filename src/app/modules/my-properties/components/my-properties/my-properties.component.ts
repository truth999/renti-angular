import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Apartment, Page, Room } from '../../../../shared/models';

import { MyPropertiesService } from '../../services/my-properties.service';
import { StorageService } from '../../../../core/services/storage.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent implements OnInit {
  apartments: Apartment[] = [];
  rooms: Room[];
  page = new Page();
  uploadBase = environment.uploadBase;

  constructor(
    private router: Router,
    private myPropertiesService: MyPropertiesService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getApartments();
  }

  async getApartments() {
    try {
      const userId = this.storageService.get('userId');
      const response = await this.myPropertiesService.getApartments(this.page);
      const apartments = !response ? [] : response.apartments;

      const roomsResponse = await this.myPropertiesService.getRooms();
      this.rooms = roomsResponse.rooms;

      apartments.map(apartment => {
        if (apartment.user === userId) {
          this.apartments.push(apartment);
        }
      });

      this.apartments.map(apartment => {
        apartment.roomsData = [];
        apartment.rooms.map(async roomId => {
          this.rooms.map(room => {
            if (roomId === room._id) {
              apartment.roomsData.push(room);
            }
          });
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
