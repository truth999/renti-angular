import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';

import { TenantService } from '../../services/tenant.service';

import { Tenant } from '../../../../shared/models';

@Component({
  selector: 'app-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  tenant: Tenant;
  rate: number;
  uploadBase = environment.uploadBase;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private tenantService: TenantService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    try {
      const response = await this.tenantService.getTenant(id);
      this.tenant = response.tenant;
      this.rate = this.tenant.rank * .05;
    } catch (e) {
      console.log('TenantComponent->ngOnInit', e);
    }
  }

  onBack() {
    this.location.back();
  }

}
