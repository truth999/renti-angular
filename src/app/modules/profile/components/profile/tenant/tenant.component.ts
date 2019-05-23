import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TenantService } from '../../../../my-profile/services/tenant.service';

import { Tenant } from '../../../../../shared/models';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  @Input() tenantId: string;
  @Input() user: any;
  tenant: Tenant;
  uploadBase = environment.uploadBase;

  constructor(
    private location: Location,
    private tenantService: TenantService
  ) { }

  async ngOnInit() {
    try {
      const response = await this.tenantService.getTenant(this.tenantId);
      this.tenant = response.tenant;
    } catch (e) {
      console.log('TenantComponent->ngOnInit', e);
    }
  }

  onBack() {
    this.location.back();
  }

}
