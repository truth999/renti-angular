import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../../../core/services/auth.service';
import { TenantService } from '../../../../my-profile/services/tenant.service';

import { Tenant } from '../../../../../shared/models';

@Component({
  selector: 'app-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  user: any;
  tenant: Tenant;
  tenantId: string;

  constructor(
    private location: Location,
    private authService: AuthService,
    private tenantService: TenantService
  ) { }

  async ngOnInit() {
    try {
      const responseUser = await this.authService.getUser();
      this.user = responseUser.user;
      this.tenantId = responseUser.user.tenantId;

      if (!!this.tenantId) {
        const response = await this.tenantService.getTenant(this.tenantId);
        this.tenant = response.tenant;
      }
    } finally {
    }
  }

  onBack() {
    this.location.back();
  }

}
