import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Tenant} from '../models/tenant.model';

@Injectable()
export class TenantService {

  constructor(
    private apiService: ApiService,
  ) { }

  getTenants(page): Promise<any> {
    const url = `tenants?page=${page.pageNumber}&perPage=${page.perPage}`;
    return this.apiService.get(url);
  }

  getTenant(id: string): Promise<any> {
    return this.apiService.get(`tenants/${id}`);
  }

  createTenant(tenant: Tenant): Promise<any> {
    return this.apiService.post(`tenants`, tenant);
  }

  updateTenant(tenant: Tenant): Promise<any> {
    return this.apiService.put(`tenants/${tenant._id}`, tenant);
  }

  deleteTenant(id: string): Promise<any> {
    return this.apiService.delete(`tenants/${id}`);
  }
}
