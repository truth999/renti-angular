import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class HeatmapService {
  private mapUrl = 'map';

  constructor(
    private apiService: ApiService
  ) { }

  getDefaultLocation(): Promise<any> {
    return this.apiService.get(`${this.mapUrl}/default`);
  }

  getTenantsLocation(): Promise<any> {
    return this.apiService.get(`${this.mapUrl}/tenants`);
  }

  getApartments(): Promise<any> {
    return this.apiService.get(`${this.mapUrl}/apartments`);
  }
}
