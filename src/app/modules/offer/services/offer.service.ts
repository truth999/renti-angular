import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Offer, Page } from '../../../shared/models';

@Injectable()
export class OfferService {
  private offerUrl = 'offers';

  constructor(
    private apiService: ApiService
  ) { }

  getOffers(page: Page, ids: string[]): Promise<any> {
    const url = `${this.offerUrl}?page=${page.pageNumber}&perPage=${page.perPage}&apartmentIds=${ids}`;
    return this.apiService.get(url);
  }

  createOffer(offer: Offer): Promise<any> {
    return this.apiService.post(this.offerUrl, offer);
  }

  deleteOffer(id: string): Promise<any> {
    return this.apiService.delete(`${this.offerUrl}/${id}`);
  }
}
