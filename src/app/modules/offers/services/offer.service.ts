import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Page} from '../../../shared/models/shared.model';
import {Offer} from '../models/offer.model';

@Injectable()
export class OfferService {

  constructor(
    private apiService: ApiService,
  ) { }

  getOffers(page: Page): Promise<any> {
    const url = `offers?page=${page.pageNumber}&perPage=${page.perPage}`;
    return this.apiService.get(url);
  }

  getOffer(_id: string): Promise<any> {
    return this.apiService.get(`offers/${_id}`);
  }

  createOffer(offer: Offer): Promise<any> {
    return this.apiService.post(`offers`, offer);
  }

  updateOffer(offer: Offer): Promise<any> {
    return this.apiService.put(`offers/${offer._id}`, offer);
  }

  deleteOffer(_id: string): Promise<any> {
    return this.apiService.delete(`offers/${_id}`);
  }

  getTenants(page): Promise<any> {
    let url = `tenants?page=${page.pageNumber}`;
    url += page.perPage ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }
}
