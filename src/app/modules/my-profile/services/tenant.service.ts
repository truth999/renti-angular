import { EventEmitter, Injectable } from '@angular/core';

import { Tenant } from '../../../shared/models';
import { ApiService } from '../../../core/services/api.service';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class TenantService {
  tenantData: Tenant;
  tenantChanged = new EventEmitter<Tenant>();

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router
  ) { }

  get(id: string) {
    this.apiService.get(`tenants/${id}`).then(response => {
      this.tenantData = response.tenant;
      console.log(response.tenant);
      this.tenantChanged.emit(this.tenantData);
    });
  }

  create(tenantData: Tenant) {
    this.apiService.post('tenants', tenantData).then(response => {
      this.storageService.save('tenantId', response.tenant._id);
      this.router.navigate(['/app/profile/tenant']);
    });
  }

  update(id: string, tenantData: Tenant) {
    this.apiService.put(`tenants/${id}`, tenantData).then(response => {
      this.storageService.save('tenantId', response.tenant._id);
      this.router.navigate(['/app/profile/tenant']);
    });
  }
}
