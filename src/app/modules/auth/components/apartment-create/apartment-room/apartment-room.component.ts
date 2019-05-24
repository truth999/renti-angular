import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApartmentCreateService } from '../../../services/apartment-create.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

import { Room } from '../../../../../shared/models';

@Component({
  selector: 'app-apartment-room',
  templateUrl: './apartment-room.component.html',
  styleUrls: ['./apartment-room.component.scss']
})
export class ApartmentRoomComponent implements OnInit, DoCheck {
  roomForm: FormGroup;
  roomsData: Room[];
  @Output() roomFormValid = new EventEmitter<boolean>();

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.roomsData = this.apartmentCreateService.rooms;
    this.roomForm = new FormGroup({
      rooms: new FormArray(!!this.roomsData ? this.roomsData.map(room => {
        return new FormGroup({
          name: new FormControl(room.name, Validators.required),
          size: new FormControl(room.size, [Validators.required, Validators.min(1)])
        });
      }) : [new FormGroup({
        name: new FormControl('', Validators.required),
        size: new FormControl('', [Validators.required, Validators.min(1)])
      })])
    });
  }

  ngDoCheck() {
    this.roomFormValid.emit(this.roomForm.valid);
  }

  get rooms() {
    return this.roomForm.get('rooms') as FormArray;
  }

  onAddRoom() {
    this.rooms.push(new FormGroup({
      name: new FormControl('', Validators.required),
      size: new FormControl('', [Validators.required, Validators.min(1)])
    }));
  }

  submit() {
    if (this.roomForm.valid) {
      const rooms = { ...this.roomForm.value };
      this.apartmentCreateService.createRoomsData(rooms.rooms);
    } else {
      this.validateFormFieldsService.validate(this.roomForm);
    }
  }

}
