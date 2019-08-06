import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MyPropertiesService } from '../../../services/my-properties.service';
import { DateSelectService } from '../../../../../shared/services/date-select.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';
import { ValidateFormFieldsService } from '../../../../../core/services/validate-form-fields.service';

import { Room } from '../../../../../shared/models';

import { Validate } from '../../../../../../config/validate';
import { config } from '../../../../../../config';

import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  room: Room;
  roomForm: FormGroup;
  pattern = Validate;
  roomConfig = config.room;
  Object = Object;
  years: string[];
  uploadBase = environment.uploadBase;

  constructor(
    private route: ActivatedRoute,
    private myPropertiesService: MyPropertiesService,
    private toastrService: ToastrService,
    private dateSelectService: DateSelectService,
    private imageUploaderService: ImageUploaderService,
    private validateFormFieldsService: ValidateFormFieldsService
  ) { }

  ngOnInit() {
    this.years = this.dateSelectService.getYears();

    this.route.params.subscribe(async (params: Params) => {
      const id = params.roomId;

      try {
        const response = await this.myPropertiesService.getRoom(id);
        this.room = response.room;

        this.buildRoomForm();
      } catch (e) {
        console.log('RoomEditComponent->ngOnInit', e);
      }
    });
  }

  buildRoomForm() {
    this.roomForm = new FormGroup({
      name: new FormControl(this.room.name, Validators.required),
      size: new FormControl(this.room.size, Validators.required),
      yearOfRenovation: new FormControl(this.room.yearOfRenovation),
      coverage: new FormControl(this.room.coverage),
      equipment: new FormControl(this.room.equipment),
      furniture: new FormArray(!!this.room.furniture ? this.room.furniture.map(furniture => {
        return new FormGroup({
          furnitureName: new FormControl(!!furniture.furnitureName ? furniture.furnitureName : null),
          furnitureType: new FormControl(!!furniture.furnitureType ? furniture.furnitureType : null)
        });
      }) : []),
      pictures: new FormArray(this.room.pictures.length !== 0 ? this.room.pictures.map(picture => {
        return new FormControl(picture);
      }) : [])
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
      const filenames = await this.imageUploaderService.upload(newRoomPictures);

      for (let i = 0; i < filenames.length; i++) {
        this.pictures.push(new FormControl(filenames[i]));
      }
    } catch (e) {
      console.log('RoomEditComponent->onFilesChange', e);
    }
  }

  removeRoomPicture(index) {
    this.pictures.removeAt(index);
  }

  onAddFurniture() {
    this.furniture.push(new FormGroup({
      furnitureName: new FormControl(null),
      furnitureType: new FormControl(null)
    }));
  }

  async submit() {
    if (this.roomForm.valid) {
      const roomData = {
        ...this.room,
        ...this.roomForm.value
      };

      try {
        await this.myPropertiesService.updateRoom(roomData);
        this.toastrService.success('The room is updated successfully.', 'Success!');
      } catch (e) {
        this.toastrService.error('Something went wrong', 'Error');
        console.log('RoomEditComponent->submit', e);
      }
    } else {
      this.validateFormFieldsService.validate(this.roomForm);
    }
  }

}
