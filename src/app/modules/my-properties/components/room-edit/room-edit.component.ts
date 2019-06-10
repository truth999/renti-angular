import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Room } from '../../../../shared/models';

import { MyPropertiesService } from '../../services/my-properties.service';
import { DateSelectService } from '../../../../shared/services/date-select.service';
import { ImageUploaderService } from '../../../../core/services/image-uploader.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';
import { ValidateFormFieldsService } from '../../../../core/services/validate-form-fields.service';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  room: Room;
  rate: number;
  uploadBase = environment.uploadBase;
  roomForm: FormGroup;

  years: string[];

  constructor(
    private route: ActivatedRoute,
    private myPropertiesService: MyPropertiesService,
    private location: Location,
    private toastrService: ToastrService,
    private dateSelectService: DateSelectService,
    private imageUploaderService: ImageUploaderService,
    private cursorWaitService: CursorWaitService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  async ngOnInit() {
    this.years = this.dateSelectService.getYears();

    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.cursorWaitService.enable();

      const response = await this.myPropertiesService.getRoom(id);
      this.room = response.room;
      this.rate = response.room.dataPercent * .05;

      this.buildRoomForm();
    } catch (e) {
      console.log('RoomEditComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  buildRoomForm() {
    this.roomForm = new FormGroup({
      name: new FormControl(!!this.room.name ? this.room.name : null, Validators.required),
      size: new FormControl(!!this.room.size ? this.room.size : null, [Validators.required, Validators.min(0)]),
      yearOfRenovation: new FormControl(!!this.room.yearOfRenovation ? this.room.yearOfRenovation : null),
      coverage: new FormControl(!!this.room.coverage ? this.room.coverage : null),
      windowType: new FormControl(!!this.room.windowType ? this.room.windowType : null, Validators.required),
      equipment: new FormControl(!!this.room.equipment ? this.room.equipment : false),
      furniture: new FormArray(!!this.room.furniture ? this.room.furniture.map(furniture => {
        return new FormGroup({
          furnitureName: new FormControl(!!furniture.furnitureName ? furniture.furnitureName : null),
          furnitureType: new FormControl(!!furniture.furnitureType ? furniture.furnitureType : null)
        });
      }) : []),
      pictures: new FormArray(!!this.room.pictures ? this.room.pictures.map(picture => {
        return new FormControl(picture);
      }) : [new FormControl(null)])
    });
  }

  get furniture() {
    return this.roomForm.get('furniture') as FormArray;
  }

  get pictures() {
    return this.roomForm.get('pictures') as FormArray;
  }

  async onFilesChange(event) {
    const newRoomPictures = event.target.files;

    try {
      this.cursorWaitService.enable();

      const filenames = await this.imageUploaderService.upload(newRoomPictures);

      for (let i = 0; i < filenames.length; i++) {
        this.pictures.push(new FormControl(filenames[i]));
      }
    } catch (e) {
      console.log('RoomEditComponent->onFilesChange', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  removeRoomPicture(index) {
    this.pictures.removeAt(index);
  }

  onBack() {
    this.location.back();
  }

  onAddFurniture() {
    this.furniture.push(new FormGroup({
      furnitureName: new FormControl(null),
      furnitureType: new FormControl(null)
    }));
  }

  async submit() {
    if (this.roomForm.valid) {
      let roomData = {
        ...this.room,
        ...this.roomForm.value
      };

      const room = { ...this.roomForm.value };
      let roomLength = 0;

      delete room.name;

      for (const i in room) {
        if (room.hasOwnProperty(i)) {
          if (room[i] !== null) {
            if (room[i].length !== 0) {
              roomLength++;
            }
          }
        }
      }

      const dataPercent = parseInt((roomLength / Object.keys(room).length * 100).toFixed(0), 10);

      roomData = {
        ...roomData,
        dataPercent
      };

      try {
        this.cursorWaitService.enable();

        await this.myPropertiesService.updateRoom(roomData);
        this.toastrService.success('The room is updated successfully.', 'Success!');
        this.location.back();
      } catch (e) {
        this.toastrService.error('Something went wrong', 'Error');
        console.log('RoomEditComponent->submit', e);
      } finally {
        this.cursorWaitService.disable();
      }
    } else {
      this.validateFormFieldsService.validate(this.roomForm);
    }
  }

}
