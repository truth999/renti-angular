import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() windowTypeFormValid = new EventEmitter<boolean>();

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

    this.windowTypeFormValid.emit(true);
  }

  submit() {
    const windowTypes = { ...this.windowTypeForm.value };
    this.rooms.map((room, index) => {
      room.windowType = windowTypes.windowType[index];
      room.yearOfRenovation = null;
      room.coverage = null;
      room.equipment = null;
      room.furniture = null;
    });

    this.apartmentCreateService.createRoomsData(this.rooms);
  }

}
