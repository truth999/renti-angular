import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OfferService } from '../../../services/offer.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';

import { Offer, Page } from '../../../../../shared/models';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  offers: Offer[];
  page = new Page();

  constructor(
    private location: Location,
    private offerService: OfferService,
    private authService: AuthService,
    private cursorWaitService: CursorWaitService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getOffers();
  }

  async getOffers() {
    try {
      this.cursorWaitService.enable();

      const userResponse = await this.authService.getAuthUser();
      const apartmentIds = userResponse.user.apartments;

      const response = await this.offerService.getOffers(this.page, apartmentIds);
      this.offers = response.offers;
    } catch (e) {
      console.log('OfferListComponent->getOffers', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  deletedOffers() {
    this.getOffers();
  }

  onBack() {
    this.location.back();
  }

}
