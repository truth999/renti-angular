import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Location } from '@angular/common';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private location: Location) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        image: false,
        arrowPrevIcon: 'icon-left',
        arrowNextIcon: 'icon-right',
        closeIcon: 'icon-cancel',
        width: '100%',
        height: '100px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = [
      {
        small: '/assets/images/room/room1.png',
        medium: '/assets/images/room/room1.png',
        big: '/assets/images/room/room1.png'
      },
      {
        small: '/assets/images/room/room2.png',
        medium: '/assets/images/room/room2.png',
        big: '/assets/images/room/room2.png'
      }
    ];
  }

  onBack() {
    this.location.back();
  }

  arrayNumber(n: number) {
    return Array(n);
  }

}
