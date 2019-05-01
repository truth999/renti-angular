import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private router: Router) { }

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

  onSendOffer() {
    this.router.navigate(['/app/offers/create']);
  }

}
