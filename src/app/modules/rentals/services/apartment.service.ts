import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Apartment } from '../models/apartment.model';

@Injectable()
export class ApartmentService {

  private apartmentUrl = 'apartments';

  constructor(
    private apiService: ApiService,
  ) { }

  getApartments(page): Promise<any> {
    let url = `${this.apartmentUrl}?page=${page.pageNumber}`;
    url += page.perPage ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }

  getApartment(id: string): Promise<any> {
    return this.apiService.get(`${this.apartmentUrl}/${id}`);
  }

  createApartment(apartment: Apartment): Promise<any> {
    return this.apiService.post(this.apartmentUrl, apartment);
  }

  updateApartment(apartment: Apartment): Promise<any> {
    return this.apiService.put(`${this.apartmentUrl}/${apartment._id}`, apartment);
  }

  deleteApartment(id: string): Promise<any> {
    return this.apiService.delete(`${this.apartmentUrl}/${id}`);
  }
}
