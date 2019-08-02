import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Offer } from '../../../../../../shared/models';

import { environment } from '../../../../../../../environments/environment';

import { OfferService } from '../../../../services/offer.service';
import { FeedbackModalService } from '../../../../../../shared/services/modal/feedback-modal.service';
import { StorageService } from '../../../../../../core/services/storage.service';

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
  AccountTypes = CONFIG_CONST.accountType;
  landlordId: string;

  constructor(
    private router: Router,
    private offerService: OfferService,
    private toastrService: ToastrService,
    private feedbackModalService: FeedbackModalService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.landlordId = this.storageService.get('landlordId');
  }

  onProfile() {
    this.router.navigate(['/app/profile/tenant', this.offer.tenant._id]);
  }

  async onAccept() {
    try {
      const offer = {
        ...this.offer,
        accepted: true
      };

      await this.offerService.updateOffer(offer);
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
      this.toastrService.success('The offer is rejected successfully.', 'Success!');
      this.offerChanged.emit();
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('OfferComponent->onDelete', e);
    }
  }

  onGiveFeedback(feedbackData) {
    this.feedbackModalService.show(feedbackData);
  }

}
