import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Feedback, Offer, Page } from '../../../shared/models';

@Injectable()
export class OfferService {
  private offerUrl = 'offers';
  private feedbackUrl = 'feedbacks';

  constructor(
    private apiService: ApiService
  ) { }

  getOffers(page: Page, ids: string[]): Promise<any> {
    const url = `${this.offerUrl}?page=${page.pageNumber}&perPage=${page.perPage}&apartmentIds=${ids}`;
    return this.apiService.get(url);
  }

  getOffersByTenant(page: Page, id: string): Promise<any> {
    const url = `${this.offerUrl}/user?page=${page.pageNumber}&perPage=${page.perPage}&userId=${id}`;
    return this.apiService.get(url);
  }

  createOffer(offer: Offer): Promise<any> {
    return this.apiService.post(this.offerUrl, offer);
  }

  updateOffer(offer: Offer): Promise<any> {
    return this.apiService.put(`${this.offerUrl}/${offer._id}`, offer);
  }

  deleteOffer(id: string): Promise<any> {
    return this.apiService.delete(`${this.offerUrl}/${id}`);
  }

  createFeedback(feedbackData, feedback: Feedback): Promise<any> {
    return this.apiService.post(`${this.feedbackUrl}?userId=${feedbackData.userId}&offerId=${feedbackData.offerId}`, feedback);
  }
}
