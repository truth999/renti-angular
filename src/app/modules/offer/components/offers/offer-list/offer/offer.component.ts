import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { OfferService } from '../../../../services/offer.service';
import { NotificationsService } from '../../../../../../core/services/notifications.service';

import { Offer } from '../../../../../../shared/models';

import { environment } from '../../../../../../../environments/environment';

import { config } from '../../../../../../../config';
import { CONFIG_CONST } from '../../../../../../../config/config-const';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @Input() offer: Offer;
  @Output() offerChanged = new EventEmitter<void>();

  uploadBase = environment.uploadBase;
  offerConfig = config.offer;
  private NotificationTypes = CONFIG_CONST.notificationType;

  constructor(
    private router: Router,
    private offerService: OfferService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
  }

  async onProfile() {
    if (this.offer.accepted === null) {
      try {
        await this.offerService.changeOfferStatus(this.offer._id);
      } catch (e) {
        console.log('OfferComponent->onProfile', e);
      }
    }

    this.router.navigate(['/app/profile/tenant', this.offer.tenant._id]);
  }

  async onAccept() {
    try {
      const offer = {
        ...this.offer,
        accepted: true
      };

      await this.offerService.updateOffer(offer);
      this.notificationsService.clean(this.NotificationTypes.RECEIVED);
      this.router.navigate(['/app/offers', this.offer.tenant._id, 'success']);
    } catch (e) {
      console.log('OfferComponent->onSuccess', e);
    }
  }

  async onReject() {
    try {
      const offer = {
        ...this.offer,
        accepted: false
      };

      await this.offerService.updateOffer(offer);
      this.notificationsService.clean(this.NotificationTypes.RECEIVED);
      const alert = this.translate.instant('ALERT.OFFER_REJECTED');
      const success = this.translate.instant('ALERT.SUCCESS');
      this.toastrService.success(alert, success);
      this.offerChanged.emit();
    } catch (e) {
      const alert = this.translate.instant('ALERT.SOMETHING_WENT_WRONG');
      const error = this.translate.instant('ALERT.ERROR');
      this.toastrService.error(alert, error);
      console.log('OfferComponent->onDelete', e);
    }
  }

  async onChangeStatus() {
    if (this.offer.accepted === null) {
      try {
        await this.offerService.changeOfferStatus(this.offer._id);
      } catch (e) {
        console.log('OfferComponent->onChangeStatus', e);
      }
    }
  }

}
