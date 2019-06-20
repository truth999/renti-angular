import { Injectable } from '@angular/core';

import { Apartment, Room } from '../../../shared/models';

import { ApiService } from '../../../core/services/api.service';
import { StorageService } from '../../../core/services/storage.service';

@Injectable()
export class ApartmentCreateService {
  apartment: Apartment;
  rooms: Room[];
  previewRoomPictures: any[];
  newRoomPictures: any[];

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) { }

  createPreviewRoomPictures(previewRoomPictures) {
    this.previewRoomPictures = previewRoomPictures;
  }

  createNewRoomPictures(NewRoomPictures) {
    this.newRoomPictures = NewRoomPictures;
  }

  createRoomsData(rooms: Room[]) {
    this.rooms = rooms;
  }

  createApartmentData(apartment: Apartment) {
    this.apartment = {
      ...this.apartment,
      ...apartment
    };
  }

  createRooms(): Promise<any> {
    return this.apiService.post('rooms', this.rooms);
  }

  updateApartmentDataWithRooms(rooms: Room[]) {
    this.apartment.rooms = rooms;
  }

  createApartment(): Promise<any> {
    this.apartment.landlord = this.storageService.get('landlordId');
    return this.apiService.post('apartments', this.apartment);
  }

}
