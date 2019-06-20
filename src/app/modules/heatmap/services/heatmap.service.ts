import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class HeatmapService {

  constructor(
    private apiService: ApiService
  ) { }

  getApartments(page): Promise<any> {
    let url = `apartments?page=${page.pageNumber}`;
    url += page.pageNumber ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }

  getTenants(page): Promise<any> {
    let url = `tenants?page=${page.pageNumber}`;
    url += page.pageNumber ? `&perPage=${page.perPage}` : '';
    return this.apiService.get(url);
  }
}
