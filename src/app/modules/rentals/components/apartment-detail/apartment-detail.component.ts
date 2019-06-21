import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ToastrService } from 'ngx-toastr';

import { Apartment } from '../../../../shared/models';

import { environment } from '../../../../../environments/environment';

import { RentalsService } from '../../services/rentals.service';
import { StorageService } from '../../../../core/services/storage.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {
  apartment: Apartment;
  favorite: boolean;

  uploadBase = environment.uploadBase;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private rentalsService: RentalsService,
    private storageService: StorageService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getApartment();
    this.getFavorite();
  }

  async getApartment() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
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
    }
  }

  async getFavorite() {
    try {
      const apartmentId = this.route.snapshot.paramMap.get('id');
      const tenantId = this.storageService.get('tenantId');
      const response = await this.authService.getTenant(tenantId);
      const favoriteIds = response.tenant.favorites.map(favorite => {
        return favorite._id;
      });
      this.favorite = favoriteIds.includes(apartmentId);
    } catch (e) {
      console.log('ApartmentDetailComponent->getFavorite', e);
    }
  }

  onSendOffer() {
    this.router.navigate(['/app/offers/create', this.apartment._id]);
  }

  async onSaveToFavorites() {
    try {
      const tenantId = this.storageService.get('tenantId');
      await this.rentalsService.setFavorite(tenantId, { apartmentId: this.apartment._id });
      this.toastrService.success('The apartment has saved to favorites successfully.', 'Success!');
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('ApartmentDetailComponent->onSaveToFavorites', e);
    }
  }

  async onRemoveToFavorites() {
    try {
      const tenantId = this.storageService.get('tenantId');
      await this.rentalsService.removeFavorite(tenantId, { apartmentId: this.apartment._id });
      this.toastrService.success('The apartment has removed to favorites successfully.', 'Success!');
    } catch (e) {
      this.toastrService.error('Something went wrong', 'Error');
      console.log('ApartmentDetailComponent->onRemoveToFavorites', e);
    }
  }

  onBack() {
    this.location.back();
  }

}
