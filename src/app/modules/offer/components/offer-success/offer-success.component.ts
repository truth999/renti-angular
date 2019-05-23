import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tenant } from '../../../../shared/models';

import { OfferService } from '../../services/offer.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-offer-success',
  templateUrl: './offer-success.component.html',
  styleUrls: ['./offer-success.component.scss']
})
export class OfferSuccessComponent implements OnInit {
  user: any;
  tenant: Tenant;
  uploadBase = environment.uploadBase;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      const userResponse = await this.offerService.getUser(id);
      this.user = userResponse.user;

      const tenantResponse = await this.offerService.getTenant(this.user.tenantId);
      this.tenant = tenantResponse.tenant;
    } catch (e) {
      console.log('OfferSuccessComponent->ngOnInit', e);
    }
  }

}
