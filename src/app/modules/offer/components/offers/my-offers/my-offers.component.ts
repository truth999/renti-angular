import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OfferService } from '../../../services/offer.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { FeedbackModalService } from '../../../../../shared/services/modal/feedback-modal.service';

import { Offer, Page } from '../../../../../shared/models';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
  acceptedOffers: Offer[];
  pendingOffers: Offer[];
  page = new Page();

  constructor(
    private location: Location,
    private offerService: OfferService,
    private storageService: StorageService,
    private feedbackModalService: FeedbackModalService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getOffers();
  }

  async getOffers() {
    try {
      const userId = this.storageService.get('userId');
      const response = await this.offerService.getOffersByTenant(this.page, userId);
      this.acceptedOffers = response.offers.filter(offer => {
        return offer.accepted === true;
      });
      this.pendingOffers = response.offers.filter(offer => {
        return offer.accepted === false;
      });
    } catch (e) {
      console.log('MyOffersComponent->getOffers', e);
    }
  }

  onGiveFeedback(event: Event, feedbackData) {
    event.stopPropagation();
    this.feedbackModalService.show(feedbackData);
  }

  onBack() {
    this.location.back();
  }

}
