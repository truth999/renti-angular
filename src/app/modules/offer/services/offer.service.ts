import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Offer, Page } from '../../../shared/models';

@Injectable()
export class OfferService {
  private offerUrl = 'offers';
  private feedbackUrl = 'feedbacks';

  constructor(
    private apiService: ApiService
  ) { }

  getOffersByLandlord(page: Page, landlordId: string, sort: string, accepted?: boolean): Promise<any> {
    const url = typeof accepted === 'undefined'
      ? `${this.offerUrl}/landlord/${landlordId}?page=${page.pageNumber}&perPage=${page.perPage}&sort=${sort}`
      : `${this.offerUrl}/landlord/${landlordId}?page=${page.pageNumber}&perPage=${page.perPage}&sort=${sort}&accepted=${accepted}`;
    return this.apiService.get(url);
  }

  getOffersByTenant(page: Page, tenantId: string, accepted?: boolean): Promise<any> {
    const url = typeof accepted === 'undefined'
      ? `${this.offerUrl}/tenant/${tenantId}?page=${page.pageNumber}&perPage=${page.perPage}`
      : `${this.offerUrl}/tenant/${tenantId}?page=${page.pageNumber}&perPage=${page.perPage}&accepted=${accepted}`;
    return this.apiService.get(url);
  }

  createOffer(offer: Offer): Promise<any> {
    return this.apiService.post(this.offerUrl, offer);
  }

  updateOffer(offer: Offer): Promise<any> {
    return this.apiService.put(`${this.offerUrl}/${offer._id}`, offer);
  }

  createFeedbackByTenant(tenantId: string, feedbackData: any): Promise<any> {
    return this.apiService.post(`${this.feedbackUrl}/tenant/${tenantId}`, feedbackData);
  }

  createFeedbackByLandlord(landlordId: string, feedbackData: any): Promise<any> {
    return this.apiService.post(`${this.feedbackUrl}/landlord/${landlordId}`, feedbackData);
  }
}
