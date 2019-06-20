import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OfferService } from '../../../services/offer.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { CursorWaitService } from '../../../../../core/services/cursor-wait.service';
import { StorageService } from '../../../../../core/services/storage.service';

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
    private cursorWaitService: CursorWaitService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.page.perPage = 10;
    this.page.pageNumber = 1;

    this.getOffers();
  }

  async getOffers() {
    try {
      this.cursorWaitService.enable();

      const landlordId = this.storageService.get('landlordId');
      const landlordResponse = await this.authService.getLandlord(landlordId);
      const apartmentIds = landlordResponse.landlord.apartments;

      const response = await this.offerService.getOffers(this.page);
      const offers = response.offers;
      this.offers = offers.filter(offer => {
        return apartmentIds.includes(offer.apartment._id) && offer.accepted === false;
      });
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
