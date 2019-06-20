import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tenant } from '../../../../shared/models';

import { OfferService } from '../../services/offer.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';
import { AuthService } from '../../../../core/services/auth.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-offer-success',
  templateUrl: './offer-success.component.html',
  styleUrls: ['./offer-success.component.scss']
})
export class OfferSuccessComponent implements OnInit {
  tenant: Tenant;
  uploadBase = environment.uploadBase;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private cursorWaitService: CursorWaitService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getOfferInfo();
  }

  async getOfferInfo() {
    try {
      const tenantId = this.route.snapshot.paramMap.get('id');

      const response = await this.authService.getTenant(tenantId);
      this.tenant = response.tenant;
    } catch (e) {
      console.log('OfferSuccessComponent->getOfferInfo', e);
    }
  }

}
