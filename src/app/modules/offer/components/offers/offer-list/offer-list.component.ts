import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OfferService } from '../../../services/offer.service';
import { AuthService } from '../../../../../core/services/auth.service';

import { Offer, Page } from '../../../../../shared/models';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers: Offer[] = [];
  page = new Page();

  constructor(
    private location: Location,
    private offerService: OfferService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getOffers();
  }

  async getOffers() {
    try {
      const userResponse = await this.authService.getUser();
      const apartmentIds = userResponse.user.apartmentIds;

      const response = await this.offerService.getOffers(this.page);
      const offers = response.offers;

      offers.map(offer => {
        apartmentIds.map(apartmentId => {
          if (offer.apartment === apartmentId) {
            this.offers.push(offer);
          }
        });
      });

      this.page.totalElements = response.totalElements;
    } catch (e) {
      console.log('OfferListComponent->getOffers', e);
    }
  }

  deletedOffers() {
    this.offers = [];
    this.getOffers();
  }

  onBack() {
    this.location.back();
  }

}
