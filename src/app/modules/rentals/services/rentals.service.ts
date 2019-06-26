import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class RentalsService {
  private apartmentUrl = 'apartments';
  private roomUrl = 'rooms';
  private tenantUrl = 'tenants';

  constructor(
    private apiService: ApiService
  ) { }

  getApartments(page): Promise<any> {
    let url = `${this.apartmentUrl}?page=${page.pageNumber}`;
    url += page.pageNumber ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }

  getApartment(id: string): Promise<any> {
    return this.apiService.get(`${this.apartmentUrl}/${id}/detail`);
  }

  setApartmentChecked(id: string): Promise<any> {
    return this.apiService.get(`${this.apartmentUrl}/${id}/checked`);
  }

  getRoom(id: string): Promise<any> {
    return this.apiService.get(`${this.roomUrl}/${id}`);
  }

  getTenants(page): Promise<any> {
    let url = `${this.tenantUrl}?page=${page.pageNumber}`;
    url += page.pageNumber ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }

  setFavorite(id: string, apartment: any): Promise<any> {
    return this.apiService.put(`${this.tenantUrl}/${id}/favorite`, apartment);
  }

  removeFavorite(id: string, apartment: any): Promise<any> {
    return this.apiService.put(`${this.tenantUrl}/${id}/favorite/remove`, apartment);
  }
}
