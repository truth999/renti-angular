import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Landlord, Tenant } from '../../../shared/models';

@Injectable()
export class MyProfileService {
  private landlordUrl = 'landlords';
  private tenantUrl = 'tenants';
  private feedbackUrl = 'feedbacks';
  private userUrl = 'users';

  constructor(
    private apiService: ApiService
  ) { }

  updateLandlord(landlord: Landlord): Promise<any> {
    return this.apiService.put(`${this.landlordUrl}/${landlord._id}`, landlord);
  }

  updateTenant(tenant: Tenant): Promise<any> {
    return this.apiService.put(`${this.tenantUrl}/${tenant._id}`, tenant);
  }

  getFeedbacks(): Promise<any> {
    return this.apiService.get(this.feedbackUrl);
  }

  updateUser(id: string, user: any): Promise<any> {
    return this.apiService.put(`${this.userUrl}/${id}`, user);
  }
}
