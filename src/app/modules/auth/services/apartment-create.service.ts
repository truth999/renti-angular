import { Injectable } from '@angular/core';

import { Apartment, Room } from '../../../shared/models';

import { ApiService } from '../../../core/services/api.service';
import { StorageService } from '../../../core/services/storage.service';

@Injectable()
export class ApartmentCreateService {
  apartment: any;
  rooms: any[];
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

  updateApartmentDataWithRoomIds(roomIds: string[]) {
    this.apartment.rooms = roomIds;
  }

  createApartment(): Promise<any> {
    const apartment = { ...this.apartment };
    const rooms = [];
    let apartmentLength = 0;
    let roomsLength = 0;
    let apartmentRate;
    let roomsRate;
    this.rooms.map((room, index) => {
      rooms[index] = { ...room };
    });

    delete apartment.name;
    delete apartment.address;
    delete apartment.size;

    rooms.map(room => {
      delete room.name;
      delete room.dataPercent;
    });

    for (const i in apartment) {
      if (apartment.hasOwnProperty(i)) {
        if (apartment[i] !== null) {
          if (apartment[i].length !== 0) {
            apartmentLength++;
          }
        }
      }
    }

    rooms.map(room => {
      for (const i in room) {
        if (room.hasOwnProperty(i)) {
          if (room[i] !== null) {
            if (room[i].length !== 0) {
              roomsLength++;
            }
          }
        }
      }
    });

    apartmentRate = apartmentLength / Object.keys(apartment).length * 80;
    roomsRate = roomsLength / (Object.keys(rooms[0]).length * rooms.length) * 20;
    const dataPercent = parseInt((apartmentRate + roomsRate).toFixed(0), 10);

    this.apartment = {
      ...this.apartment,
      dataPercent
    };

    this.apartment.userId = this.storageService.get('userId');
    return this.apiService.post('apartments', this.apartment);
  }

}
