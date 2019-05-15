import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class SettingsService {

  constructor(
    private apiService: ApiService
  ) { }

  updateUser(id: string, user): Promise<any> {
    return this.apiService.put(`users/${id}`, user);
  }
}
