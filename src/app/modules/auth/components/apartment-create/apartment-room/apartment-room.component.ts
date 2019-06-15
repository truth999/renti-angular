import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ApartmentCreateService } from '../../../services/apartment-create.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

import { Room } from '../../../../../shared/models';
import { Validate } from '../../../../../../config/validate';

@Component({
  selector: 'app-apartment-room',
  templateUrl: './apartment-room.component.html',
  styleUrls: ['./apartment-room.component.scss']
})
export class ApartmentRoomComponent implements OnInit, DoCheck {
  roomForm: FormGroup;
  roomsData: Room[];
  pattern = Validate;
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
          size: new FormControl(room.size, [Validators.required, Validators.min(1), Validators.max(100)])
        });
      }) : [new FormGroup({
        name: new FormControl(null, Validators.required),
        size: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
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
    if (this.rooms.length < 20) {
      this.rooms.push(new FormGroup({
        name: new FormControl(null, Validators.required),
        size: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)])
      }));
    }
  }

  onRemoveRoom(index: number) {
    if (this.rooms.length > 1) {
      this.rooms.removeAt(index);
    }
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
