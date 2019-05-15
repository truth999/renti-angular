import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ApartmentCreateService {
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

}
