import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class RentalsService {
  private apartmentUrl = 'apartments';
  private roomUrl = 'rooms';

  constructor(
    private apiService: ApiService
  ) { }

  getApartments(page): Promise<any> {
    let url = `${this.apartmentUrl}?page=${page.pageNumber}`;
    url += page.pageNumber ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }

  getApartment(id: string): Promise<any> {
    return this.apiService.get(`${this.apartmentUrl}/${id}`);
  }

  getRooms(): Promise<any> {
    return this.apiService.get(this.roomUrl);
  }

  getRoom(id: string): Promise<any> {
    return this.apiService.get(`${this.roomUrl}/${id}`);
  }
}
