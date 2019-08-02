import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { OfferService } from '../../../services/offer.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { FeedbackModalService } from '../../../../../shared/services/modal/feedback-modal.service';

import { Offer, Page } from '../../../../../shared/models';

import { CONFIG_CONST } from '../../../../../../config/config-const';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
  offers: Offer[];
  tenantId: string;
  page = new Page();
  accepted: boolean;
  AccountTypes = CONFIG_CONST.accountType;

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
    this.feedbackModalService.giveFeedback.subscribe(() => {
      this.getOffers(true);
    });
  }

  async getOffers(accepted?: boolean) {
    try {
      const tenantId = this.storageService.get('tenantId');
      this.tenantId = tenantId;
      const response = typeof accepted === 'undefined'
        ? await this.offerService.getOffersByTenant(this.page, tenantId)
        : await this.offerService.getOffersByTenant(this.page, tenantId, accepted);
      this.offers = response.offers;
      this.page.totalElements = response.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
    } catch (e) {
      console.log('MyOffersComponent->getOffers', e);
    }
  }

  changeTab(event: NgbTabChangeEvent) {
    if (event.nextId === 'pending') {
      this.page.pageNumber = 1;
      this.accepted = null;
      this.getOffers();
    }
    if (event.nextId === 'accepted') {
      this.page.pageNumber = 1;
      this.accepted = true;
      this.getOffers(true);
    }
    if (event.nextId === 'rejected') {
      this.page.pageNumber = 1;
      this.accepted = false;
      this.getOffers(false);
    }
  }

  onGiveFeedback(event: Event, feedbackData) {
    event.stopPropagation();

    this.feedbackModalService.show(feedbackData);
  }

  pageChange(event) {
    this.page.pageNumber = event;
    this.accepted ? this.getOffers(this.accepted) : this.getOffers();
  }

  onBack() {
    this.location.back();
  }

}
