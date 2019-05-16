import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ApartmentCreateService } from '../../../services/apartment-create.service';

import { Room } from '../../../../../shared/models';

@Component({
  selector: 'app-apartment-window',
  templateUrl: './apartment-window.component.html',
  styleUrls: ['./apartment-window.component.scss']
})
export class ApartmentWindowComponent implements OnInit {
  rooms: Room[];
  windowTypeForm: FormGroup;

  constructor(
    private apartmentCreateService: ApartmentCreateService
  ) { }

  ngOnInit() {
    this.rooms = this.apartmentCreateService.rooms;
    this.windowTypeForm = new FormGroup({
      windowType: new FormArray(this.rooms.map(room => {
        return new FormControl(room.windowType);
      }))
    });
  }

  submit() {
    const windowTypes = { ...this.windowTypeForm.value };
    this.rooms.map((room, index) => {
      room.windowType = windowTypes.windowType[index];
    });
    this.apartmentCreateService.createRooms(this.rooms);
  }

}
