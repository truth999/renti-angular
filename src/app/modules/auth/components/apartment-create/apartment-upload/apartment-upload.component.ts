import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ApartmentCreateService } from '../../../services/apartment-create.service';

import { Room } from '../../../../../shared/models';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-apartment-upload',
  templateUrl: './apartment-upload.component.html',
  styleUrls: ['./apartment-upload.component.scss']
})
export class ApartmentUploadComponent implements OnInit {
  @ViewChild('picturesChooser') picturesChooser: ElementRef;
  previewNewRoomPictures: any[] = [];
  rooms: Room[];

  constructor(
    private apartmentCreateService: ApartmentCreateService
  ) { }

  ngOnInit() {
    this.rooms = this.apartmentCreateService.rooms;
  }

  onFilesChange(event) {
    if (event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent) => {
          this.previewNewRoomPictures.push((e.target as FileReader).result);
        };

        reader.readAsDataURL(event.target.files[index]);
      }
    }
  }

  removeRoomPicture(index) {
    this.previewNewRoomPictures.splice(index, 1);
  }

}
