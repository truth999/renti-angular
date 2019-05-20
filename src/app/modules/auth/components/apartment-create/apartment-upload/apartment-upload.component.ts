import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ApartmentCreateService } from '../../../services/apartment-create.service';
import { ImageUploaderService } from '../../../../../core/services/image-uploader.service';

import { Room } from '../../../../../shared/models';

@Component({
  selector: 'app-apartment-upload',
  templateUrl: './apartment-upload.component.html',
  styleUrls: ['./apartment-upload.component.scss']
})
export class ApartmentUploadComponent implements OnInit {
  newRoomPictures: any[];
  previewNewRoomPictures: any[];
  rooms: Room[];

  @Output() uploadValid = new EventEmitter<boolean>();

  constructor(
    private apartmentCreateService: ApartmentCreateService,
    private imageUploaderService: ImageUploaderService
  ) { }

  ngOnInit() {
    this.rooms = this.apartmentCreateService.rooms;
    this.previewNewRoomPictures = !!this.apartmentCreateService.previewRoomPictures
      ? this.apartmentCreateService.previewRoomPictures
      : Array.from(Array(this.rooms.length), () => []);
    this.newRoomPictures = !!this.apartmentCreateService.newRoomPictures
      ? this.apartmentCreateService.newRoomPictures
      : Array.from(Array(this.rooms.length), () => []);

    this.uploadValid.emit(true);
  }

  async onFilesChange(event, tabIndex) {
    const newRoomPictures = event.target.files;

    if (event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent) => {
          this.previewNewRoomPictures[tabIndex].push((e.target as FileReader).result);
        };

        reader.readAsDataURL(event.target.files[index]);
      }
    }

    try {
      const filenames = await this.imageUploaderService.upload(newRoomPictures);

      for (let i = 0; i < filenames.length; i++) {
        this.newRoomPictures[tabIndex].push(filenames[i]);
      }
    } catch (e) {
      console.log('ApartmentUploadComponent->uploadRoomPictures->error', e);
    }
  }

  removeRoomPicture(tabIndex, pictureIndex) {
    this.previewNewRoomPictures[tabIndex].splice(pictureIndex, 1);
    this.newRoomPictures[tabIndex].splice(pictureIndex, 1);
  }

  submit() {
    this.rooms.map((room, index) => {
      room.pictures = this.newRoomPictures[index];
    });

    this.apartmentCreateService.createPreviewRoomPictures(this.previewNewRoomPictures);
    this.apartmentCreateService.createNewRoomPictures(this.newRoomPictures);

    this.apartmentCreateService.createRoomsData(this.rooms);
  }

}
