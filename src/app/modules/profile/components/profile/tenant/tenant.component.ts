import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TenantService } from '../../../../my-profile/services/tenant.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';

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
    private tenantService: TenantService,
    private cursorWaitService: CursorWaitService
  ) { }

  async ngOnInit() {
    try {
      this.cursorWaitService.enable();

      const response = await this.tenantService.getTenant(this.tenantId);
      this.tenant = response.tenant;
    } catch (e) {
      console.log('TenantComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  onBack() {
    this.location.back();
  }

}
