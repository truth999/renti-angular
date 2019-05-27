import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Landlord } from '../../../shared/models';

@Injectable()
export class LandlordService {
  private landlordUrl = 'landlords';

  constructor(
    private apiService: ApiService
  ) { }

  createLandlord(landlord: Landlord): Promise<any> {
    return this.apiService.post(this.landlordUrl, landlord);
  }

  updateLandlord(landlord: Landlord): Promise<any> {
    return this.apiService.put(`${this.landlordUrl}/${landlord._id}`, landlord);
  }
}
