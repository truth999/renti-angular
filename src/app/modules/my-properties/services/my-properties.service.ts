import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Apartment, Room } from '../../../shared/models';

@Injectable()
export class MyPropertiesService {
  private apartmentUrl = 'apartments';
  private roomUrl = 'rooms';

  constructor(
    private apiService: ApiService
  ) { }

  getApartments(page, id: string): Promise<any> {
    let url = `${this.apartmentUrl}/user/${id}?page=${page.pageNumber}`;
    url += page.pageNumber ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }

  getApartment(id: string): Promise<any> {
    return this.apiService.get(`${this.apartmentUrl}/${id}`);
  }

  updateApartment(apartment: Apartment): Promise<any> {
    return this.apiService.put(`${this.apartmentUrl}/${apartment._id}`, apartment);
  }

  getRoom(id: string): Promise<any> {
    return this.apiService.get(`${this.roomUrl}/${id}`);
  }

  updateRoom(room: Room): Promise<any> {
    return this.apiService.put(`${this.roomUrl}/${room._id}`, room);
  }
}
