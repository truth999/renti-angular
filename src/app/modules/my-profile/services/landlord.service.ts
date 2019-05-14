import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../core/services/api.service';
import { StorageService } from '../../../core/services/storage.service';
import { Landlord } from '../../../shared/models';

@Injectable()
export class LandlordService {
  landlordData: Landlord;
  landlordChanged = new EventEmitter<Landlord>();

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router
  ) { }

  get(id: string) {
    this.apiService.get(`landlords/${id}`).then(response => {
      this.landlordData = response.landlord;
      this.landlordChanged.emit(this.landlordData);
    });
  }

  create(landlordData: Landlord) {
    this.apiService.post('landlords', landlordData).then(response => {
      this.storageService.save('landlordId', response.landlord._id);
      this.router.navigate(['/app/profile/landlord']);
    });
  }

  update(id: string, landlordData: Landlord) {
    this.apiService.put(`landlords/${id}`, landlordData).then(response => {
      this.storageService.save('landlordId', response.landlord._id);
      this.router.navigate(['/app/profile/landlord']);
    });
  }
}
