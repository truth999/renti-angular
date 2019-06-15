import { Injectable } from '@angular/core';

import { Tenant } from '../../../shared/models';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class TenantService {
  private tenantUrl = 'tenants';

  constructor(
    private apiService: ApiService
  ) { }

  createTenant(tenant: Tenant): Promise<any> {
    return this.apiService.post(this.tenantUrl, tenant);
  }

  updateTenant(tenant: Tenant): Promise<any> {
    return this.apiService.put(`${this.tenantUrl}/${tenant._id}`, tenant);
  }

  deleteTenant(id: string): Promise<any> {
    return this.apiService.delete(`${this.tenantUrl}/${id}`);
  }
}
