import { EventEmitter, Injectable } from '@angular/core';

import { Apartment, Room } from '../../../shared/models';

@Injectable()
export class ApartmentCreateService {
  apartmant: Apartment;
  rooms: Room[];
  roomCount = 0;
  roomCountChanged = new EventEmitter<number>();

  constructor() { }

  increaseRoomCount() {
    this.roomCount++;
    this.roomCountChanged.emit(this.roomCount);
  }

  decreaseRoomCount() {
    this.roomCount--;
    if (this.roomCount < 0) {
      this.roomCount = 0;
    }
    this.roomCountChanged.emit(this.roomCount);
  }

  createRooms(rooms) {
    this.rooms = rooms;
  }

}
