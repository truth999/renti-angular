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

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  room: Room;
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
    private cursorWaitService: CursorWaitService
  ) { }

  async ngOnInit() {
    this.years = this.dateSelectService.getYears();

    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.cursorWaitService.enable();

      const response = await this.myPropertiesService.getRoom(id);
      this.room = response.room;

      this.buildRoomForm();
    } catch (e) {
      console.log('RoomEditComponent->ngOnInit', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  buildRoomForm() {
    this.roomForm = new FormGroup({
      name: new FormControl(!!this.room.name ? this.room.name : '', Validators.required),
      size: new FormControl(!!this.room.size ? this.room.size : '', [Validators.required, Validators.min(0)]),
      yearOfRenovation: new FormControl(!!this.room.yearOfRenovation ? this.room.yearOfRenovation : ''),
      coverage: new FormControl(!!this.room.coverage ? this.room.coverage : ''),
      windowType: new FormControl(!!this.room.windowType ? this.room.windowType : '', Validators.required),
      equipment: new FormControl(!!this.room.equipment ? this.room.equipment : false),
      furniture: new FormArray(!!this.room.furniture ? this.room.furniture.map(furniture => {
        return new FormGroup({
          furnitureName: new FormControl(!!furniture.furnitureName ? furniture.furnitureName : ''),
          furnitureType: new FormControl(!!furniture.furnitureType ? furniture.furnitureType : '')
        });
      }) : [new FormGroup({
        furnitureName: new FormControl(''),
        furnitureType: new FormControl('')
      })]),
      pictures: new FormArray(!!this.room.pictures ? this.room.pictures.map(picture => {
        return new FormControl(picture);
      }) : [new FormControl('')])
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
      furnitureName: new FormControl(''),
      furnitureType: new FormControl('')
    }));
  }

  async submit() {
    const roomData = {
      ...this.room,
      ...this.roomForm.value
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
  }

}
