import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

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
  offers: Offer[];
  page = new Page();

  constructor(
    private location: Location,
    private offerService: OfferService,
    private storageService: StorageService,
    private feedbackModalService: FeedbackModalService
  ) { }

  ngOnInit() {
    this.getOffers();
    this.feedbackModalService.giveFeedback.subscribe(() => {
      this.getOffers(true);
    });
  }

  async getOffers(accepted?: boolean) {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    try {
      const tenantId = this.storageService.get('tenantId');
      const response = typeof accepted === 'undefined'
        ? await this.offerService.getOffersByTenant(this.page, tenantId)
        : await this.offerService.getOffersByTenant(this.page, tenantId, accepted);
      this.offers = response.offers;
    } catch (e) {
      console.log('MyOffersComponent->getOffers', e);
    }
  }

  changeTab(event: NgbTabChangeEvent) {
    if (event.nextId === 'pending') {
      this.getOffers();
    }
    if (event.nextId === 'accepted') {
      this.getOffers(true);
    }
    if (event.nextId === 'rejected') {
      this.getOffers(false);
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
