import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Apartment, Page, Room } from '../../../shared/models';

@Injectable()
export class MyPropertiesService {
  private apartmentUrl = 'apartments';
  private roomUrl = 'rooms';

  constructor(
    private apiService: ApiService
  ) { }

  getApartments(page: Page, landlordId: string): Promise<any> {
    let url = `${this.apartmentUrl}/landlord/${landlordId}?page=${page.pageNumber}`;
    url += page.pageNumber ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }

  getApartment(id: string): Promise<any> {
    return this.apiService.get(`${this.apartmentUrl}/${id}`);
  }

  updateApartment(apartment: Apartment): Promise<any> {
    return this.apiService.put(`${this.apartmentUrl}/${apartment._id}`, apartment);
  }

  deleteApartment(id: string): Promise<any> {
    return this.apiService.delete(`${this.apartmentUrl}/${id}`);
  }

  createRooms(rooms: Room[]): Promise<any> {
    return this.apiService.post(this.roomUrl, rooms);
  }

  getRoom(id: string): Promise<any> {
    return this.apiService.get(`${this.roomUrl}/${id}`);
  }

  updateRoom(room: Room): Promise<any> {
    return this.apiService.put(`${this.roomUrl}/${room._id}`, room);
  }

  deleteRoom(id: string): Promise<any> {
    return this.apiService.delete(`${this.roomUrl}/${id}`);
  }

  checkAddress(term: string): Promise<any> {
    return this.apiService.get(`${this.apartmentUrl}/check-address?${term}`);
  }
}
