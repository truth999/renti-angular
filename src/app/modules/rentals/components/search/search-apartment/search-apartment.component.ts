import { Component, OnInit } from '@angular/core';

import { Apartment, Page, Room } from '../../../../../shared/models';

import { environment } from '../../../../../../environments/environment';

import { RentalsService } from '../../../services/rentals.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';

@Component({
  selector: 'app-search-apartment',
  templateUrl: './search-apartment.component.html',
  styleUrls: ['./search-apartment.component.scss']
})
export class SearchApartmentComponent implements OnInit {
  apartments: Apartment[];
  rooms: Room[];
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
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getApartments();
  }

  async getApartments() {
    try {
      this.cursorWaitService.enable();

      const response = await this.rentalsService.getApartments(this.page);
      this.apartments = !response ? [] : response.apartments;

      const roomsResponse = await this.rentalsService.getRooms();
      this.rooms = roomsResponse.rooms;

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
      console.log('SearchComponent->getApartments', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

}
