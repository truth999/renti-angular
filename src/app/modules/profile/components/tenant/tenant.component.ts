import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';

import { TenantService } from '../../services/tenant.service';

import { Tenant } from '../../../../shared/models';
import { config } from '../../../../../config';
import { Countries } from '../../../../../config/countries';

@Component({
  selector: 'app-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  tenant: Tenant;
  rate: number;
  feedbackNumber: number;
  uploadBase = environment.uploadBase;
  userConfig = config.user;
  countries = Countries;

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
          return total + currentValue.feedbackStar.overall;
        }, 0);
        this.rate = totalRate / tenant.feedback.length;
        this.feedbackNumber = tenant.feedback.length;
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
