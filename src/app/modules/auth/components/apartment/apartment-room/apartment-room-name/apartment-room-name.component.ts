import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartment-room-name',
  templateUrl: './apartment-room-name.component.html',
  styleUrls: ['./apartment-room-name.component.scss']
})
export class ApartmentRoomNameComponent implements OnInit {
  @Input() number;

  constructor() { }

  ngOnInit() {
  }

}
