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
      const tenant = response.tenant;
      if (tenant.feedback.length !== 0) {
        const totalRate = tenant.feedback.reduce((total, currentValue) => {
          return total + currentValue.feedbackStar;
        }, 0);
        this.rate = parseInt((totalRate / tenant.feedback.length).toFixed(0), 10) - 1;
      }
      this.tenant = tenant;
    } catch (e) {
      console.log('TenantComponent->ngOnInit', e);
    }
  }

  dateFormat(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('.');
  }

  onBack() {
    this.location.back();
  }

}
