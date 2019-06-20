import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class TenantService {
  private tenantUrl = 'tenants';

  constructor(
    private apiService: ApiService
  ) { }

  getTenant(id: string): Promise<any> {
    return this.apiService.get(`${this.tenantUrl}/${id}`);
  }
}
