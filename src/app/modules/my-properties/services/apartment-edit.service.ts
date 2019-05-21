import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class ApartmentEditService {

  constructor(
    private apiService: ApiService
  ) { }

  getApartment(id: string): Promise<any> {
    return this.apiService.get(`apartments/${id}`);
  }
}
