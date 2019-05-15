import { Injectable } from '@angular/core';

import { Tenant } from '../../../shared/models';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class TenantService {
  constructor(
    private apiService: ApiService
  ) { }

  getTenant(id: string): Promise<any> {
    return this.apiService.get(`tenants/${id}`);
  }

  createTenant(tenant: Tenant): Promise<any> {
    return this.apiService.post('tenants', tenant);
  }

  updateTenant(tenant: Tenant): Promise<any> {
    return this.apiService.put(`tenants/${tenant._id}`, tenant);
  }
}
