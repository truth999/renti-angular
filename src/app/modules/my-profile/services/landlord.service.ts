import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Landlord } from '../../../shared/models';

@Injectable()
export class LandlordService {

  constructor(
    private apiService: ApiService
  ) { }

  getLandlord(id: string): Promise<any> {
    return this.apiService.get(`landlords/${id}`);
  }

  createLandlord(landlord: Landlord): Promise<any> {
    return this.apiService.post('landlords', landlord);
  }

  updateLandlord(landlord: Landlord): Promise<any> {
    return this.apiService.put(`landlords/${landlord._id}`, landlord);
  }
}
