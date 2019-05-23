import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class ProfileService {
  private userUrl = 'users';

  constructor(
    private apiService: ApiService
  ) { }

  getUser(id: string): Promise<any> {
    return this.apiService.get(`${this.userUrl}/${id}`);
  }
}
