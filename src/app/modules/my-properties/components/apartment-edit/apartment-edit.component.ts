import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-apartment-edit',
  templateUrl: './apartment-edit.component.html',
  styleUrls: ['./apartment-edit.component.scss']
})
export class ApartmentEditComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  roomCount = 1;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        arrowPrevIcon: 'icon-left',
        arrowNextIcon: 'icon-right',
        closeIcon: 'icon-cancel',
        width: '100%',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 576,
        imageBullets: true,
        thumbnails: false
      }
    ];

    this.galleryImages = [
      {
        small: '/assets/images/apartment/apartment1.png',
        medium: '/assets/images/apartment/apartment1.png',
        big: '/assets/images/apartment/apartment1.png'
      },
      {
        small: '/assets/images/apartment/apartment2.png',
        medium: '/assets/images/apartment/apartment2.png',
        big: '/assets/images/apartment/apartment2.png'
      },
      {
        small: '/assets/images/apartment/apartment3.png',
        medium: '/assets/images/apartment/apartment3.png',
        big: '/assets/images/apartment/apartment3.png'
      },
      {
        small: '/assets/images/apartment/apartment1.png',
        medium: '/assets/images/apartment/apartment1.png',
        big: '/assets/images/apartment/apartment1.png'
      },
      {
        small: '/assets/images/apartment/apartment1.png',
        medium: '/assets/images/apartment/apartment1.png',
        big: '/assets/images/apartment/apartment1.png'
      },
      {
        small: '/assets/images/apartment/apartment2.png',
        medium: '/assets/images/apartment/apartment2.png',
        big: '/assets/images/apartment/apartment2.png'
      },
      {
        small: '/assets/images/apartment/apartment3.png',
        medium: '/assets/images/apartment/apartment3.png',
        big: '/assets/images/apartment/apartment3.png'
      },
      {
        small: '/assets/images/apartment/apartment1.png',
        medium: '/assets/images/apartment/apartment1.png',
        big: '/assets/images/apartment/apartment1.png'
      }
    ];
  }

  onAddRoom() {
    this.roomCount++;
  }

  arrayNumber(n: number) {
    return Array(n);
  }

  onBack() {
    this.location.back();
  }

}
