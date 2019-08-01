import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Landlord, Tenant } from '../../../shared/models';

@Injectable()
export class MyProfileService {
  private landlordUrl = 'landlords';
  private tenantUrl = 'tenants';
  private feedbackUrl = 'feedbacks';
  private userUrl = 'users';
  private instagramUrl = 'instagram';

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

  getInstagramUserDetails(code: string): Promise<any> {
    return this.apiService.get(`${this.instagramUrl}?code=${code}`);
  }

  deleteLandlord(id: string): Promise<any> {
    return this.apiService.delete(`${this.landlordUrl}/${id}`);
  }

  deleteTenant(id: string): Promise<any> {
    return this.apiService.delete(`${this.tenantUrl}/${id}`);
  }
}
