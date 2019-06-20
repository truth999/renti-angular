import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class LandlordService {
  private landlordUrl = 'landlords';
  private feedbackUrl = 'feedbacks';

  constructor(
    private apiService: ApiService
  ) { }

  getLandlord(id: string): Promise<any> {
    return this.apiService.get(`${this.landlordUrl}/${id}`);
  }

  getFeedbacks(): Promise<any> {
    return this.apiService.get(this.feedbackUrl);
  }
}
