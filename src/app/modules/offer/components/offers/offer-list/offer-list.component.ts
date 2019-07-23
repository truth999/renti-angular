import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { OfferService } from '../../../services/offer.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { StorageService } from '../../../../../core/services/storage.service';
import { FeedbackModalService } from '../../../../../shared/services/modal/feedback-modal.service';

import { Offer, Page } from '../../../../../shared/models';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers: Offer[];
  page = new Page();
  accepted: boolean;
  sort: string;

  constructor(
    private location: Location,
    private offerService: OfferService,
    private authService: AuthService,
    private storageService: StorageService,
    private feedbackModalService: FeedbackModalService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;
    this.sort = 'rentalFee';

    this.getOffers(this.sort);
    this.feedbackModalService.giveFeedback.subscribe(() => {
      this.getOffers(this.sort, true);
    });
  }

  async getOffers(sort, accepted?: boolean) {
    try {
      const landlordId = this.storageService.get('landlordId');
      const offersResponse = typeof accepted === 'undefined'
        ? await this.offerService.getOffersByLandlord(this.page, landlordId, sort)
        : await this.offerService.getOffersByLandlord(this.page, landlordId, sort, accepted);
      this.offers = offersResponse.offers;
      this.page.totalElements = offersResponse.totalItems;
      this.page.totalPages = Math.ceil(this.page.totalElements / this.page.perPage);
    } catch (e) {
      console.log('OfferListComponent->getOffers', e);
    }
  }

  changeTab(event: NgbTabChangeEvent) {
    if (event.nextId === 'received') {
      this.page.pageNumber = 1;
      this.accepted = null;
      this.getOffers(this.sort);
    }
    if (event.nextId === 'accepted') {
      this.page.pageNumber = 1;
      this.accepted = true;
      this.getOffers(this.sort, true);
    }
    if (event.nextId === 'rejected') {
      this.page.pageNumber = 1;
      this.accepted = false;
      this.getOffers(this.sort, false);
    }
  }

  rejectedOffers() {
    this.getOffers(this.sort);
  }

  pageChange(event) {
    this.page.pageNumber = event;
    this.accepted ? this.getOffers(this.sort, this.accepted) : this.getOffers(this.sort);
  }

  onSort(event) {
    this.sort = event.target.value;
    this.accepted ? this.getOffers(this.sort, this.accepted) : this.getOffers(this.sort);
  }

  onBack() {
    this.location.back();
  }

}
