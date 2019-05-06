import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  @ViewChild('picturesChooser') picturesChooser: ElementRef;
  furnitures = 1;
  public previewNewRoomPictures: any[] = [];

  constructor(private location: Location) { }

  ngOnInit() {
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

  onBack() {
    this.location.back();
  }

  onAddFurniture() {
    this.furnitures++;
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
