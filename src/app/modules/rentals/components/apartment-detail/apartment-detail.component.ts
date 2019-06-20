import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { Apartment } from '../../../../shared/models';

import { environment } from '../../../../../environments/environment';

import { RentalsService } from '../../services/rentals.service';
import { CursorWaitService } from '../../../../core/services/cursor-wait.service';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {
  apartment: Apartment;

  uploadBase = environment.uploadBase;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private rentalsService: RentalsService,
    private cursorWaitService: CursorWaitService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getApartment();
  }

  async getApartment() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.cursorWaitService.enable();

      const response = await this.rentalsService.getApartment(id);
      this.apartment = response.apartment;

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
          thumbnails: false,
          imageSwipe: true,
          previewSwipe: true
        }
      ];

      this.galleryImages = response.apartment.pictures.map(image => {
        return {
          small: this.uploadBase + image,
          medium: this.uploadBase + image,
          big: this.uploadBase + image
        };
      });
    } catch (e) {
      console.log('ApartmentDetailComponent->getApartment', e);
    } finally {
      this.cursorWaitService.disable();
    }
  }

  onSendOffer() {
    this.router.navigate(['/app/offers/create', this.apartment._id]);
  }

  async onSaveToFavorites() {
    try {
      const tenantId = this.storageService.get('tenantId');
      const response = await this.rentalsService.setFavorite(tenantId, { apartmentId: this.apartment._id });
      console.log(response);
    } catch (e) {
      console.log('ApartmentDetailComponent->onSaveToFavorites', e);
    }
  }

  onBack() {
    this.location.back();
  }

}
