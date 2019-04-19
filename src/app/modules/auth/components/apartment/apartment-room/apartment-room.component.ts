import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartment-room',
  templateUrl: './apartment-room.component.html',
  styleUrls: ['./apartment-room.component.scss']
})
export class ApartmentRoomComponent implements OnInit {
  roomCount = 1;

  constructor() {
  }

  ngOnInit() {
  }

  onAddRoom() {
    this.roomCount = this.roomCount + 1;
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
