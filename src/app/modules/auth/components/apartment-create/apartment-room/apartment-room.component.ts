import { Component, OnInit } from '@angular/core';
import { ApartmentCreateService } from '../../../services/apartment-create.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-apartment-room',
  templateUrl: './apartment-room.component.html',
  styleUrls: ['./apartment-room.component.scss']
})
export class ApartmentRoomComponent implements OnInit {
  roomCount: number;
  roomForm: FormGroup;

  constructor(
    private apartmentCreateService: ApartmentCreateService
  ) { }

  ngOnInit() {
    this.roomCount = this.apartmentCreateService.roomCount;
    this.roomForm = new FormGroup({
      room: new FormArray(Array.from(Array(this.roomCount), (x, index) => index + 1).map(() => {
        return new FormGroup({
          name: new FormControl('')
        });
      }))
    });
  }

  get room() {
    return this.roomForm.get('room') as FormArray;
  }

  private arrayNumber(n: number) {
    return Array(n);
  }

  submit() {}

}
