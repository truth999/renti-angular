import { Injectable } from '@angular/core';

import { ApiService } from '../../core/services/api.service';

import { Page } from '../models';

@Injectable()
export class LayoutService {
  private offerUrl = 'offers';

  constructor(
    private apiService: ApiService
  ) { }

  getOffers(page: Page): Promise<any> {
    const url = `${this.offerUrl}?page=${page.pageNumber}&perPage=${page.perPage}`;
    return this.apiService.get(url);
  }
}
