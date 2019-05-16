import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ApartmentCreateService } from '../../../services/apartment-create.service';
import { Room } from '../../../../../shared/models';

@Component({
  selector: 'app-apartment-room',
  templateUrl: './apartment-room.component.html',
  styleUrls: ['./apartment-room.component.scss']
})
export class ApartmentRoomComponent implements OnInit {
  roomCount: number;
  roomForm: FormGroup;
  roomsData: Room[];

  constructor(
    private apartmentCreateService: ApartmentCreateService
  ) { }

  ngOnInit() {
    this.roomCount = this.apartmentCreateService.roomCount;
    this.roomsData = this.apartmentCreateService.rooms;
    this.roomForm = new FormGroup({
      rooms: new FormArray(!!this.roomsData ? this.roomsData.map(room => {
        return new FormGroup({
          name: new FormControl(room.name),
          size: new FormControl(room.size)
        });
      }) : Array.from(Array(this.roomCount), (x, index) => index + 1).map(() => {
        return new FormGroup({
          name: new FormControl(''),
          size: new FormControl('')
        });
      }))
    });
  }

  get rooms() {
    return this.roomForm.get('rooms') as FormArray;
  }

  submit() {
    const rooms = { ...this.roomForm.value };
    this.apartmentCreateService.createRooms(rooms.rooms);
  }

}
